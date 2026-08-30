"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Server,
  Globe,
  Cloud,
  ArrowRight,
  LayoutTemplate,
  Database,
  Search,
  Gauge,
  ShieldCheck,
  PenTool,
  Crosshair,
  Target,
  Zap,
  Radio,
  Swords,
  Skull,
} from "lucide-react";
import { SiReact, SiNextdotjs, SiRedux, SiFramer, SiNodedotjs, SiGraphql, SiPostgresql, SiSocketdotio, SiDocker, SiGithubactions, SiVercel, SiFigma, SiTailwindcss } from "react-icons/si";
import { FaAws, FaUsers } from "react-icons/fa";
import Link from "next/link";
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

// ──────────────────────────────────────────────────────────────
// Data — kept original 4 + 6, re-skinned with valorant accents
// ──────────────────────────────────────────────────────────────
const mainServices = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description: "Interactive, high-performance web applications built with React and Next.js. We focus on seamless user experiences, fluid animations, and pixel-perfect implementation.",
    features: [
      { text: "React / Next.js Architecture", TechIcon: SiNextdotjs },
      { text: "Progressive Web Apps (PWAs)", TechIcon: SiReact },
      { text: "State Management", TechIcon: SiRedux },
      { text: "Framer Motion Animations", TechIcon: SiFramer },
    ],
    accent: "#FF4655",
    accentSoft: "rgba(255,70,85,0.14)",
    code: "VLR-FE-01",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    description: "Robust, secure, and infinitely scalable server-side systems. We engineer the hidden foundation that powers your most complex business logic and data workflows.",
    features: [
      { text: "Node.js Microservices", TechIcon: SiNodedotjs },
      { text: "REST & GraphQL APIs", TechIcon: SiGraphql },
      { text: "PostgreSQL & MongoDB", TechIcon: SiPostgresql },
      { text: "Real-time WebSockets", TechIcon: SiSocketdotio },
    ],
    accent: "#B14AFF",
    accentSoft: "rgba(177,74,255,0.14)",
    code: "VLR-BE-02",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Enterprise-grade deployment strategies. We automate your DevOps pipeline to ensure 99.99% uptime, rapid iterations, and bulletproof security.",
    features: [
      { text: "AWS Architecture", TechIcon: FaAws },
      { text: "Docker Containerization", TechIcon: SiDocker },
      { text: "CI/CD Pipeline Automation", TechIcon: SiGithubactions },
      { text: "Load Balancing", TechIcon: SiVercel },
    ],
    accent: "#FFD700",
    accentSoft: "rgba(255,215,0,0.12)",
    code: "VLR-CL-03",
  },
  {
    icon: LayoutTemplate,
    title: "UI/UX Product Design",
    description: "Data-driven, aesthetic design systems. We bridge the gap between human psychology and digital interfaces to create products that convert and delight.",
    features: [
      { text: "Wireframing & Prototyping", TechIcon: SiFigma },
      { text: "Comprehensive Design Systems", TechIcon: SiTailwindcss },
      { text: "User Research & Testing", TechIcon: FaUsers },
      { text: "Interactive Micro-interactions", TechIcon: SiFramer },
    ],
    accent: "#00E5FF",
    accentSoft: "rgba(0,229,255,0.12)",
    code: "VLR-UX-04",
  },
];

