"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Crosshair,
  Target,
  Zap,
  Swords,
  Radio,
  ShieldCheck,
  Search,
  BarChart2,
  ShoppingCart,
  Layout,
  Mail,
  Lock,
  Crown,
  Skull,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";

// ── VALORANT FONTS ──
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raj",
});
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

// ── Valorant tokens ──
const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_PANEL = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

// ── Helpers ──
function CornerBrackets({ color = "rgba(255,70,85,0.9)", size = 14 }: { color?: string; size?: number }) {
  return (
    <>
      <span
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: size, height: size, borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}` }}
      />
      <span
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: size, height: size, borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}` }}
      />
      <span
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: size, height: size, borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}` }}
      />
      <span
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: size, height: size, borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }}
      />
    </>
  );
}

function ValorantCrosshair({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-8 h-8 flex items-center justify-center ${className}`}>
      <div className="absolute w-full h-[1px] bg-[#FF4655]/80" />
      <div className="absolute h-full w-[1px] bg-[#FF4655]/80" />
      <div className="w-1.5 h-1.5 bg-[#FF4655] rotate-45" />
      <div className="absolute inset-0 border border-[#FF4655]/30" style={{ clipPath: CLIP_PANEL }} />
    </div>
  );
}

// ── Data — preserved ──
const addonsData = [
  {
    title: "Advanced SEO Package",
    prices: { USD: 799, INR: 14999 },
    icon: Search,
    desc: "Technical SEO audit, keyword research, schema markup, Google Search Console setup, and monthly reporting.",
    accent: "#00E5FF",
  },
  {
    title: "Analytics Integration",
    prices: { USD: 499, INR: 9999 },
    icon: BarChart2,
    desc: "Google Analytics 4, Mixpanel or Hotjar setup, custom event tracking, and a live metrics dashboard.",
    accent: "#FFD700",
  },
  {
    title: "E-Commerce Integration",
    prices: { USD: 1499, INR: 39999 },
    icon: ShoppingCart,
    desc: "Stripe payments, product catalog, inventory management, order processing, and tax/shipping configurations.",
    accent: "#FF4655",
  },
  {
    title: "Custom Dashboard",
    prices: { USD: 1299, INR: 29999 },
    icon: Layout,
    desc: "Bespoke admin panel with real-time charts, user management, data export, and role-based access control.",
    accent: "#B14AFF",
  },
  {
    title: "Email System",
    prices: { USD: 599, INR: 11999 },
    icon: Mail,
    desc: "Transactional emails with Resend or SendGrid, templates, delivery tracking, and bounce handling.",
    accent: "#00E5FF",
  },
  {
    title: "Security Hardening",
    prices: { USD: 999, INR: 19999 },
    icon: Lock,
    desc: "Rate limiting, CSRF protection, input sanitization, penetration testing report, and compliance review.",
    accent: "#FF4655",
  },
];

