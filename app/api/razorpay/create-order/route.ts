import { NextRequest, NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", planId, planName, customerName, customerEmail, customerPhone, notes } = body;

    // Validate amount
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount. Amount must be a positive number." },
        { status: 400 }
      );
    }

    // Minimum transaction amount check for Razorpay (minimum ₹1 = 100 paise)
    if (currency === "INR" && parsedAmount < 1) {
      return NextResponse.json(
        { error: "Minimum payment amount is ₹1.00." },
        { status: 400 }
      );
    }

    let razorpay;
    try {
      razorpay = getRazorpayClient();
    } catch (configErr: any) {
      console.error("Razorpay initialization error:", configErr.message);
      return NextResponse.json(
        {
          error: "Razorpay payment gateway is not configured yet.",
          details: configErr.message,
        },
        { status: 503 }
      );
    }

    // Amount in smallest currency subunit (INR: paise, USD: cents)
    const amountInSubunits = Math.round(parsedAmount * 100);

    // Create unique receipt ID (max 40 chars for Razorpay)
    const shortTs = Date.now().toString(36);
    const shortRand = Math.random().toString(36).substring(2, 6);
    const receipt = `rcpt_${shortTs}_${shortRand}`;

    const orderOptions = {
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      receipt,
      notes: {
        planId: planId || "custom",
        planName: planName || "Custom Order",
        customerName: customerName || "Anonymous",
        customerEmail: customerEmail || "",
        customerPhone: customerPhone || "",
        ...(notes && typeof notes === "object" ? notes : {}),
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    const publicRazorpayKey =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      keyId: publicRazorpayKey,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create payment order",
        details: error?.error || error,
      },
      { status: 500 }
    );
  }
}
