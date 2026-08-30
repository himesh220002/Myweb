"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Layers,
  Server,
  ShieldCheck,
  Globe,
  Layout,
  Crosshair,
  Target,
  Swords,
  Skull,
  Zap,
  Radio,
  Crown,
  Shield,
  ArrowRight,
  Gauge,
} from "lucide-react";
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

// ── Data — 5 categories, valorant-ized premium copy ──
const skillCategories = [
  {
    title: "Frontend Development",
    code: "VLR-FE-01",
    num: "01",
    icon: Layout,
    accent: "#FF4655",
    accentSoft: "rgba(255,70,85,0.14)",
    image: "/skills_frontend_bg.png",
    tacticalImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    strength: "HEADSHOT-PRECISE UI // 60FPS MOTION",
    desc: "Pixel-locked, theme-aware interfaces with Framer Motion orchestration. Next.js App Router, TypeScript discipline and Tailwind token systems — zero jank, zero fog of war.",
    longDesc:
      "We ship headshot-precise UI that hits first frame. Fluid animations, accessibility AA+, and design systems that scale from landing to command-center without recoil.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
    stat: "HS 98%",
  },
  {
    title: "Backend & Cloud",
    code: "VLR-BE-02",
    num: "02",
    icon: Server,
    accent: "#00E5FF",
    accentSoft: "rgba(0,229,255,0.12)",
    image: "/performance_bg.png",
    tacticalImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    strength: "ANTI-LAG APIS // ZERO-DOWNTIME CORE",
    desc: "Encrypted microservices, GraphQL/REST gateways and Socket.io war-room realtime. JWT-hardened, horizontally scalable — scales without recoil under fire.",
    longDesc:
      "Battle-tested Node.js cores with Postgres replication, Mongo sharding and WebSocket legions. Auth architecture that never whiffs, even at 1M+ concurrent engagements.",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "JWT & Security", "Socket.io", "GraphQL"],
    stat: "RTT <40MS",
  },
  {
    title: "DevOps & Utilities",
    code: "VLR-OP-03",
    num: "03",
    icon: ShieldCheck,
    accent: "#FFD700",
    accentSoft: "rgba(255,215,0,0.12)",
    image: "/security_bg.png",
    tacticalImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    strength: "AUTO-DEPLOY ARSENAL // INFRA ULT",
    desc: "Dockerized CI/CD, AWS/Vercel edge and GitHub Actions trigger discipline. Ship like spike rush — 99.99% uptime, instant rollbacks, full observability.",
    longDesc:
      "One-click pipelines that plant and never get defused. Containerized, cache-primed, and monitored per-second — operational clarity that clutches every deploy.",
    skills: ["Git / GitHub", "GitHub Actions", "CI/CD Pipelines", "Docker", "Postman", "AWS", "Vercel"],
    stat: "UP 99.99%",
  },
  {
    title: "Solutions & Architecture",
    code: "VLR-AR-04",
    num: "04",
    icon: Layers,
    accent: "#B14AFF",
    accentSoft: "rgba(177,74,255,0.14)",
    image: "/design_bg.png",
    tacticalImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    strength: "TACTICAL ARCHITECTURE // DOMINATION PROTOCOL",
    desc: "CRMs, inventory & service dashboards forged as role-gated systems. Workflow headshots — eliminate friction, dominate the round from buy to exfil.",
    longDesc:
      "From CRM to inventory to service command centers: schemas, RBAC and system design that clutch 1v5 operational chaos and convert it into revenue.",
    skills: ["CRM Development", "Inventory Systems", "Service Dashboards", "System Design", "Database Schema", "Auth Architecture"],
    stat: "1v5 CLUTCH",
  },
  {
    title: "Digital Strategy",
    code: "VLR-ST-05",
    num: "05",
    icon: Globe,
    accent: "#00E5FF",
    accentSoft: "rgba(0,229,255,0.12)",
    image: "/growth_bg.png",
    tacticalImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
    strength: "COMMS // INTEL PACKAGE — RANK UP",
    desc: "SEO dominance, Agile extraction, stakeholder sync and roadmaps that convert. Strategy that plants deep and wins round 13 — revenue, not theatre.",
    longDesc:
      "We bridge technical architecture with persuasive communication. Rank, retain, and report — each sprint pushes the spike closer to the enemy base.",
    skills: ["SEO & Ranking", "Agile Delivery", "UX Strategy", "Stakeholder Mgmt", "Product Roadmap", "Tech Writing"],
    stat: "ACS 412",
  },
];

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

