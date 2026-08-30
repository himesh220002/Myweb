"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Quote,
  ArrowRight,
  TrendingUp,
  Zap,
  Clock,
  ShieldCheck,
  Crosshair,
  Target,
  Shield,
  Timer,
  Users,
  Building2,
  Globe2,
  Swords,
  Skull,
  Trophy,
  Crown,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono, Orbitron } from "next/font/google";

// ── VALORANT FONTS ──
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raj",
});
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });
const orbitron = Orbitron({ weight: ["600", "800"], subsets: ["latin"], variable: "--font-orbitron" });

// ──────────────────────────────────────────────────────────────
// Valorant tokens
// ──────────────────────────────────────────────────────────────
const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_PANEL = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

// ──────────────────────────────────────────────────────────────
// Data — kept, just re-skinned
// ──────────────────────────────────────────────────────────────
const clientLogos = [
  { name: "TechFlow AI", code: "TFA-07", logo: "TA" },
  { name: "Global Logistics", code: "GLX-01", logo: "GL" },
  { name: "Nexus Health", code: "NXH-04", logo: "NH" },
  { name: "Vertex Fin", code: "VTF-09", logo: "VF" },
  { name: "Quantum E-Comm", code: "QTE-03", logo: "QE" },
  { name: "Orbit Media", code: "OBM-06", logo: "OM" },
  { name: "Apex Dynamics", code: "APD-02", logo: "AD" },
  { name: "Stellar Cloud", code: "STC-05", logo: "SC" },
];

const trustStats = [
  { value: "50+", label: "MISSIONS // SHIPPED", sub: "0→1 & SCALE OPS", icon: Target },
  { value: "99.99%", label: "UPTIME // SLA", sub: "ANTI-LAG INFRA", icon: Shield },
  { value: "4.9/5", label: "COMBAT RATING", sub: "50+ VERIFIED EXFILS", icon: Crown },
  { value: "<24H", label: "RESPONSE // TAC", sub: "ELITE SUPPORT SQUAD", icon: Timer },
];

const caseStudies = [
  {
    client: "Global Logistics",
    code: "DOSSIER // GLX-01",
    industry: "SUPPLY CHAIN // TIER-1",
    quote:
      "CypherTech delivered a complex enterprise dashboard that increased our operational efficiency by 400%. The technical debt was eliminated entirely.",
    author: "Cypher Harley, COO",
    accent: "#FF4655",
    accentSoft: "rgba(255,70,85,0.15)",
    metrics: [
      { label: "Efficiency", value: "400%", icon: TrendingUp },
      { label: "Query Load", value: "<2s", icon: Zap },
      { label: "Downtime", value: "ZERO", icon: ShieldCheck },
      { label: "Daily Req", value: "1.2M", icon: Clock },
    ],
  },
  {
    client: "Vertex Fin",
    code: "DOSSIER // VTF-09",
    industry: "FINTECH // BLACKSITE",
    quote:
      "Our payment gateway needed absolute precision and zero-latency architecture. They delivered a system that securely processes millions in volume daily.",
    author: "Himesh Satyam, CTO",
    accent: "#00E5FF",
    accentSoft: "rgba(0,229,255,0.12)",
    metrics: [
      { label: "Tx Volume", value: "$50M+", icon: TrendingUp },
      { label: "Latency", value: "<50MS", icon: Zap },
      { label: "Uptime", value: "99.99%", icon: ShieldCheck },
      { label: "Conv. Lift", value: "32%", icon: Trophy },
    ],
  },
];

const transmissions = [
  {
    id: "TX-01",
    quote: "The cleanest handoff we've ever had. Architecture docs, runbooks, and a codebase our team actually loves to extend.",
    author: "Sarah Jenkins",
    role: "Director of E-Commerce",
    avatarSeed: "Sarah",
  },
  {
    id: "TX-02",
    quote: "They think like owners – not vendors. Every decision tied back to revenue, retention and speed to market.",
    author: "David Chen",
    role: "Founder, TechFlow AI",
    avatarSeed: "David",
  },
  {
    id: "TX-03",
    quote: "From prototype to production in 6 weeks without cutting a single corner on security or polish.",
    author: "Marcus Thorne",
    role: "CTO, Global Logistics",
    avatarSeed: "Marcus",
  },
];

