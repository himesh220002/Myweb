"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ArrowLeft,
  FileText,
  BadgeAlert,
  CreditCard,
  Building2,
  Clock,
  Sparkles,
  HelpCircle,
  Check,
  History,
} from "lucide-react";

import { getStoredPaymentHistory } from "@/lib/authStorage";
import { ReceiptData } from "@/lib/receiptUtils";

interface VerifiedTransaction {
  paymentId: string;
  orderId: string;
  amount: string | number;
  currency: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  planName: string;
  issuedAt?: string;
}

function RefundContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get("token");

  const [token, setToken] = useState<string>(tokenFromUrl || "");
  const [transaction, setTransaction] = useState<VerifiedTransaction | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [savedHistory, setSavedHistory] = useState<ReceiptData[]>([]);


  // Manual fallback inputs
  const [manualPaymentId, setManualPaymentId] = useState<string>("");
  const [manualEmail, setManualEmail] = useState<string>("");

  // Form states
  const [reason, setReason] = useState<string>("Accidental duplicate charge");
  const [explanation, setExplanation] = useState<string>("");
  const [refundMode, setRefundMode] = useState<"source" | "upi">("source");
  const [customUpi, setCustomUpi] = useState<string>("");

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successReference, setSuccessReference] = useState<{
    paymentId: string;
    amount: string | number;
  } | null>(null);

  // 1. On mount: if token in URL or localStorage, verify it
  useEffect(() => {
    setSavedHistory(getStoredPaymentHistory());

    let activeToken = tokenFromUrl;
    if (!activeToken && typeof window !== "undefined") {
      const stored = localStorage.getItem("cyphertech_last_receipt");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.receiptToken) {
            activeToken = parsed.receiptToken;
            setToken(parsed.receiptToken);
          }
        } catch (e) {
          console.error("Could not parse stored receipt:", e);
        }
      }
    }

    if (activeToken) {
      verifyJwtToken(activeToken);
    }
  }, [tokenFromUrl]);


  const verifyJwtToken = async (jwtToVerify: string) => {
    setIsLoadingToken(true);
    setTokenError(null);
    try {
      const res = await fetch(`/api/refunds/request?token=${encodeURIComponent(jwtToVerify)}`);
      const data = await res.json();
      if (!res.ok || !data.valid) {
        throw new Error(data.error || "Digital receipt token is invalid or expired.");
      }
      setTransaction(data.transaction);
      setToken(jwtToVerify);
    } catch (err: any) {
      console.warn("Token verification failed:", err.message);
      setTokenError(err.message || "Invalid transaction token.");
      setTransaction(null);
    } finally {
      setIsLoadingToken(false);
    }
  };

  const handleManualLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPaymentId.trim() || !manualPaymentId.startsWith("pay_")) {
      setTokenError("Please enter a valid Razorpay Payment ID starting with 'pay_'.");
      return;
    }
    // We will let the user submit with the manual ID directly in the form
    setTokenError(null);
  };

  const handleSubmitRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!transaction && (!manualPaymentId.trim() || !manualPaymentId.startsWith("pay_"))) {
      setSubmitError("Please provide a valid Payment ID (pay_...) or valid verification token.");
      return;
    }

    if (refundMode === "upi" && (!customUpi.trim() || !customUpi.includes("@"))) {
      setSubmitError("Please enter a valid UPI ID (e.g., username@bank or mobile@upi).");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: any = {
        token: transaction ? token : undefined,
        paymentId: transaction ? transaction.paymentId : manualPaymentId.trim(),
        email: transaction ? transaction.customerEmail : manualEmail.trim(),
        reason,
        detailedExplanation: explanation.trim(),
        upiId: refundMode === "upi" ? customUpi.trim() : undefined,
      };

      const res = await fetch("/api/refunds/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to lodge refund request.");
      }

      setIsSuccess(true);
      setSuccessReference({
        paymentId: data.paymentId || (transaction ? transaction.paymentId : manualPaymentId),
        amount: data.amount || (transaction ? transaction.amount : ""),
      });
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── SUCCESS CONFIRMATION SCREEN ───
  if (isSuccess && successReference) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xl p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Refund Request Lodged
            </h1>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your formal resolution request has been recorded and an urgent review alert has been dispatched to our finance squad.
            </p>
          </div>

          {/* Ticket Information Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-gray-500 font-medium">Payment Reference</span>
              <span className="font-mono font-semibold text-gray-900">{successReference.paymentId}</span>
            </div>
            {successReference.amount && (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-gray-500 font-medium">Requested Amount</span>
                <span className="font-bold text-red-600">₹{successReference.amount}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-gray-500 font-medium">Review SLA</span>
              <span className="font-semibold text-blue-700">24 – 48 Business Hours</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Bank Settlement</span>
              <span className="text-gray-700">5 – 7 days to source</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            A confirmation email with your resolution ticket ID has been dispatched. You can track this transaction directly via your Razorpay transaction reference.
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-xs flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to CypherTech Home</span>
            </Link>

            <Link
              href="/pay"
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition shadow-2xs flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Go to Payment Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/pay"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Checkout</span>
        </Link>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          CypherTech Resolution Center
        </span>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xl overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-blue-200 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade Escrow &amp; Statutory Resolution</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Transaction Resolution &amp; Refund Request
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl leading-relaxed">
            All payments made to CypherTech are protected by Razorpay. Submit your request below with instant digital cryptographic verification.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Token Loading State */}
          {isLoadingToken && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3 text-blue-900 text-xs font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>Cryptographically verifying your digital receipt token...</span>
            </div>
          )}

          {/* Token Error Alert */}
          {tokenError && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Notice: Token not verified automatically</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                {tokenError} You can still submit your refund request by entering your Razorpay Payment ID manually below.
              </p>
            </div>
          )}

          {/* ─── CASE A: VERIFIED TRANSACTION SUMMARY CARD ─── */}
          {transaction ? (
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-blue-200/80 rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                    <Check className="w-3 h-3 text-emerald-700" />
                    <span>JWT Verified (Tamper-Proof)</span>
                  </span>
                  <span className="text-xs font-semibold text-gray-800">
                    {transaction.planName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Paid Amount: </span>
                  <strong className="text-base font-bold text-gray-900">
                    ₹{Number(transaction.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 font-medium block">Payment ID:</span>
                  <code className="text-blue-700 font-mono font-semibold">{transaction.paymentId}</code>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block">Razorpay Order ID:</span>
                  <code className="text-gray-700 font-mono">{transaction.orderId}</code>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block">Customer Billing Email:</span>
                  <span className="text-gray-900 font-medium">{transaction.customerEmail}</span>
                </div>
                {transaction.customerName && (
                  <div>
                    <span className="text-gray-500 font-medium block">Customer Name:</span>
                    <span className="text-gray-900 font-medium">{transaction.customerName}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ─── CASE B: MANUAL TRANSACTION LOOKUP & SAVED CACHE ─── */
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
              {savedHistory.length > 0 && (
                <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3 space-y-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
                    <History className="w-3.5 h-3.5 text-blue-600" />
                    <span>Recent Transactions Found on this Device ({savedHistory.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {savedHistory.map((item) => (
                      <button
                        key={item.paymentId}
                        type="button"
                        onClick={() => {
                          if (item.receiptToken) {
                            verifyJwtToken(item.receiptToken);
                          } else {
                            setManualPaymentId(item.paymentId);
                            if (item.customerEmail) setManualEmail(item.customerEmail);
                          }
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-blue-300 hover:border-blue-500 rounded text-xs font-medium text-gray-800 flex items-center gap-1.5 transition shadow-2xs cursor-pointer active:scale-98"
                      >
                        <span className="font-mono text-blue-700 font-bold">{item.paymentId}</span>
                        <span className="text-emerald-700 font-bold">₹{item.amount}</span>
                        <span className="text-[10px] text-gray-500 max-w-[120px] truncate">
                          ({item.planName})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Enter Transaction Details Manually</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Check your email receipt from Razorpay or your banking SMS to find your <code>pay_...</code> ID.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Razorpay Payment ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="pay_P12abc345xyz"
                    value={manualPaymentId}
                    onChange={(e) => setManualPaymentId(e.target.value.trim())}
                    className="w-full text-xs font-mono px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Billing Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your-email@example.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value.trim())}
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ─── FORM: REFUND DETAILS ─── */}
          <form onSubmit={handleSubmitRefund} className="space-y-4 sm:space-y-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Reason for Refund Request *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
              >
                <option value="Accidental duplicate charge">Accidental duplicate charge</option>
                <option value="Incorrect package/amount selected">Incorrect package/amount selected</option>
                <option value="Project scope mutual cancellation">Project scope mutual cancellation</option>
                <option value="Milestone timeline adjustment">Milestone timeline adjustment</option>
                <option value="Technical or environment incompatibility">Technical or environment incompatibility</option>
                <option value="Other statutory dispute or inquiry">Other statutory dispute or inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Detailed Explanation / Comments (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Please describe what occurred or what milestone adjustment you are requesting..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Refund Destination Option */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <label className="block text-xs font-bold text-gray-800">
                Refund Disbursement Route
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label
                  onClick={() => setRefundMode("source")}
                  className={`border rounded-lg p-3 flex items-start gap-2 cursor-pointer transition ${
                    refundMode === "source"
                      ? "border-blue-600 bg-blue-50/50 text-blue-900 font-semibold"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={refundMode === "source"}
                    onChange={() => setRefundMode("source")}
                    className="mt-0.5"
                  />
                  <div>
                    <span>Return to Original Source</span>
                    <p className="text-[10px] text-gray-500 font-normal mt-0.5">
                      Razorpay will route directly back to the card, UPI app, or bank account you paid with.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setRefundMode("upi")}
                  className={`border rounded-lg p-3 flex items-start gap-2 cursor-pointer transition ${
                    refundMode === "upi"
                      ? "border-blue-600 bg-blue-50/50 text-blue-900 font-semibold"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    checked={refundMode === "upi"}
                    onChange={() => setRefundMode("upi")}
                    className="mt-0.5"
                  />
                  <div>
                    <span>Direct UPI Payout</span>
                    <p className="text-[10px] text-gray-500 font-normal mt-0.5">
                      Provide an instant UPI ID in case your original card or bank account is closed.
                    </p>
                  </div>
                </label>
              </div>

              {refundMode === "upi" && (
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Your UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="username@okhdfcbank or 9876543210@paytm"
                    value={customUpi}
                    onChange={(e) => setCustomUpi(e.target.value.trim())}
                    className="w-full text-xs font-mono px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Policy Reminder */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-gray-500 leading-relaxed">
              <strong>Merchant Resolution Policy:</strong> CypherTech reviews all resolution tickets within 24 to 48 business hours. Approved refunds are executed via Razorpay and credited within 5 to 7 banking days as per RBI regulations.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting Resolution Request...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Formal Refund Request</span>
                </>
              )}
            </button>
          </form>

          {/* Statutory Links */}
          <div className="border-t border-gray-200 pt-4 text-center text-[10px] text-gray-400 space-x-2">
            <span>Merchant: CypherTech</span>
            <span>•</span>
            <a
              href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Official Razorpay Cancellation &amp; Refund Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RefundPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <RefundContent />
    </Suspense>
  );
}
