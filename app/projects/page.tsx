"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { useState } from "react";
import {
  Layers,
  ArrowRight,
  ChevronRight,
  Clock,
  Box,
  Crosshair,
  Target,
  Swords,
  Radio,
  Skull,
  Zap,
  Filter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";

// ── VALORANT FONTS ──
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

// ── TOKENS ──
const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_PANEL = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

function CornerBrackets({ color = "rgba(255,70,85,0.5)", size = 12 }: { color?: string; size?: number }) {
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: size, height: size, borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: size, height: size, borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: size, height: size, borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: size, height: size, borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
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

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0])))];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featuredProject.id);

  const filteredProjects = activeTab === "All" ? otherProjects : projects.filter((p) => p.category.includes(activeTab));

  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      {/* ── VALORANT BG ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-10" />
        <motion.div animate={{ x: [0, 14, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[16%] left-[-8%] w-[40rem] h-[40rem] bg-[#FF4655]/10 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] right-[-10%] w-[36rem] h-[36rem] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-8%] left-[24%] w-[30rem] h-[30rem] bg-[#FF4655]/[0.05] blur-[110px] rounded-full" />
      </div>

      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50">
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-10">
        {/* ── HEADER HUD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7 space-y-6">
            {/* top HUD badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Swords className="w-3.5 h-3.5" /> // ARSENAL // PORTFOLIO
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> {projects.length} PROJECTS
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#111A23]/60 border border-[#1e2d3a] text-[#768079] text-[11px] tracking-[0.14em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> VLR-ARSENAL // ONLINE
              </span>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-1 bottom-1 w-[3px] bg-[#FF4655] hidden sm:block" />
              <p className="text-[11px] tracking-[0.22em] text-[#FF4655] font-black flex items-center gap-2 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-6 h-[2px] bg-[#FF4655]" /> PROTOCOL // 03 — ARSENAL MANIFEST
              </p>
              <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl leading-[0.88] tracking-[-0.02em]" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="block text-[#ECE8E1]">PROJECTS THAT</span>
                <span className="block text-[#ECE8E1]">
                  SHIP AND <span className="text-[#FF4655]">SCALE</span> <span className="text-[#FF4655]">//</span>
                </span>
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-[3px] w-20 bg-[#FF4655]" />
                <div className="h-px flex-1 max-w-[360px] bg-[#1e2d3a]" />
                <Crosshair className="w-5 h-5 text-[#FF4655]/60 hidden sm:block" />
              </div>
            </div>

            <p className="text-[15px] md:text-[16px] leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-raj)" }}>
              <span className="text-[#ECE8E1] font-semibold">Over 20 premium projects spanning Web Development, Machine Learning, and FinTech.</span>
              <span className="text-[#768079] font-medium"> Built for performance and designed to perfection — valorant-grade precision in every deploy.</span>
            </p>

            <div className="flex flex-wrap gap-2 pt-1" style={{ fontFamily: "var(--font-mono)" }}>
              {[
                { k: "STACK", v: "NEXT.JS // NODE", dot: "bg-[#00E5FF]" },
                { k: "UPTIME", v: "99.99%" },
                { k: "OPS", v: `${projects.length} SHIPPED` },
              ].map((c) => (
                <span key={c.k} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[11px] tracking-widest" style={{ clipPath: CLIP_BTN }}>
                  {c.dot && <span className={`w-1.5 h-1.5 ${c.dot} animate-pulse`} />}
                  <span className="text-[#768079]">{c.k}</span> <span className="text-[#ECE8E1] font-bold">{c.v}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* tactical side image */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-5 relative hidden lg:block">
            <div className="relative bg-[#111A23] border border-[#243442] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] z-10" />
              <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/60 z-10" />
              <div className="relative bg-[#0F1923] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets color="rgba(255,70,85,0.45)" size={12} />
                <div className="relative h-[300px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop" alt="Tactical gaming arsenal" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/30 to-transparent" />
                  <div className="absolute inset-0 bg-[#FF4655]/[0.07] mix-blend-overlay" />
                  <div className="absolute inset-0 opacity-[0.14] bg-[repeating-linear-gradient(-45deg,transparent_0_12px,rgba(255,70,85,0.4)_12px_13px)]" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                      // DOSSIER // ARSENAL
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] tracking-widest bg-[#0F1923]/80 border border-[#1e2d3a] px-2 py-1" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                    <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> <span className="text-[#ECE8E1]">LIVE FEED</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/80 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                          TACTICAL ARSENAL GRID
                        </p>
                        <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          CYPHER TECH // VLR-03 // SECURE
                        </p>
                      </div>
                      <Skull className="ml-auto w-4 h-4 text-[#FF4655]/60" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-[#1e2d3a] border-t border-[#1e2d3a] bg-[#0a131c]">
                  {[
                    { l: "CATEGORY", v: "06 TYPES" },
                    { l: "FEATURED", v: "05 ELITE" },
                    { l: "STATUS", v: "DEPLOYED" },
                  ].map((s) => (
                    <div key={s.l} className="px-3 py-2.5 text-center">
                      <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        {s.l}
                      </p>
                      <p className="text-xs font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ValorantCrosshair className="absolute -top-3 -right-3 hidden lg:flex bg-[#0a131c] border border-[#1e2d3a]" />
            {/* floating mini badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#0a131c] border border-[#1e2d3a] px-4 py-2.5 flex items-center gap-3" style={{ clipPath: CLIP_BTN }}>
              <Zap className="w-5 h-5 text-[#FFD700]" />
              <div>
                <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                  RAPID DEPLOY
                </p>
                <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  CI/CD // EDGE READY
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── FILTER TABS — VALORANT SEGMENTED CONTROL ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-wrap items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#768079] font-black mr-1" style={{ fontFamily: "var(--font-mono)" }}>
            <Filter className="w-3.5 h-3.5 text-[#FF4655]" /> FILTER //
          </span>
          <div className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#0a131c] border border-[#1e2d3a]" style={{ clipPath: CLIP_PANEL }}>
            {categories.map((category) => {
              const active = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative px-5 py-2 text-[11px] font-black tracking-[0.14em] transition-all duration-200 ${active ? "bg-[#FF4655] text-white shadow-[0_0_14px_rgba(255,70,85,0.35)]" : "bg-transparent text-[#768079] hover:text-[#ECE8E1] hover:bg-[#111A23] border border-transparent hover:border-[#1e2d3a]"}`}
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                >
                  {active && <span className="absolute top-0 left-0 right-0 h-[2px] bg-white/80" />}
                  {category.toUpperCase()}
                </button>
              );
            })}
          </div>
          <span className="ml-auto hidden md:inline-flex items-center gap-2 text-[11px] tracking-widest text-[#768079] border border-[#1e2d3a] px-3 py-1.5 bg-[#0a131c]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> {filteredProjects.length + (activeTab === "All" ? 1 : 0)} // VISIBLE
          </span>
        </motion.div>

        {/* ── FEATURED BANNER — VALORANT DOSSIER ── */}
        <AnimatePresence mode="wait">
          {activeTab === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden"
              style={{ clipPath: CLIP_CARD }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] z-20" />
              <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/70 z-20" />
              <div className="relative bg-[#0F1923] grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets color="rgba(255,70,85,0.35)" size={14} />
                {/* image */}
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a131c] lg:h-full">
                    <Image src={featuredProject.image.trim()} alt={featuredProject.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[#FF4655]/[0.05] mix-blend-overlay" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        <span className="w-1.5 h-1.5 bg-white animate-pulse" /> FEATURED // ELITE
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
                    {/* tactical tag */}
                    <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-2 text-[10px] tracking-widest bg-[#0F1923]/80 border border-[#1e2d3a] px-2.5 py-1.5" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                      <span className="w-1 h-1 bg-[#FF4655]" /> VLR-DOSSIER // {featuredProject.id.toString().padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* content */}
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-6 relative">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#FF4655]/[0.04] blur-[30px] rotate-12 pointer-events-none" />
                  <div className="space-y-4 relative z-10">
                    <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] text-[#FF4655]" style={{ fontFamily: "var(--font-mono)" }}>
                      <Box className="w-3.5 h-3.5" /> // {featuredProject.category.toUpperCase()}
                    </span>
                    <h3 className="text-2xl md:text-3xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                      {featuredProject.title.toUpperCase()}
                    </h3>
                    <div className="h-px w-full bg-[#1e2d3a]" />
                    <p className="text-sm leading-relaxed font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                      {featuredProject.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {featuredProject.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#1e2d3a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                    <span className="inline-flex items-center gap-2 text-[#768079] text-[11px] font-bold tracking-[0.14em]" style={{ fontFamily: "var(--font-mono)" }}>
                      <Clock className="w-3.5 h-3.5 text-[#FF4655]" /> {featuredProject.lastUpdated.toUpperCase()}
                    </span>
                    <Link
                      href={`/projects/${featuredProject.slug}`}
                      className="group inline-flex items-center gap-2 bg-[#FF4655] text-white px-6 py-3 text-xs font-black tracking-widest hover:bg-[#e03a49] transition-colors relative overflow-hidden"
                      style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                    >
                      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                      <span className="relative flex items-center gap-2">
                        VIEW CASE STUDY <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PROJECT GRID — VALORANT INTEL CARDS ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const accent = idx % 3 === 0 ? "#FF4655" : idx % 3 === 1 ? "#00E5FF" : "#FFD700";
              const accentText = accent === "#FFD700" ? "#0F1923" : "#fff";
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  key={project.id}
                  className="group relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden hover:border-[#2a3a4a] transition-colors flex flex-col"
                  style={{ clipPath: CLIP_CARD }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity z-20" style={{ background: accent }} />
                  <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity z-20" style={{ background: accent }} />
                  <div className="relative bg-[#0F1923] flex flex-col h-full overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                    <CornerBrackets color={accent} size={10} />
                    {/* image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0a131c]">
                      <Image src={project.image.trim()} alt={project.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/70 via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-[#FF4655]/[0.04] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[10px] font-black tracking-[0.14em] border" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)", background: `${accent}14`, borderColor: `${accent}40`, color: accent }}>
                          {project.category.split(" / ")[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 animate-pulse hidden sm:block" style={{ background: accent }} />
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3 relative">
                      <h4 className="text-[1.15rem] leading-none tracking-tight text-[#ECE8E1] group-hover:text-[#FF4655] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-anton)" }}>
                        {project.title.toUpperCase()}
                      </h4>
                      <p className="text-xs leading-relaxed font-medium text-[#768079] line-clamp-2 min-h-[2.6rem]" style={{ fontFamily: "var(--font-raj)" }}>
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            {tag.toUpperCase()}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-[#1e2d3a] flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[#768079] text-[11px] font-bold tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
                          <Clock className="w-3 h-3" style={{ color: accent }} /> {project.lastUpdated.toUpperCase()}
                        </span>
                        <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-xs font-black tracking-widest text-[#ECE8E1] hover:text-[#FF4655] transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                          VIEW <ChevronRight className="w-3.5 h-3.5" style={{ color: accent }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 border border-[#1e2d3a] bg-[#0a131c]/60" style={{ clipPath: CLIP_PANEL }}>
            <p className="text-lg font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
              NO DOSSIERS FOUND IN THIS SECTOR.
            </p>
            <p className="text-sm text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>
              Try another filter or reset to ALL.
            </p>
          </motion.div>
        )}

        {/* ── BOTTOM BANNER — SPIKE PLANT CTA ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-[#FF4655] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="relative bg-[#0F1923] p-8 md:p-12 text-center overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[60%] h-[220%] bg-[#FF4655]/[0.06] rotate-[18deg] pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ECE8E120_1px,transparent_1px),linear-gradient(to_bottom,#ECE8E120_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
            <CornerBrackets color="#FF4655" size={16} />

            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <span className="w-1.5 h-1.5 bg-white animate-pulse" /> SPIKE PLANTED // READY FOR INSERTION
              </div>

              <h3 className="text-3xl md:text-5xl leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">READY TO START YOUR</span> <span className="text-[#FF4655]">NEXT BIG THING?</span>
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                We have capacity for 3 new high-impact projects this quarter. Let&apos;s discuss your technical requirements and business goals — valorant-grade extraction.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/#estimator" className="group relative inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white px-8 py-4 font-black tracking-widest hover:bg-[#e03a49] transition-colors w-full sm:w-auto" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                  <span className="relative flex items-center gap-2 text-sm">
                    LET&apos;S TALK <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#ECE8E1]/15 text-[#ECE8E1] bg-[#ECE8E1]/[0.06] hover:bg-[#ECE8E1]/10 hover:border-[#ECE8E1]/25 transition-colors font-bold tracking-wide w-full sm:w-auto" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                  OPEN COMMS <span className="text-[#FF4655]">▶</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#FF4655]" /> NDA-FIRST DISCOVERY
                </span>
                <span className="w-1 h-1 bg-[#1e2d3a]" />
                <span>03 SLOTS THIS QUARTER</span>
                <span className="w-1 h-1 bg-[#1e2d3a]" />
                <span>48H PROPOSAL</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* footer tag */}
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#768079]/60" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-ARSENAL // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
        </div>
      </div>
    </div>
  );
}