const specializedServices = [
  { icon: Search, title: "Technical SEO", desc: "Advanced programmatic SEO and speed optimization for massive organic reach.", accent: "#00E5FF", code: "SPEC-01" },
  { icon: Database, title: "Database Migration", desc: "Zero-downtime migrations, schema redesigns, and query optimization for legacy systems.", accent: "#FFD700", code: "SPEC-02" },
  { icon: ShieldCheck, title: "Security Auditing", desc: "Penetration testing, vulnerability assessments, and strict compliance implementation.", accent: "#FF4655", code: "SPEC-03" },
  { icon: Gauge, title: "Performance Tuning", desc: "Lighthouse optimization, asset delivery tuning, and edge-caching strategies.", accent: "#B14AFF", code: "SPEC-04" },
  { icon: Globe, title: "E-Commerce Systems", desc: "Custom headless Shopify integrations and Stripe payment infrastructure.", accent: "#00E5FF", code: "SPEC-05" },
  { icon: PenTool, title: "Tech Consultation", desc: "CTO-as-a-service. Strategic roadmapping, team scaling, and architecture blueprinting.", accent: "#FF4655", code: "SPEC-06" },
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
// CoreServiceCard — Valorant dossier
// ──────────────────────────────────────────────────────────────
function CoreServiceCard({ service, idx }: { service: (typeof mainServices)[number]; idx: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"],
  });

  const yRange: [number, number] = idx % 2 === 0 ? [80, -80] : [140, -140];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  const entranceProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const rotateY = useTransform(entranceProgress, [0, 1], [-20, 0]);
  const scale = useTransform(entranceProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(entranceProgress, [0, 1], [0.3, 1]);

  const Icon = service.icon;
  const accent = service.accent;
  const isGold = accent === "#FFD700";
  const iconTextColor = accent === "#FFD700" || accent === "#00E5FF" ? "#0F1923" : "#fff";

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        ref={ref}
        style={{ y, rotateY, scale, opacity, clipPath: CLIP_CARD }}
        className="relative bg-[#111A23] border border-[#2a3a4a] p-[1px] overflow-hidden group h-full flex flex-col"
      >
        {/* accent rails */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] z-20" style={{ background: accent }} />
        <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-70 z-20" style={{ background: accent }} />

        {/* inner panel */}
        <div className="relative bg-[#0F1923] flex flex-col justify-between h-full p-7 md:p-8 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          {/* subtle tactical bg image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none group-hover:opacity-[0.07] transition-opacity"
          />
          {/* diagonal hazard stripe watermark */}
          <div
            className="absolute -right-24 -top-24 w-[420px] h-[420px] opacity-[0.035] pointer-events-none"
            style={{
              background: `repeating-linear-gradient(-45deg, ${accent} 0 2px, transparent 2px 10px)`,
            }}
          />
          {/* 01-04 watermark */}
          <div
            className={`${bebas.variable} absolute -right-1 -bottom-6 text-[8.5rem] md:text-[9.5rem] leading-none font-black opacity-[0.04] select-none pointer-events-none`}
            style={{ fontFamily: "var(--font-bebas)", color: accent }}
          >
            0{idx + 1}
          </div>

          <CornerBrackets color={accent} size={14} />

          <div className="relative z-10">
            {/* top meta */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`${jetmono.variable} text-[10px] font-bold tracking-[0.18em] px-2.5 py-1`}
                style={{ fontFamily: "var(--font-mono)", background: accent, color: iconTextColor, clipPath: CLIP_BTN }}
              >
                {service.code}
              </span>
              <span
                className={`${jetmono.variable} hidden sm:inline-flex items-center gap-1 text-[10px] tracking-[0.14em] border px-2.5 py-1 text-[#768079]`}
                style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(236,232,225,0.12)", clipPath: CLIP_BTN }}
              >
                <span className="w-1 h-1 animate-pulse" style={{ background: accent }} /> CORE // DOSSIER
              </span>
              <span className="ml-auto hidden md:inline-flex w-1.5 h-1.5 animate-pulse" style={{ background: accent }} />
            </div>

            <div
              className="w-14 h-14 flex items-center justify-center shrink-0 mb-6 group-hover:scale-[1.04] transition-transform duration-500 relative"
              style={{ background: accent, clipPath: CLIP_BTN }}
            >
              <Icon className="w-7 h-7" style={{ color: iconTextColor }} />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6" style={{ background: accent }} />
              <h3 className="text-[11px] font-black tracking-[0.16em] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", color: accent }}>
                // {service.title.toUpperCase()}
              </h3>
            </div>

            <h3 className="text-[1.65rem] md:text-[1.9rem] leading-[1.05] tracking-tight text-[#ECE8E1] mb-3" style={{ fontFamily: "var(--font-anton)" }}>
              {service.title.toUpperCase()}
            </h3>

            <div className="h-px w-full bg-[#1e2d3a] mb-4" />
            <p className="text-[14px] md:text-[15px] leading-relaxed font-medium" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
              {service.description}
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-8 border-t border-[#1e2d3a]">
            <h4 className="text-[11px] font-bold tracking-[0.16em] text-[#768079] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-6 h-[2px]" style={{ background: accent }} /> KEY // LOADOUT
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feature: any, i: number) => {
                const TechIcon = feature.TechIcon;
                return (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-[#ECE8E1] font-bold text-xs bg-[#0a131c] border border-[#1e2d3a] px-3 py-2.5 hover:border-[#2a3a4a] transition-colors"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                  >
                    <TechIcon className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <span className="leading-none tracking-wide">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SpecializedServiceCard — Valorant tac card 3-col
// ──────────────────────────────────────────────────────────────
function SpecializedServiceCard({ service, idx }: { service: (typeof specializedServices)[number]; idx: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.7 1"],
  });

  const isEven = idx % 2 === 0;
  const isThird = idx % 3 === 0;
  const xStart = isEven ? -40 : isThird ? 40 : 0;
  const yStart = !isEven && !isThird ? 40 : 20;

  const x = useTransform(scrollYProgress, [0, 1], [xStart, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [yStart, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const Icon = service.icon;
  const accent = service.accent;

  return (
    <motion.div
      ref={ref}
      style={{ x, y, opacity, clipPath: CLIP_PANEL }}
      className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] group h-full flex flex-col hover:border-[#2a3a4a] transition-colors"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-80" style={{ background: accent }} />
      <div className="bg-[#0a131c] p-6 flex flex-col h-full relative overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
        <CornerBrackets color="rgba(236,232,225,0.12)" size={10} />
        {/* subtle number */}
        <div
          className={`${bebas.variable} absolute -right-1 -bottom-2 text-7xl leading-none font-black opacity-[0.04] select-none pointer-events-none`}
          style={{ fontFamily: "var(--font-bebas)", color: accent }}
        >
          {service.code.split("-")[1]}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div
            className="w-11 h-11 flex items-center justify-center border border-[#1e2d3a] bg-[#0F1923] group-hover:scale-105 transition-transform"
            style={{ clipPath: CLIP_BTN }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <span className={`${jetmono.variable} text-[10px] tracking-[0.14em] text-[#768079] border border-[#1e2d3a] px-2 py-1 bg-[#0F1923]`} style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}>
            // {service.code}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-[2px]" style={{ background: accent }} />
          <span className="text-[10px] font-black tracking-[0.14em]" style={{ fontFamily: "var(--font-mono)", color: accent }}>
            SPEC // DOSSIER
          </span>
        </div>

        <h4 className="text-[1.15rem] font-black tracking-wide text-[#ECE8E1] leading-none mb-3" style={{ fontFamily: "var(--font-anton)" }}>
          {service.title.toUpperCase()}
        </h4>
        <p className="text-[13px] leading-relaxed font-medium text-[#768079] mt-auto" style={{ fontFamily: "var(--font-raj)" }}>
          {service.desc}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)", color: accent }}>
          <span className="w-1 h-1" style={{ background: accent }} /> TACTICAL // READY
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#0F1923", "#0a131c", "#0F1923"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroBadgeY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroTitleY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroDescY = useTransform(heroScroll, [0, 1], [0, 30]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const commandRef = useRef(null);
  const { scrollYProgress: commandScroll } = useScroll({
    target: commandRef,
    offset: ["0 1", "0.8 1"],
  });

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
          style={{
            background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)",
          }}
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
        {/* ── HERO — VALORANT ARSENAL ── */}
        <div ref={heroRef} className="relative pt-6 md:pt-4">
          {/* HUD top bar */}
          <motion.div style={{ y: heroBadgeY, opacity: heroOpacity }} className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white" style={{ clipPath: CLIP_BTN }}>
              <Swords className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)" }}>
                // ARSENAL // SERVICES
              </span>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#768079] border border-[#1e2d3a] px-3 py-1.5 bg-[#111A23]/60"
              style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
            >
              <Radio className="w-3 h-3 text-[#FF4655] animate-pulse" /> VLR-SERVICES-09 // SECURE
            </span>
            <span className="ml-auto hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> 04 CORE // 06 SPEC OPS
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.div style={{ y: heroTitleY, opacity: heroOpacity }} className="relative">
                <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-[3px] bg-[#FF4655] hidden sm:block" />
                <p className="text-[11px] tracking-[0.22em] text-[#FF4655] font-bold flex items-center gap-2 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <span className="w-6 h-[2px] bg-[#FF4655]" /> ARSENAL // 09
                </p>
                <h1 className="text-[2.95rem] sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.86] tracking-[-0.02em]" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="block text-[#ECE8E1]">TECHNOLOGY TO</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff6b7a] relative">
                    UPGRADE ANY BUSINESS
                    <span className="absolute -right-2 -top-1 text-[#FF4655] text-2xl md:text-3xl font-black">//</span>
                  </span>
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-[3px] w-24 bg-[#FF4655]" />
                  <div className="h-[1px] flex-1 bg-[#1e2d3a] max-w-[420px]" />
                  <Crosshair className="hidden sm:block w-5 h-5 text-[#FF4655]/70" />
                </div>
              </motion.div>

              <motion.p style={{ y: heroDescY, opacity: heroOpacity, fontFamily: "var(--font-raj)" } as any} className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl">
                <span className="text-[#ECE8E1] font-semibold">We don't just write code. We engineer cosmic-scale solutions</span>
                <span className="text-[#768079] font-medium"> — designed to solve impossible problems and power the future of your business. Valorant-grade precision, shipped.</span>
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

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 pt-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {[
                  { k: "UPTIME", v: "99.99%", dot: "bg-emerald-400" },
                  { k: "STACK", v: "NEXT.JS // NODE" },
                  { k: "COVER", v: "FRONT → CLOUD" },
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
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                      alt="Tactical cyber operations"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/40 to-transparent" />
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(-45deg,transparent_0_12px,rgba(255,70,85,0.5)_12px_13px)]" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.14em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        // AGENT DOSSIER
                      </span>
                      <span className="px-2 py-1 bg-[#0F1923]/80 border border-[#1e2d3a] text-[#00E5FF] text-[10px] tracking-[0.12em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        ARSENAL // ACTIVE
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-[#FF4655] animate-pulse" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white font-black" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)" }}>
                        CT
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-wide text-white leading-none" style={{ fontFamily: "var(--font-raj)" }}>
                          CYPHER TECH // ARSENAL
                        </p>
                        <p className="text-[11px] tracking-widest text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
                          CONTROLLER // INITIATOR // 09
                        </p>
                      </div>
                      <Skull className="ml-auto w-4 h-4 text-white/60" />
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { l: "CORE", v: "04" },
                        { l: "SPEC", v: "06" },
                        { l: "SLA", v: "99.99%" },
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
                      <span className="w-1 h-1 bg-[#FF4655]" /> ULT READY // DEPLOY ARSENAL
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
              {/* floating mini badge */}
              <div className="absolute -bottom-5 -left-4 bg-[#0a131c] border border-[#1e2d3a] px-4 py-2.5 flex items-center gap-3" style={{ clipPath: CLIP_BTN }}>
                <Globe className="w-5 h-5 text-[#00E5FF]" />
                <div>
                  <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                    GLOBAL DEPLOYMENT
                  </p>
                  <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    EDGE // WORLDWIDE
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CORE DISCIPLINES ── */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]"
              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
            >
              <Target className="w-3.5 h-3.5" /> // CORE // DISCIPLINES
            </p>
            <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">CORE</span> <span className="text-[#FF4655]">ARSENAL</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-10 bg-[#FF4655]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                The foundational pillars of our engineering universe — valorant-clipped, mission-ready.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
            {mainServices.map((service, idx) => (
              <CoreServiceCard key={idx} service={service} idx={idx} />
            ))}
          </div>
        </div>

        {/* ── SPECIALIZED SOLUTIONS ── */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#00E5FF] text-[11px] font-black tracking-[0.18em]"
              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
            >
              <Zap className="w-3.5 h-3.5" /> // SPEC // OPS
            </p>
            <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">SPECIALIZED</span> <span className="text-[#00E5FF]">SOLUTIONS</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-10 bg-[#00E5FF]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                Targeted tactical interventions for complex, high-stakes challenges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specializedServices.map((service, idx) => (
              <SpecializedServiceCard key={idx} service={service} idx={idx} />
            ))}
          </div>
        </div>

        {/* ── TACTICAL // OPERATION PROTOCOL ── */}
        <motion.div
          ref={commandRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px]"
          style={{ clipPath: CLIP_CARD }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
          <div className="bg-[#0F1923] p-6 md:p-8 lg:p-10 relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            {/* hazard watermark bg inside */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ background: "repeating-linear-gradient(-45deg, #FF4655 0 1px, transparent 1px 18px)" }} />
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ECE8E120_1px,transparent_1px),linear-gradient(to_bottom,#ECE8E120_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
            <CornerBrackets color="rgba(255,70,85,0.6)" size={14} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-5">
                <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-black flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Target className="w-4 h-4" /> TACTICAL // OPERATION PROTOCOL
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="text-[#ECE8E1]">DELIVERY FRAME</span>
                  <br />
                  <span className="text-[#FF4655]">YOU CAN BET ON</span>
                </h2>
                <div className="h-[2px] w-20 bg-[#FF4655]" />
                <p className="text-sm leading-relaxed font-medium" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                  We utilize a battle-tested agile framework to ensure projects are delivered on time, under budget, and beyond expectations. Absolute precision from Day 1.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-7 py-3.5 font-black tracking-wide hover:bg-[#ff3344] transition-colors"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                  >
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                    <span className="relative flex items-center gap-2 text-sm">
                      INITIATE PROJECT <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                  <p className="text-[11px] tracking-widest mt-2" style={{ fontFamily: "var(--font-mono)", color: "#768079" }}>
                    NDA-FIRST // 48H PROPOSAL // CANCEL ANYTIME
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { step: "01", title: "STRATEGIC BLUEPRINT", desc: "Mapping out data flow, tech stack, and user journeys to ensure absolute clarity.", accent: "#FF4655" },
                  { step: "02", title: "TACTICAL PROTOTYPING", desc: "Creating high-fidelity wireframes and interactive mockups for rapid validation.", accent: "#00E5FF" },
                  { step: "03", title: "QUANTUM DEVELOPMENT", desc: "Writing clean, scalable code in agile sprints with weekly stakeholder demos.", accent: "#FFD700" },
                  { step: "04", title: "LAUNCH SEQUENCE", desc: "Rigorous QA testing before seamless CI/CD production deployment and handoff.", accent: "#B14AFF" },
                ].map((phase, i) => {
                  const stepStart = i * 0.15;
                  const stepEnd = stepStart + 0.3;
                  const stepX = useTransform(commandScroll, [stepStart, stepEnd], [24, 0]);
                  const stepOpacity = useTransform(commandScroll, [stepStart, stepEnd], [0, 1]);
                  const isGold = phase.accent === "#FFD700";

                  return (
                    <motion.div
                      key={i}
                      style={{ x: stepX, opacity: stepOpacity, clipPath: CLIP_PANEL }}
                      className="relative bg-[#0a131c] border border-[#1e2d3a] p-5 hover:border-[#2e4154] hover:bg-[#111A23] transition-colors group"
                    >
                      <div className="absolute top-0 left-0 h-[2px] w-10 group-hover:w-16 transition-all" style={{ background: phase.accent }} />
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 flex items-center justify-center font-black text-sm shrink-0"
                          style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-anton)", background: phase.accent, color: isGold || phase.accent === "#00E5FF" ? "#0F1923" : "#fff" }}
                        >
                          {phase.step}
                        </span>
                        <span className="h-px flex-1 bg-[#1e2d3a]" />
                        <span className="w-1.5 h-1.5 animate-pulse" style={{ background: phase.accent }} />
                      </div>
                      <h4 className="text-sm font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                        {phase.title}
                      </h4>
                      <p className="text-xs leading-relaxed mt-1.5" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                        {phase.desc}
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
                <span className="text-[#ECE8E1]">READY TO</span> <span className="text-[#FF4655]">UPGRADE</span>
                <br />
                <span className="text-[#ECE8E1]">YOUR BUSINESS?</span>
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                Stop feeding. No more technical debt, no more missed launches. Deploy with an elite squad that delivers — on time, every time.
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

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
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
          <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-SERVICES // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
        </div>
      </div>
    </motion.div>
  );
}
