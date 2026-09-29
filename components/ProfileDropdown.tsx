"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  User,
  History,
  ShieldCheck,
  LogOut,
  LogIn,
  UserPlus,
  Printer,
  FileCode,
  Download,
  RotateCcw,
  X,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import {
  getStoredUser,
  saveStoredUser,
  removeStoredUser,
  getStoredPaymentHistory,
  StoredUser,
} from "@/lib/authStorage";
import {
  printReceiptIsolated,
  downloadReceiptHtml,
  downloadReceiptTxt,
  ReceiptData,
  getReceiptRefundUrl,
} from "@/lib/receiptUtils";

// Cornercut design token matching CypherTech tactical theme
const CLIP_CORNERCUT = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";
const CLIP_MODAL = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";

export default function ProfileDropdown({ isMobile = false }: { isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [history, setHistory] = useState<ReceiptData[]>([]);

  // Modals inside dropdown
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Form states
  const [authEmail, setAuthEmail] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sync state from localStorage & listen for changes
  useEffect(() => {
    const refreshData = () => {
      setUser(getStoredUser());
      setHistory(getStoredPaymentHistory());
    };

    refreshData();

    window.addEventListener("cyphertech_auth_change", refreshData);
    window.addEventListener("cyphertech_history_change", refreshData);
    window.addEventListener("storage", refreshData);

    return () => {
      window.removeEventListener("cyphertech_auth_change", refreshData);
      window.removeEventListener("cyphertech_history_change", refreshData);
      window.removeEventListener("storage", refreshData);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch (e) {
      console.error("Logout API error:", e);
    }
    removeStoredUser();
    setUser(null);
    setIsOpen(false);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: authMode,
          email: authEmail,
          name: authName,
          password: authPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      saveStoredUser(data.user);
      setUser(data.user);
      setAuthSuccess(authMode === "signup" ? "Account created successfully!" : "Logged in successfully!");

      setTimeout(() => {
        setShowAuthModal(false);
        setIsOpen(false);
        setAuthSuccess(null);
        setAuthEmail("");
        setAuthName("");
        setAuthPassword("");
      }, 1000);
    } catch (err: any) {
      setAuthError(err.message || "An unexpected error occurred.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* ─── CORNER-CUT PROFILE RECTANGLE BUTTON ─── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title={user ? `Profile: ${user.name || user.email}` : "Account & Payment History"}
        className={`group relative flex items-center justify-center transition-all cursor-pointer ${
          isMobile
            ? "w-10 h-10 bg-[#0a131c] border border-[#1e2d3a] hover:border-[#FF4655]/50 text-[#ECE8E1]"
            : "px-3 py-2 bg-[#0a131c] hover:bg-[#111A23] border border-[#1e2d3a] hover:border-[#FF4655]/50 text-[#ECE8E1] gap-2 text-[11px] font-bold tracking-wider"
        }`}
        style={{
          clipPath: CLIP_CORNERCUT,
          fontFamily: "var(--font-mono, monospace)",
        }}
        aria-label="Profile and payment history menu"
      >
        {/* Subtle hover gradient */}
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

        {/* User Icon */}
        <div className="relative flex items-center justify-center">
          <User className="w-4 h-4 text-[#FF4655] group-hover:scale-105 transition-transform" />
          {user && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ring-1 ring-[#0F1923]" />
          )}
        </div>

        {/* Desktop Text Label */}
        {!isMobile && (
          <span className="truncate max-w-[100px] uppercase text-[#ECE8E1] group-hover:text-white transition-colors">
            {user ? user.name?.split(" ")[0] || "PROFILE" : "PROFILE"}
          </span>
        )}

        {/* History counter indicator if unauthenticated but has receipts in localStorage */}
        {!user && history.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-black px-1 rounded-full border border-[#0F1923] shadow-xs">
            {history.length}
          </span>
        )}
      </button>

      {/* ─── DROPDOWN PANEL ─── */}
      {isOpen && (
        <div
          className={`absolute pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
            isMobile ? "right-0 w-[290px]" : "right-0 w-[310px]"
          }`}
        >
          <div
            className="relative bg-[#0F1923] border border-[#1e2d3a] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col gap-2 overflow-hidden text-left"
            style={{ clipPath: CLIP_MODAL }}
          >
            {/* Top red tactical line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]" />

            {/* Profile Header Status */}
            <div className="bg-[#0a131c] border border-[#1e2d3a] p-3 rounded-md flex items-center gap-3">
              <div className="w-9 h-9 bg-black border border-[#FF4655] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#FF4655]" />
              </div>
              <div className="min-w-0 flex-1">
                {user ? (
                  <>
                    <div className="text-xs font-bold text-white truncate uppercase tracking-wider">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate font-mono">
                      {user.email}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-semibold mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span>LOGGED IN // ACTIVE</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-bold text-gray-200 tracking-wider">
                      GUEST VISITOR
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {history.length > 0
                        ? `${history.length} Local Receipt${history.length > 1 ? "s" : ""} Saved`
                        : "No persistent session"}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-semibold mt-0.5">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      <span>CACHE STORE ACTIVE</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Item 1: Payment & Receipt History */}
            <button
              type="button"
              onClick={() => {
                setShowHistoryModal(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-[#0a131c] hover:bg-[#111A23] border border-[#1e2d3a] hover:border-gray-600 text-xs font-semibold text-gray-200 rounded transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <History className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Payment &amp; Receipt History</span>
              </div>
              {history.length > 0 && (
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                  {history.length}
                </span>
              )}
            </button>

            {/* Action Item 2: Resolution & Refund Request */}
            <Link
              href="/refund"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 bg-[#0a131c] hover:bg-[#111A23] border border-[#1e2d3a] hover:border-amber-500/50 text-xs font-semibold text-gray-200 rounded transition group"
            >
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                <span className="tracking-wide">Resolution &amp; Refunds</span>
              </div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                SLA 24H
              </span>
            </Link>

            {/* Action Item 3: Quick Pay Gateway */}
            <Link
              href="/pay"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 bg-[#0a131c] hover:bg-[#111A23] border border-[#1e2d3a] hover:border-emerald-500/50 text-xs font-semibold text-gray-200 rounded transition group"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="tracking-wide">Pay Invoices Online</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Auth Toggle: Login / Sign Up vs Logout */}
            <div className="border-t border-[#1e2d3a] pt-2 mt-1">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-900/20 hover:bg-red-900/30 border border-red-800/40 text-red-400 text-xs font-bold rounded transition cursor-pointer tracking-wider uppercase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT SESSION</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded transition cursor-pointer tracking-wider uppercase"
                  >
                    <LogIn className="w-3 h-3" />
                    <span>LOGIN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#0a131c] hover:bg-[#111A23] border border-[#FF4655]/50 text-[#FF4655] hover:text-white text-[11px] font-bold rounded transition cursor-pointer tracking-wider uppercase"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>SIGN UP</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 1: PAYMENT & RECEIPT HISTORY ─── */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div
            className="relative bg-[#0F1923] border border-[#1e2d3a] text-white w-full max-w-2xl p-5 sm:p-6 shadow-2xl rounded-xl space-y-4 max-h-[90vh] flex flex-col"
            style={{ clipPath: CLIP_MODAL }}
          >
            {/* Top red rule */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1e2d3a] pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-blue-400" />
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                  Payment &amp; Receipt History
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Payments */}
            <div className="overflow-y-auto flex-1 space-y-3 pr-1">
              {history.length === 0 ? (
                <div className="text-center py-10 space-y-3 bg-[#0a131c] border border-[#1e2d3a] rounded-lg p-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-gray-500">
                    <History className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-300">No Transactions Found in Cache</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Transactions completed on this browser are automatically stored here. Complete a payment via our checkout portal to see digital receipts.
                  </p>
                  <Link
                    href="/pay"
                    onClick={() => setShowHistoryModal(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF4655] hover:bg-[#e03a49] text-white text-xs font-bold rounded transition"
                  >
                    <span>Go to Payment Portal &rarr;</span>
                  </Link>
                </div>
              ) : (
                history.map((item, idx) => {
                  const refundUrl = getReceiptRefundUrl(item);
                  const dateStr = item.date
                    ? new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recent";

                  return (
                    <div
                      key={item.paymentId || idx}
                      className="bg-[#0a131c] border border-[#1e2d3a] hover:border-gray-700 p-3 sm:p-4 rounded-lg space-y-2.5 transition"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#1e2d3a] pb-2">
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {item.planName}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {dateStr} &bull; ID: {item.paymentId}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-emerald-400 block font-mono">
                            ₹{Number(item.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded font-bold uppercase">
                            Paid &amp; Captured
                          </span>
                        </div>
                      </div>

                      {/* Action buttons per receipt item */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => printReceiptIsolated(item)}
                          className="px-2.5 py-1.5 bg-[#111A23] hover:bg-[#1a2634] border border-[#1e2d3a] text-gray-200 text-[11px] font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Printer className="w-3 h-3 text-blue-400" />
                          <span>Print / PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadReceiptHtml(item)}
                          className="px-2.5 py-1.5 bg-[#111A23] hover:bg-[#1a2634] border border-[#1e2d3a] text-gray-200 text-[11px] font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <FileCode className="w-3 h-3 text-indigo-400" />
                          <span>Download .html</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadReceiptTxt(item)}
                          className="px-2.5 py-1.5 bg-[#111A23] hover:bg-[#1a2634] border border-[#1e2d3a] text-gray-200 text-[11px] font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-emerald-400" />
                          <span>Download .txt</span>
                        </button>

                        <Link
                          href={refundUrl}
                          onClick={() => setShowHistoryModal(false)}
                          className="px-2.5 py-1.5 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 text-amber-300 text-[11px] font-semibold rounded flex items-center gap-1.5 transition ml-auto"
                        >
                          <RotateCcw className="w-3 h-3 text-amber-400" />
                          <span>Request Refund &rarr;</span>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#1e2d3a] pt-3 flex items-center justify-between text-[11px] text-gray-400">
              <span>Saved locally in browser cache</span>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: AUTH (LOGIN / SIGN UP) ─── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            className="relative bg-[#0F1923] border border-[#1e2d3a] text-white w-full max-w-md p-6 shadow-2xl rounded-xl space-y-4"
            style={{ clipPath: CLIP_MODAL }}
          >
            {/* Top red rule */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />

            <div className="flex items-center justify-between border-b border-[#1e2d3a] pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#FF4655]" />
                <h3 className="text-base font-bold uppercase tracking-wider text-white">
                  {authMode === "signup" ? "Create CypherTech Account" : "Login to Profile"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              {authMode === "signup"
                ? "Save all past and future payments, access one-click invoices, and manage refund resolution requests."
                : "Enter your billing email to access your past transactions and account settings."}
            </p>

            {authError && (
              <div className="bg-red-900/30 border border-red-700 text-red-200 text-xs p-3 rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="bg-emerald-900/30 border border-emerald-700 text-emerald-200 text-xs p-3 rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{authSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Acme Corp"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-[#0a131c] border border-[#1e2d3a] rounded focus:border-[#FF4655] focus:outline-none text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Billing Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#0a131c] border border-[#1e2d3a] rounded focus:border-[#FF4655] focus:outline-none text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Password (Optional / Instant Access)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#0a131c] border border-[#1e2d3a] rounded focus:border-[#FF4655] focus:outline-none text-white"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 px-4 bg-[#FF4655] hover:bg-[#e03a49] text-white text-xs font-bold rounded transition uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>{authMode === "signup" ? "CREATE ACCOUNT" : "AUTHENTICATE"}</span>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-gray-400 pt-2 border-t border-[#1e2d3a]">
              {authMode === "signup" ? (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError(null);
                    }}
                    className="text-[#FF4655] font-bold hover:underline"
                  >
                    Login here
                  </button>
                </span>
              ) : (
                <span>
                  Don&apos;t have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthError(null);
                    }}
                    className="text-[#FF4655] font-bold hover:underline"
                  >
                    Sign up now
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
