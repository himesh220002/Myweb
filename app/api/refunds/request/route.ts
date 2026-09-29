import { NextRequest, NextResponse } from "next/server";
import { verifyReceiptToken } from "@/lib/jwt";
import { getRazorpayClient } from "@/lib/razorpay";
import { sendEmail } from "@/lib/email";

/**
 * GET /api/refunds/request?token=xxx
 * Decodes and cryptographically validates the token.
 * Returns verified transaction details so the client UI can render securely.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "No receipt token provided" },
        { status: 400 }
      );
    }

    const { valid, payload, error } = await verifyReceiptToken(token);

    if (!valid || !payload) {
      return NextResponse.json(
        { valid: false, error: error || "Token invalid or expired" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      transaction: {
        paymentId: payload.paymentId,
        orderId: payload.orderId,
        amount: payload.amount,
        currency: payload.currency || "INR",
        customerEmail: payload.customerEmail,
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        planName: payload.planName,
        issuedAt: payload.iat ? new Date(Number(payload.iat) * 1000).toISOString() : null,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { valid: false, error: err.message || "Failed to inspect token" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/refunds/request
 * Lodges a formal refund resolution request verified via JWT or fallback paymentId.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      token,
      paymentId: manualPaymentId,
      email: manualEmail,
      reason,
      detailedExplanation,
      upiId,
      bankAccount,
    } = body;

    let transactionData = {
      paymentId: "",
      orderId: "",
      amount: "0",
      currency: "INR",
      customerEmail: "",
      customerName: "Valued Client",
      customerPhone: "",
      planName: "CypherTech Service",
      isTokenVerified: false,
    };

    // 1. If JWT token provided, verify cryptographic validity
    if (token) {
      const { valid, payload, error } = await verifyReceiptToken(token);
      if (!valid || !payload) {
        return NextResponse.json(
          { error: error || "Digital transaction token signature is invalid or expired." },
          { status: 401 }
        );
      }

      transactionData = {
        paymentId: payload.paymentId,
        orderId: payload.orderId,
        amount: String(payload.amount),
        currency: payload.currency || "INR",
        customerEmail: payload.customerEmail,
        customerName: payload.customerName || "Valued Client",
        customerPhone: payload.customerPhone || "",
        planName: payload.planName,
        isTokenVerified: true,
      };
    } else if (manualPaymentId) {
      // 2. Fallback: Lookup transaction via Razorpay API if no token is available
      const cleanPaymentId = manualPaymentId.trim();
      try {
        const razorpay = getRazorpayClient();
        const rzpPayment: any = await razorpay.payments.fetch(cleanPaymentId);

        if (!rzpPayment) {
          return NextResponse.json(
            { error: "Payment record not found on payment gateway." },
            { status: 404 }
          );
        }

        transactionData = {
          paymentId: rzpPayment.id,
          orderId: rzpPayment.order_id || "N/A",
          amount: (rzpPayment.amount / 100).toFixed(2),
          currency: rzpPayment.currency || "INR",
          customerEmail: manualEmail || rzpPayment.email || "",
          customerName: rzpPayment.notes?.customerName || "Client",
          customerPhone: rzpPayment.contact || "",
          planName: rzpPayment.description || "CypherTech Service",
          isTokenVerified: false,
        };
      } catch (rzpErr: any) {
        console.error("Razorpay lookup error:", rzpErr);
        return NextResponse.json(
          { error: "Failed to verify transaction ID with payment gateway." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Please provide either a valid transaction token or a Razorpay Payment ID." },
        { status: 400 }
      );
    }

    if (!reason || reason.trim().length < 3) {
      return NextResponse.json(
        { error: "Please select or provide a valid reason for the refund request." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const razorpayDashboardLink = `https://dashboard.razorpay.com/app/payments/${transactionData.paymentId}`;

    // 3. Dispatch high-priority email notification to Admin (Merchant)
    if (process.env.EMAIL_USER) {
      try {
        await sendEmail({
          to: process.env.EMAIL_USER,
          subject: `[URGENT REFUND REQUEST] ₹${transactionData.amount} — ${transactionData.customerEmail} (${transactionData.paymentId})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 20px 8px; color: #1e293b;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                
                <!-- Red Alert Header -->
                <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 20px; color: #ffffff;">
                  <h2 style="margin: 0; font-size: 18px; font-weight: 700;">⚠️ Refund Request Lodged</h2>
                  <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Action Required • Razorpay Merchant Resolution</p>
                </div>

                <div style="padding: 20px;">
                  <div style="background-color: ${transactionData.isTokenVerified ? '#ecfdf5' : '#fffbeb'}; border: 1px solid ${transactionData.isTokenVerified ? '#a7f3d0' : '#fde68a'}; border-radius: 6px; padding: 8px 12px; font-size: 12px; font-weight: 600; color: ${transactionData.isTokenVerified ? '#065f46' : '#92400e'}; margin-bottom: 16px;">
                    ${transactionData.isTokenVerified ? "✓ Cryptographically Verified by JWT (Tamper-Proof)" : "ℹ️ Manual Lookup via Razorpay API"}
                  </div>

                  <!-- Table of Details -->
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 18px;">
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 35%;">Refund Amount</td>
                        <td style="padding: 8px 0; font-size: 16px; font-weight: 700; color: #dc2626;">${transactionData.currency} ${transactionData.amount}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Payment ID</td>
                        <td style="padding: 8px 0; font-family: monospace; color: #0f172a;">${transactionData.paymentId}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Order ID</td>
                        <td style="padding: 8px 0; font-family: monospace; color: #0f172a;">${transactionData.orderId}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Customer Name</td>
                        <td style="padding: 8px 0; color: #0f172a;">${transactionData.customerName}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Customer Email</td>
                        <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${transactionData.customerEmail}">${transactionData.customerEmail}</a></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone / UPI</td>
                        <td style="padding: 8px 0; color: #0f172a;">${transactionData.customerPhone || "N/A"}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Primary Reason</td>
                        <td style="padding: 8px 0; color: #b91c1c; font-weight: 600;">${reason}</td>
                      </tr>
                      ${
                        detailedExplanation
                          ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Customer Notes</td>
                              <td style="padding: 8px 0; color: #334155; line-height: 1.4;">${detailedExplanation}</td>
                            </tr>`
                          : ""
                      }
                      ${
                        upiId
                          ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Preferred Refund UPI</td>
                              <td style="padding: 8px 0; color: #059669; font-weight: 600;">${upiId}</td>
                            </tr>`
                          : ""
                      }
                      ${
                        bankAccount
                          ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Bank Details</td>
                              <td style="padding: 8px 0; color: #334155; font-family: monospace;">${bankAccount}</td>
                            </tr>`
                          : ""
                      }
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Requested At</td>
                        <td style="padding: 8px 0; color: #64748b;">${timestamp}</td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- 1-Click Razorpay Action Button -->
                  <div style="text-align: center; margin: 24px 0 16px;">
                    <a href="${razorpayDashboardLink}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13px; box-shadow: 0 2px 6px rgba(37,99,235,0.3);">
                      Open in Razorpay Dashboard to Approve &amp; Refund &rarr;
                    </a>
                  </div>

                  <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
                    Note: Once clicked, you can instantly refund to the original payment source with one click inside Razorpay.
                  </p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (adminMailErr) {
        console.error("Admin refund email error:", adminMailErr);
      }

      // 4. Dispatch acknowledgment email to Customer
      if (transactionData.customerEmail && transactionData.customerEmail.includes("@")) {
        try {
          await sendEmail({
            to: transactionData.customerEmail,
            subject: `Refund Request Logged: ${transactionData.currency} ${transactionData.amount} (Payment ID: ${transactionData.paymentId})`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 20px 8px; color: #1e293b;">
                <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  
                  <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 22px 20px; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 18px; font-weight: 700;">CypherTech Resolution Center</h2>
                    <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Ticket Acknowledgment • Refund Request Logged</p>
                  </div>

                  <div style="padding: 20px 18px;">
                    <p style="font-size: 14px; color: #0f172a; margin: 0 0 12px; font-weight: 600;">
                      Hello ${transactionData.customerName},
                    </p>
                    <p style="font-size: 13px; line-height: 1.6; color: #475569; margin: 0 0 16px;">
                      We have received your refund resolution request for transaction <strong>${transactionData.paymentId}</strong> (${transactionData.currency} ${transactionData.amount}).
                    </p>

                    <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px; font-size: 12px;">
                      <div style="margin-bottom: 6px;"><strong>Package/Service:</strong> ${transactionData.planName}</div>
                      <div style="margin-bottom: 6px;"><strong>Amount:</strong> ${transactionData.currency} ${transactionData.amount}</div>
                      <div style="margin-bottom: 6px;"><strong>Stated Reason:</strong> ${reason}</div>
                      <div><strong>Resolution Window:</strong> 24 to 48 business hours</div>
                    </div>

                    <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0 0 12px;">
                      Our finance squad will review this against our service milestones and initiate the refund back to your source account or UPI according to policy.
                    </p>

                    <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0;">
                      If you have further updates, reply to this email or reach us directly at <a href="mailto:${process.env.EMAIL_USER}" style="color: #2563eb;">${process.env.EMAIL_USER}</a>.
                    </p>
                  </div>

                  <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; font-size: 11px; color: #94a3b8; text-align: center;">
                    CypherTech Automated Billing &bull; Bank-Grade Razorpay Gateway Integration
                  </div>
                </div>
              </div>
            `,
          });
        } catch (clientMailErr) {
          console.error("Client acknowledgment email error:", clientMailErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Refund resolution request logged successfully. A review email has been dispatched.",
      paymentId: transactionData.paymentId,
      amount: transactionData.amount,
    });
  } catch (error: any) {
    console.error("Refund request error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit refund request" },
      { status: 500 }
    );
  }
}
