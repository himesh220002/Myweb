import { NextRequest, NextResponse } from "next/server";
import { mapPaymentToProjectMilestoneAsync } from "@/lib/serverStore";

// POST /api/payments/map: Maps an unassigned payment to a project milestone
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, projectId, milestoneId } = body;

    if (!paymentId || !projectId || !milestoneId) {
      return NextResponse.json(
        { error: "Payment ID, Project ID, and Milestone ID are all required to map payment." },
        { status: 400 }
      );
    }

    const result = await mapPaymentToProjectMilestoneAsync({
      paymentId,
      projectId,
      milestoneId,
    });

    return NextResponse.json({
      success: true,
      message: "Payment successfully attached to project milestone. Budget and progress updated.",
      project: result.project,
      payment: result.payment,
    });
  } catch (err: any) {
    console.error("Map payment error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to map payment to milestone" },
      { status: 400 }
    );
  }
}
