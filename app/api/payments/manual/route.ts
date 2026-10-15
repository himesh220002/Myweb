import { NextRequest, NextResponse } from "next/server";
import { recordPayment, readStore } from "@/lib/serverStore";
import crypto from "crypto";

// POST /api/payments/manual: Records offline or alternate transaction
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientId,
      customerName,
      customerEmail,
      customerPhone,
      amount,
      currency = "INR",
      method = "MANUAL_UPI",
      referenceId,
      projectId,
      milestoneId,
      notes,
    } = body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid positive payment amount." },
        { status: 400 }
      );
    }

    const store = readStore();
    let client = clientId ? store.clients.find((c) => c.id === clientId) : null;

    const email = customerEmail || client?.email || "manual_client@record.local";
    const name = customerName || client?.name || "Client";
    const phone = customerPhone || client?.phone || "";

    const ref = referenceId?.trim() || `MAN_${Date.now().toString(36).toUpperCase()}_${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

    const payment = recordPayment({
      paymentId: ref,
      orderId: `MAN_ORD_${Date.now().toString(36).toUpperCase()}`,
      amount: parsedAmount,
      currency,
      paymentType: "milestone",
      method,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      userId: client?.userId,
      projectId: projectId || undefined,
      milestoneId: milestoneId || undefined,
      isManual: true,
      notes: notes || `Manual payment recorded via ${method}. Ref: ${ref}`,
    });

    return NextResponse.json({
      success: true,
      message: "Manual payment successfully recorded and synced with client profile.",
      payment,
    });
  } catch (err: any) {
    console.error("Manual payment error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to record manual payment" },
      { status: 400 }
    );
  }
}
