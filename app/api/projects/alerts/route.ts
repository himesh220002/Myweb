import { NextRequest, NextResponse } from "next/server";
import { addProjectAlertAsync, dismissProjectAlertAsync, ProjectAlertType } from "@/lib/serverStore";
import { sendEmail } from "@/lib/email";

// POST /api/projects/alerts: Emit new alert on a project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectId,
      type,
      title,
      message,
      severity,
      amount,
      milestoneId,
      dueDate,
      notifyClient = true,
    } = body;

    if (!projectId || !type || !title || !message) {
      return NextResponse.json(
        { error: "Project ID, alert type, title, and message are required." },
        { status: 400 }
      );
    }

    const validTypes: ProjectAlertType[] = [
      "upcoming_milestone_3_4_days",
      "milestone_reached_payment_requested",
      "payment_delayed",
      "alert_project_will_be_on_hold",
      "project_on_hold",
      "building",
      "custom",
    ];

    if (!validTypes.includes(type as ProjectAlertType)) {
      return NextResponse.json(
        { error: `Invalid alert type: ${type}` },
        { status: 400 }
      );
    }

    const { project, alert } = await addProjectAlertAsync(projectId, {
      type: type as ProjectAlertType,
      title,
      message,
      severity,
      amount: amount ? Number(amount) : undefined,
      milestoneId,
      dueDate,
    });

    // Optional email dispatch to client
    if (notifyClient && project.clientEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cyphertech.online";
        const payUrl = alert.amount
          ? `${baseUrl}/pay?amount=${alert.amount}&desc=${encodeURIComponent(alert.title)}`
          : `${baseUrl}/profile`;

        const isUrgent =
          type === "payment_delayed" ||
          type === "alert_project_will_be_on_hold" ||
          type === "project_on_hold";

        const badgeColor = isUrgent ? "#dc2626" : type === "building" ? "#059669" : "#2563eb";

        await sendEmail({
          to: project.clientEmail,
          subject: `[${alert.title}] Project Update: ${project.title}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b;">
              <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="background-color: ${badgeColor}; color: #ffffff; padding: 20px 24px;">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 4px;">
                    PROJECT ADVISORY
                  </span>
                  <h2 style="margin: 10px 0 0; font-size: 18px; font-weight: 700;">${alert.title}</h2>
                </div>
                <div style="padding: 24px;">
                  <p style="margin: 0 0 14px; font-size: 14px; color: #64748b;">
                    Project: <strong style="color: #0f172a;">${project.title}</strong>
                  </p>
                  <div style="background: #f8fafc; border-left: 4px solid ${badgeColor}; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">
                      ${alert.message}
                    </p>
                  </div>

                  ${
                    alert.amount
                      ? `
                    <div style="background: #f1f5f9; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: #64748b; font-weight: 600;">Requested Milestone Amount:</span>
                      <strong style="font-size: 18px; color: #0f172a;">₹${alert.amount.toLocaleString("en-IN")}</strong>
                    </div>
                  `
                      : ""
                  }

                  <div style="text-align: center; margin-top: 24px;">
                    <a href="${payUrl}" style="display: inline-block; background-color: ${badgeColor}; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 700;">
                      ${alert.amount ? "Review & Pay Milestone →" : "View Project Profile →"}
                    </a>
                  </div>

                  <p style="margin: 24px 0 0; font-size: 12px; color: #94a3b8; text-align: center;">
                    CypherTech Engineering Client Portal • Automated Sprint Dispatch
                  </p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Alert email dispatch failed:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Alert attached to project successfully.",
      alert,
      project,
    });
  } catch (err: any) {
    console.error("Add project alert error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to add project alert" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/alerts: Dismiss or resolve alert
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const alertId = searchParams.get("alertId");

    if (!projectId || !alertId) {
      return NextResponse.json(
        { error: "projectId and alertId are required query parameters." },
        { status: 400 }
      );
    }

    const updatedProject = await dismissProjectAlertAsync(projectId, alertId);

    return NextResponse.json({
      success: true,
      message: "Alert successfully dismissed.",
      project: updatedProject,
    });
  } catch (err: any) {
    console.error("Dismiss project alert error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to dismiss alert" },
      { status: 500 }
    );
  }
}
