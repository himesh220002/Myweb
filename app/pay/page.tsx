"use client";

import { Suspense, useState, useEffect, useRef } from "react";
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
  Coffee,
  Sparkles,
  Smartphone,
  CheckCheck,
  Download,
  RotateCcw,
  ArrowLeft,
  FileText,
  FileCode,
} from "lucide-react";
import QRCode from "qrcode";
import { loadRazorpayScript } from "@/lib/loadRazorpay";
import {
  printReceiptIsolated,
  downloadReceiptTxt,
  downloadReceiptHtml,
  ReceiptData,
} from "@/lib/receiptUtils";

function PaymentPortalContent() {
  const searchParams = useSearchParams();

  // URL Query Parameters
  const queryPlan = searchParams.get("plan");
  const queryAmount = searchParams.get("amount");
  const queryDesc = searchParams.get("desc");
  const queryEmail = searchParams.get("email");
  const queryName = searchParams.get("name");
  const isCoffeeQuery = searchParams.get("coffee") === "true";

  // Preset plans dictionary with business labels and compact descriptions
  const PRESETS: Record<
    string,
    {
      label: string;
      shortLabel: string;
      tag: string;
      desc: string;
      amount: number;
      isDeposit: boolean;
      category: "coffee" | "test" | "package" | "custom";
    }
  > = {
    coffee: {
      label: "Buy Me a Coffee ☕",
      shortLabel: "Coffee Support",
      tag: "Support / Tips",
      desc: "Fuel our engineering squad with a quick developer tip.",
      amount: 100,
      isDeposit: false,
      category: "coffee",
    },
    test_one_rupee: {
      label: "Live Test Verification — ₹1.00",
      shortLabel: "Live ₹1 Test",
      tag: "Gateway Test",
      desc: "Instant live ₹1.00 test via UPI or Card to verify routing.",
      amount: 1,
      isDeposit: false,
      category: "test",
    },
    starter_deposit: {
      label: "Starter Package — 50% Kickoff Deposit",
      shortLabel: "Starter Deposit (50%)",
      tag: "50% Milestone",
      desc: "50% upfront to initiate sprint kickoff. Balance due upon successful deployment.",
      amount: 24999,
      isDeposit: true,
      category: "package",
    },
    starter_full: {
      label: "Starter Package — Full Payment (100%)",
      shortLabel: "Starter Full (100%)",
      tag: "Full Upfront",
      desc: "Complete one-time upfront payment for up to 5 routes, responsive design & cloud deploy.",
      amount: 49999,
      isDeposit: false,
      category: "package",
    },
    growth_deposit: {
      label: "Growth Package — 50% Kickoff Deposit",
      shortLabel: "Growth Deposit (50%)",
      tag: "50% Milestone",
      desc: "50% upfront for full-stack web applications with database, authentication, and CMS.",
      amount: 74999,
      isDeposit: true,
      category: "package",
    },
    growth_full: {
      label: "Growth Package — Full Payment (100%)",
      shortLabel: "Growth Full (100%)",
      tag: "Full Upfront",
      desc: "Complete payment for up to 20 routes, database, authentication, and 90-day support.",
      amount: 149999,
      isDeposit: false,
      category: "package",
    },
    custom: {
      label: "Custom Invoice / Milestone Amount",
      shortLabel: "Custom Milestone",
      tag: "Custom Scope",
      desc: "Enter the custom milestone amount specified in your formal Statement of Work (SOW).",
      amount: Number(queryAmount) || 0,
      isDeposit: false,
      category: "custom",
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

  // Mobile 2-step navigation state (package selection vs payment form)
  const [mobileStep, setMobileStep] = useState<"package" | "payment">(
    searchParams.get("step") === "payment" || searchParams.get("step") === "2" ? "payment" : "package"
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
  const [successData, setSuccessData] = useState<ReceiptData | null>(
    searchParams.get("test_receipt") === "true"
      ? {
          paymentId: "pay_R81vLmK829Jz1",
          orderId: "order_R81v31JmP099x",
          amount: 24999,
          planName: "Starter Package — 50% Kickoff Deposit",
          customerName: "Rahul Sharma",
          customerEmail: "rahul.sharma@example.com",
          customerPhone: "+91 9876543210",
          date: new Date().toISOString(),
          paymentMethod: "Razorpay Gateway (256-Bit SSL)",
        }
      : null
  );
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const successContainerRef = useRef<HTMLDivElement | null>(null);

  // When payment succeeds, forcefully scroll directly to top so confirmation receipt is immediately visible
  useEffect(() => {
    if (successData) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        successContainerRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 50);
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 200);
    }
  }, [successData]);

  const activePreset = PRESETS[selectedPreset] || PRESETS.custom;

  // Calculate final amount dynamically
  const finalAmount =
    selectedPreset === "coffee"
      ? coffeeAmount
      : selectedPreset === "custom"
      ? Number(customAmount) || 0
      : activePreset.amount;

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "satyamhimesh@pingpay";
  const upiPayeeName = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME || "Himesh Satyam";

  // Generate dynamic QR Code on-the-go whenever amount or description updates
  useEffect(() => {
    if (finalAmount > 0) {
      const note = encodeURIComponent(
        description || (selectedPreset === "coffee" ? "CypherTech Coffee Support" : "CypherTech Payment")
      );
      const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiPayeeName)}&am=${finalAmount}&cu=INR&tn=${note}`;
      QRCode.toDataURL(upiUrl, {
        width: 240,
        margin: 1.5,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error("Error generating dynamic QR:", err));
    }
  }, [finalAmount, description, selectedPreset, upiId, upiPayeeName]);

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

            const receiptPayload: ReceiptData = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: finalAmount,
              planName: planTitle,
              customerName: name,
              customerEmail: email,
              customerPhone: phone,
              date: new Date().toISOString(),
              paymentMethod: "Razorpay Gateway (256-Bit SSL)",
            };

            setSuccessData(receiptPayload);
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
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-8 font-sans">
      {/* ─── TOP TRUST BANNER ─── */}
      {!successData && (
        <>
          {/* Mobile Ultra-Compact Header (Saves ~250px vertical screen space on small screens) */}
          <div className="sm:hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs mb-3 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10px] text-blue-100 font-semibold">
                <span className="bg-white/20 text-white px-1.5 py-0.2 rounded uppercase">Portal</span>
                <span className="flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-blue-200" /> Razorpay Verified
                </span>
              </div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                Online Payments &amp; Invoicing
              </h1>
            </div>
            <div className="text-right text-[10px] bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-blue-100 shrink-0">
              <div className="flex items-center gap-1 font-semibold text-white">
                <Lock className="w-3 h-3 text-emerald-300" /> 256-Bit SSL
              </div>
              <div className="text-[9px] text-blue-200">RBI Protected</div>
            </div>
          </div>

          {/* Desktop Full Trust Banner (Shown on >= sm screens) */}
          <div className="hidden sm:block bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl p-5 md:p-6 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                    Secure Payment Portal
                  </span>
                  <span className="text-blue-100 text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-200" /> Razorpay Verified
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  Online Payments &amp; Client Invoicing
                </h1>
                <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                  Pay sprint deposits, milestone deliverables, buy us a coffee, or test our live gateway.
                  Official GST-compliant digital tax receipts are generated and emailed immediately.
                </p>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-blue-50">
                <Lock className="w-4 h-4 text-emerald-300" />
                <div>
                  <div className="font-semibold text-white text-xs">256-Bit SSL Encryption</div>
                  <div className="text-[10px] text-blue-200">RBI Nodal Protected</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── CONDITIONAL RENDER: STANDALONE OFFICIAL RECEIPT WHEN PAID ─── */}
      {successData ? (
        <div ref={successContainerRef} id="payment-success-screen" className="max-w-2xl mx-auto space-y-4 pt-1">
          {/* Green Top Alert (Screen only, omitted on print) */}
          <div className="no-print bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 sm:p-4 text-center space-y-1 shadow-xs">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-emerald-950">
              Payment Verified &amp; Completed!
            </h2>
            <p className="text-xs text-emerald-800">
              Your official tax receipt has been emailed to{" "}
              <strong className="text-gray-900 font-semibold">{successData.customerEmail}</strong>.
            </p>
          </div>

          {/* DEDICATED COMPACT BUT FULL-LENGTH DETAILED RECEIPT VOUCHER */}
          <div
            id="receipt-print-area"
            className="bg-white border border-gray-300 rounded-xl p-4 sm:p-6 shadow-sm space-y-4"
          >
            {/* Header: Company & Merchant Info */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-black rounded flex items-center justify-center border border-red-500 shrink-0">
                    <img src="/hexagon-alien.png" alt="CypherTech" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold tracking-tight text-gray-900 leading-none">
                      CYPHERTECH
                    </h1>
                    <span className="text-[9px] text-gray-500 font-mono tracking-wider">
                      DIGITAL SOLUTIONS
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 text-[11px] text-gray-600 space-y-0.5">
                  <div>Merchant Legal Entity: <strong className="text-gray-900">CypherTech</strong></div>
                  <div>Support: <a href="mailto:satyamhimesh@gmail.com" className="text-blue-600">satyamhimesh@gmail.com</a></div>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                  ✓ PAID &amp; CAPTURED
                </div>
                <div className="text-[10px] text-gray-500 font-mono">Digital Tax Invoice</div>
                <div className="text-[10px] text-gray-500">
                  {new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </div>
              </div>
            </div>

            {/* Total Paid Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Total Amount Received
                </span>
                <span className="text-[10px] text-gray-500">Includes 18% GST digital invoicing</span>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 leading-tight">
                  ₹{Number(successData.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
                <span className="block text-[9px] font-mono text-gray-500">INR</span>
              </div>
            </div>

            {/* Compact Breakdown Grid */}
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 p-2.5 sm:p-3 gap-1.5 sm:gap-3">
                <div>
                  <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider block">
                    Transaction Reference ID
                  </span>
                  <div className="flex items-center gap-1.5 font-mono font-semibold text-gray-900 mt-0.5 text-xs break-all">
                    <span>{successData.paymentId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPaymentId(successData.paymentId)}
                      className="no-print text-gray-400 hover:text-blue-600 p-0.5"
                      title="Copy Transaction ID"
                    >
                      {copiedId ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider block">
                    Razorpay Order Reference
                  </span>
                  <span className="font-mono text-gray-800 block mt-0.5 text-xs break-all">
                    {successData.orderId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-2.5 sm:p-3 gap-1.5 sm:gap-3">
                <div>
                  <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider block">
                    Payer Name
                  </span>
                  <span className="font-semibold text-gray-900 block mt-0.5 text-xs">
                    {successData.customerName || "Valued Client"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider block">
                    Billing Email Address
                  </span>
                  <span className="text-gray-800 block mt-0.5 text-xs break-all">
                    {successData.customerEmail || "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-2.5 sm:p-3 gap-1.5 sm:gap-3">
                <div>
                  <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider block">
                    Scope / Item
                  </span>
                  <span className="font-semibold text-blue-900 block mt-0.5 text-xs">
                    {successData.planName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider block">
                    Payment Gateway Security
                  </span>
                  <span className="text-gray-800 block mt-0.5 text-xs">
                    Razorpay (256-Bit SSL &bull; PCI-DSS)
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps Briefing */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-2.5 text-[11px] text-blue-900 leading-relaxed">
              <strong>Next Steps:</strong> Your payment confirmation has reached our delivery squad. Milestone briefings and contact details have been dispatched to your email.
            </div>

            {/* Statutory Compliance Footer */}
            <div className="border-t border-gray-200 pt-3 text-[10px] text-gray-500 text-center space-y-1">
              <p className="font-semibold text-gray-700">
                Merchant Legal Entity: CypherTech • Last Updated: Sep 18th 2025
              </p>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-blue-600 text-[10px]">
                <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms" target="_blank" rel="noopener noreferrer">Terms</a>
                <span>•</span>
                <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
                <span>•</span>
                <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund" target="_blank" rel="noopener noreferrer">Refunds</a>
                <span>•</span>
                <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping" target="_blank" rel="noopener noreferrer">Shipping</a>
                <span>•</span>
                <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us" target="_blank" rel="noopener noreferrer">Contact</a>
              </div>
              <p className="text-[9px] text-gray-400">
                Authentic computer-generated tax invoice. No signature required.
              </p>
            </div>
          </div>

          {/* Action Buttons: Isolated Print, Direct HTML/TXT Download, and Return */}
          <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => printReceiptIsolated(successData)}
              className="py-2.5 px-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer active:scale-98"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600" />
              <span>Print / Save PDF (Isolated Receipt)</span>
            </button>

            <button
              type="button"
              onClick={() => downloadReceiptHtml(successData)}
              className="py-2.5 px-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer active:scale-98"
            >
              <FileCode className="w-3.5 h-3.5 text-indigo-600" />
              <span>Download Digital Receipt (.html)</span>
            </button>

            <button
              type="button"
              onClick={() => downloadReceiptTxt(successData)}
              className="py-2.5 px-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer active:scale-98"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Download Text Receipt (.txt)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSuccessData(null);
                setErrorMessage(null);
                setMobileStep("package");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer active:scale-98"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Make Another Payment</span>
            </button>
          </div>
        </div>
      ) : (
        /* ─── MAIN CHECKOUT PORTAL ─── */
        <div className="space-y-3 sm:space-y-4">
          {/* Mobile 2-Step Navigation Tab Bar (Screens < lg) */}
          <div className="lg:hidden bg-slate-200/90 p-1 rounded-xl flex text-xs font-semibold shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setMobileStep("package");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition ${
                mobileStep === "package"
                  ? "bg-white text-blue-700 shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>1. Choose Package</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileStep("payment");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition ${
                mobileStep === "payment"
                  ? "bg-white text-blue-700 shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>2. Pay ₹{finalAmount.toLocaleString("en-IN")}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Main Grid: 2 columns on desktop (>= lg), 1 column with step toggle on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start pb-20 lg:pb-0">
            {/* ─── LEFT COLUMN: PRESET PACKAGE SELECTOR ─── */}
            <div className={`lg:col-span-7 space-y-2.5 ${mobileStep === "payment" ? "hidden lg:block" : "block"}`}>
              <div className="flex items-center justify-between pb-0.5">
                <h2 className="text-xs sm:text-sm font-bold text-gray-900">
                  1. Choose Payment Item or Package
                </h2>
                <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                  Verified Secure
                </span>
              </div>

              {/* COFFEE OPTION */}
              <div
                onClick={() => setSelectedPreset("coffee")}
                className={`p-2.5 sm:p-3 rounded-xl border cursor-pointer transition ${
                  selectedPreset === "coffee"
                    ? "bg-amber-50/70 border-amber-500 ring-2 ring-amber-200 shadow-xs"
                    : "bg-white border-amber-200/80 hover:border-amber-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Coffee className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-1 py-0.2 rounded">
                          Support
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                          Buy Me a Coffee ☕
                        </h3>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1">
                        Fuel our engineering squad with a quick developer tip.
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-amber-800 block leading-tight">
                      ₹{coffeeAmount}
                    </span>
                    <span className="text-[9px] text-gray-400">Dynamic</span>
                  </div>
                </div>

                {/* Coffee Dynamic Amount Selector Chips (Only when selected) */}
                {selectedPreset === "coffee" && (
                  <div className="mt-2.5 pt-2 border-t border-amber-200/70 space-y-1.5">
                    <span className="block text-[10px] font-semibold text-gray-700">
                      Choose tip amount or type custom:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: "₹50 (1 ☕)", val: 50 },
                        { label: "₹100 (2 ☕☕)", val: 100 },
                        { label: "₹250 (🥐 Snack)", val: 250 },
                        { label: "₹500 (🚀 Fuel)", val: 500 },
                        { label: "₹5000 (⚡ Boost)", val: 5000 },
                      ].map((c) => (
                        <button
                          key={c.val}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCoffeeAmount(c.val);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                            coffeeAmount === c.val
                              ? "bg-amber-600 text-white shadow-2xs"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative mt-1" onClick={(e) => e.stopPropagation()}>
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[11px]">
                        Custom ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Type amount (e.g. 750)"
                        value={coffeeAmount}
                        onChange={(e) => setCoffeeAmount(Number(e.target.value) || 0)}
                        className="w-full pl-16 pr-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* LIVE ₹1 TEST OPTION */}
              <div
                onClick={() => setSelectedPreset("test_one_rupee")}
                className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  selectedPreset === "test_one_rupee"
                    ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-xs"
                    : "bg-white border-emerald-200/80 hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    ₹1
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded">
                        Live Test
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">
                        1 Rupee Verification Transfer
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1">
                      Live gateway routing test (UPI, Card, NetBanking).
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-bold text-emerald-700 block leading-tight">
                    ₹1.00
                  </span>
                  <span className="text-[9px] text-gray-400">Click to select</span>
                </div>
              </div>

              {/* ─── 5 PACKAGES: 1st ONE EXPANDED & REMAINING 4 COLLAPSED BY DEFAULT ─── */}
              <div className="space-y-2">
                {[
                  "starter_deposit",
                  "starter_full",
                  "growth_deposit",
                  "growth_full",
                  "custom",
                ].map((key) => {
                  const item = PRESETS[key];
                  if (!item) return null;
                  const isSelected = selectedPreset === key;

                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPreset(key)}
                      className={`p-2.5 sm:p-3 rounded-xl border cursor-pointer transition ${
                        isSelected
                          ? "bg-blue-50/70 border-blue-600 ring-2 ring-blue-100 shadow-xs"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2.5">
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[9px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.2 rounded">
                              {item.tag}
                            </span>
                            {item.isDeposit && (
                              <span className="text-[9px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                                Recommended
                              </span>
                            )}
                          </div>
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                            {item.label}
                          </h3>
                          {/* Full description revealed ONLY when expanded/selected */}
                          {isSelected && (
                            <p className="text-[10px] sm:text-[11px] text-gray-600 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          {key === "custom" ? (
                            <div>
                              <span className="text-xs font-bold text-blue-700 block">
                                Custom Amount
                              </span>
                              {isSelected && (
                                <span className="text-[9px] text-gray-400 block">SOW Scope</span>
                              )}
                            </div>
                          ) : (
                            <div>
                              <span className="text-base sm:text-lg font-bold text-gray-900 block leading-tight">
                                ₹{item.amount.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[9px] text-gray-400 block">
                                {item.isDeposit ? "50% Kickoff" : "Full Payment"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Custom inputs revealed ONLY when Custom is expanded/selected */}
                      {key === "custom" && isSelected && (
                        <div
                          className="mt-2.5 pt-2.5 border-t border-blue-200 space-y-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div>
                            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                              Milestone / SOW Amount (INR ₹) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">
                                ₹
                              </span>
                              <input
                                type="number"
                                min="1"
                                placeholder="e.g. 25000"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                className="w-full pl-6 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                              Milestone / Service Description <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Milestone 2 Backend Deployment"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT COLUMN: CHECKOUT BREAKDOWN & FORM ─── */}
            <div className={`lg:col-span-5 space-y-3 ${mobileStep === "package" ? "hidden lg:block" : "block"}`}>
              {/* Mobile Back to Packages Bar */}
              <div className="lg:hidden flex items-center justify-between pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileStep("package");
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Package</span>
                </button>
                <span className="text-xs font-bold text-gray-900">
                  ₹{finalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-sm space-y-3.5 sm:space-y-4 sticky top-24">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-blue-600 font-bold mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    <span>2. Review &amp; Complete Payment</span>
                  </div>
                  <h2 className="text-base sm:text-xl font-extrabold text-gray-900 tracking-tight">Checkout Breakdown</h2>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                )}

                {/* Price Summary Box — Highly Visible & Crisp on Large Screens */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-2.5">
                  <div className="flex justify-between items-start text-xs sm:text-sm">
                    <span className="text-gray-500 font-medium">Selected Item / Scope</span>
                    <span className="text-gray-900 font-bold text-right max-w-[220px] sm:max-w-[280px] break-words">
                      {selectedPreset === "coffee"
                        ? `Coffee Tip (₹${coffeeAmount})`
                        : selectedPreset === "custom"
                        ? description || "Custom Milestone"
                        : activePreset.shortLabel}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm border-t border-gray-200/80 pt-2">
                    <span className="text-gray-500 font-medium">Applicable Taxes (GST 18%)</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px] sm:text-xs">
                      Included (Tax-Compliant)
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-t border-gray-200 pt-2 sm:pt-2.5">
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block">Total Payable</span>
                      <span className="text-[10px] sm:text-xs text-gray-400">All fees &amp; taxes included</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-700 tracking-tight">
                        ₹{finalAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-mono text-gray-400">INR</span>
                    </div>
                  </div>
                </div>

                {/* Tab Toggle: Gateway Checkout vs On-the-Go QR Code */}
                <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-100/70 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab("gateway")}
                    className={`flex-1 py-1.5 sm:py-2 px-2 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      activePaymentTab === "gateway"
                        ? "bg-white text-blue-700 shadow-2xs font-extrabold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" /> Razorpay Gateway
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab("qr")}
                    className={`flex-1 py-1.5 sm:py-2 px-2 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      activePaymentTab === "qr"
                        ? "bg-white text-emerald-700 shadow-2xs font-extrabold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" /> Instant Scan (QR)
                  </button>
                </div>

                {/* TAB 1: RAZORPAY GATEWAY CHECKOUT */}
                {activePaymentTab === "gateway" ? (
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Billing Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="billing@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        required
                      />
                      <span className="block text-[10px] sm:text-xs text-gray-400 mt-1">
                        Official digital tax receipt emailed here automatically.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Mobile Phone (UPI / OTP) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || finalAmount <= 0}
                      className="w-full py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-base rounded-xl flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98 mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span>Connecting Gateway...</span>
                        </>
                      ) : (
                        <>
                          <span>Pay ₹{finalAmount.toLocaleString("en-IN")} via Razorpay</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* TAB 2: DYNAMIC ON-THE-GO QR CODE */
                  <div className="space-y-3 text-center">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-block mx-auto shadow-2xs">
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="Scan to pay"
                          className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-lg"
                        />
                      ) : (
                        <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        </div>
                      )}
                      <div className="mt-2 text-xs sm:text-sm font-bold text-gray-900">
                        Scan with any UPI App • ₹{finalAmount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">GPay, PhonePe, Paytm, BHIM</div>
                    </div>

                    {/* Copy UPI handle */}
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm">
                      <span className="text-gray-500 font-medium text-xs sm:text-sm">UPI ID:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-gray-900 font-bold text-xs sm:text-sm">{upiId}</span>
                        <button
                          type="button"
                          onClick={handleCopyUpiId}
                          className="text-blue-600 hover:text-blue-800 p-0.5 cursor-pointer"
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

                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                      Payee: <strong className="text-gray-900">{upiPayeeName}</strong>. Dynamic QR syncs with your amount.
                    </p>
                  </div>
                )}

                {/* Platform Safeguards Badges */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] sm:text-xs">
                    <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="block font-bold text-gray-800">UPI Instant</span>
                      <span className="block text-[9px] sm:text-[10px] text-gray-500">GPay • PhonePe</span>
                    </div>
                    <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="block font-bold text-gray-800">Cards &amp; EMI</span>
                      <span className="block text-[9px] sm:text-[10px] text-gray-500">Visa • RuPay</span>
                    </div>
                    <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="block font-bold text-gray-800">NetBanking</span>
                      <span className="block text-[9px] sm:text-[10px] text-gray-500">50+ Banks</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-gray-500 pt-0.5">
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
                </div>

                {/* Statutory Compliance Footer */}
                <div className="pt-2.5 border-t border-gray-100 text-center text-[10px] sm:text-xs text-gray-500 space-y-1">
                  <p className="font-semibold text-gray-800">
                    Merchant Legal Entity: <span className="text-blue-700 font-bold">CypherTech</span>
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Last updated on Sep 18th 2025 • Verified Razorpay Merchant
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-[10px] sm:text-[11px] text-blue-600">
                    <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund" target="_blank" rel="noopener noreferrer" className="hover:underline">Refunds</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping" target="_blank" rel="noopener noreferrer" className="hover:underline">Shipping</a>
                    <span className="text-gray-300">•</span>
                    <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── MOBILE STICKY BOTTOM ACTION BAR (Thumb Zone) ─── */}
          {/* Always accessible on small screens during package selection without scrolling */}
          {mobileStep === "package" && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 pl-14 py-2.5 shadow-lg flex items-center justify-between">
              <div>
                <div className="text-[9px] uppercase font-bold text-gray-400">Total Payable</div>
                <div className="text-base font-extrabold text-blue-700">
                  ₹{finalAmount.toLocaleString("en-IN")}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileStep("payment");
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer"
              >
                <span>Proceed to Pay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pt-16 sm:pt-20 pb-16">
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
