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
  Edit3,
  Building2,
  Briefcase,
  Globe,
  X,
  Users,
  Compass,
  Share2,
  MapPin,
  Award,
  Loader2,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter, FaTelegram, FaGlobe } from "react-icons/fa";
import { Outfit, JetBrains_Mono } from "next/font/google";
import {
  getStoredUser,
  StoredUser,
  saveStoredUser,
  removeStoredUser,
  getStoredPaymentHistory,
  markProfileAsVisited,
} from "@/lib/authStorage";
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

  // ── Profile & Business Update Modal State ──
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"role" | "company" | "socials">("role");
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [saveErrorMsg, setSaveErrorMsg] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    userRoleInCompany: "owner_founder",
    designation: "",
    companyName: "",
    companyStage: "registered_business",
    industry: "Software & SaaS",
    teamSize: "2 - 10 people",
    country: "India",
    city: "",
    companyBio: "",
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
    telegramOrDiscord: "",
  });

  const toggleFeedExpansion = (projId: string) => {
    setExpandedFeeds((prev) => ({ ...prev, [projId]: !prev[projId] }));
  };

  const populateFormFromData = (data?: any) => {
    const currentClient = data?.client || clientData?.client;
    const currentUser = data?.user || user;
    const bp = currentClient?.businessProfile || currentUser?.businessProfile;
    const soc = currentClient?.socials || currentUser?.socials || bp?.socials;

    setProfileForm({
      name: currentUser?.name || currentClient?.name || "",
      phone: currentUser?.phone || currentClient?.phone || "",
      userRoleInCompany:
        bp?.userRoleInCompany ||
        (currentClient?.designation?.toLowerCase().includes("owner") ||
          currentClient?.designation?.toLowerCase().includes("founder")
          ? "owner_founder"
          : "owner_founder"),
      designation: currentClient?.designation || currentUser?.designation || bp?.designation || "",
      companyName: currentClient?.company || bp?.companyName || "",
      companyStage: bp?.companyStage || "registered_business",
      industry: bp?.industry || "Software & SaaS",
      teamSize: bp?.teamSize || "2 - 10 people",
      country: bp?.country || "India",
      city: bp?.city || "",
      companyBio: bp?.companyBio || "",
      linkedin: soc?.linkedin || "",
      github: soc?.github || "",
      twitter: soc?.twitter || "",
      website: soc?.website || "",
      telegramOrDiscord: soc?.telegramOrDiscord || "",
    });
  };

  const loadData = async (targetEmail?: string) => {
    try {
      const stored = getStoredUser();
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const queryEmail = urlParams?.get("email");
      const effectiveEmail = targetEmail || stored?.email || queryEmail || "";

      if (!effectiveEmail) {
        setUser(null);
        setClientData(null);
        setLoading(false);
        return;
      }

      const emailParam = `&email=${encodeURIComponent(effectiveEmail)}`;
      const res = await fetch(`/api/dashboard?view=client${emailParam}`);
      const json = await res.json();
      if (json.success && json.data && json.data.client) {
        setClientData(json.data);
        if (json.data.user) {
          setUser(json.data.user);
        }
        populateFormFromData(json.data);
      } else {
        setUser(stored || null);
        setClientData(null);
      }
    } catch (e) {
      console.error("Profile data load error:", e);
      setUser(null);
      setClientData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically mark all receipts and profile updates as read upon opening the profile page
    markProfileAsVisited();

    const handleSync = () => {
      const stored = getStoredUser();
      setUser(stored);
      const hist = getStoredPaymentHistory();
      setLocalHistory(hist);
      if (hist.length > 0) {
        markProfileAsVisited();
      }
      if (!stored) {
        setClientData(null);
        setLoading(false);
      } else {
        loadData(stored.email);
      }
    };

    handleSync();
    window.addEventListener("cyphertech_auth_change", handleSync);
    window.addEventListener("cyphertech_history_change", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("cyphertech_auth_change", handleSync);
      window.removeEventListener("cyphertech_history_change", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch { }
    removeStoredUser();
    setUser(null);
    setClientData(null);
    setLoading(false);
    window.dispatchEvent(new Event("cyphertech_auth_change"));
  };

  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingProfile(true);
    setSaveErrorMsg(null);
    setSaveSuccessMsg(null);

    try {
      const activeClient = clientData?.client;
      const activeUser = user || clientData?.user;

      const payload = {
        clientId: activeClient?.id || activeUser?.id,
        userId: activeUser?.id || activeClient?.userId,
        email: activeUser?.email || activeClient?.email,
        name: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
        company: profileForm.companyName.trim(),
        designation: profileForm.designation.trim(),
        businessProfile: {
          companyName: profileForm.companyName.trim(),
          companyStage: profileForm.companyStage,
          userRoleInCompany: profileForm.userRoleInCompany,
          designation: profileForm.designation.trim(),
          industry: profileForm.industry.trim(),
          teamSize: profileForm.teamSize.trim(),
          country: profileForm.country.trim(),
          city: profileForm.city.trim(),
          companyBio: profileForm.companyBio.trim(),
          socials: {
            linkedin: profileForm.linkedin.trim(),
            github: profileForm.github.trim(),
            twitter: profileForm.twitter.trim(),
            website: profileForm.website.trim(),
            telegramOrDiscord: profileForm.telegramOrDiscord.trim(),
          },
        },
        socials: {
          linkedin: profileForm.linkedin.trim(),
          github: profileForm.github.trim(),
          twitter: profileForm.twitter.trim(),
          website: profileForm.website.trim(),
          telegramOrDiscord: profileForm.telegramOrDiscord.trim(),
        },
      };

      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to update profile");
      }

      // Update stored user in localStorage
      if (user) {
        const updatedUser: StoredUser = {
          ...user,
          name: profileForm.name.trim() || user.name,
          phone: profileForm.phone.trim() || user.phone,
          company: profileForm.companyName.trim() || user.company,
          designation: profileForm.designation.trim(),
          businessProfile: payload.businessProfile,
          socials: payload.socials,
        };
        saveStoredUser(updatedUser);
        setUser(updatedUser);
      }

      // Reload client & dashboard data to recalculate live trust meter
      await loadData();

      setSaveSuccessMsg("Profile and business credentials updated! Trust Meter boosted.");
      setTimeout(() => {
        setIsEditModalOpen(false);
        setSaveSuccessMsg(null);
      }, 1200);
    } catch (err: any) {
      console.error("Save profile error:", err);
      setSaveErrorMsg(err.message || "Failed to save profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Dynamic preview bonus calculation
  const hasRoleOrCompany = Boolean(
    profileForm.companyName.trim() ||
    profileForm.userRoleInCompany ||
    profileForm.designation.trim() ||
    profileForm.companyStage
  );
  const hasSocials = Boolean(
    profileForm.linkedin.trim() ||
    profileForm.github.trim() ||
    profileForm.twitter.trim() ||
    profileForm.website.trim() ||
    profileForm.telegramOrDiscord.trim()
  );
  const previewBonus = hasRoleOrCompany && hasSocials ? 15 : hasRoleOrCompany || hasSocials ? 8 : 0;

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

  if (loading) {
    return (
      <div className={`min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans ${outfit.className}`}>
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-slate-700" />
          <span className="text-xs font-semibold tracking-wide">Loading Client Portal...</span>
        </div>
      </div>
    );
  }

  // ── GUEST VISITOR PORTAL (Logged Out State) ──
  if (!user && !clientData?.client) {
    return (
      <div className={`min-h-screen bg-[#F8FAFC] text-slate-800 pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-20 px-3 sm:px-6 md:px-8 font-sans ${outfit.className}`}>
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Guest Header Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs shrink-0">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Guest Visitor Portal
                    </h1>
                    <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${jetmono.className}`}>
                      No Session Active
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
                    You are currently logged out. Sign in to your client account to view live sprint milestones, project roadmaps, official tax receipts, and direct engineering updates.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("cyphertech_open_auth", { detail: { mode: "login" } }));
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4 text-slate-300" />
                  <span>Log In to Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("cyphertech_open_auth", { detail: { mode: "signup" } }));
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/pay"
              className="bg-white border border-slate-200/90 hover:border-blue-300 p-5 rounded-2xl transition shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>Pay Invoices Online</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pay kickoff deposits, sprint milestones, or custom Statement of Work balances via UPI, cards, or net banking.
                </p>
              </div>
              <span className={`text-[10px] text-blue-700 font-semibold pt-3 flex items-center gap-1 ${jetmono.className}`}>
                Auto-Attaches to Email &rarr;
              </span>
            </Link>

            <div
              onClick={() => {
                window.dispatchEvent(new CustomEvent("cyphertech_open_auth", { detail: { mode: "login" } }));
              }}
              className="bg-white border border-slate-200/90 hover:border-slate-300 p-5 rounded-2xl transition shadow-xs group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>Track Sprint Roadmap</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Access your real-time sprint timeline, live milestone progress, and engineering deliverables once logged in.
                </p>
              </div>
              <span className={`text-[10px] text-purple-700 font-semibold pt-3 flex items-center gap-1 ${jetmono.className}`}>
                Login to Access &rarr;
              </span>
            </div>

            <Link
              href="/refund"
              className="bg-white border border-slate-200/90 hover:border-amber-300 p-5 rounded-2xl transition shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>Resolution &amp; Support</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct formal desk for sprint scope adjustments, milestone revisions, and guaranteed 24-hour turnaround queries.
                </p>
              </div>
              <span className={`text-[10px] text-amber-700 font-semibold pt-3 flex items-center gap-1 ${jetmono.className}`}>
                24H SLA Support &rarr;
              </span>
            </Link>
          </div>

          {/* Offline / Local Receipts (if guest paid in this browser) */}
          {localHistory.length > 0 ? (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Offline &amp; Guest Receipts ({localHistory.length})
                  </h3>
                </div>
                <span className={`text-[10px] text-slate-500 ${jetmono.className}`}>Local Browser Storage</span>
              </div>
              <div className="divide-y divide-slate-100">
                {localHistory.map((item, idx) => (
                  <div key={item.paymentId || idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{item.planName}</p>
                      <p className={`text-[11px] text-slate-500 ${jetmono.className}`}>
                        Ref: {item.paymentId} • {item.date ? new Date(item.date).toLocaleDateString("en-IN") : "Recent"} • {item.customerEmail}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <strong className={`text-sm text-slate-900 ${jetmono.className}`}>₹{item.amount?.toLocaleString("en-IN")}</strong>
                      <button
                        type="button"
                        onClick={() => handleDownloadBill(item, "pdf")}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 space-y-2">
              <Shield className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Already completed a payment with us?</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Sign in with the email address you entered during Razorpay checkout to instantly access your project roadmap, sprint deliverables, and official bills.
              </p>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("cyphertech_open_auth", { detail: { mode: "login" } }));
                }}
                className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Sign In to View Deliverables &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                  <span className={`text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shrink-0 border ${jetmono.className} ${clientData?.trustInfo?.level === "VIP"
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
                  {(user?.phone || clientData?.client?.phone) && (
                    <span className="flex items-center gap-1">
                      • Phone: <strong className="text-slate-700">{user?.phone || clientData?.client?.phone}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Action Buttons: Edit Profile & Logout */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <button
                type="button"
                onClick={() => {
                  populateFormFromData();
                  setIsEditModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active:scale-95"
              >
                <Edit3 className="w-4 h-4 text-slate-300" />
                <span>Update Profile &amp; Business</span>
              </button>
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

          {/* ── Business Profile & Social Connectivity Summary Strip ── */}
          {(() => {
            const currentClient = clientData?.client;
            const currentUser = clientData?.user || user;
            const bp = currentClient?.businessProfile || currentUser?.businessProfile;
            const soc = currentClient?.socials || currentUser?.socials || bp?.socials;
            const hasRoleOrCompany = Boolean(
              currentClient?.company ||
              bp?.companyName ||
              currentClient?.designation ||
              bp?.designation ||
              bp?.companyStage
            );
            const hasSocials = Boolean(
              soc?.linkedin || soc?.github || soc?.twitter || soc?.website || soc?.telegramOrDiscord
            );

            const stageLabels: Record<string, { label: string; badge: string; color: string }> = {
              unformed_idea: {
                label: "Idea Stage (Entity Not Formed Yet)",
                badge: "Unformed / Stealth Idea",
                color: "bg-amber-50 text-amber-800 border-amber-200",
              },
              pre_incorporation: {
                label: "Pre-incorporation / Early Prototype",
                badge: "Pre-incorporation Venture",
                color: "bg-purple-50 text-purple-800 border-purple-200",
              },
              registered_business: {
                label: "Registered Business / Startup",
                badge: "Registered Business",
                color: "bg-emerald-50 text-emerald-800 border-emerald-200",
              },
              enterprise: {
                label: "Enterprise / Established Brand",
                badge: "Enterprise Corp",
                color: "bg-blue-50 text-blue-800 border-blue-200",
              },
            };

            const roleLabels: Record<string, string> = {
              owner_founder: "Owner / Founder",
              employee_lead: "Employee / Tech Lead",
              solo_creator: "Solo Creator / Builder",
              other: "Partner / External Lead",
            };

            const stageMeta = bp?.companyStage ? stageLabels[bp.companyStage] || stageLabels.registered_business : null;
            const roleMeta = bp?.userRoleInCompany ? roleLabels[bp.userRoleInCompany] : null;

            if (hasRoleOrCompany || hasSocials) {
              return (
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Building2 className="w-4 h-4 text-slate-600 shrink-0" />
                        <span>{bp?.companyName || currentClient?.company || "Venture Details"}</span>
                      </div>
                      {(currentClient?.designation || bp?.designation) && (
                        <span className="text-slate-500 font-medium">
                          • {currentClient?.designation || bp?.designation}
                        </span>
                      )}
                      {roleMeta && (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 ${jetmono.className}`}>
                          {roleMeta}
                        </span>
                      )}
                      {stageMeta && (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${stageMeta.color} ${jetmono.className}`}>
                          {stageMeta.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      {bp?.industry && <span>Industry: <strong className="text-slate-700">{bp.industry}</strong></span>}
                      {bp?.teamSize && <span>• Team: <strong className="text-slate-700">{bp.teamSize}</strong></span>}
                      {(bp?.city || bp?.country) && (
                        <span>• Location: <strong className="text-slate-700">{[bp.city, bp.country].filter(Boolean).join(", ")}</strong></span>
                      )}
                    </div>

                    {/* Social links */}
                    {hasSocials && (
                      <div className="flex flex-wrap items-center gap-2 pt-1.5">
                        <span className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider ${jetmono.className}`}>Connectivities:</span>
                        {soc?.linkedin && (
                          <a
                            href={soc.linkedin.startsWith("http") ? soc.linkedin : `https://${soc.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-blue-700 px-2 py-0.5 rounded-md transition shadow-2xs"
                          >
                            <FaLinkedin className="w-3 h-3 text-blue-600" />
                            <span>LinkedIn</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        )}
                        {soc?.github && (
                          <a
                            href={soc.github.startsWith("http") ? soc.github : `https://${soc.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-800 px-2 py-0.5 rounded-md transition shadow-2xs"
                          >
                            <FaGithub className="w-3 h-3 text-slate-900" />
                            <span>GitHub</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        )}
                        {soc?.twitter && (
                          <a
                            href={soc.twitter.startsWith("http") ? soc.twitter : `https://${soc.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-sky-700 px-2 py-0.5 rounded-md transition shadow-2xs"
                          >
                            <FaTwitter className="w-3 h-3 text-sky-500" />
                            <span>X / Twitter</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        )}
                        {soc?.website && (
                          <a
                            href={soc.website.startsWith("http") ? soc.website : `https://${soc.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 px-2 py-0.5 rounded-md transition shadow-2xs"
                          >
                            <FaGlobe className="w-3 h-3 text-slate-600" />
                            <span>Website</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        )}
                        {soc?.telegramOrDiscord && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md shadow-2xs">
                            <FaTelegram className="w-3 h-3 text-sky-600" />
                            <span>{soc.telegramOrDiscord}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Trust Boost Active Badge */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 ${jetmono.className}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>+15 Trust Boost Active</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        populateFormFromData();
                        setIsEditModalOpen(true);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      Edit Details &rarr;
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/60 p-4 rounded-xl border border-blue-200/70">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-900">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    <strong>Build Client Trust (+15 Points):</strong> Add your company details (even if unformed idea or in employee role) and connect socials to unlock verified client trust and expedited sprint kickoffs.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    populateFormFromData();
                    setIsEditModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shrink-0 transition cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Complete Profile &rarr;
                </button>
              </div>
            );
          })()}

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
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition cursor-pointer flex items-center justify-center gap-2 rounded-xl ${activeTab === "projects"
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
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition cursor-pointer flex items-center justify-center gap-2 rounded-xl ${activeTab === "invoices"
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
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white shadow-xs transition ${isHold || isDelayed
                            ? "border-rose-200"
                            : "border-amber-200"
                            }`}
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${jetmono.className} ${isHold || isDelayed
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
                              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1.5 ${jetmono.className} ${isBuilding
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
                                className={`p-4 rounded-xl border text-xs space-y-2.5 flex flex-col justify-between shadow-2xs ${isPaid
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
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${jetmono.className} ${isPaid
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
                                    className={`absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${isPay
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
                                        className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${jetmono.className} ${isPay
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

      {/* ─── 4. EDIT PROFILE & BUSINESS DETAILS MODAL ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">

            {/* Modal Header: Clean, Trust-Focused */}
            <div className="p-4 sm:p-5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    Update Profile &amp; Build Trust
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add quick credentials to unlock 100/100 Verified Client Trust.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Real-time Dynamic Trust Meter Bar */}
            <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-blue-50/70 via-slate-50 to-emerald-50/70 border-b border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Trust Meter:</span>
                  <strong className="text-slate-900">
                    {previewBonus === 15 ? "100/100 (VIP Client)" : previewBonus === 8 ? "93/100 (Trusted)" : "85/100 (Active)"}
                  </strong>
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${previewBonus === 15
                  ? "bg-emerald-100/80 text-emerald-800 border-emerald-300"
                  : previewBonus === 8
                    ? "bg-blue-100/80 text-blue-800 border-blue-300"
                    : "bg-slate-200/80 text-slate-700 border-slate-300"
                  }`}>
                  {previewBonus === 15
                    ? "✓ +15 Points Max Boost"
                    : previewBonus === 8
                      ? "+8 Points (Add Socials for +15)"
                      : "Fill 2 fields to boost"}
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${previewBonus === 15
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 w-full"
                    : previewBonus === 8
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 w-[93%]"
                      : "bg-gradient-to-r from-slate-400 to-blue-500 w-[85%]"
                    }`}
                />
              </div>
            </div>

            {/* Modal Form: Single Scroll, Zero Clutter */}
            <form onSubmit={handleSaveProfile} className="p-4 sm:p-5 space-y-4 max-h-[68vh] overflow-y-auto">
              {saveSuccessMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {saveErrorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{saveErrorMsg}</span>
                </div>
              )}

              {/* SECTION 1: ROLE & YOU */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    1. Your Role
                  </label>
                  <span className="text-[11px] text-slate-400">1 click select</span>
                </div>

                {/* Role Chips: Compact & Clear */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: "owner_founder", label: "👑 Founder / Owner" },
                    { id: "employee_lead", label: "💼 Employee / Lead" },
                    { id: "solo_creator", label: "🚀 Solo Builder" },
                    { id: "other", label: "🤝 Partner" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setProfileForm({ ...profileForm, userRoleInCompany: r.id as any })}
                      className={`px-2.5 py-2 rounded-xl border text-xs font-semibold text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${profileForm.userRoleInCompany === r.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                    >
                      <span>{r.label}</span>
                      {profileForm.userRoleInCompany === r.id && (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Name & Title Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-lg text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Official Title / Designation
                    </label>
                    <input
                      type="text"
                      value={profileForm.designation}
                      onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                      placeholder="Founder"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-lg text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: COMPANY & STAGE */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    2. Company &amp; Venture Stage
                  </label>
                  <span className="text-[11px] text-slate-400">Works for unformed ideas too</span>
                </div>

                {/* Stage Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: "unformed_idea", label: "💡 Idea Stage" },
                    { id: "pre_incorporation", label: "🚀 Stealth / MVP" },
                    { id: "registered_business", label: "🏢 Registered Co." },
                    { id: "enterprise", label: "🌐 Enterprise" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setProfileForm({ ...profileForm, companyStage: s.id as any })}
                      className={`px-2.5 py-2 rounded-xl border text-xs font-semibold text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${profileForm.companyStage === s.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                    >
                      <span>{s.label}</span>
                      {profileForm.companyStage === s.id && (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Company Name & Website Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Company or Project Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.companyName}
                      onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                      placeholder="Company/project Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-lg text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="url"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-lg text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: SOCIALS (INSTANT TRUST FACTOR BOOST) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span>3. Social Connectivities</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">+15 Boost</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Paste any 1 or more</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* LinkedIn */}
                  <div className="relative">
                    <FaLinkedin className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="relative">
                    <FaTwitter className="w-3.5 h-3.5 text-sky-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      placeholder="x.com/username"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>

                  {/* GitHub */}
                  <div className="relative">
                    <FaGithub className="w-3.5 h-3.5 text-slate-800 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      placeholder="github.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Identity Protected</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    {savingProfile ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save &amp; Boost Trust</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
