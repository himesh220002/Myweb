import { NextRequest, NextResponse } from "next/server";
import { signSessionToken, verifySessionToken } from "@/lib/jwt";

/**
 * Lightweight Auth Handler for CypherTech User Sessions.
 * Issues cryptographically signed JWT session tokens for customer accounts.
 */

// POST /api/auth: Handles login and registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, name, password } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (action === "signup" && (!name || name.trim().length < 2)) {
      return NextResponse.json(
        { error: "Please provide your full name or company name." },
        { status: 400 }
      );
    }

    // Generate a deterministic or unique User ID
    const userId = "usr_" + Buffer.from(email.toLowerCase().trim()).toString("hex").slice(0, 12);
    const resolvedName = name ? name.trim() : email.split("@")[0];

    // Mint 7-day Session JWT
    const sessionToken = await signSessionToken({
      userId,
      email: email.toLowerCase().trim(),
      name: resolvedName,
      role: "client",
    });

    const user = {
      id: userId,
      name: resolvedName,
      email: email.toLowerCase().trim(),
      role: "client",
      token: sessionToken,
      createdAt: new Date().toISOString(),
    };

    const res = NextResponse.json({
      success: true,
      message: action === "signup" ? "Account created successfully" : "Logged in successfully",
      user,
    });

    // Set HTTP-only cookie for session security
    res.cookies.set("auth_session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { error: err.message || "Authentication failed" },
      { status: 500 }
    );
  }
}

// GET /api/auth: Inspects active session cookie
export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("auth_session_token")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false });
    }

    const { valid, payload, error } = await verifySessionToken(sessionCookie);
    if (!valid || !payload) {
      return NextResponse.json({ authenticated: false, error });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/auth: Log out and clear session cookie
export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  res.cookies.set("auth_session_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
