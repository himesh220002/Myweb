import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature, getRazorpayClient } from "@/lib/razorpay";
import { sendEmail } from "@/lib/email";
import { signReceiptToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      customerEmail,
      customerPhone,
      planName,
      amount,
      currency = "INR",
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    // 1. Verify HMAC SHA256 signature
    let isValid = false;
    try {
      isValid = verifyPaymentSignature({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });
    } catch (err: any) {
      console.error("Signature verification error:", err);
      return NextResponse.json(
        { error: "Payment verification failed: " + err.message },
        { status: 500 }
      );
    }

    if (!isValid) {
      console.warn("Payment signature mismatch:", {
        razorpay_order_id,
        razorpay_payment_id,
      });
      return NextResponse.json(
        { error: "Invalid payment signature. Verification failed." },
        { status: 400 }
      );
    }

    // 2. Fetch payment details from Razorpay for authoritative record
    let paymentDetails: any = null;
    try {
      const razorpay = getRazorpayClient();
      paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    } catch (err: any) {
      console.warn("Could not fetch remote payment details:", err.message);
    }

    const verifiedAmount = paymentDetails
      ? (paymentDetails.amount / 100).toFixed(2)
      : amount || "N/A";
    const paymentMethod = paymentDetails?.method?.toUpperCase() || "ONLINE";

    // 3. Mint cryptographically signed, tamper-proof Receipt & Refund JWT
    let receiptToken = "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cyphertech.online";
    try {
      receiptToken = await signReceiptToken({
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: verifiedAmount,
        currency,
        customerEmail: customerEmail || "",
        customerName: customerName || "Valued Client",
        customerPhone: customerPhone || "",
        planName: planName || "CypherTech Service",
      });
    } catch (jwtErr) {
      console.error("JWT signing error:", jwtErr);
    }

    const refundClaimUrl = receiptToken
      ? `${baseUrl}/refund?token=${encodeURIComponent(receiptToken)}`
      : `${baseUrl}/contact`;


    // 3. Send email receipt to customer and notification to admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const formattedDate = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Formal Email to Admin (Column-wise stacked layout for mobile screens < sm)
      try {
        await sendEmail({
          to: process.env.EMAIL_USER,
          subject: `[Payment Received] ${currency} ${verifiedAmount} — ${customerName || "Customer"} (ID: ${razorpay_payment_id})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 20px 8px; color: #1e293b;">
              <div style="max-width: 580px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); box-sizing: border-box;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 22px 20px; color: #ffffff;">
                  <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">CYPHERTECH DIGITAL</h1>
                  <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Merchant Notification • New Payment Captured</p>
                </div>
                
                <div style="padding: 20px 16px;">
                  <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 6px 12px; color: #047857; font-size: 13px; font-weight: 600; margin-bottom: 16px;">
                    ✓ Payment Verified &amp; Captured
                  </div>

                  <p style="font-size: 14px; line-height: 1.5; color: #334155; margin: 0 0 16px;">
                    A customer payment has been confirmed via Razorpay. Transaction details:
                  </p>

                  <!-- Column-wise Stacked Details (Mobile & Desktop Friendly) -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Customer Name</div>
                      <div style="font-size: 14px; color: #0f172a; font-weight: 600; word-break: break-word;">${customerName || "N/A"}</div>
                    </div>

                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Email Address</div>
                      <div style="font-size: 14px; color: #2563eb; word-break: break-all;"><a href="mailto:${customerEmail || ""}" style="color: #2563eb; text-decoration: none;">${customerEmail || "N/A"}</a></div>
                    </div>

                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Contact Phone</div>
                      <div style="font-size: 14px; color: #0f172a; word-break: break-word;">${customerPhone || "N/A"}</div>
                    </div>

                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Service / Package</div>
                      <div style="font-size: 14px; color: #0f172a; font-weight: 600; word-break: break-word;">${planName || "CypherTech Service"}</div>
                    </div>

                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Amount Received</div>
                      <div style="font-size: 18px; color: #059669; font-weight: 700;">${currency} ${verifiedAmount}</div>
                    </div>

                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Payment Reference ID</div>
                      <div style="font-size: 13px; color: #475569; font-family: monospace; word-break: break-all;">${razorpay_payment_id}</div>
                    </div>

                    <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Razorpay Order ID</div>
                      <div style="font-size: 13px; color: #475569; font-family: monospace; word-break: break-all;">${razorpay_order_id}</div>
                    </div>

                    <div style="padding: 8px 0;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">Payment Method</div>
                      <div style="font-size: 13px; color: #0f172a; font-weight: 500;">${paymentMethod}</div>
                    </div>
                  </div>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; font-size: 12px; color: #475569;">
                    <strong>Next Action:</strong> Verify customer onboarding and milestone deliverables schedule.
                  </div>
                </div>

                <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 20px; font-size: 11px; color: #64748b; text-align: center; line-height: 1.5;">
                  <div style="font-weight: 600; color: #334155; margin-bottom: 4px;">Merchant Legal Entity: CypherTech</div>
                  <div style="color: #94a3b8;">CypherTech Automated Billing Gateway • 256-Bit SSL Encrypted</div>
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Failed to send admin email alert:", mailErr);
      }

      // Formal, Professional Email Receipt to Customer (Column-wise stacked for mobile screens < sm)
      if (customerEmail && customerEmail.includes("@")) {
        try {
          await sendEmail({
            to: customerEmail,
            subject: `Payment Receipt: ${currency} ${verifiedAmount} for ${planName || "CypherTech Service"} (ID: ${razorpay_payment_id})`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 20px 8px; color: #1e293b;">
                <div style="max-width: 580px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06); box-sizing: border-box;">
                  
                  <!-- Blue Trust Header -->
                  <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 22px 20px; color: #ffffff;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                      <div>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">CYPHERTECH</h1>
                        <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Official Payment Receipt &amp; Confirmation</p>
                      </div>
                      <div>
                        <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.35); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                          PAID
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Receipt Content -->
                  <div style="padding: 20px 16px;">
                    <p style="font-size: 15px; color: #0f172a; margin: 0 0 12px; font-weight: 600;">
                      Dear ${customerName || "Valued Client"},
                    </p>
                    <p style="font-size: 13px; line-height: 1.6; color: #475569; margin: 0 0 18px;">
                      Thank you for your payment. This email confirms that your transaction has been successfully processed and verified. Please find your official payment summary below for your records.
                    </p>

                    <!-- Receipt Summary Box (Column-wise stacked arrangement for flawless display on mobile screens < sm) -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
                      
                      <!-- Field: Description / Service -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">
                          Description / Service
                        </div>
                        <div style="font-size: 14px; color: #0f172a; font-weight: 600; line-height: 1.4; word-break: break-word;">
                          ${planName || "CypherTech Project Service"}
                        </div>
                      </div>

                      <!-- Field: Amount Paid -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">
                          Amount Paid
                        </div>
                        <div style="font-size: 19px; color: #059669; font-weight: 700; line-height: 1.2;">
                          ${currency} ${verifiedAmount}
                        </div>
                      </div>

                      <!-- Field: Transaction ID -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">
                          Transaction ID (Razorpay)
                        </div>
                        <div style="font-size: 12px; color: #334155; font-family: monospace; word-break: break-all; line-height: 1.4;">
                          ${razorpay_payment_id}
                        </div>
                      </div>

                      <!-- Field: Order Reference -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">
                          Order Reference
                        </div>
                        <div style="font-size: 12px; color: #334155; font-family: monospace; word-break: break-all; line-height: 1.4;">
                          ${razorpay_order_id}
                        </div>
                      </div>

                      <!-- Field: Payment Method -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">
                          Payment Method
                        </div>
                        <div style="font-size: 13px; color: #0f172a; font-weight: 500;">
                          ${paymentMethod}
                        </div>
                      </div>

                      <!-- Field: Date & Time -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 2px;">
                          Date &amp; Time
                        </div>
                        <div style="font-size: 13px; color: #0f172a; font-weight: 500;">
                          ${formattedDate}
                        </div>
                      </div>

                      <!-- Field: Payment Status -->
                      <div style="padding: 8px 0 2px;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 4px;">
                          Payment Status
                        </div>
                        <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 4px 10px; color: #047857; font-size: 12px; font-weight: 700;">
                          ✓ Complete / Captured
                        </div>
                      </div>

                    </div>

                    <!-- What's Next Section -->
                    <div style="border-left: 3px solid #2563eb; padding-left: 14px; margin-bottom: 18px; background-color: #f0f7ff; padding: 12px 14px; border-radius: 0 6px 6px 0;">
                      <h4 style="margin: 0 0 4px; font-size: 13px; color: #1e40af; font-weight: 700;">What Happens Next?</h4>
                      <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #334155;">
                        Our engineering and delivery team has received your confirmation. You will receive an onboarding briefing, milestone delivery schedule, and point of contact within 24 to 48 business hours.
                      </p>
                    </div>

                    <!-- Tamper-Proof Refund & Transaction Resolution Card -->
                    <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px; text-align: center;">
                      <div style="font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">
                        🛡️ Transaction Protection &amp; Resolution Guarantee
                      </div>
                      <p style="margin: 0 0 10px; font-size: 11px; line-height: 1.5; color: #64748b;">
                        If you need milestone adjustments or wish to lodge a formal refund resolution request within statutory guidelines, you can use your cryptographically signed transaction token below:
                      </p>
                      <a href="${refundClaimUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; letter-spacing: 0.3px;">
                        Manage Transaction / Request Refund &rarr;
                      </a>
                    </div>

                    <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0;">
                      If you have questions regarding this payment or project scope, feel free to reply directly to this email or reach us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${process.env.EMAIL_USER}</a>.
                    </p>
                  </div>

                  <!-- Professional Razorpay Compliance & Policy Footer -->
                  <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 16px; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6;">
                    <p style="margin: 0 0 3px; font-weight: 700; color: #1e293b; font-size: 12px;">Merchant Legal Entity: CypherTech</p>
                    <p style="margin: 0 0 8px; color: #64748b; font-size: 11px;">Last updated on Sep 18th 2025 • Bank-Grade 256-Bit SSL Encrypted</p>

                    <!-- Mandatory Razorpay Policy Links -->
                    <div style="margin: 10px 0; padding: 8px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; line-height: 2;">
                      <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; margin: 0 4px; font-size: 11px; display: inline-block;">Terms &amp; Conditions</a>
                      <span style="color: #cbd5e1;">•</span>
                      <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; margin: 0 4px; font-size: 11px; display: inline-block;">Privacy Policy</a>
                      <span style="color: #cbd5e1;">•</span>
                      <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; margin: 0 4px; font-size: 11px; display: inline-block;">Cancellation &amp; Refund</a>
                      <span style="color: #cbd5e1;">•</span>
                      <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; margin: 0 4px; font-size: 11px; display: inline-block;">Shipping &amp; Delivery</a>
                      <span style="color: #cbd5e1;">•</span>
                      <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; margin: 0 4px; font-size: 11px; display: inline-block;">Contact Us</a>
                    </div>

                    <p style="margin: 6px 0 0; color: #94a3b8; font-size: 10px;">
                      This is an automated transaction receipt for CypherTech via Razorpay. Please retain for your accounting records.
                    </p>
                  </div>

                </div>
              </div>
            `,
          });
        } catch (clientMailErr) {
          console.error("Failed to send customer email receipt:", clientMailErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: verifiedAmount,
      currency,
      receiptToken,
      refundClaimUrl,
      message: "Payment successfully verified and recorded",
    });
  } catch (error: any) {
    console.error("Error in verify-payment handler:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process payment verification" },
      { status: 500 }
    );
  }
}