const faqs = [
  {
    q: "What is included in every project regardless of plan?",
    a: "All projects include responsive design, SSL certificate, domain configuration, SEO baseline setup, hosting or cloud deployment, and post-launch support. We never charge extra for these fundamentals.",
  },
  {
    q: "How long does a typical project take?",
    a: "A Starter project typically takes 1 to 2 weeks. A Growth project takes between 2 to 4 weeks. Custom enterprise products vary depending on complexity but usually range from 4 to 8 weeks.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, we offer a 50/50 payment split for all flat fee per-project plans. 50% is due at project kickoff, and the remaining 50% is due upon successful deployment. Retainer plans are billed monthly.",
  },
  {
    q: "What happens after the included support period ends?",
    a: "You can opt for a monthly maintenance retainer which covers hosting management, minor text or visual edits, security monitoring, and regular backups. Otherwise, we charge a flat hourly rate for ad-hoc requests.",
  },
  {
    q: "Can I add features mid-project?",
    a: "Yes! You can easily scale your project mid-term by attaching any of our flat-rate Add-Ons. We'll simply integrate them into the sprint timeline and adjust the final payment milestone.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Yes, we can help refactor, upgrade, or add features to your existing React, Next.js, or Node.js codebases. We'll perform a thorough technical audit first to establish a solid roadmap.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"project" | "retainer">("project");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code !== "IN") {
          setCurrency("USD");
        }
      })
      .catch((err) => console.log("IP Geolocation check error:", err));
  }, []);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#0F1923", "#0a131c", "#0F1923"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBadgeY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroTitleY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroDescY = useTransform(heroScroll, [0, 1], [0, 30]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const plans = [
    {
      name: "Starter",
      sub: "STARTER",
      tag: "ESSENTIAL",
      code: "VLR-STARTER-01",
      price:
        currency === "USD"
          ? billingPeriod === "project"
            ? 2499
            : 1999
          : billingPeriod === "project"
            ? 49999
            : 39999,
      desc: "Perfect for landing pages, portfolios, and small business sites.",
      accent: "#00E5FF",
      accentSoft: "rgba(0,229,255,0.14)",
      features: [
        { text: "Up to 5 pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Custom database architecture", included: false },
        { text: "Authentication & User Roles", included: false },
        { text: "Basic SEO & domain setup", included: true },
        { text: "E-commerce integration", included: false },
        { text: "CMS for content management", included: false },
        { text: "Serverless Cloud deployment", included: true },
        { text: "1 round of revisions", included: true },
        { text: "30-day post-launch support", included: true },
        { text: "Custom animations & WebGL", included: false },
      ],
      btnText: "GET STARTED",
      ctaHref: "/#estimator",
      popular: false,
    },
    {
      name: "Growth",
      sub: "GROWTH",
      tag: "POPULAR",
      code: "VLR-GROWTH-02",
      price:
        currency === "USD"
          ? billingPeriod === "project"
            ? 6999
            : 5599
          : billingPeriod === "project"
            ? 149999
            : 119999,
      desc: "Full-stack web apps with auth, database, and production deployment.",
      accent: "#FF4655",
      accentSoft: "rgba(255,70,85,0.14)",
      features: [
        { text: "Up to 20 pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Custom database architecture", included: true },
        { text: "Authentication & User Roles", included: true },
        { text: "Advanced SEO & sitemaps", included: true },
        { text: "E-commerce integration", included: false },
        { text: "CMS for content management", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "3 rounds of revisions", included: true },
        { text: "90-day post-launch support", included: true },
        { text: "Custom animations & WebGL", included: false },
      ],
      btnText: "START PROJECT",
      ctaHref: "/#estimator",
      popular: true,
    },
    {
      name: "Enterprise",
      sub: "ENTERPRISE",
      tag: "SCALABLE",
      code: "VLR-ELITE-03",
      price: "Custom" as const,
      desc: "Complex platforms, SaaS products, and multi-tenant systems.",
      accent: "#FFD700",
      accentSoft: "rgba(255,215,0,0.12)",
      features: [
        { text: "Unlimited pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Custom database architecture", included: true },
        { text: "Authentication & User Roles", included: true },
        { text: "Enterprise SEO optimization", included: true },
        { text: "E-commerce integration", included: true },
        { text: "CMS for content management", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "Unlimited revisions", included: true },
        { text: "6-month post-launch support", included: true },
        { text: "Custom animations & WebGL", included: true },
      ],
      btnText: "REQUEST A QUOTE",
      ctaHref: "/#estimator",
      popular: false,
    },
  ];

  const formatVal = (val: number | string) => {
    if (typeof val === "string") return val;
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  return (
    <motion.div
      style={{ backgroundColor }}
      className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} min-h-screen bg-[#0F1923] text-[#ECE8E1] selection:bg-[#FF4655]/30 relative overflow-hidden`}
    >
      {/* valorant bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }}
        />
        <motion.div
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] left-[-10%] w-[42rem] h-[42rem] bg-[#FF4655]/10 blur-[120px] rounded-full"
        />
        <div className="absolute top-[18%] right-[-12%] w-[36rem] h-[36rem] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
      </div>

      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50">
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-16 md:space-y-20">
        {/* ── HERO — VALORANT ARSENAL PRICING ── */}
        <div ref={heroRef} className="relative pt-6 md:pt-4">
          {/* HUD top bar */}
          <motion.div style={{ y: heroBadgeY, opacity: heroOpacity }} className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white" style={{ clipPath: CLIP_BTN }}>
              <Swords className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)" }}>
                // ARSENAL // PRICING
              </span>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#768079] border border-[#1e2d3a] px-3 py-1.5 bg-[#111A23]/60"
              style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
            >
              <Radio className="w-3 h-3 text-[#FF4655] animate-pulse" /> VLR-PRICING-09 // SECURE
            </span>
            <span
              className="ml-auto hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> 03 TIERS // 06 ADD-ONS
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.div style={{ y: heroTitleY, opacity: heroOpacity }} className="relative">
                <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-[3px] bg-[#FF4655] hidden sm:block" />
                <p
                  className="text-[11px] tracking-[0.22em] text-[#FF4655] font-bold flex items-center gap-2 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="w-6 h-[2px] bg-[#FF4655]" /> ARSENAL // 09
                </p>
                <h1 className="text-[2.95rem] sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.86] tracking-[-0.02em]" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="block text-[#ECE8E1]">SIMPLE PLANS,</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff6b7a] relative">
                    NO SURPRISES
                    <span className="absolute -right-2 -top-1 text-[#FF4655] text-2xl md:text-3xl font-black">//</span>
                  </span>
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-[3px] w-24 bg-[#FF4655]" />
                  <div className="h-[1px] flex-1 bg-[#1e2d3a] max-w-[420px]" />
                  <Crosshair className="hidden sm:block w-5 h-5 text-[#FF4655]/70" />
                </div>
              </motion.div>

              <motion.p
                style={{ y: heroDescY, opacity: heroOpacity, fontFamily: "var(--font-raj)" } as any}
                className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl"
              >
                <span className="text-[#ECE8E1] font-semibold">Every plan includes a full production-ready feature set.</span>
                <span className="text-[#768079] font-medium"> Pay for what you need, add more as you grow — valorant-grade transparency, no fog of war.</span>
              </motion.p>

              <motion.div
                style={{ y: heroDescY, opacity: heroOpacity }}
                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 pt-2"
              >
                {/* Billing toggle - valorant segmented */}
                <div
                  className="flex items-center gap-1 p-1 bg-[#0a131c] border border-[#1e2d3a]"
                  style={{ clipPath: CLIP_PANEL }}
                >
                  <button
                    type="button"
                    onClick={() => setBillingPeriod("project")}
                    className={`px-5 py-2.5 text-xs font-black tracking-[0.14em] transition-colors ${billingPeriod === "project" ? "bg-[#FF4655] text-white" : "text-[#768079] hover:text-[#ECE8E1] bg-transparent"}`}
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                  >
                    PER PROJECT
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingPeriod("retainer")}
                    className={`px-5 py-2.5 text-xs font-black tracking-[0.14em] transition-colors flex items-center gap-2 ${billingPeriod === "retainer" ? "bg-[#FF4655] text-white" : "text-[#768079] hover:text-[#ECE8E1] bg-transparent"}`}
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                  >
                    RETAINER{" "}
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500 text-white leading-none" style={{ clipPath: CLIP_BTN }}>
                      SAVE 20%
                    </span>
                  </button>
                </div>

                {/* Currency selector - valorant clipped */}
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="currency"
                    className="text-[11px] font-black tracking-[0.16em] text-[#768079]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    CURRENCY //
                  </label>
                  <div className="relative">
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="appearance-none bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] pl-4 pr-9 py-2.5 text-xs font-bold tracking-wide focus:outline-none focus:border-[#FF4655]/50 cursor-pointer"
                      style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                    >
                      <option value="USD">🇺🇸 USD ($)</option>
                      <option value="INR">🇮🇳 INR (₹)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#768079]" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 pt-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {[
                  { k: "COVER", v: "ALL PLANS INCLUDE SSL + SEO", dot: "bg-emerald-400" },
                  { k: "STACK", v: "NEXT.JS // CLOUD" },
                  { k: "SUPPORT", v: "30–180 DAYS" },
                ].map((c) => (
                  <span
                    key={c.k}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111A23] border border-[#1e2d3a] text-[11px] tracking-widest"
                    style={{ clipPath: CLIP_BTN }}
                  >
                    {c.dot && <span className={`w-1.5 h-1.5 ${c.dot} animate-pulse`} />}
                    <span className="text-[#768079]">{c.k}</span>
                    <span className="text-[#ECE8E1] font-bold">{c.v}</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* right tactical dossier card — valorant agent preview with tactical image */}
            <motion.div style={{ y: heroDescY, opacity: heroOpacity }} className="lg:col-span-5 relative hidden lg:block">
              <div className="relative bg-[#111A23] border border-[#243442] p-[1px]" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] z-10" />
                <div className="bg-[#0F1923] overflow-hidden relative" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.5)" size={12} />
                  {/* image header */}
                  <div className="relative h-[220px] overflow-hidden border-b border-[#1e2d3a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
                      alt="Tactical deployment"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/40 to-transparent" />
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(-45deg,transparent_0_12px,rgba(255,70,85,0.5)_12px_13px)]" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.14em]"
                        style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                      >
                        // PRICING DOSSIER
                      </span>
                      <span
                        className="px-2 py-1 bg-[#0F1923]/80 border border-[#1e2d3a] text-[#00E5FF] text-[10px] tracking-[0.12em]"
                        style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                      >
                        ARSENAL // ACTIVE
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-[#FF4655] animate-pulse" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                      <div
                        className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white font-black"
                        style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)" }}
                      >
                        CT
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-wide text-white leading-none" style={{ fontFamily: "var(--font-raj)" }}>
                          CYPHER TECH // ARSENAL
                        </p>
                        <p className="text-[11px] tracking-widest text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
                          TIER-01 → ELITE // 09
                        </p>
                      </div>
                      <Skull className="ml-auto w-4 h-4 text-white/60" />
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { l: "TIERS", v: "03" },
                        { l: "ADD-ONS", v: "06" },
                        { l: "FAQ", v: "06" },
                      ].map((s) => (
                        <div key={s.l} className="bg-[#0a131c] border border-[#1e2d3a] px-2 py-2.5 text-center" style={{ clipPath: CLIP_PANEL }}>
                          <p className="text-[10px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                            {s.l}
                          </p>
                          <p className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                            {s.v}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                      <span className="w-1 h-1 bg-[#FF4655]" /> ULT READY // CHOOSE LOADOUT
                    </div>
                    <div className="flex gap-2">
                      <span className="flex-1 h-1 bg-[#FF4655]" />
                      <span className="flex-1 h-1 bg-[#1e2d3a]" />
                      <span className="flex-1 h-1 bg-[#1e2d3a]" />
                    </div>
                  </div>
                </div>
              </div>
              <ValorantCrosshair className="absolute -top-4 -right-4 hidden xl:flex" />
              <div
                className="absolute -bottom-5 -left-4 bg-[#0a131c] border border-[#1e2d3a] px-4 py-2.5 flex items-center gap-3"
                style={{ clipPath: CLIP_BTN }}
              >
                <Shield className="w-5 h-5 text-[#00E5FF]" />
                <div>
                  <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                    SECURE TRANSACTION
                  </p>
                  <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    SSL // ENCRYPTED
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── PRICING CARDS — VALORANT DOSSIER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 items-stretch">
          {plans.map((plan, idx) => {
            const isGold = plan.accent === "#FFD700";
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.08, duration: 0.55 }}
                className={`relative bg-[#111A23] p-[1px] flex flex-col overflow-hidden group ${plan.popular ? "border-[#FF4655] lg:scale-[1.03] lg:-translate-y-2 shadow-[0_0_40px_rgba(255,70,85,0.15)]" : "border-[#1e2d3a]"}`}
                style={{ clipPath: CLIP_CARD, borderWidth: "1px" }}
              >
                {/* accent rails */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] z-20" style={{ background: plan.accent }} />
                <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-70 z-20" style={{ background: plan.accent }} />

                {/* popular badge ribbon */}
                {plan.popular && (
                  <div
                    className="absolute top-0 right-0 z-30 px-4 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em] flex items-center gap-1.5"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                  >
                    <Crown className="w-3.5 h-3.5" /> // MOST PICKED
                  </div>
                )}

                <div
                  className="relative bg-[#0F1923] flex flex-col flex-1 p-7 md:p-8 overflow-hidden"
                  style={{ clipPath: CLIP_CARD }}
                >
                  {/* tactical image watermark */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity"
                  />
                  {/* hazard stripe watermark */}
                  <div
                    className="absolute -right-24 -top-24 w-[420px] h-[420px] opacity-[0.035] pointer-events-none"
                    style={{ background: `repeating-linear-gradient(-45deg, ${plan.accent} 0 2px, transparent 2px 10px)` }}
                  />
                  {/* 01-03 watermark */}
                  <div
                    className="absolute -right-1 -bottom-6 text-[8.5rem] leading-none font-black opacity-[0.04] select-none pointer-events-none"
                    style={{ fontFamily: "var(--font-bebas)", color: plan.accent }}
                  >
                    0{idx + 1}
                  </div>

                  <CornerBrackets color={plan.popular ? "#FF4655" : plan.accent} size={14} />

                  <div className="relative z-10 flex flex-col flex-1">
                    {/* top meta */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-[10px] font-bold tracking-[0.18em] px-2.5 py-1"
                        style={{ fontFamily: "var(--font-mono)", background: plan.accent, color: isGold || plan.accent === "#00E5FF" ? "#0F1923" : "#fff", clipPath: CLIP_BTN }}
                      >
                        {plan.code}
                      </span>
                      <span
                        className={`text-[10px] font-black tracking-[0.14em] px-2.5 py-1 border ${plan.popular ? "bg-[#FF4655]/10 text-[#FF4655] border-[#FF4655]/20" : "bg-[#0a131c] text-[#768079] border-[#1e2d3a]"}`}
                        style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
                      >
                        {plan.tag}
                      </span>
                      {plan.popular && <span className="ml-auto w-1.5 h-1.5 bg-[#FF4655] animate-pulse hidden sm:block" />}
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-6" style={{ background: plan.accent }} />
                      <h3 className="text-[11px] font-black tracking-[0.16em] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", color: plan.accent }}>
                        // {plan.sub}
                      </h3>
                    </div>

                    <h3 className="text-[1.9rem] md:text-[2.1rem] leading-none tracking-tight text-[#ECE8E1] mb-2" style={{ fontFamily: "var(--font-anton)" }}>
                      {plan.name.toUpperCase()}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl md:text-4xl font-black tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                        {formatVal(plan.price)}
                      </span>
                      {typeof plan.price === "number" && (
                        <span className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          {billingPeriod === "project" ? "// FLAT FEE" : "// PER MONTH"}
                        </span>
                      )}
                    </div>
                    {typeof plan.price === "number" && (
                      <p className="text-[11px] tracking-widest text-[#768079] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                        {billingPeriod === "project" ? "ONE-TIME // DEPLOY" : "RETAINER // MONTHLY"}
                      </p>
                    )}
                    {plan.price === "Custom" && (
                      <p className="text-[11px] tracking-widest text-[#768079] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                        TAILORED // SCOPE
                      </p>
                    )}

                    <div className="h-px w-full bg-[#1e2d3a] mb-4" />

                    <p className="text-[13px] md:text-[14px] leading-relaxed font-medium mb-6" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                      {plan.desc}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs">
                          {feat.included ? (
                            <div
                              className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                              style={{ clipPath: CLIP_BTN }}
                            >
                              <Check className="w-3 h-3" />
                            </div>
                          ) : (
                            <div
                              className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#768079] bg-[#0a131c] border border-[#1e2d3a]"
                              style={{ clipPath: CLIP_BTN }}
                            >
                              <X className="w-3 h-3" />
                            </div>
                          )}
                          <span
                            className={`leading-relaxed font-bold ${feat.included ? "text-[#ECE8E1]" : "text-[#768079]/60 line-through"}`}
                            style={{ fontFamily: "var(--font-raj)" }}
                          >
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={plan.ctaHref}
                      className={`mt-auto w-full py-3.5 text-center text-xs font-black tracking-[0.16em] transition-colors flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-[#FF4655] text-white hover:bg-[#e03a49] border border-[#FF4655]"
                          : "bg-[#ECE8E1] text-[#0F1923] hover:bg-white border border-[#ECE8E1] hover:border-white"
                      }`}
                      style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                    >
                      {plan.btnText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <p className="text-center text-[10px] tracking-[0.14em] text-[#768079]/60 mt-3" style={{ fontFamily: "var(--font-mono)" }}>
                      {plan.popular ? "● POPULAR // NDA-FIRST" : "○ NDA-FIRST // 48H PROPOSAL"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── ADD-ONS — VALORANT TAC PANELS ── */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]"
              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
            >
              <Zap className="w-3.5 h-3.5" /> // LOADOUT // ADD-ONS
            </p>
            <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">EXTEND YOUR</span> <span className="text-[#00E5FF]">CAPABILITIES</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-10 bg-[#00E5FF]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                Integrate powerful specialized features into any base plan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addonsData.map((addon, aIdx) => {
              const Icon = addon.icon;
              const isGold = addon.accent === "#FFD700";
              const isCyan = addon.accent === "#00E5FF";
              const iconBg = addon.accent;
              const iconColor = isGold || isCyan ? "#0F1923" : "#fff";
              return (
                <motion.div
                  key={aIdx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: aIdx * 0.06 }}
                  className="relative bg-[#0a131c] border border-[#1e2d3a] p-[1px] group hover:border-[#2a3a4a] transition-colors flex flex-col h-full"
                  style={{ clipPath: CLIP_PANEL }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-80" style={{ background: addon.accent }} />
                  <div className="bg-[#0a131c] p-6 flex flex-col flex-1 relative overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
                    <CornerBrackets color="rgba(236,232,225,0.10)" size={10} />
                    {/* watermark number */}
                    <div
                      className="absolute -right-1 -bottom-2 text-7xl leading-none font-black opacity-[0.04] select-none pointer-events-none"
                      style={{ fontFamily: "var(--font-bebas)", color: addon.accent }}
                    >
                      0{aIdx + 1}
                    </div>

                    <div className="flex justify-between items-start gap-4 mb-4 relative z-10">
                      <div
                        className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-[#1e2d3a]"
                        style={{ background: iconBg, clipPath: CLIP_BTN }}
                      >
                        <Icon className="w-5 h-5" style={{ color: iconColor }} />
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs line-through text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                          {formatVal(addon.prices[currency as "USD" | "INR"])}
                        </span>
                        <span className="text-xl font-black tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                          +{formatVal(Math.round(addon.prices[currency as "USD" | "INR"] * 0.4))}
                        </span>
                        <span
                          className="text-[10px] font-black tracking-[0.14em] px-2 py-1 mt-1 bg-[#FF4655] text-white"
                          style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                        >
                          60% OFF // ADD-ON
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-[2px]" style={{ background: addon.accent }} />
                        <span className="text-[10px] font-black tracking-[0.14em]" style={{ fontFamily: "var(--font-mono)", color: addon.accent }}>
                          SPEC // 0{aIdx + 1}
                        </span>
                      </div>
                      <h4
                        className="text-[1.15rem] font-black tracking-wide text-[#ECE8E1] leading-none mb-3 group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-anton)" }}
                      >
                        {addon.title.toUpperCase()}
                      </h4>
                      <p className="text-[13px] leading-relaxed font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                        {addon.desc}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[11px] tracking-widest font-bold relative z-10" style={{ fontFamily: "var(--font-mono)", color: addon.accent }}>
                      <span className="w-1 h-1" style={{ background: addon.accent }} /> TACTICAL // READY
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── FAQS — VALORANT ACCORDION ── */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#FF4655] text-[11px] font-black tracking-[0.18em]"
              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> // COMMS // FAQ
            </p>
            <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">COMMON</span> <span className="text-[#FF4655]">QUESTIONS</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-10 bg-[#FF4655]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                Everything you need to know before insertion.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = activeFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className={`relative bg-[#111A23] border p-[1px] overflow-hidden transition-colors ${isOpen ? "border-[#FF4655]/40" : "border-[#1e2d3a] hover:border-[#2a3a4a]"}`}
                  style={{ clipPath: CLIP_PANEL }}
                >
                  {isOpen && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]" />}
                  <div className="bg-[#0F1923] relative overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
                    <CornerBrackets color={isOpen ? "rgba(255,70,85,0.4)" : "rgba(236,232,225,0.08)"} size={10} />
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                      className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 hover:bg-[#0a131c]/50 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="hidden sm:inline-flex w-7 h-7 items-center justify-center text-[11px] font-black bg-[#0a131c] border border-[#1e2d3a] text-[#768079]"
                          style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                        >
                          0{fIdx + 1}
                        </span>
                        <span className="text-[15px] md:text-[16px] font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                          {faq.q}
                        </span>
                      </span>
                      <div
                        className={`w-8 h-8 flex items-center justify-center shrink-0 border transition-colors ${isOpen ? "bg-[#FF4655] border-[#FF4655] text-white" : "bg-[#0a131c] border-[#1e2d3a] text-[#768079] group-hover:border-[#FF4655]/30"}`}
                        style={{ clipPath: CLIP_BTN }}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="px-5 md:px-6 pb-6 pt-0">
                            <div className="h-px w-full bg-[#1e2d3a] mb-4" />
                            <p className="text-[14px] leading-relaxed font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA — SPIKE PLANT ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#FF4655] p-[1px]"
          style={{ clipPath: CLIP_CARD }}
        >
          <div className="relative bg-[#0F1923] p-8 md:p-12 lg:p-14 text-center overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[60%] h-[220%] bg-[#FF4655]/[0.06] rotate-[18deg] pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
            <CornerBrackets color="#FF4655" size={16} />

            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]"
                style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
              >
                <span className="w-1.5 h-1.5 bg-white animate-pulse" /> SPIKE PLANTED // READY FOR INSERTION
              </div>

              <h3 className="text-3xl md:text-5xl leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">READY TO BRING YOUR</span> <span className="text-[#FF4655]">VISION</span>
                <br />
                <span className="text-[#ECE8E1]">TO LIFE?</span>
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                Let&apos;s build something exceptional together. Book a free discovery call to discuss your vision, and we&apos;ll craft a detailed technical roadmap.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/#estimator"
                  className="group relative inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white px-8 py-4 font-black tracking-widest hover:bg-[#e03a49] transition-colors w-full sm:w-auto"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                  <span className="relative flex items-center gap-2 text-sm">
                    REQUEST A QUOTE <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <span className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  NDA-FIRST // 48H PROPOSAL
                </span>
              </div>

              <div
                className="flex flex-wrap items-center justify-center gap-3 pt-3 text-[11px] tracking-widest text-[#768079]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NDA-FIRST DISCOVERY
                </span>
                <span className="w-1 h-1 bg-[#1e2d3a]" />
                <span>FIXED-PRICE SPRINTS</span>
                <span className="w-1 h-1 bg-[#1e2d3a]" />
                <span>CANCEL ANYTIME</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* footer tag */}
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#768079]/60" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-PRICING // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
        </div>
      </div>
    </motion.div>
  );
}
