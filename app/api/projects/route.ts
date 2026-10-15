import { NextRequest, NextResponse } from "next/server";
import { createProject, updateProject, readStore } from "@/lib/serverStore";
import { sendEmail } from "@/lib/email";

// POST /api/projects: Create new project with milestones
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientId,
      title,
      description,
      category,
      budgetTotal,
      startDate,
      targetDate,
      milestones,
      notes,
      currentWork,
      completedWork,
      upcomingTasks,
    } = body;

    if (!clientId || !title) {
      return NextResponse.json(
        { error: "Client selection and project title are required." },
        { status: 400 }
      );
    }

    const project = createProject({
      clientId,
      title,
      description: description || "Custom engineering deliverables.",
      category: category || "Web Application",
      budgetTotal: Number(budgetTotal) || 0,
      startDate,
      targetDate,
      milestones: milestones || [],
      notes,
      currentWork: currentWork || "",
      completedWork: completedWork || [],
      upcomingTasks: upcomingTasks || [],
    } as any);

    return NextResponse.json({
      success: true,
      message: "Project successfully created with milestone schedule.",
      project,
    });
  } catch (err: any) {
    console.error("Create project error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create project" },
      { status: 400 }
    );
  }
}

// PATCH /api/projects: Update project progress, status, or milestones
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, updates, notifyClient } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    const updatedProject = updateProject(projectId, updates);

    // If notifyClient is requested and client has email, send quick update email
    if (notifyClient && updatedProject.clientEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await sendEmail({
          to: updatedProject.clientEmail,
          subject: `Project Update: ${updatedProject.title} is now ${updatedProject.progress}% complete`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b;">
              <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: #ffffff; padding: 20px 24px;">
                  <h2 style="margin: 0; font-size: 18px;">CypherTech Project Progress Update</h2>
                </div>
                <div style="padding: 24px;">
                  <h3 style="margin: 0 0 8px; font-size: 16px; color: #0f172a;">${updatedProject.title}</h3>
                  <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">Status: <strong>${updatedProject.status.toUpperCase()}</strong></p>
                  
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                    <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">Sprint Completion Progress</div>
                    <div style="background: #e2e8f0; border-radius: 9999px; height: 12px; overflow: hidden; margin-bottom: 8px;">
                      <div style="background: #2563eb; width: ${updatedProject.progress}%; height: 100%;"></div>
                    </div>
                    <div style="font-size: 14px; font-weight: 700; color: #2563eb; text-align: right;">${updatedProject.progress}%</div>
                  </div>

                  ${updatedProject.notes ? `<div style="font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 20px;"><strong>Notes from Developer:</strong><br/>${updatedProject.notes}</div>` : ""}

                  <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://cyphertech.online'}/dashboard" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                      View Live Project Dashboard &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Failed to send client update email:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Project successfully updated.",
      project: updatedProject,
    });
  } catch (err: any) {
    console.error("Update project error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update project" },
      { status: 400 }
    );
  }
}
