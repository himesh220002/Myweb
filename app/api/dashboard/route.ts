import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/jwt";
import {
  getAdminDashboardStats,
  getClientDashboardData,
  findUserById,
  findUserByEmail,
  readStore,
} from "@/lib/serverStore";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("auth_session_token")?.value;
    const { searchParams } = new URL(req.url);
    const requestedEmail = searchParams.get("email");
    const requestedView = searchParams.get("view"); // 'admin' | 'client'

    let currentUser: any = null;

    if (sessionCookie) {
      const { valid, payload } = await verifySessionToken(sessionCookie);
      if (valid && payload) {
        currentUser = payload.userId
          ? findUserById(payload.userId)
          : findUserByEmail(payload.email);
        if (!currentUser) {
          currentUser = {
            id: payload.userId,
            email: payload.email,
            name: payload.name,
            role: payload.role || "client",
          };
        }
      }
    }

    // Default admin detection from environment
    const adminEmail = (process.env.EMAIL_USER || "satyamhimesh@gmail.com").toLowerCase().trim();
    const isAdmin =
      currentUser?.role === "admin" ||
      currentUser?.email?.toLowerCase().trim() === adminEmail ||
      requestedView === "admin";

    // ──────────────── ADMIN DASHBOARD VIEW ────────────────
    if (isAdmin) {
      const stats = getAdminDashboardStats();
      return NextResponse.json({
        success: true,
        view: "admin",
        user: currentUser || {
          id: "usr_admin",
          name: "Himesh Satyam (Owner)",
          email: adminEmail,
          role: "admin",
        },
        data: stats,
      });
    }

    // ──────────────── CLIENT DASHBOARD VIEW ────────────────
    const store = readStore();
    const targetLookup =
      currentUser?.email ||
      currentUser?.id ||
      requestedEmail ||
      store.clients[0]?.email ||
      store.users.find((u) => u.role === "client")?.email ||
      "";

    const clientData = getClientDashboardData(targetLookup);

    return NextResponse.json({
      success: true,
      view: "client",
      user: currentUser,
      data: clientData,
    });
  } catch (err: any) {
    console.error("Dashboard API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to retrieve dashboard data" },
      { status: 500 }
    );
  }
}