const protocols = [
  {
    step: "01",
    title: "RECON // BLUEPRINT",
    desc: "Audit product, map data flows, lock timeline & budget. Zero ambiguity insertion.",
  },
  {
    step: "02",
    title: "LOADOUT // PROTOTYPE",
    desc: "High-fidelity prototypes validated IRL. You green-light every pixel before code.",
  },
  {
    step: "03",
    title: "ENGAGE // SPRINTS",
    desc: "Weekly demos, staging previews, automated QA. No black boxes, no fog of war.",
  },
  {
    step: "04",
    title: "EXTRACT // SCALE",
    desc: "CI/CD to prod, observability + 30-day hypercare. We exfil only when KPIs move.",
  },
];

// ──────────────────────────────────────────────────────────────
// Helpers — Valorant HUD bits
// ──────────────────────────────────────────────────────────────
function CornerBrackets({ color = "rgba(255,70,85,0.9)", size = 14 }: { color?: string; size?: number }) {
  return (
    <>
      <span
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderLeft: `2px solid ${color}`,
          borderTop: `2px solid ${color}`,
        }}
      />
      <span
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRight: `2px solid ${color}`,
          borderTop: `2px solid ${color}`,
        }}
      />
      <span
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderLeft: `2px solid ${color}`,
          borderBottom: `2px solid ${color}`,
        }}
      />
      <span
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRight: `2px solid ${color}`,
          borderBottom: `2px solid ${color}`,
        }}
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

