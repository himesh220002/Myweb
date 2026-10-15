"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  History,
  RotateCcw,
  CreditCard,
  Printer,
  FileCode,
  FileText,
  FolderKanban,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
  LogOut,
  Smartphone,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Layers,
  Bell,
  AlertTriangle,
  Zap,
  Shield,
  Clock,
  Sparkles,
  PauseCircle,
  Activity,
  ChevronDown,
  ChevronUp,
  Info,
  Check,
  ListTodo,
} from "lucide-react";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { getStoredUser, StoredUser, removeStoredUser, getStoredPaymentHistory } from "@/lib/authStorage";
import {
  printReceiptIsolated,
  downloadReceiptHtml,
  downloadReceiptTxt,
  ReceiptData,
} from "@/lib/receiptUtils";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ProfilePage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<any>(null);
  const [localHistory, setLocalHistory] = useState<ReceiptData[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "invoices">("projects");
  const [expandedFeeds, setExpandedFeeds] = useState<Record<string, boolean>>({});

  const toggleFeedExpansion = (projId: string) => {
    setExpandedFeeds((prev) => ({ ...prev, [projId]: !prev[projId] }));
  };

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    setLocalHistory(getStoredPaymentHistory());

    const loadData = async () => {
      try {
        const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
        const queryEmail = urlParams?.get("email");
        const effectiveEmail = stored?.email || queryEmail || "";
        const emailParam = effectiveEmail ? `&email=${encodeURIComponent(effectiveEmail)}` : "";
        const res = await fetch(`/api/dashboard?view=client${emailParam}`);
        const json = await res.json();
        if (json.success && json.data) {
          setClientData(json.data);
          if (!stored && json.data.user) {
            setUser(json.data.user);
          }
        }
      } catch (e) {
        console.error("Profile data load error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch {}
    removeStoredUser();
    window.location.href = "/";
  };

  const handleDownloadBill = (payment: any, format: "pdf" | "html" | "txt") => {
    const receiptData: ReceiptData = {
      paymentId: payment.paymentId,
      orderId: payment.orderId || "N/A",
      amount: payment.amount,
      currency: payment.currency || "INR",
      planName: payment.notes || payment.planName || "CypherTech Engineering",
      customerName: payment.customerName || user?.name || "Client",
      customerEmail: payment.customerEmail || user?.email || "",
      customerPhone: payment.customerPhone || user?.phone || "",
      date: payment.createdAt || payment.date,
      paymentMethod: payment.method || "Razorpay Gateway (256-Bit SSL)",
      receiptToken: payment.receiptToken,
      refundClaimUrl: payment.refundClaimUrl,
    };

    if (format === "pdf") {
      printReceiptIsolated(receiptData);
    } else if (format === "html") {
      downloadReceiptHtml(receiptData);
    } else {
      downloadReceiptTxt(receiptData);
    }
  };

  const allPayments = clientData?.payments?.length
    ? clientData.payments
    : localHistory;

  const projects = clientData?.projects || [];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-slate-800 pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-20 px-3 sm:px-6 md:px-8 font-sans ${outfit.className}`}>
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* ─── 1. CLIENT ACCOUNT HEADER (Clean Light Design) ─── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-sm shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : <User className="w-7 h-7 sm:w-8 sm:h-8" />}
              </div>
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight break-words">
                    {user?.name || clientData?.client?.name || "Client Account"}
                  </h1>
                  <span className={`bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shrink-0 ${jetmono.className}`}>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Active Client
                  </span>
                  {/* Trust Meter Rating Badge */}
                  <span className={`text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shrink-0 border ${jetmono.className} ${
                    clientData?.trustInfo?.level === "VIP"
                      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                      : clientData?.trustInfo?.level === "Trusted"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}>
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>{clientData?.trustInfo?.level || "Trusted"} Client ({clientData?.trustInfo?.score || 85}/100 Trust)</span>
                  </span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-500 break-all flex items-center gap-1.5 ${jetmono.className}`}>
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden xs:inline" />
                  <span>{user?.email || clientData?.client?.email || "No email on record"}</span>
                </p>
                <div className={`flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 pt-0.5 ${jetmono.className}`}>
                  <span>Client ID: <code className="text-slate-700 font-semibold">{user?.id || clientData?.client?.id || "usr_client"}</code></span>
                  {user?.phone && (
                    <span className="flex items-center gap-1">
                      • Phone: <strong className="text-slate-700">{user.phone}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>

          {/* Admin Switcher Bar */}
          {(user?.role === "admin" || user?.email?.toLowerCase().includes("himesh") || user?.email?.toLowerCase().includes("satyam")) && (
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                <Lock className="w-4 h-4 text-slate-900 shrink-0" />
                <span><strong>Admin Portal:</strong> Manage client records, sprint deliverables, alerts, and live payments.</span>
              </div>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition shadow-xs shrink-0 text-center cursor-pointer"
              >
                <span>Open Dashboard &rarr;</span>
              </Link>
            </div>
          )}
        </div>

        {/* ─── 2. QUICK ACTIONS & ACCOUNT SERVICES ─── */}
        <div>
          <h2 className={`text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 ${jetmono.className}`}>
            <span>Account Services &amp; Quick Actions</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Option 1: Pay Invoices Online */}
            <Link
              href="/pay"
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 p-5 rounded-xl space-y-3 transition group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 ${jetmono.className}`}>
                    Gateway Active
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Pay Invoices Online
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Pay kickoff deposits, sprint milestones, or custom Statement of Work balances via UPI, cards, or net banking.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Open Payment Portal</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Option 2: Payment & Receipt History */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("invoices");
                document.getElementById("invoices-anchor")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 p-5 rounded-xl space-y-3 transition group flex flex-col justify-between shadow-xs text-left cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 group-hover:scale-105 transition-transform">
                    <History className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] text-blue-700 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100 ${jetmono.className}`}>
                    {allPayments.length} Records
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Payment &amp; Receipt History
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Access official invoices, tamper-proof receipts, and download bills instantly in PDF, HTML, or plain text format.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>View My Invoices</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Option 3: Resolution & Refunds */}
            <Link
              href="/refund"
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 p-5 rounded-xl space-y-3 transition group flex flex-col justify-between shadow-xs sm:col-span-2 md:col-span-1"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:scale-105 transition-transform">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] text-amber-700 font-bold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-100 ${jetmono.className}`}>
                    SLA 24H
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Resolution &amp; Support
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Direct formal desk for sprint scope adjustments, milestone revisions, and guaranteed 24-hour turnaround queries.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>Support Center</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>

        {/* ─── 3. TABS: MY PROJECTS VS MY INVOICES ─── */}
        <div id="invoices-anchor" className="space-y-5 scroll-mt-24">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition cursor-pointer flex items-center justify-center gap-2 rounded-xl ${
                activeTab === "projects"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("invoices")}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition cursor-pointer flex items-center justify-center gap-2 rounded-xl ${
                activeTab === "invoices"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Invoices ({allPayments.length})</span>
            </button>
          </div>

          {/* TAB CONTENT A: MY PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* URGENT ATTENTION & UPCOMING MILESTONE ALERTS BANNER (Clean Light Style) */}
              {(clientData?.activeAlerts || []).length > 0 && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-950 ${jetmono.className}`}>
                          Action Items &amp; Milestone Notices ({clientData.activeAlerts.length})
                        </h3>
                        <p className="text-[11px] sm:text-xs text-amber-800/80">
                          Live notices from CypherTech engineering regarding sprint milestones &amp; delivery schedules.
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded font-bold uppercase ${jetmono.className}`}>
                      Live Notices
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {clientData.activeAlerts.map((alt: any) => {
                      const isHold = alt.type === "project_on_hold" || alt.type === "alert_project_will_be_on_hold";
                      const isDelayed = alt.type === "payment_delayed";

                      return (
                        <div
                          key={alt.id}
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white shadow-xs transition ${
                            isHold || isDelayed
                              ? "border-rose-200"
                              : "border-amber-200"
                          }`}
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${jetmono.className} ${
                                  isHold || isDelayed
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : "bg-amber-50 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {alt.type.replace(/_/g, " ")}
                              </span>
                              {alt.projectTitle && (
                                <span className={`text-xs text-slate-600 ${jetmono.className}`}>
                                  Project: <strong className="text-slate-900">{alt.projectTitle}</strong>
                                </span>
                              )}
                              {alt.dueDate && (
                                <span className={`text-[11px] text-slate-500 flex items-center gap-1 ${jetmono.className}`}>
                                  <Clock className="w-3 h-3 text-amber-600" /> Target Due: {alt.dueDate}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 break-words">
                              {alt.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {alt.message}
                            </p>
                          </div>

                          {alt.amount && Number(alt.amount) > 0 && (
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                              <span className={`text-base font-bold text-slate-900 ${jetmono.className}`}>
                                ₹{Number(alt.amount).toLocaleString("en-IN")}
                              </span>
                              <Link
                                href={`/pay?amount=${alt.amount}&desc=${encodeURIComponent(alt.title || "Milestone Payment")}&plan=custom`}
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg inline-flex items-center gap-1.5 shadow-xs active:scale-95 transition"
                              >
                                <span>Pay Milestone Now</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PROJECT LIST */}
              {projects.length === 0 ? (
                <div className="bg-white border border-slate-200/90 p-8 sm:p-12 text-center rounded-2xl space-y-3.5 shadow-xs">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
                    <FolderKanban className="w-7 h-7" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">No Active Projects Yet</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Once you finalize kickoff details and milestone deliverables with CypherTech engineering, your live sprint roadmap, current tasks, and feeds will appear here.
                  </p>
                  <Link
                    href="/pay"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition shadow-xs"
                  >
                    <span>Kickoff Project Deposit &rarr;</span>
                  </Link>
                </div>
              ) : (
                projects.map((proj: any) => {
                  const isBuilding = proj.status === "building";
                  const isHold = proj.status === "on_hold";
                  const isCompleted = proj.status === "completed";
                  const isDropped = proj.status === "dropped";

                  return (
                    <div
                      key={proj.id}
                      className="bg-white border border-slate-200/90 p-5 sm:p-7 rounded-2xl space-y-5 shadow-xs"
                    >
                      {/* Project Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md ${jetmono.className}`}>
                              {proj.category || "Full-Stack Project"}
                            </span>

                            {/* Status Badge */}
                            <span
                              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1.5 ${jetmono.className} ${
                                isBuilding
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : isHold
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : isCompleted
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : isDropped
                                  ? "bg-slate-100 text-slate-600 border border-slate-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {isBuilding && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                              {isHold && <PauseCircle className="w-3.5 h-3.5 text-rose-600" />}
                              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                              <span>{proj.status.toUpperCase().replace("_", " ")}</span>
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight break-words">
                            {proj.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                            {proj.description}
                          </p>

                          {/* Last Payment Badge */}
                          <div className={`flex flex-wrap items-center gap-2 text-xs pt-1 ${jetmono.className}`}>
                            <span className="text-slate-400">Last Verified Payment:</span>
                            {proj.lastPayment?.amount ? (
                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 font-medium">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <strong>₹{Number(proj.lastPayment.amount).toLocaleString("en-IN")}</strong> on{" "}
                                {new Date(proj.lastPayment.payDate).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                                <span className="text-slate-500 text-[10px]">
                                  (ID: {String(proj.lastPayment.paymentId).slice(0, 16)}...)
                                </span>
                              </span>
                            ) : (
                              <span className="bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md">
                                No payments recorded yet
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ── CURRENT WORKS, COMPLETED WORKS & UPCOMING TASKS SECTION ── */}
                      {(proj.currentWork || (proj.completedWork && proj.completedWork.length > 0) || (proj.upcomingTasks && proj.upcomingTasks.length > 0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                          
                          {/* Current Work Focus */}
                          {proj.currentWork && (
                            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wide">
                                <Zap className="w-3.5 h-3.5 text-blue-600" />
                                <span>Current Work Focus</span>
                              </div>
                              <p className="text-xs text-blue-950/90 leading-relaxed font-sans">
                                {proj.currentWork}
                              </p>
                            </div>
                          )}

                          {/* Upcoming Tasks */}
                          {proj.upcomingTasks && proj.upcomingTasks.length > 0 && (
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs uppercase tracking-wide">
                                <ListTodo className="w-3.5 h-3.5 text-slate-600" />
                                <span>Upcoming Tasks ({proj.upcomingTasks.length})</span>
                              </div>
                              <ul className="space-y-1 text-xs text-slate-700">
                                {proj.upcomingTasks.map((t: string, tIdx: number) => (
                                  <li key={tIdx} className="flex items-start gap-1.5">
                                    <span className="text-slate-400 shrink-0">•</span>
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Completed Works */}
                          {proj.completedWork && proj.completedWork.length > 0 && (
                            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3.5 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wide">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Shipped Deliverables ({proj.completedWork.length})</span>
                              </div>
                              <ul className="space-y-1 text-xs text-emerald-950">
                                {proj.completedWork.map((w: string, wIdx: number) => (
                                  <li key={wIdx} className="flex items-start gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{w}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Sprint Delivery Progress Bar */}
                      <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
                        <div className={`flex items-center justify-between text-xs sm:text-sm ${jetmono.className}`}>
                          <span className="text-slate-700 font-bold uppercase tracking-wide">Sprint Delivery Progress</span>
                          <span className="text-slate-900 font-bold">{proj.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-slate-900 h-full rounded-full transition-all duration-500"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestone List */}
                      <div className="space-y-2.5">
                        <h4 className={`text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5 ${jetmono.className}`}>
                          <Layers className="w-4 h-4 text-slate-500" />
                          <span>Milestone Deliverables &amp; Schedule</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                          {proj.milestones?.map((ms: any, idx: number) => {
                            const isPaid = ms.status === "paid" || ms.status === "completed";
                            return (
                              <div
                                key={ms.id || idx}
                                className={`p-4 rounded-xl border text-xs space-y-2.5 flex flex-col justify-between shadow-2xs ${
                                  isPaid
                                    ? "bg-emerald-50/50 border-emerald-200"
                                    : "bg-slate-50/60 border-slate-200"
                                }`}
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`text-[10px] text-slate-500 uppercase font-bold ${jetmono.className}`}>
                                      Stage #{idx + 1}
                                    </span>
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${jetmono.className} ${
                                        isPaid
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "bg-slate-200 text-slate-700"
                                      }`}
                                    >
                                      {isPaid ? "✓ PAID" : "PENDING"}
                                    </span>
                                  </div>
                                  <div className="font-bold text-slate-900 text-xs sm:text-sm break-words">{ms.title}</div>
                                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                                    {ms.description}
                                  </p>
                                </div>

                                <div className={`pt-2.5 border-t border-slate-200/80 flex items-center justify-between ${jetmono.className}`}>
                                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                    ₹{ms.amount?.toLocaleString("en-IN") || 0}
                                  </span>
                                  {!isPaid && (
                                    <Link
                                      href={`/pay?amount=${ms.amount}&desc=${encodeURIComponent(ms.title)}&plan=custom`}
                                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold rounded-md inline-flex items-center justify-center gap-1 active:scale-95 transition"
                                    >
                                      <span>Pay</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* SPRINT ROADMAP & PROGRESS ACTIVITY FEED */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-slate-600" />
                            <h4 className={`text-xs font-bold uppercase text-slate-800 ${jetmono.className}`}>
                              Sprint Roadmap &amp; Progress Feed ({(proj.feed || []).length})
                            </h4>
                          </div>
                          {(proj.feed || []).length > 2 && (
                            <button
                              type="button"
                              onClick={() => toggleFeedExpansion(proj.id)}
                              className={`text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold cursor-pointer ${jetmono.className}`}
                            >
                              <span>{expandedFeeds[proj.id] ? "Collapse Log" : "View Full Log"}</span>
                              {expandedFeeds[proj.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>

                        {(!proj.feed || proj.feed.length === 0) ? (
                          <p className="text-xs text-slate-500 italic">
                            No activity events recorded yet. Webhook payments, sprint milestone releases, and engineering updates will appear here in real-time.
                          </p>
                        ) : (
                          <div className="space-y-2 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                            {(expandedFeeds[proj.id] ? proj.feed : proj.feed.slice(0, 3)).map((item: any, fIdx: number) => {
                              const isPay = item.type === "payment" || item.type === "payment_captured";
                              const isMs = item.type === "milestone";
                              const isAlt = item.type === "alert" || item.type === "alert_issued";

                              return (
                                <div key={item.id || fIdx} className="relative pl-7 text-xs space-y-1">
                                  <div
                                    className={`absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                                      isPay
                                        ? "bg-emerald-600 border-white"
                                        : isMs
                                        ? "bg-indigo-600 border-white"
                                        : isAlt
                                        ? "bg-amber-500 border-white"
                                        : "bg-slate-600 border-white"
                                    }`}
                                  />
                                  <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${jetmono.className} ${
                                          isPay
                                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                            : isMs
                                            ? "bg-indigo-50 text-indigo-800 border border-indigo-200"
                                            : isAlt
                                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                                            : "bg-slate-100 text-slate-700 border border-slate-200"
                                        }`}
                                      >
                                        {item.type.replace("_", " ")}
                                      </span>
                                      <span className="font-semibold text-slate-900 text-xs">{item.title}</span>
                                    </div>
                                    <div className={`flex items-center gap-2 text-[10px] text-slate-500 ${jetmono.className}`}>
                                      {item.amount && (
                                        <span className="font-bold text-emerald-700">
                                          +₹{Number(item.amount).toLocaleString("en-IN")}
                                        </span>
                                      )}
                                      <span>
                                        {new Date(item.date || item.timestamp || Date.now()).toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                  </div>
                                  {item.description && (
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB CONTENT B: MY INVOICES & BILLS (Clean Light Design) */}
          {activeTab === "invoices" && (
            <div className="space-y-4">
              {allPayments.length === 0 ? (
                <div className="bg-white border border-slate-200/90 p-8 sm:p-12 text-center rounded-2xl space-y-3 text-xs sm:text-sm text-slate-500 shadow-xs">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
                    <History className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No Transactions Recorded Yet</h3>
                  <p className="max-w-md mx-auto leading-relaxed">
                    Once you make an online deposit or an invoice is marked paid, your verifiable download receipt (PDF, HTML, TXT) will appear right here.
                  </p>
                  <Link
                    href="/pay"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition shadow-xs"
                  >
                    <span>Make Kickoff Payment &rarr;</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* MOBILE STACKED CARDS VIEW (Clean Light) */}
                  <div className="sm:hidden space-y-3">
                    {allPayments.map((p: any) => (
                      <div
                        key={p.id || p.paymentId}
                        className="bg-white border border-slate-200/90 rounded-xl p-4 space-y-3 shadow-xs"
                      >
                        <div className={`flex items-center justify-between ${jetmono.className}`}>
                          <span className="text-[11px] text-slate-500">
                            {new Date(p.createdAt || p.date || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-base font-bold text-slate-900">
                            ₹{Number(p.amount).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div>
                          <div className="text-slate-900 font-semibold text-xs leading-snug break-words">
                            {p.planName || p.notes || "CypherTech Engineering"}
                          </div>
                          <div className={`text-[11px] text-slate-500 truncate mt-0.5 break-all ${jetmono.className}`}>
                            ID: {p.paymentId}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                          <span className={`text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 uppercase ${jetmono.className}`}>
                            {p.method || p.paymentMethod || "ONLINE"}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleDownloadBill(p, "pdf")}
                              className={`px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer active:scale-95 ${jetmono.className}`}
                            >
                              PDF
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadBill(p, "html")}
                              className={`px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer active:scale-95 ${jetmono.className}`}
                            >
                              HTML
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadBill(p, "txt")}
                              className={`px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer active:scale-95 ${jetmono.className}`}
                            >
                              TXT
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP TABLE VIEW (Clean Light Table) */}
                  <div className="hidden sm:block bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className={`w-full text-left text-xs sm:text-sm ${jetmono.className}`}>
                        <thead className="bg-slate-50 text-slate-600 text-[11px] uppercase border-b border-slate-200">
                          <tr>
                            <th className="px-5 py-3">Date</th>
                            <th className="px-5 py-3">Reference ID</th>
                            <th className="px-5 py-3">Package / Service</th>
                            <th className="px-5 py-3">Method</th>
                            <th className="px-5 py-3 text-right">Amount</th>
                            <th className="px-5 py-3 text-center">Download Bill</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {allPayments.map((p: any) => (
                            <tr key={p.id || p.paymentId} className="hover:bg-slate-50/60 transition">
                              <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                                {new Date(p.createdAt || p.date || Date.now()).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </td>
                              <td className="px-5 py-4 text-slate-900 font-semibold whitespace-nowrap">{p.paymentId}</td>
                              <td className="px-5 py-4 text-slate-700 font-sans">{p.planName || p.notes || "CypherTech Engineering"}</td>
                              <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{p.method || p.paymentMethod || "ONLINE"}</td>
                              <td className="px-5 py-4 text-right font-bold text-slate-900 text-sm whitespace-nowrap">
                                ₹{Number(p.amount).toLocaleString("en-IN")}
                              </td>
                              <td className="px-5 py-4 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadBill(p, "pdf")}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer"
                                    title="Print / Save PDF"
                                  >
                                    PDF
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadBill(p, "html")}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer"
                                    title="Download HTML"
                                  >
                                    HTML
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadBill(p, "txt")}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer"
                                    title="Download Text"
                                  >
                                    TXT
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
