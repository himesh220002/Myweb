import { NextRequest, NextResponse } from "next/server";
import { addProjectFeedItemAsync } from "@/lib/serverStore";

// POST /api/projects/feed: Add manual feed update to project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, type, title, description, amount } = body;

    if (!projectId || !title || !description) {
      return NextResponse.json(
        { error: "Project ID, title, and description are required." },
        { status: 400 }
      );
    }

    const validTypes = [
      "payment_captured",
      "milestone_completed",
      "alert_issued",
      "status_change",
      "sprint_update",
    ];

    const feedType = validTypes.includes(type) ? type : "sprint_update";

    const project = await addProjectFeedItemAsync(projectId, {
      type: feedType as any,
      title,
      description,
      amount: amount ? Number(amount) : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Feed item added to project timeline.",
      project,
    });
  } catch (err: any) {
    console.error("Add feed item error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to add feed item" },
      { status: 500 }
    );
  }
}
