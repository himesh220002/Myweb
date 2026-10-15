import { NextRequest, NextResponse } from "next/server";
import { signSessionToken, verifySessionToken } from "@/lib/jwt";
import {
  registerUser,
  authenticateUser,
  findUserById,
  findUserByEmail,
} from "@/lib/serverStore";

/**
 * Robust Auth Handler for CypherTech User Sessions & Role-Based Access.
 * Replaces fake password technique with cryptographically secure salt + scrypt hashing.
 * Maps User IDs to payment history and client project tracking.
 */

// POST /api/auth: Handles verified login and registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, name, password, phone, company } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // ──────────────── SIGNUP ────────────────
    if (action === "signup") {
      if (!name || name.trim().length < 2) {
        return NextResponse.json(
          { error: "Please provide your full name or company representative name." },
          { status: 400 }
        );
      }

      if (!password || password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long for account security." },
          { status: 400 }
        );
      }

      const newUser = registerUser({
        name,
        email: cleanEmail,
        password,
        phone,
        company,
      });

      // Mint 7-day Session JWT
      const sessionToken = await signSessionToken({
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      });

      const user = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        company: newUser.company,
        token: sessionToken,
        createdAt: newUser.createdAt,
      };

      const res = NextResponse.json({
        success: true,
        message: "Account created successfully. Your payments and projects are now synced.",
        user,
      });

      res.cookies.set("auth_session_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return res;
    }

    // ──────────────── LOGIN ────────────────
    if (action === "login") {
      if (!password) {
        return NextResponse.json(
          { error: "Please enter your password to authenticate." },
          { status: 400 }
        );
      }

      const authenticatedUser = authenticateUser(cleanEmail, password);

      const sessionToken = await signSessionToken({
        userId: authenticatedUser.id,
        email: authenticatedUser.email,
        name: authenticatedUser.name,
        role: authenticatedUser.role,
      });

      const user = {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
        phone: authenticatedUser.phone,
        company: authenticatedUser.company,
        token: sessionToken,
        createdAt: authenticatedUser.createdAt,
      };

      const res = NextResponse.json({
        success: true,
        message: "Logged in successfully",
        user,
      });

      res.cookies.set("auth_session_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return res;
    }

    return NextResponse.json({ error: "Invalid action requested" }, { status: 400 });
  } catch (err: any) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { error: err.message || "Authentication failed" },
      { status: 400 }
    );
  }
}

// GET /api/auth: Inspects active session cookie and returns full user details
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

    // Fetch authoritative user from persistent store
    const userAccount = payload.userId ? findUserById(payload.userId) : findUserByEmail(payload.email);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: userAccount ? userAccount.id : payload.userId,
        email: userAccount ? userAccount.email : payload.email,
        name: userAccount ? userAccount.name : payload.name,
        role: userAccount ? userAccount.role : payload.role || "client",
        phone: userAccount?.phone,
        company: userAccount?.company,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/auth: Log out and clear session cookie
export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out successfully" });
  res.cookies.set("auth_session_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
