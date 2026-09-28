import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // 1. MUST read raw body as text for HMAC verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 2. Signature verification
    if (webhookSecret) {
      if (!signature) {
        console.error("Razorpay Webhook: Missing x-razorpay-signature header");
        return NextResponse.json(
          { error: "Missing x-razorpay-signature header" },
          { status: 400 }
        );
      }

      const isValid = verifyWebhookSignature({
        rawBody,
        signature,
        secret: webhookSecret,
      });

      if (!isValid) {
        console.error("Razorpay Webhook: Invalid signature mismatch");
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 400 }
        );
      }
    } else {
      console.warn(
        "⚠️ RAZORPAY_WEBHOOK_SECRET is not configured in .env. Webhook signature verification bypassed for setup."
      );
    }

    // 3. Parse JSON event payload
    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error("Failed to parse webhook JSON:", parseErr);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const eventType = event.event;
    console.log(`[Razorpay Webhook] Received event: ${eventType} (ID: ${event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id || "N/A"})`);

    // 4. Handle specific Razorpay webhook events
    switch (eventType) {
      case "payment.captured": {
        const payment = event.payload?.payment?.entity;
        if (payment) {
          const amountInCurrency = (payment.amount / 100).toFixed(2);
          const payerEmail = payment.email || payment.notes?.customerEmail || "N/A";
          const payerName = payment.notes?.customerName || "Customer";
          const planName = payment.notes?.planName || "Cypher Tech Service";

          console.log(`[Razorpay Webhook] Payment Captured: ${payment.id} for ${payment.currency} ${amountInCurrency}`);

          if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
              await sendEmail({
                to: process.env.EMAIL_USER,
                subject: `[Webhook Captured] ${payment.currency} ${amountInCurrency} from ${payerName} (ID: ${payment.id})`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b;">
                    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden;">
                      <div style="background-color: #1e40af; color: #ffffff; padding: 18px 24px;">
                        <h2 style="margin: 0; font-size: 18px;">Razorpay Webhook: Payment Captured</h2>
                      </div>
                      <div style="padding: 24px;">
                        <p style="margin: 0 0 16px; font-size: 14px; color: #059669; font-weight: 600;">✓ Transaction Successfully Captured via Webhook</p>
                        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Payment ID:</td><td style="padding: 8px 0; font-weight: 600; text-align: right; font-family: monospace;">${payment.id}</td></tr>
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Order ID:</td><td style="padding: 8px 0; text-align: right; font-family: monospace;">${payment.order_id || "N/A"}</td></tr>
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Amount:</td><td style="padding: 8px 0; font-weight: 700; color: #059669; text-align: right;">${payment.currency} ${amountInCurrency}</td></tr>
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Customer:</td><td style="padding: 8px 0; text-align: right;">${payerName} (${payerEmail})</td></tr>
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Service:</td><td style="padding: 8px 0; text-align: right;">${planName}</td></tr>
                          <tr><td style="padding: 8px 0; color: #64748b;">Method:</td><td style="padding: 8px 0; text-align: right;">${payment.method.toUpperCase()}</td></tr>
                        </table>
                      </div>
                    </div>
                  </div>
                `,
              });
            } catch (err) {
              console.error("Webhook notification email failed:", err);
            }
          }
        }
        break;
      }

      case "payment.failed": {
        const payment = event.payload?.payment?.entity;
        if (payment) {
          const failReason = payment.error_description || payment.error_reason || "Unknown";
          console.warn(`[Razorpay Webhook] Payment Failed: ${payment.id} Reason: ${failReason}`);

          if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
              await sendEmail({
                to: process.env.EMAIL_USER,
                subject: `[Alert: Payment Failed] ${payment.currency} ${(payment.amount / 100).toFixed(2)} (ID: ${payment.id})`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b;">
                    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #fecaca; overflow: hidden;">
                      <div style="background-color: #dc2626; color: #ffffff; padding: 18px 24px;">
                        <h2 style="margin: 0; font-size: 18px;">Razorpay Webhook: Payment Attempt Failed</h2>
                      </div>
                      <div style="padding: 24px;">
                        <p style="margin: 0 0 16px; font-size: 14px; color: #dc2626; font-weight: 600;">Failure Details:</p>
                        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Payment ID:</td><td style="padding: 8px 0; font-weight: 600; text-align: right; font-family: monospace;">${payment.id}</td></tr>
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Reason:</td><td style="padding: 8px 0; color: #dc2626; text-align: right;">${failReason}</td></tr>
                          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Customer:</td><td style="padding: 8px 0; text-align: right;">${payment.email || "N/A"} (${payment.contact || "N/A"})</td></tr>
                        </table>
                      </div>
                    </div>
                  </div>
                `,
              });
            } catch (err) {
              console.error("Webhook failure alert email error:", err);
            }
          }
        }
        break;
      }

      case "order.paid": {
        const order = event.payload?.order?.entity;
        console.log(`[Razorpay Webhook] Order Fully Paid: ${order?.id} Amount: ${order?.amount_paid}`);
        break;
      }

      case "refund.processed": {
        const refund = event.payload?.refund?.entity;
        console.log(`[Razorpay Webhook] Refund Processed: ${refund?.id} for payment ${refund?.payment_id}`);
        break;
      }

      default: {
        console.log(`[Razorpay Webhook] Unhandled event type: ${eventType}`);
      }
    }

    // Always respond with 200 OK to acknowledge receipt
    return NextResponse.json({
      status: "success",
      received: true,
      event: eventType,
    });
  } catch (error: any) {
    console.error("Error handling Razorpay webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing error", details: error.message },
      { status: 500 }
    );
  }
}
