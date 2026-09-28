"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  QrCode,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Building2,
  CheckCheck,
} from "lucide-react";
import QRCode from "qrcode";
import { loadRazorpayScript } from "@/lib/loadRazorpay";

export interface CheckoutItem {
  id: string;
  name: string;
  price: number; // in base units (e.g. INR 49999)
  currency?: "INR" | "USD";
  billingNote?: string;
  accent?: string;
}

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CheckoutItem | null;
  onPaymentSuccess?: (paymentData: any) => void;
}

export default function RazorpayCheckoutModal({
  isOpen,
  onClose,
  item,
  onPaymentSuccess,
}: RazorpayCheckoutModalProps) {
  const [paymentOption, setPaymentOption] = useState<"deposit" | "full" | "test1" | "custom">("deposit");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"gateway" | "qr">("gateway");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSuccessData(null);
      setLoading(false);
      setActiveTab("gateway");
      if (item) {
        setPaymentOption("deposit");
      }
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const basePrice = item.price || 0;
  const depositPrice = Math.round(basePrice * 0.5);

  const finalAmount =
    paymentOption === "test1"
      ? 1
      : paymentOption === "deposit"
      ? depositPrice
      : paymentOption === "full"
      ? basePrice
      : Number(customAmount) || 0;

  const currencyCode = "INR";
  const upiId = "satyamhimesh@okaxis";

  // Generate dynamic QR code on the go
  useEffect(() => {
    if (finalAmount > 0) {
      const upiUrl = `upi://pay?pa=${upiId}&pn=CypherTech&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(item?.name || "CypherTech Payment")}`;
      QRCode.toDataURL(upiUrl, {
        width: 240,
        margin: 1.5,
        color: { dark: "#0f172a", light: "#ffffff" },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error("Error generating QR:", err));
    }
  }, [finalAmount, item?.name]);

  const handleCopyPaymentId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (finalAmount <= 0) {
      setErrorMessage("Please select or enter a valid payment amount greater than zero.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Please enter your full name or representative name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid billing email address.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage("Please enter a valid mobile number for payment confirmation.");
      return;
    }

    setLoading(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Unable to connect to Razorpay payment gateway. Please check your internet connection.");
      }

      const planTitle = `${item.name} (${
        paymentOption === "test1"
          ? "Live ₹1 Test"
          : paymentOption === "deposit"
          ? "50% Kickoff Deposit"
          : paymentOption === "full"
          ? "Full Payment"
          : "Custom Milestone"
      })`;

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          currency: currencyCode,
          planId: item.id,
          planName: planTitle,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          notes: {
            customerNotes: notes,
            paymentType: paymentOption,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(
          orderData.error || orderData.details?.description || "Payment order creation failed on server."
        );
      }

      const { order, keyId } = orderData;

      if (!keyId) {
        throw new Error("Razorpay Key ID is missing in configuration.");
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "CypherTech",
        description: planTitle,
        image: "/hexagon-alien.png",
        order_id: order.id,
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          plan: item.name,
          planId: item.id,
          paymentOption,
        },
        theme: {
          color: "#2563eb", // Trust Blue
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                planName: item.name,
                amount: finalAmount,
                currency: currencyCode,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment verification failed on server.");
            }

            const successPayload = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: finalAmount,
              currency: currencyCode,
              planName: item.name,
              customerName: name,
              customerEmail: email,
              date: new Date().toISOString(),
            };

            setSuccessData(successPayload);
            setLoading(false);
            if (onPaymentSuccess) {
              onPaymentSuccess(successPayload);
            }
          } catch (verifyErr: any) {
            console.error("Verification error:", verifyErr);
            setErrorMessage(verifyErr.message || "Payment verification failed.");
            setLoading(false);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        setErrorMessage(
          response.error?.description || "Payment was declined by payment gateway or bank."
        );
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error("Checkout error:", err);
      setErrorMessage(err.message || "Unable to proceed to payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Soft dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card — Pure White, Professional Google UI/UX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 z-10 overflow-hidden my-auto text-gray-900 font-sans"
        >
          {/* Header — Professional Trust Blue */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                    Secure Checkout
                  </span>
                  <span className="text-xs text-blue-100 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-200" /> Razorpay Verified
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {successData ? "Official Payment Receipt" : item.name}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[82vh] overflow-y-auto space-y-4">
            {/* SUCCESS RECEIPT STATE */}
            {successData ? (
              <div className="space-y-5">
                <div className="text-center py-4 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-800">
                    Payment Successfully Completed
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    An official digital tax receipt has been emailed to{" "}
                    <strong className="text-gray-900">{successData.customerEmail}</strong>.
                  </p>
                  <p className="text-2xl font-extrabold text-emerald-700 mt-2">
                    ₹{Number(successData.amount).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium text-gray-500">Transaction Reference ID</span>
                    <div className="flex items-center gap-1.5 font-mono text-gray-900 font-semibold">
                      <span>{successData.paymentId}</span>
                      <button
                        onClick={() => handleCopyPaymentId(successData.paymentId)}
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Copy Transaction ID"
                      >
                        {copiedId ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium text-gray-500">Razorpay Order ID</span>
                    <span className="font-mono text-gray-800">{successData.orderId}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium text-gray-500">Service / Package</span>
                    <span className="font-semibold text-gray-900">{successData.planName}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium text-gray-500">Payer Name</span>
                    <span className="font-semibold text-gray-900">{successData.customerName}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Date & Time</span>
                    <span className="text-gray-800">
                      {new Date().toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Print Receipt
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* CHECKOUT FORM */
              <div className="space-y-4">
                {/* Red Error Message */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Milestone Options (Normal White Cards) */}
                {basePrice > 0 && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      Choose Payment Milestone
                    </label>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* 50% Kickoff Deposit */}
                      <div
                        onClick={() => setPaymentOption("deposit")}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                          paymentOption === "deposit"
                            ? "bg-blue-50 border-blue-600 ring-2 ring-blue-100"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        </div>
                        <span className="block text-xs font-semibold text-gray-900 mt-1.5">
                          50% Kickoff Deposit
                        </span>
                        <span className="block text-base font-bold text-gray-900 mt-0.5">
                          ₹{depositPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="block text-[11px] text-gray-500 mt-0.5">
                          Remaining 50% on deployment
                        </span>
                      </div>

                      {/* 100% Full Payment */}
                      <div
                        onClick={() => setPaymentOption("full")}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                          paymentOption === "full"
                            ? "bg-blue-50 border-blue-600 ring-2 ring-blue-100"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            Full Upfront
                          </span>
                        </div>
                        <span className="block text-xs font-semibold text-gray-900 mt-1.5">
                          100% Full Payment
                        </span>
                        <span className="block text-base font-bold text-gray-900 mt-0.5">
                          ₹{basePrice.toLocaleString("en-IN")}
                        </span>
                        <span className="block text-[11px] text-gray-500 mt-0.5">
                          Locks priority sprint slot
                        </span>
                      </div>
                    </div>

                    {/* ₹1 Live Test Option — Green Pill */}
                    <div
                      onClick={() => setPaymentOption("test1")}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        paymentOption === "test1"
                          ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100"
                          : "bg-white border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          Live Test
                        </span>
                        <div>
                          <span className="text-xs font-medium text-gray-900 block leading-tight">
                            Verify Gateway with ₹1.00
                          </span>
                          <span className="text-[11px] text-gray-500">
                            Perform a live 1-rupee test payment via UPI or Card
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-700">₹1.00</span>
                    </div>
                  </div>
                )}

                {/* Amount Summary Strip */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-medium text-gray-500">
                      Total Payable Now
                    </span>
                    <span className="block text-xl font-bold text-gray-900">
                      ₹{finalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                {/* Toggle: Form vs On-The-Go QR */}
                <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setActiveTab("gateway")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                      activeTab === "gateway"
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Razorpay Checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("qr")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                      activeTab === "qr"
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" /> Scan UPI QR
                  </button>
                </div>

                {/* TAB 1: FORM CHECKOUT */}
                {activeTab === "gateway" ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Mobile Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Billing Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="client@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || finalAmount <= 0}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Connecting to Gateway...
                        </>
                      ) : (
                        <>
                          Pay ₹{finalAmount.toLocaleString("en-IN")} via Razorpay{" "}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* TAB 2: LIVE QR SCAN */
                  <div className="space-y-3 text-center">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-block mx-auto shadow-sm">
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="Scan to pay"
                          className="w-44 h-44 mx-auto rounded-lg"
                        />
                      ) : (
                        <div className="w-44 h-44 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        </div>
                      )}
                      <div className="mt-1.5 text-xs font-bold text-gray-900">
                        Scan to Pay ₹{finalAmount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-gray-500">GPay, PhonePe, Paytm, BHIM</div>
                    </div>

                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
                      <span className="text-gray-500 font-medium">UPI ID:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-gray-900 font-semibold">{upiId}</span>
                        <button
                          type="button"
                          onClick={handleCopyUpiId}
                          className="text-blue-600 hover:text-blue-800 p-0.5"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? (
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Established Platform Safeguard Badges */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="block font-semibold text-gray-800">UPI Instant</span>
                      <span className="text-gray-500">GPay • PhonePe</span>
                    </div>
                    <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="block font-semibold text-gray-800">Cards & EMI</span>
                      <span className="text-gray-500">Visa • RuPay</span>
                    </div>
                    <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="block font-semibold text-gray-800">NetBanking</span>
                      <span className="text-gray-500">50+ Banks</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PCI-DSS Level 1
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-blue-600" /> 256-Bit SSL
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Razorpay
                    </span>
                  </div>

                  {/* Merchant Compliance Notice & Policies */}
                  <div className="pt-2 text-center text-[11px] text-gray-500 border-t border-gray-100">
                    <p className="font-semibold text-gray-700">
                      Merchant Legal Entity: <span className="text-blue-700">DataByte</span>
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] pt-1 text-blue-600">
                      <a
                        href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Terms
                      </a>
                      <span className="text-gray-300">•</span>
                      <a
                        href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Privacy
                      </a>
                      <span className="text-gray-300">•</span>
                      <a
                        href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Refunds
                      </a>
                      <span className="text-gray-300">•</span>
                      <a
                        href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Shipping
                      </a>
                      <span className="text-gray-300">•</span>
                      <a
                        href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
