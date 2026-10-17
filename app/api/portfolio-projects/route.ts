import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getPortfolioProjectsAsync,
  createPortfolioProjectAsync,
  updatePortfolioProjectAsync,
  setHeadProjectAsync,
  reorderPortfolioProjectsAsync,
  deletePortfolioProjectAsync,
} from "@/lib/portfolioStore";

function purgePortfolioCaches() {
  try {
    revalidatePath("/projects");
    revalidatePath("/projects/[slug]", "page");
    revalidatePath("/");
  } catch (err) {
    console.warn("Could not revalidate paths:", err);
  }
}

// GET /api/portfolio-projects
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    const allProjects = await getPortfolioProjectsAsync(isAdmin || Boolean(slug || id));

    if (slug) {
      const match = allProjects.find((p) => p.slug === slug);
      if (!match) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, project: match });
    }

    if (id) {
      const match = allProjects.find((p) => String(p.id) === String(id));
      if (!match) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, project: match });
    }

    return NextResponse.json({
      success: true,
      total: allProjects.length,
      projects: allProjects,
    });
  } catch (err: any) {
    console.error("GET /api/portfolio-projects error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch portfolio projects" },
      { status: 500 }
    );
  }
}

// POST /api/portfolio-projects
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { error: "Project title is required." },
        { status: 400 }
      );
    }

    const created = await createPortfolioProjectAsync(body);
    purgePortfolioCaches();
    return NextResponse.json({
      success: true,
      message: "Project successfully created and prioritized.",
      project: created,
    });
  } catch (err: any) {
    console.error("POST /api/portfolio-projects error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio-projects
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, updates, orderedIds } = body;

    // 1. Reordering entire project priority array
    if (action === "reorder" && Array.isArray(orderedIds)) {
      const reordered = await reorderPortfolioProjectsAsync(orderedIds);
      purgePortfolioCaches();
      return NextResponse.json({
        success: true,
        message: "Projects successfully rearranged.",
        projects: reordered,
      });
    }

    // 2. Set as Head Position / Featured Spotlight
    if (action === "set_head" && id) {
      const updated = await setHeadProjectAsync(id);
      purgePortfolioCaches();
      return NextResponse.json({
        success: true,
        message: "Head position project updated.",
        project: updated,
      });
    }

    // 3. Regular Update / Toggle Visibility
    const targetId = id || updates?.id;
    if (!targetId) {
      return NextResponse.json(
        { error: "Project ID is required for update." },
        { status: 400 }
      );
    }

    const patch = updates || body;
    const updated = await updatePortfolioProjectAsync(targetId, patch);

    if (!updated) {
      return NextResponse.json(
        { error: "Project not found to update." },
        { status: 404 }
      );
    }

    purgePortfolioCaches();
    return NextResponse.json({
      success: true,
      message: "Project successfully updated.",
      project: updated,
    });
  } catch (err: any) {
    console.error("PUT /api/portfolio-projects error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio-projects
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryId = searchParams.get("id");
    let targetId = queryId;

    if (!targetId) {
      try {
        const body = await req.json();
        targetId = body.id;
      } catch {}
    }

    if (!targetId) {
      return NextResponse.json(
        { error: "Project ID is required for deletion." },
        { status: 400 }
      );
    }

    const deleted = await deletePortfolioProjectAsync(targetId);
    if (!deleted) {
      return NextResponse.json(
        { error: "Project not found or could not be deleted." },
        { status: 404 }
      );
    }

    purgePortfolioCaches();
    return NextResponse.json({
      success: true,
      message: "Project successfully deleted.",
    });
  } catch (err: any) {
    console.error("DELETE /api/portfolio-projects error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
