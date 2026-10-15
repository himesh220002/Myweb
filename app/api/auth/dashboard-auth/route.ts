import { NextRequest, NextResponse } from "next/server";
import { signSessionToken, verifySessionToken } from "@/lib/jwt";
import { verifyPassword, findUserByEmail, readStoreAsync } from "@/lib/serverStore";

const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60; // 604,800 seconds (1 week)
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@CypherTech2026";
const ADMIN_EMAIL = (process.env.EMAIL_USER || "satyamhimesh@gmail.com").toLowerCase().trim();

// POST /api/auth/dashboard-auth: Verifies admin password and issues a 1-week token
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Admin master password is required." },
        { status: 400 }
      );
    }

    let isValid = false;

    // 1. Check against master admin password
    if (password === DEFAULT_ADMIN_PASSWORD) {
      isValid = true;
    } else {
      // 2. Check against admin accounts stored in CRM
      const store = await readStoreAsync();
      const adminUsers = store.users.filter((u) => u.role === "admin" || u.email.toLowerCase().trim() === ADMIN_EMAIL);
      for (const admin of adminUsers) {
        if (verifyPassword(password, admin.passwordHash)) {
          isValid = true;
          break;
        }
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect admin password. Access denied." },
        { status: 401 }
      );
    }

    // Generate 1-week cryptographic JWT token
    const token = await signSessionToken({
      userId: "usr_admin_owner",
      email: ADMIN_EMAIL,
      name: "Himesh Satyam (Owner)",
      role: "admin",
    });

    const res = NextResponse.json({
      success: true,
      message: "Admin authentication successful. 1-week access token issued.",
      expiresIn: "7 days",
      user: {
        id: "usr_admin_owner",
        email: ADMIN_EMAIL,
        name: "Himesh Satyam (Owner)",
        role: "admin",
      },
    });

    // Set 1-week secure HTTP-only cookies
    res.cookies.set("admin_dashboard_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ONE_WEEK_SECONDS,
      path: "/",
    });

    res.cookies.set("auth_session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ONE_WEEK_SECONDS,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Dashboard auth error:", err);
    return NextResponse.json(
      { error: err.message || "Authentication process failed" },
      { status: 500 }
    );
  }
}

// GET /api/auth/dashboard-auth: Checks if request has a valid 1-week admin token
export async function GET(req: NextRequest) {
  try {
    const adminToken =
      req.cookies.get("admin_dashboard_token")?.value ||
      req.cookies.get("auth_session_token")?.value;

    if (!adminToken) {
      return NextResponse.json({ authenticated: false });
    }

    const { valid, payload } = await verifySessionToken(adminToken);
    if (!valid || !payload) {
      return NextResponse.json({ authenticated: false });
    }

    const isOwnerEmail = payload.email?.toLowerCase().trim() === ADMIN_EMAIL;
    const isAdminRole = payload.role === "admin";

    if (isAdminRole || isOwnerEmail) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: payload.userId,
          email: payload.email,
          name: payload.name,
          role: "admin",
        },
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

// DELETE /api/auth/dashboard-auth: Clear admin token
export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out from admin dashboard." });
  res.cookies.set("admin_dashboard_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