// ── Skill Dossier Card ──
function SkillDossierCard({ category, idx }: { category: (typeof skillCategories)[number]; idx: number }) {
  const Icon = category.icon;
  const accent = category.accent;
  const isLightAccent = accent === "#FFD700" || accent === "#00E5FF";
  const iconTextColor = isLightAccent ? "#0F1923" : "#fff";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden group hover:border-[#2a3a4a] transition-colors"
      style={{ clipPath: CLIP_CARD }}
    >
      {/* accent rails */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] z-20" style={{ background: accent }} />
      <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-70 z-20" style={{ background: accent }} />

      {/* inner */}
      <div className="relative bg-[#0F1923] flex flex-col min-h-[420px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
        {/* tactical image watermark — valorant + original fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.tacticalImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity"
        />
        {/* original bg as even subtler layer (keeps path referenced if exists) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.035] mix-blend-screen pointer-events-none hidden md:block"
        />
        {/* hazard stripe watermark */}
        <div
          className="absolute -right-24 -top-24 w-[460px] h-[460px] opacity-[0.035] pointer-events-none"
          style={{ background: `repeating-linear-gradient(-45deg, ${accent} 0 2px, transparent 2px 10px)` }}
        />
        {/* number watermark */}
        <div
          className={`${bebas.variable} absolute -right-1 -bottom-6 text-[9.5rem] md:text-[10.5rem] leading-none font-black opacity-[0.04] select-none pointer-events-none`}
          style={{ fontFamily: "var(--font-bebas)", color: accent }}
        >
          {category.num}
        </div>

        <CornerBrackets color={accent} size={14} />

        <div className="relative z-10 p-7 md:p-9 lg:p-10 flex flex-col flex-1">
          {/* top meta */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className={`${jetmono.variable} text-[10px] font-bold tracking-[0.18em] px-2.5 py-1`}
              style={{ fontFamily: "var(--font-mono)", background: accent, color: iconTextColor, clipPath: CLIP_BTN }}
            >
              {category.code}
            </span>
            <span
              className={`${jetmono.variable} hidden sm:inline-flex items-center gap-1 text-[10px] tracking-[0.14em] border px-2.5 py-1 text-[#768079] bg-[#0a131c]/60`}
              style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(236,232,225,0.12)", clipPath: CLIP_BTN }}
            >
              <span className="w-1 h-1 animate-pulse" style={{ background: accent }} /> CORE // DOSSIER
            </span>
            <span
              className={`${jetmono.variable} ml-auto hidden md:inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-[#768079]`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="w-1.5 h-1.5 animate-pulse" style={{ background: accent }} /> {category.stat} //
              <span style={{ color: accent }}>{category.skills.length} STACK</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            {/* left — identity + strength */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                className="w-14 h-14 flex items-center justify-center shrink-0 mb-6 group-hover:scale-[1.04] transition-transform duration-500 relative border border-[#1e2d3a]/40"
                style={{ background: accent, clipPath: CLIP_BTN }}
              >
                <Icon className="w-7 h-7" style={{ color: iconTextColor }} />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6" style={{ background: accent }} />
                <h3 className="text-[11px] font-black tracking-[0.16em] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", color: accent }}>
                  // {category.title.toUpperCase()}
                </h3>
              </div>

              <h2
                className="text-[1.7rem] md:text-[2.05rem] leading-[0.95] tracking-tight text-[#ECE8E1] mb-3"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {category.title.toUpperCase()}
              </h2>

              <div className="h-px w-full bg-[#1e2d3a] mb-4" />

              <p className="text-[13px] font-black tracking-wide leading-none mb-2" style={{ fontFamily: "var(--font-mono)", color: accent }}>
                {category.strength}
              </p>
              <p className="text-[14px] md:text-[15px] leading-relaxed font-medium flex-1" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                {category.desc}
              </p>
              <p className="text-[13px] leading-relaxed font-medium mt-3 border-l-2 pl-3" style={{ fontFamily: "var(--font-raj)", color: "#9aa4ad", borderColor: `${accent}40` }}>
                {category.longDesc}
              </p>

              {/* tactical footer — desktop only inside left col */}
              <div className="hidden lg:flex items-center gap-2 mt-6 text-[11px] tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)", color: accent }}>
                <span className="w-1 h-1" style={{ background: accent }} /> TACTICAL // READY — {category.num} // {category.code.split("-")[1]}
              </div>
            </div>

            {/* right — skills pills + tactical micro */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-[2px]" style={{ background: accent }} />
                <h4 className="text-[11px] font-bold tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  KEY // LOADOUT
                </h4>
                <span className="ml-auto text-[10px] tracking-[0.12em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  {category.skills.length} // WEAPONS
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2.5 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] font-bold text-[13px] hover:border-[#FF4655]/40 hover:bg-[#111A23] hover:text-white transition-colors cursor-default"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* divider + micro stats row */}
              <div className="mt-6 pt-5 border-t border-[#1e2d3a] grid grid-cols-3 gap-2">
                {[
                  { l: "TYPE", v: category.code.split("-")[1] },
                  { l: "NUM", v: category.num },
                  { l: "MODE", v: "TACTICAL" },
                ].map((s) => (
                  <div key={s.l} className="bg-[#0a131c] border border-[#1e2d3a] px-2 py-2.5 text-center" style={{ clipPath: CLIP_PANEL }}>
                    <p className="text-[10px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                      {s.l}
                    </p>
                    <p className="text-[11px] font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-6 h-[2px]" style={{ background: accent }} /> DOSSIER // VERIFIED — ULT READY
                <span className="ml-auto w-1.5 h-1.5 animate-pulse" style={{ background: accent }} />
              </div>
            </div>
          </div>

          {/* mobile tactical footer */}
          <div className="flex lg:hidden items-center gap-2 mt-6 text-[11px] tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)", color: accent }}>
            <span className="w-1 h-1" style={{ background: accent }} /> TACTICAL // READY
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default function SkillsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#0F1923", "#0a131c", "#0F1923"]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBadgeY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroTitleY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroDescY = useTransform(heroScroll, [0, 1], [0, 30]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <motion.div
      style={{ backgroundColor }}
      className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} min-h-screen bg-[#0F1923] text-[#ECE8E1] selection:bg-[#FF4655]/30 relative overflow-hidden`}
    >
      {/* valorant bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }} />
        <motion.div
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] left-[-10%] w-[42rem] h-[42rem] bg-[#FF4655]/10 blur-[120px] rounded-full"
        />
        <div className="absolute top-[18%] right-[-12%] w-[36rem] h-[36rem] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute top-[42%] left-[28%] w-[28rem] h-[28rem] bg-[#FFD700]/[0.04] blur-[100px] rounded-full hidden lg:block" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
      </div>

      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50">
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-16 md:space-y-20">
        {/* ── HERO — VALORANT ARSENAL SKILLS ── */}
        <div ref={heroRef} className="relative pt-6 md:pt-4">
          {/* HUD top bar */}
          <motion.div style={{ y: heroBadgeY, opacity: heroOpacity }} className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white" style={{ clipPath: CLIP_BTN }}>
              <Swords className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)" }}>
                // ARSENAL // SKILLS
              </span>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#768079] border border-[#1e2d3a] px-3 py-1.5 bg-[#111A23]/60"
              style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
            >
              <Radio className="w-3 h-3 text-[#FF4655] animate-pulse" /> VLR-SKILLS-09 // SECURE
            </span>
            <span className="ml-auto hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> 05 DOSSIERS // 32 STACK
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <motion.div style={{ y: heroTitleY, opacity: heroOpacity }} className="relative">
                <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-[3px] bg-[#FF4655] hidden sm:block" />
                <p className="text-[11px] tracking-[0.22em] text-[#FF4655] font-bold flex items-center gap-2 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <span className="w-6 h-[2px] bg-[#FF4655]" /> ARSENAL // 09
                </p>
                <h1 className="text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.1rem] leading-[0.86] tracking-[-0.02em]" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="block text-[#ECE8E1]">TECHNICAL DEPTH</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff6b7a] relative">
                    & OPERATIONAL CLARITY
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
                <span className="text-[#ECE8E1] font-semibold">We bridge complex technical architecture with human-centric design</span>
                <span className="text-[#768079] font-medium">
                  {" "}
                  and agile delivery. Each dossier reflects a commitment to solving real-world operational chaos — valorant-grade precision, shipped.
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

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 pt-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {[
                  { k: "WEAPONS", v: "32 STACK", dot: "bg-emerald-400" },
                  { k: "STACK", v: "FRONT → CLOUD" },
                  { k: "PRECISION", v: "HEADSHOT 98%" },
                  { k: "COMMS", v: "WORLDWIDE" },
                ].map((c) => (
                  <span key={c.k} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111A23] border border-[#1e2d3a] text-[11px] tracking-widest" style={{ clipPath: CLIP_BTN }}>
                    {c.dot && <span className={`w-1.5 h-1.5 ${c.dot} animate-pulse`} />}
                    <span className="text-[#768079]">{c.k}</span>
                    <span className="text-[#ECE8E1] font-bold">{c.v}</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* right tactical dossier card */}
            <motion.div style={{ y: heroDescY, opacity: heroOpacity }} className="lg:col-span-5 relative hidden lg:block">
              <div className="relative bg-[#111A23] border border-[#243442] p-[1px]" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] z-10" />
                <div className="bg-[#0F1923] overflow-hidden relative" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.5)" size={12} />
                  {/* image header */}
                  <div className="relative h-[220px] overflow-hidden border-b border-[#1e2d3a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
                      alt="Tactical coding operations"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/40 to-transparent" />
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(-45deg,transparent_0_12px,rgba(255,70,85,0.5)_12px_13px)]" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.14em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        // SKILL CODEX
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
                          TACTICIAN // INITIATOR // 09
                        </p>
                      </div>
                      <Skull className="ml-auto w-4 h-4 text-white/60" />
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { l: "DOSSIERS", v: "05" },
                        { l: "STACK", v: "32" },
                        { l: "RATING", v: "ELITE" },
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
                      <span className="w-1 h-1 bg-[#FF4655]" /> ULT READY // DEPLOY DOSSIER
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
                <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
                <div>
                  <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                    TACTICAL MASTERY
                  </p>
                  <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    0→1 // ELITE
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── ARSENAL CODEX — SKILL DOSSIERS ── */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              <Target className="w-3.5 h-3.5" /> // CODEX // LOADOUT
            </p>
            <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">ARSENAL</span> <span className="text-[#FF4655]">CODEX</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-10 bg-[#FF4655]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                Five dossiers. Thirty-two weapons. One mission: ship faster, hit harder, never miss.
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-7">
            {skillCategories.map((category, idx) => (
              <SkillDossierCard key={category.code} category={category} idx={idx} />
            ))}
          </div>
        </div>

        {/* ── TACTICAL STAT STRIP — optional micro trust strip like clients ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            { value: "60 FPS", label: "MOTION // FLUID", sub: "FRAMER-LOCKED", icon: Gauge },
            { value: "99.99%", label: "UPTIME // SLA", sub: "ANTI-LAG INFRA", icon: Shield },
            { value: "0→1", label: "SHIP // VELOCITY", sub: "6 WEEK EXFIL", icon: Zap },
            { value: "ELITE", label: "RATING // VERIFIED", sub: "50+ MISSIONS", icon: Crown },
          ].map((s) => (
            <div
              key={s.label}
              className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] hover:border-[#2e4154] transition-colors group"
              style={{ clipPath: CLIP_PANEL }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="bg-[#0F1923] p-4 md:p-5 relative overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <span className="w-1.5 h-1.5 bg-white animate-pulse" /> SPIKE PLANTED // READY FOR INSERTION
              </div>

              <h3 className="text-3xl md:text-5xl leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">READY FOR</span> <span className="text-[#FF4655]">DYNAMIC</span>
                <br />
                <span className="text-[#ECE8E1]">PROBLEM SOLVING?</span>
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
                Beyond the stack, we solve the problem. Whether it&apos;s scaling inventory or securing patient data — plant the spike, we&apos;ll clutch it.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white px-8 py-4 font-black tracking-widest hover:bg-[#e03a49] transition-colors w-full sm:w-auto"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                  <span className="relative flex items-center gap-2 text-sm">
                    START A CONVERSATION <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
          <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-SKILLS // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
        </div>
      </div>
    </motion.div>
  );
}