// ──────────────────────────────────────────────────────────────
// Case Study — Valorant Dossier Card
// ──────────────────────────────────────────────────────────────
function DossierCard({ study, idx }: { study: (typeof caseStudies)[number]; idx: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  const yRange: [number, number] = idx % 2 === 0 ? [50, -50] : [90, -90];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const entrance = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotateY = useTransform(entrance, [0, 1], idx % 2 === 0 ? [-10, 0] : [10, 0]);
  const scale = useTransform(entrance, [0, 1], [0.96, 1]);
  const opacity = useTransform(entrance, [0, 1], [0.45, 1]);

  return (
    <div style={{ perspective: "1400px" }} className="w-full">
      <motion.div
        ref={ref}
        style={{ y, rotateY, scale, opacity, clipPath: CLIP_CARD }}
        className="relative bg-[#111A23] border border-[#2a3a4a] p-[1px] overflow-hidden group"
      >
        {/* outer red/cyan accent rail */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: study.accent }} />
        <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-60" style={{ background: study.accent }} />

        {/* inner panel */}
        <div className="relative bg-[#0F1923] p-6 md:p-8 lg:p-10 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          {/* diagonal hazard stripe watermark */}
          <div
            className="absolute -right-20 -top-20 w-[380px] h-[380px] opacity-[0.04] pointer-events-none"
            style={{
              background: `repeating-linear-gradient(-45deg, ${study.accent} 0 2px, transparent 2px 10px)`,
            }}
          />
          {/* agent number watermark */}
          <div
            className={`${bebas.variable} font-bebas absolute -right-2 -bottom-6 text-[9rem] leading-none font-black opacity-[0.04] select-none pointer-events-none`}
            style={{ fontFamily: "var(--font-bebas)", color: study.accent }}
          >
            0{idx + 1}
          </div>

          <CornerBrackets color={study.accent} size={16} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* left */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`${jetmono.variable} text-[10px] font-bold tracking-[0.18em] px-2.5 py-1`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: study.accent,
                    color: study.accent === "#00E5FF" ? "#0F1923" : "#fff",
                    clipPath: CLIP_BTN,
                  }}
                >
                  {study.code}
                </span>
                <span
                  className={`${jetmono.variable} text-[10px] tracking-[0.14em] border px-2.5 py-1 text-[#768079]`}
                  style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(236,232,225,0.12)", clipPath: CLIP_BTN }}
                >
                  {study.industry}
                </span>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-emerald-300">
                  <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <div className="w-1 h-7" style={{ background: study.accent }} />
                <h3
                  className={`${anton.variable} text-[11px] md:text-xs font-bold tracking-[0.16em] text-[#FF4655]`}
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  // COMMS TRANSCRIPT
                </h3>
              </div>

              <div className="relative">
                <Quote className="absolute -top-3 -left-2 w-6 h-6 text-white/10 rotate-180" />
                <p
                  className={`${rajdhani.variable} text-[1.15rem] md:text-[1.45rem] font-semibold leading-[1.25] text-[#ECE8E1]`}
                  style={{ fontFamily: "var(--font-raj)" }}
                >
                  “{study.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#1e2d3a] mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${study.author}`}
                  alt={study.author}
                  className="w-9 h-9 border border-[#2a3a4a] bg-[#111A23] object-cover"
                  style={{ clipPath: CLIP_BTN }}
                />
                <div>
                  <p
                    className={`${rajdhani.variable} text-sm font-bold tracking-wide text-[#ECE8E1] leading-none`}
                    style={{ fontFamily: "var(--font-raj)" }}
                  >
                    {study.author.split(",")[0].toUpperCase()}
                  </p>
                  <p className={`${jetmono.variable} text-[11px] tracking-widest text-[#768079]`} style={{ fontFamily: "var(--font-mono)" }}>
                    {study.author.split(",")[1]?.trim().toUpperCase()}
                  </p>
                </div>
                <Crosshair className="ml-auto hidden sm:flex opacity-50" />
              </div>
            </div>

            {/* right metrics */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="relative bg-[#0a131c] border border-[#1e2d3a] p-4 md:p-5 overflow-hidden group/metric hover:border-[#2e4154] transition-colors"
                  style={{ clipPath: CLIP_PANEL }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-70" style={{ background: study.accent }} />
                  <CornerBrackets color="rgba(236,232,225,0.18)" size={8} />
                  <m.icon className="w-4 h-4 mb-3" style={{ color: study.accent }} />
                  <p
                    className={`${anton.variable} text-2xl md:text-3xl leading-none text-[#ECE8E1]`}
                    style={{ fontFamily: "var(--font-anton)" }}
                  >
                    {m.value}
                  </p>
                  <p
                    className={`${jetmono.variable} text-[10px] tracking-[0.14em] text-[#768079] mt-1`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {m.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default function ClientsPageValorant() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#0F1923", "#0a131c", "#0F1923"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBadgeY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroTitleY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroDescY = useTransform(heroScroll, [0, 1], [0, 30]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const trustRef = useRef(null);
  const { scrollYProgress: trustScroll } = useScroll({ target: trustRef, offset: ["0 1", "0.6 1"] });
  const trustY = useTransform(trustScroll, [0, 1], [30, 0]);
  const trustOpacity = useTransform(trustScroll, [0, 1], [0, 1]);

  const engageRef = useRef(null);
  const { scrollYProgress: engageScroll } = useScroll({ target: engageRef, offset: ["0 1", "0.7 1"] });

  return (
    <motion.div
      style={{ backgroundColor }}
      className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} ${orbitron.variable} min-h-screen bg-[#0F1923] text-[#ECE8E1] selection:bg-[#FF4655]/30 relative overflow-hidden`}
    >
      {/* scanline + grain */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        {/* valorant diagonal grid */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)",
          }}
        />
        {/* red aurora */}
        <motion.div
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] left-[-10%] w-[42rem] h-[42rem] bg-[#FF4655]/10 blur-[120px] rounded-full"
        />
        <div className="absolute top-[18%] right-[-12%] w-[36rem] h-[36rem] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />
        {/* top red bar (valorant header rule) */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
      </div>

      {/* scroll progress — valorant notched */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50"
      >
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-16 md:space-y-20">
        {/* ── HERO — VALORANT AGENT SELECT ── */}
        <div ref={heroRef} className="relative pt-6 md:pt-4">
          {/* HUD top bar */}
          <motion.div style={{ y: heroBadgeY, opacity: heroOpacity }} className="flex flex-wrap items-center gap-3 mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white"
              style={{ clipPath: CLIP_BTN }}
            >
              <Swords className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)" }}>
                // PROTOCOL: ELITE
              </span>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#768079] border border-[#1e2d3a] px-3 py-1.5 bg-[#111A23]/60"
              style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
            >
              <Radio className="w-3 h-3 text-[#FF4655] animate-pulse" /> VLR-CLIENTS-09 // SECURE
            </span>
            <span
              className="ml-auto hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> 32 AGENTS ONLINE
            </span>
          </motion.div>

          {/* Title block with red slash */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <motion.div style={{ y: heroTitleY, opacity: heroOpacity }} className="relative">
                {/* vertical red rail */}
                <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-[3px] bg-[#FF4655] hidden sm:block" />
                <p
                  className="text-[11px] tracking-[0.22em] text-[#FF4655] font-bold flex items-center gap-2 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="w-6 h-[2px] bg-[#FF4655]" /> CLIENT DOSSIER // 09
                </p>
                <h1
                  className="text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.86] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  <span className="block text-[#ECE8E1]">TRUSTED BY</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff6b7a] relative">
                    INDUSTRY LEADERS
                    <span className="absolute -right-2 -top-1 text-[#FF4655] text-2xl md:text-3xl font-black">//</span>
                  </span>
                </h1>
                {/* red underline slash */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-[3px] w-24 bg-[#FF4655]" />
                  <div className="h-[1px] flex-1 bg-[#1e2d3a] max-w-[420px]" />
                  <Crosshair className="hidden sm:flex opacity-80" />
                </div>
              </motion.div>

              <motion.p
                style={{ y: heroDescY, opacity: heroOpacity, fontFamily: "var(--font-raj)" } as any}
                className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl"
              >
                <span className="text-[#ECE8E1] font-semibold">
                  From ambitious startups to global enterprises
                </span>
                <span className="text-[#768079] font-medium">
                  {" "}
                  — we deploy with valorant-grade precision. Digital products that dominate their lobbies.
                </span>
              </motion.p>

              <motion.div style={{ y: heroDescY, opacity: heroOpacity }} className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-7 py-3.5 font-black tracking-wide hover:bg-[#ff3344] transition-colors"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                  <span className="relative flex items-center gap-2 text-sm">
                    INITIATE // PROJECT ALPHA <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#ECE8E1]/20 text-[#ECE8E1] bg-[#ECE8E1]/[0.06] hover:bg-[#ECE8E1]/10 hover:border-[#ECE8E1]/30 transition-colors text-sm font-bold tracking-wide"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                >
                  VIEW DOSSIERS <span className="text-[#FF4655]">▶</span>
                </Link>
              </motion.div>

              {/* hud chips */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 pt-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {[
                  { k: "UPTIME", v: "99.99%", dot: "bg-emerald-400" },
                  { k: "SQUADS", v: "50+ SHIPPED" },
                  { k: "RANGE", v: "F500 → SEED" },
                  { k: "COMMS", v: "WORLDWIDE" },
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

            {/* right tactical card — valorant agent preview */}
            <motion.div
              style={{ y: heroDescY, opacity: heroOpacity }}
              className="lg:col-span-4 relative hidden lg:block"
            >
              <div className="relative bg-[#111A23] border border-[#243442] p-[1px]" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF4655]" />
                <div className="bg-[#0F1923] p-5" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.5)" size={12} />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.2em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                      // AGENT PREVIEW
                    </span>
                    <span className="w-2 h-2 bg-[#FF4655] animate-pulse" />
                  </div>
                  {/* mock agent stats like valorant buy screen */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white font-black"
                        style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)" }}
                      >
                        CT
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                          CYPHER TECH
                        </p>
                        <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          CONTROLLER // INITIATOR
                        </p>
                      </div>
                      <Skull className="ml-auto w-4 h-4 text-[#FF4655]/60" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1e2d3a]">
                      {[
                        { l: "HEADSHOT%", v: "68%" },
                        { l: "CLUTCH", v: "1v4" },
                        { l: "ACS", v: "412" },
                      ].map((s) => (
                        <div key={s.l} className="bg-[#0a131c] border border-[#1e2d3a] px-2 py-2 text-center" style={{ clipPath: CLIP_PANEL }}>
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
                      <span className="w-1 h-1 bg-[#FF4655]" /> ULT READY // SPIKE PLANTED
                    </div>
                  </div>
                </div>
              </div>
              {/* valorant crosshair floating */}
              <ValorantCrosshair className="absolute -top-4 -right-4 hidden xl:flex" />
            </motion.div>
          </div>
        </div>

        {/* ── HUD STATS ── */}
        <motion.div
          ref={trustRef}
          style={{ y: trustY, opacity: trustOpacity }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {trustStats.map((s) => (
            <div
              key={s.label}
              className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] hover:border-[#2e4154] transition-colors group"
              style={{ clipPath: CLIP_PANEL }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655] opacity-80" />
              <div className="bg-[#0F1923] p-4 md:p-5 relative overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] rotate-12">
                  <s.icon className="w-20 h-20 text-[#ECE8E1]" />
                </div>
                <CornerBrackets color="rgba(236,232,225,0.14)" size={10} />
                <s.icon className="w-4 h-4 text-[#FF4655] mb-3" />
                <p className="text-2xl md:text-3xl leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                  {s.value}
                </p>
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#ECE8E1] mt-1" style={{ fontFamily: "var(--font-raj)" }}>
                  {s.label}
                </p>
                <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── AGENT ROSTER MARQUEE — VALORANT SELECT ── */}
        <div className="relative w-[100vw] left-1/2 -translate-x-1/2 border-y border-[#1e2d3a] bg-[#0a131c] overflow-hidden py-6">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_40px,rgba(255,70,85,0.04)_40px_41px)] pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a131c] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a131c] to-transparent z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-4">
            <p className="text-[11px] tracking-[0.2em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-2 h-2 bg-[#FF4655]" /> AGENT ROSTER // TRUSTED SQUADS
            </p>
            <p
              className="hidden md:flex items-center gap-2 text-[11px] tracking-widest text-[#768079]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> LIVE LOBBY
            </p>
          </div>

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            className="flex items-center gap-3 whitespace-nowrap min-w-max px-4"
          >
            {[...clientLogos, ...clientLogos].map((c, i) => (
              <div
                key={`r1-${i}`}
                className="flex items-center gap-3 bg-[#111A23] border border-[#1e2d3a] px-4 py-2.5 shrink-0 hover:border-[#FF4655]/40 hover:bg-[#16202c] transition-colors group"
                style={{ clipPath: CLIP_BTN }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-black bg-[#0F1923] border border-[#243442] text-[#ECE8E1] group-hover:bg-[#FF4655] group-hover:text-white group-hover:border-[#FF4655] transition-colors"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)" }}
                >
                  {c.logo}
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wide leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                    {c.name.toUpperCase()}
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    {c.code}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 36, repeat: Infinity }}
            className="flex items-center gap-3 whitespace-nowrap min-w-max px-4 mt-3"
          >
            {[...[...clientLogos].reverse(), ...[...clientLogos].reverse()].map((c, i) => (
              <div
                key={`r2-${i}`}
                className="flex items-center gap-3 bg-[#0F1923] border border-[#243442] px-4 py-2.5 shrink-0 hover:border-[#00E5FF]/40 transition-colors group"
                style={{ clipPath: CLIP_BTN }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-black bg-[#111A23] border border-[#1e2d3a] text-[#ECE8E1] group-hover:bg-[#00E5FF] group-hover:text-[#0F1923] transition-colors"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)" }}
                >
                  {c.logo}
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wide leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                    {c.name.toUpperCase()}
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    {c.code}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── DOSSIERS ── */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]"
              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
            >
              // DOSSIERS // VERIFIED IMPACT
            </p>
            <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">OUTCOMES</span>{" "}
              <span className="text-[#FF4655]">OVER OUTPUTS</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[2px] w-12 bg-[#FF4655]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                Two recent extractions where engineering precision converted directly into revenue & resilience.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {caseStudies.map((s, i) => (
              <DossierCard key={i} study={s} idx={i} />
            ))}
          </div>
        </div>

        {/* ── TRANSMISSIONS + CLEARANCE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            {transmissions.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07 }}
                className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] flex flex-col"
                style={{ clipPath: CLIP_PANEL }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]/70" />
                <div className="bg-[#0F1923] p-5 flex flex-col flex-1 relative" style={{ clipPath: CLIP_PANEL }}>
                  <CornerBrackets color="rgba(236,232,225,0.12)" size={8} />
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] tracking-[0.16em] text-[#FF4655] font-bold"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      // {t.id}
                    </span>
                    <span className="flex gap-0.5">
                      {[...Array(5)].map((_, k) => (
                        <span key={k} className="w-1 h-3 bg-[#FF4655]/80" />
                      ))}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#ECE8E1] flex-1" style={{ fontFamily: "var(--font-raj)" }}>
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1e2d3a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${t.avatarSeed}`}
                      alt={t.author}
                      className="w-8 h-8 border border-[#243442] bg-[#0a131c]"
                      style={{ clipPath: CLIP_BTN }}
                    />
                    <div>
                      <p className="text-xs font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                        {t.author.toUpperCase()}
                      </p>
                      <p className="text-[11px] tracking-wide text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        {t.role.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* clearance panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative bg-[#FF4655] p-[1px]"
            style={{ clipPath: CLIP_CARD }}
          >
            <div className="bg-[#0F1923] p-6 relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF4655]/10 blur-[30px] rotate-12" />
              <CornerBrackets color="#FF4655" size={12} />
              <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-black flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                <ShieldCheck className="w-4 h-4" /> CLEARANCE // LVL-09
              </p>
              <h3 className="text-xl leading-none mt-3 text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                ENTERPRISE-GRADE
                <br />
                <span className="text-[#FF4655]">FROM DAY ONE</span>
              </h3>
              <p className="text-sm text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>
                Security, privacy and reliability — chambered in every sprint, not patched after.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-5">
                {["SOC 2 TYPE II", "ISO 27001", "GDPR COMPLIANT", "AWS PARTNER", "99.99% SLA", "PEN-TESTED"].map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-1.5 px-2.5 py-2 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#ECE8E1]"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                  >
                    <span className="w-1 h-1 bg-[#FF4655] shrink-0" /> {c}
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] text-[#FF4655] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                VIEW SECURITY DOSSIER <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── PROTOCOL ── */}
        <motion.div
          ref={engageRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px]"
          style={{ clipPath: CLIP_CARD }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
          <div className="bg-[#0F1923] p-6 md:p-8 lg:p-10 relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ECE8E120_1px,transparent_1px),linear-gradient(to_bottom,#ECE8E120_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
            <CornerBrackets color="rgba(255,70,85,0.6)" size={14} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-black flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Target className="w-4 h-4" /> TACTICAL // OPERATION PROTOCOL
                </p>
                <h2 className="text-3xl md:text-4xl leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="text-[#ECE8E1]">DELIVERY FRAME</span>
                  <br />
                  <span className="text-[#FF4655]">YOU CAN BET ON</span>
                </h2>
                <div className="h-[2px] w-20 bg-[#FF4655]" />
                <p className="text-sm leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                  No theatre. Weekly working software, transparent risks. We play for your P&amp;L.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {protocols.map((p, i) => {
                  const x = useTransform(engageScroll, [i * 0.18, Math.min(1, i * 0.18 + 0.28)], [20, 0]);
                  const opacity = useTransform(engageScroll, [i * 0.18, Math.min(1, i * 0.18 + 0.28)], [0, 1]);
                  return (
                    <motion.div
                      key={p.step}
                      style={{ x, opacity, clipPath: CLIP_PANEL }}
                      className="relative bg-[#0a131c] border border-[#1e2d3a] p-5 hover:border-[#2e4154] hover:bg-[#111A23] transition-colors group"
                    >
                      <div className="absolute top-0 left-0 h-[2px] w-10 bg-[#FF4655] group-hover:w-16 transition-all" />
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 flex items-center justify-center bg-[#FF4655] text-white font-black text-sm"
                          style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)" }}
                        >
                          {p.step}
                        </span>
                        <span className="h-px flex-1 bg-[#1e2d3a]" />
                        <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
                      </div>
                      <h4 className="text-sm font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                        {p.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-[#768079] mt-1.5" style={{ fontFamily: "var(--font-raj)" }}>
                        {p.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CTA — SPIKE PLANT ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#FF4655] p-[1px]"
          style={{ clipPath: CLIP_CARD }}
        >
          <div className="relative bg-[#0F1923] p-8 md:p-12 lg:p-14 text-center overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            {/* diagonal red slash */}
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
                <span className="text-[#ECE8E1]">READY TO</span> <span className="text-[#FF4655]">COMMAND</span>
                <br />
                <span className="text-[#ECE8E1]">YOUR LOBBY?</span>
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed text-[#768079] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-raj)" }}>
                Stop feeding. No more technical debt, no more missed plants. Deploy with an elite squad that delivers — on time, every time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white px-8 py-4 font-black tracking-widest hover:bg-[#e03a49] transition-colors w-full sm:w-auto"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                  <span className="relative flex items-center gap-2 text-sm">
                    INITIATE // ALPHA <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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

        {/* footer valorant tag */}
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#768079]/60" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-CLIENTS // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
        </div>
      </div>
    </motion.div>
  );
}
