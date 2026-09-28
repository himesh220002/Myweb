"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
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
  HelpCircle,
  Coffee,
  Sparkles,
  Smartphone,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";
import { loadRazorpayScript } from "@/lib/loadRazorpay";

function PaymentPortalContent() {
  const searchParams = useSearchParams();

  // URL Query Parameters
  const queryPlan = searchParams.get("plan");
  const queryAmount = searchParams.get("amount");
  const queryDesc = searchParams.get("desc");
  const queryEmail = searchParams.get("email");
  const queryName = searchParams.get("name");
  const isCoffeeQuery = searchParams.get("coffee") === "true";

  // Preset plans dictionary with business labels
  const PRESETS: Record<
    string,
    { label: string; tag: string; desc: string; amount: number; isDeposit: boolean; isCoffee?: boolean; isTest?: boolean }
  > = {
    coffee: {
      label: "Buy Me a Coffee ☕ — Support Our Work",
      tag: "Support / Tips",
      desc: "Fuel our engineering squad with a quick dynamic coffee or support contribution.",
      amount: 100,
      isDeposit: false,
      isCoffee: true,
    },
    test_one_rupee: {
      label: "Live Test Verification — ₹1.00",
      tag: "Gateway Test",
      desc: "Perform a live ₹1.00 verification transaction via UPI or Card to test real gateway routing.",
      amount: 1,
      isDeposit: false,
      isTest: true,
    },
    starter_deposit: {
      label: "Starter Package — 50% Kickoff Deposit",
      tag: "50% Milestone",
      desc: "50% upfront to initiate sprint kickoff. Balance due upon successful deployment.",
      amount: 24999,
      isDeposit: true,
    },
    starter_full: {
      label: "Starter Package — Full Payment (100%)",
      tag: "Full Upfront",
      desc: "Complete one-time upfront payment for up to 5 routes, responsive design & cloud deploy.",
      amount: 49999,
      isDeposit: false,
    },
    growth_deposit: {
      label: "Growth Package — 50% Kickoff Deposit",
      tag: "50% Milestone",
      desc: "50% upfront for full-stack web applications with database, authentication, and CMS.",
      amount: 74999,
      isDeposit: true,
    },
    growth_full: {
      label: "Growth Package — Full Payment (100%)",
      tag: "Full Upfront",
      desc: "Complete payment for up to 20 routes, database, authentication, and 90-day support.",
      amount: 149999,
      isDeposit: false,
    },
    custom: {
      label: "Custom Invoice / Milestone Amount",
      tag: "Custom Scope",
      desc: "Enter the custom milestone amount specified in your formal Statement of Work (SOW).",
      amount: Number(queryAmount) || 0,
      isDeposit: false,
    },
  };

  // State
  const [selectedPreset, setSelectedPreset] = useState<string>(
    isCoffeeQuery
      ? "coffee"
      : queryPlan === "test" || queryPlan === "1" || queryAmount === "1"
      ? "test_one_rupee"
      : queryPlan === "growth"
      ? "growth_deposit"
      : queryPlan === "starter"
      ? "starter_deposit"
      : queryAmount
      ? "custom"
      : "starter_deposit"
  );

  const [coffeeAmount, setCoffeeAmount] = useState<number>(
    isCoffeeQuery && queryAmount ? Number(queryAmount) || 100 : 100
  );
  const [customAmount, setCustomAmount] = useState<string>(queryAmount || "");
  const [description, setDescription] = useState<string>(
    queryDesc || (isCoffeeQuery ? "Buy Me a Coffee Support Contribution" : "")
  );
  const [name, setName] = useState<string>(queryName || "");
  const [email, setEmail] = useState<string>(queryEmail || "");
  const [phone, setPhone] = useState<string>("");

  const [activePaymentTab, setActivePaymentTab] = useState<"gateway" | "qr">("gateway");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const activePreset = PRESETS[selectedPreset] || PRESETS.custom;

  // Calculate final amount dynamically
  const finalAmount =
    selectedPreset === "coffee"
      ? coffeeAmount
      : selectedPreset === "custom"
      ? Number(customAmount) || 0
      : activePreset.amount;

  const upiId = "satyamhimesh@okaxis";

  // Generate dynamic QR Code on-the-go whenever amount or description updates
  useEffect(() => {
    if (finalAmount > 0) {
      const note = encodeURIComponent(
        description || (selectedPreset === "coffee" ? "CypherTech Coffee Support" : "CypherTech Payment")
      );
      const upiUrl = `upi://pay?pa=${upiId}&pn=CypherTech&am=${finalAmount}&cu=INR&tn=${note}`;
      QRCode.toDataURL(upiUrl, {
        width: 260,
        margin: 1.5,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error("Error generating dynamic QR:", err));
    }
  }, [finalAmount, description, selectedPreset]);

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
      setErrorMessage("Please select a package or enter a valid payment amount greater than ₹0.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Please enter your name or company representative name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid billing email address for your receipt.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }

    setLoading(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error(
          "Could not load Razorpay payment gateway. Please check your internet connection."
        );
      }

      const planTitle =
        selectedPreset === "coffee"
          ? `Buy Me a Coffee Support (₹${finalAmount})`
          : selectedPreset === "custom"
          ? description.trim() || "Custom Project Milestone"
          : activePreset.label;

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          currency: "INR",
          planId: selectedPreset,
          planName: planTitle,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          notes: {
            customDescription: description,
            presetType: selectedPreset,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(
          orderData.error || orderData.details?.description || "Order creation failed on server."
        );
      }

      const { order, keyId } = orderData;

      if (!keyId) {
        throw new Error("Razorpay Key ID is not configured.");
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
          plan: planTitle,
          orderId: order.id,
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
                planName: planTitle,
                amount: finalAmount,
                currency: "INR",
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment signature verification failed.");
            }

            setSuccessData({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: finalAmount,
              planName: planTitle,
              customerName: name,
              customerEmail: email,
              date: new Date().toISOString(),
            });
            setLoading(false);
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
      console.error("Payment initialization error:", err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8 font-sans">
      {/* Top Blue Trust Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
                Secure Payment Portal
              </span>
              <span className="text-blue-100 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-200" /> Razorpay Verified Merchant
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Online Payments & Client Invoicing
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              Pay sprint deposits, milestone deliverables, buy us a coffee, or test our live gateway.
              Official GST-compliant digital tax receipts are generated and emailed immediately.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-blue-50">
            <Lock className="w-5 h-5 text-emerald-300" />
            <div>
              <div className="font-semibold text-white">256-Bit SSL Encryption</div>
              <div className="text-[11px] text-blue-200">RBI Nodal Account Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Preset Package Selector */}
        <div className="lg:col-span-7 space-y-4">
          {successData ? (
            /* SUCCESS STATE RECEIPT CARD */
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="text-center py-4 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">
                  Payment Verified & Completed
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Thank you! An official payment receipt has been sent to{" "}
                  <strong className="text-gray-900">{successData.customerEmail}</strong>.
                </p>
                <p className="text-3xl font-extrabold text-emerald-700 mt-3">
                  ₹{Number(successData.amount).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Receipt Table */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Transaction Reference ID</span>
                  <div className="flex items-center gap-2 font-mono text-gray-900 font-semibold">
                    <span>{successData.paymentId}</span>
                    <button
                      onClick={() => handleCopyPaymentId(successData.paymentId)}
                      className="text-gray-400 hover:text-blue-600 p-1"
                      title="Copy Reference ID"
                    >
                      {copiedId ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Razorpay Order ID</span>
                  <span className="font-mono text-gray-800">{successData.orderId}</span>
                </div>

                <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Service / Description</span>
                  <span className="font-semibold text-gray-900">{successData.planName}</span>
                </div>

                <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Payer Name</span>
                  <span className="font-semibold text-gray-900">{successData.customerName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Date & Time</span>
                  <span className="text-gray-800">
                    {new Date().toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Printer className="w-4 h-4" /> Print / Save PDF Receipt
                </button>
                <Link
                  href="/contact"
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition text-center shadow-sm"
                >
                  Proceed to Onboarding <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* PACKAGE SELECTION FORM */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">
                  1. Choose Payment Type or Tier
                </h2>
                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-full">
                  All Payments Verified Securely
                </span>
              </div>

              {/* Coffee Option — Warm Amber Highlighting */}
              <div
                onClick={() => setSelectedPreset("coffee")}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedPreset === "coffee"
                    ? "bg-amber-50/70 border-amber-500 ring-2 ring-amber-200 shadow-sm"
                    : "bg-white border-amber-200 hover:border-amber-400"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Coffee className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                          Support
                        </span>
                        <h3 className="text-base font-bold text-gray-900">
                          Buy Me a Coffee ☕ (Support Squad)
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Fuel our development with a dynamic coffee contribution of any amount.
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-2xl font-bold text-amber-800 block leading-tight">
                      ₹{coffeeAmount}
                    </span>
                    <span className="text-[11px] text-gray-500">Dynamic Amount</span>
                  </div>
                </div>

                {/* Coffee Dynamic Amount Selector Chips */}
                {selectedPreset === "coffee" && (
                  <div className="mt-4 pt-3 border-t border-amber-200/70 space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      Select or Type Coffee Amount:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "₹50 (1 Coffee ☕)", val: 50 },
                        { label: "₹100 (2 Coffees ☕☕)", val: 100 },
                        { label: "₹250 (Coffee & Snacks 🥐)", val: 250 },
                        { label: "₹500 (Squad Fuel 🚀)", val: 500 },
                        { label: "₹5000 (Ultimate Boost ⚡)", val: 5000 },
                      ].map((c) => (
                        <button
                          key={c.val}
                          type="button"
                          onClick={() => setCoffeeAmount(c.val)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            coffeeAmount === c.val
                              ? "bg-amber-600 text-white shadow-sm"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">
                        Custom ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter other custom amount (e.g. 750)"
                        value={coffeeAmount}
                        onChange={(e) => setCoffeeAmount(Number(e.target.value) || 0)}
                        className="w-full pl-18 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Green Live 1 Rupee Test Option */}
              <div
                onClick={() => setSelectedPreset("test_one_rupee")}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  selectedPreset === "test_one_rupee"
                    ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm"
                    : "bg-white border-emerald-200 hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    ₹1
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Live Test
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        1 Rupee Verification Transfer
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Verify live payment gateway routing (UPI, Card, NetBanking) with a ₹1.00 charge.
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl font-bold text-emerald-700 block leading-tight">
                    ₹1.00
                  </span>
                  <span className="text-[11px] text-gray-400">Click to select</span>
                </div>
              </div>

              {/* Project Presets List */}
              <div className="space-y-3">
                {Object.entries(PRESETS).map(([key, item]) => {
                  if (key === "test_one_rupee" || key === "coffee") return null;
                  const isSelected = selectedPreset === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPreset(key)}
                      className={`p-4 rounded-xl border cursor-pointer transition ${
                        isSelected
                          ? "bg-blue-50/60 border-blue-600 ring-2 ring-blue-100 shadow-sm"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                              {item.tag}
                            </span>
                            {item.isDeposit && (
                              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                                Recommended
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {item.label}
                          </h3>
                          <p className="text-xs text-gray-500 max-w-md">{item.desc}</p>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          {key === "custom" ? (
                            <span className="text-sm font-bold text-blue-700">
                              Custom Amount
                            </span>
                          ) : (
                            <div>
                              <span className="text-2xl font-bold text-gray-900 block leading-tight">
                                ₹{item.amount.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[11px] text-gray-500 block">
                                {item.isDeposit ? "50% Kickoff" : "Full Payment"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom amount field when custom selected */}
              {selectedPreset === "custom" && (
                <div className="bg-white border border-blue-300 rounded-xl p-5 space-y-4 shadow-sm">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Enter Milestone / Invoice Amount (INR ₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 25000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Milestone / Service Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Milestone 2 Backend Deployment"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Checkout Breakdown + Live QR Code on the Go */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5 sticky top-20">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>2. Payment & Scan to Pay</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Checkout Breakdown</h2>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Price Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
              <div className="flex justify-between items-start text-xs">
                <span className="text-gray-500 font-medium">Selected Item</span>
                <span className="text-gray-900 font-semibold text-right max-w-[200px]">
                  {selectedPreset === "coffee"
                    ? `Buy Me a Coffee (₹${coffeeAmount})`
                    : selectedPreset === "custom"
                    ? description || "Custom Milestone"
                    : activePreset.label}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-900 font-semibold">
                  ₹{finalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Applicable Taxes / GST</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>

              <div className="flex justify-between items-baseline border-t border-gray-200 pt-2.5">
                <span className="text-sm font-bold text-gray-900">Total Payable</span>
                <span className="text-2xl font-extrabold text-blue-700">
                  ₹{finalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Tab Toggle: Gateway Checkout vs On-the-Go QR Code */}
            <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50">
              <button
                type="button"
                onClick={() => setActivePaymentTab("gateway")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activePaymentTab === "gateway"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> Razorpay Gateway
              </button>
              <button
                type="button"
                onClick={() => setActivePaymentTab("qr")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activePaymentTab === "qr"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <QrCode className="w-3.5 h-3.5" /> Instant Scan & Pay (QR)
              </button>
            </div>

            {/* TAB 1: RAZORPAY GATEWAY CHECKOUT */}
            {activePaymentTab === "gateway" ? (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Billing Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="billing@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    required
                  />
                  <span className="block text-[11px] text-gray-400 mt-0.5">
                    Official tax invoice & digital receipt will be sent here.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Phone (UPI / OTP) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || finalAmount <= 0}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting Gateway...
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
              /* TAB 2: DYNAMIC ON-THE-GO QR CODE */
              <div className="space-y-4 text-center">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 inline-block mx-auto shadow-sm">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Scan to pay"
                      className="w-52 h-52 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-52 h-52 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    </div>
                  )}
                  <div className="mt-2 text-xs font-bold text-gray-900">
                    Scan with any UPI App • ₹{finalAmount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-gray-500">GPay, PhonePe, Paytm, BHIM</div>
                </div>

                {/* Copy UPI handle */}
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs">
                  <span className="text-gray-500 font-medium">Official UPI ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-900 font-semibold">{upiId}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpiId}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? (
                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  The QR code automatically updates in real-time as you adjust your amount. Once paid,
                  send a screenshot or reference number to support@cyphertech.online for instant invoice reconciliation.
                </p>
              </div>
            )}

            {/* Platform Safeguard Badges (UPI, Cards, NetBanking, Razorpay) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-center">
                Accepted Payment Methods & Safeguards
              </span>

              {/* Supported Platforms Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="block font-bold text-gray-800">UPI Instant</span>
                  <span className="block text-[10px] text-gray-500">GPay • PhonePe</span>
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="block font-bold text-gray-800">Cards & EMI</span>
                  <span className="block text-[10px] text-gray-500">Visa • Mastercard</span>
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="block font-bold text-gray-800">NetBanking</span>
                  <span className="block text-[10px] text-gray-500">50+ Indian Banks</span>
                </div>
              </div>

              {/* Trust Safeguards List */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PCI-DSS Level 1
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" /> 256-Bit SSL
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Razorpay Verified
                </span>
              </div>
            </div>

            {/* Merchant Compliance Notice & Policies */}
            <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500 space-y-1.5">
              <p className="font-semibold text-gray-800">
                Merchant Legal Entity Name: <span className="text-blue-700">DataByte</span>
              </p>
              <p className="text-[11px] text-gray-500">
                Last updated on Sep 18th 2025 • Official Razorpay Verified Merchant
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] pt-1 text-blue-600">
                <a
                  href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Terms &amp; Conditions
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Refund Policy
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Shipping Policy
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pt-20 pb-16">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <PaymentPortalContent />
      </Suspense>
    </div>
  );
}
