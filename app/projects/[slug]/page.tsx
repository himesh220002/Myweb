"use client";

import { useParams, notFound } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { projects } from "@/lib/data/projects";
import {
  ArrowLeft,
  Calendar,
  Server,
  Layers,
  Code2,
  Zap,
  Layout,
  CheckCircle2,
  ExternalLink,
  Crosshair,
  Target,
  Swords,
  Radio,
  Clock,
  Box,
  ShieldCheck,
  Skull,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
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

function CornerBrackets({ color = "rgba(255,70,85,0.55)", size = 12 }: { color?: string; size?: number }) {
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

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });

  const categoryPrimary = project.category.split(" / ")[0];
  const categorySecondary = project.category.includes("/") ? project.category.split(" / ")[1] : "Software";

  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      {/* ── VALORANT BG ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-10" />
        <motion.div animate={{ x: [0, 14, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[14%] left-[-8%] w-[42rem] h-[42rem] bg-[#FF4655]/10 blur-[120px] rounded-full" />
        <div className="absolute top-[12%] right-[-12%] w-[36rem] h-[36rem] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[28%] w-[30rem] h-[30rem] bg-[#FF4655]/[0.05] blur-[110px] rounded-full" />
      </div>

      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50">
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-8">
        {/* ── BACK ── */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/projects" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] hover:text-[#ECE8E1] hover:border-[#FF4655]/40 transition-colors group" style={{ clipPath: CLIP_BTN }}>
            <Crosshair className="w-3.5 h-3.5 text-[#FF4655] group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-[11px] font-black tracking-[0.16em]" style={{ fontFamily: "var(--font-mono)" }}>
              // BACK TO ARSENAL
            </span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
          {/* ── HEADER — CENTERED VALORANT DOSSIER ── */}
          <div className="text-center space-y-5 max-w-4xl mx-auto">
            {/* HUD badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Swords className="w-3 h-3" /> // DOSSIER // {project.id.toString().padStart(2, "0")}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-[11px] tracking-[0.14em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> VLR-INTEL // SECURE
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD700] text-[#0F1923] text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  <span className="w-1.5 h-1.5 bg-[#0F1923] animate-pulse" /> ELITE // FEATURED
                </span>
              )}
            </div>

            <div className="relative">
              <div className="flex justify-center items-center gap-3 md:gap-4 flex-wrap">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] leading-[0.9] tracking-[-0.02em] text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                  {project.title.toUpperCase()} <span className="text-[#FF4655]">//</span>
                </h1>
                <a
                  href="https://github.com/himesh220002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 md:w-12 md:h-12 bg-[#0a131c] border border-[#1e2d3a] hover:border-[#FF4655]/50 hover:bg-[#111A23] text-[#ECE8E1] hover:text-[#FF4655] flex items-center justify-center transition-colors shrink-0"
                  style={{ clipPath: CLIP_BTN }}
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <div className="h-[2px] w-12 bg-[#FF4655]" />
                <div className="h-px w-24 bg-[#1e2d3a]" />
                <Crosshair className="w-4 h-4 text-[#FF4655]/60" />
                <div className="h-px w-24 bg-[#1e2d3a]" />
                <div className="h-[2px] w-12 bg-[#FF4655]" />
              </div>
            </div>

            <p className="text-[15px] md:text-[17px] leading-relaxed max-w-3xl mx-auto font-medium" style={{ fontFamily: "var(--font-raj)", color: "#768079" }}>
              <span className="text-[#ECE8E1] font-semibold">{project.overview}</span>
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-[11px] font-bold tracking-[0.12em] hover:border-[#FF4655]/30 hover:text-[#ECE8E1] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* ── METADATA BAR — 4 COL GRID CLIPPED PANEL ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-[#0a131c] border border-[#1e2d3a]" style={{ clipPath: CLIP_PANEL }}>
            {[
              { label: "CATEGORY", value: categoryPrimary.toUpperCase(), icon: Layers, color: "#FF4655" },
              { label: "DOMAIN", value: categorySecondary.toUpperCase(), icon: Server, color: "#00E5FF" },
              { label: "LAST UPDATED", value: project.lastUpdated.toUpperCase(), icon: Calendar, color: "#FF4655" },
              {
                label: "SOURCE CODE",
                value: project.github ? "VIEW ON GITHUB" : "PRIVATE REPO",
                icon: Code2,
                color: "#B14AFF",
                href: project.github,
                isLink: !!project.github,
              },
            ].map((m) => (
              <div key={m.label} className="bg-[#0F1923] border border-[#1e2d3a] px-4 py-4 flex flex-col items-center text-center gap-2 hover:border-[#2a3a4a] transition-colors relative overflow-hidden" style={{ clipPath: CLIP_BTN }}>
                <span className="text-[10px] tracking-[0.16em] font-black text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  // {m.label}
                </span>
                <div className="flex items-center gap-2">
                  <m.icon className="w-4 h-4 shrink-0" style={{ color: m.color }} />
                  {m.isLink ? (
                    <a href={m.href} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-black tracking-wide text-[#ECE8E1] hover:text-[#FF4655] transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                      {m.value}
                    </a>
                  ) : (
                    <span className="text-xs md:text-sm font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                      {m.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── MEDIA SHOWCASE — VALORANT FRAME ── */}


          {/* HUD bar above carousel */}

          {/* <div className="relative overflow-hidden bg-[#0a131c] border border-[#1e2d3a]" style={{ clipPath: CLIP_PANEL }}> */}
          <ProjectCarousel images={project.images && project.images.length > 0 ? project.images : [project.image]} title={project.title} />
          {/* </div> */}


          {/* tactical divider with image strip */}
          <div className="relative h-20 md:h-24 overflow-hidden border border-[#1e2d3a] bg-[#0a131c]" style={{ clipPath: CLIP_PANEL }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop" alt="Tactical cyber" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923] via-[#0F1923]/60 to-[#0F1923]/80" />
            <div className="absolute inset-0 bg-[#FF4655]/[0.06] mix-blend-overlay" />
            <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(-45deg,transparent_0_12px,rgba(255,70,85,0.5)_12px_13px)]" />
            <div className="relative z-10 h-full flex items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                    TACTICAL INTEL STRIP
                  </p>
                  <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    ARSENAL // DEEP DIVE // CLASSIFIED
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> INTEL LOCKED // VERIFIED
                <Crosshair className="w-4 h-4 text-[#FF4655]/50" />
              </div>
            </div>
          </div>

          {/* ── CONTENT GRID 8 / 4 ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Content Body */}
            <div className="lg:col-span-8 space-y-8">
              {/* Project Overview */}
              <section className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]/70" />
                <div className="bg-[#0F1923] p-6 md:p-8 space-y-6 relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#FF4655]/[0.04] blur-[30px] pointer-events-none" />
                  <CornerBrackets color="rgba(255,70,85,0.3)" size={12} />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF4655] flex items-center justify-center text-white shrink-0" style={{ clipPath: CLIP_BTN }}>
                      <Layout className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.16em] text-[#FF4655] font-black" style={{ fontFamily: "var(--font-mono)" }}>
                        // 01 // OVERVIEW
                      </p>
                      <h2 className="text-2xl md:text-3xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                        PROJECT OVERVIEW
                      </h2>
                    </div>
                    <span className="ml-auto hidden sm:block w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
                  </div>
                  <div className="h-px w-full bg-[#1e2d3a] relative z-10" />
                  <div className="space-y-4 relative z-10">
                    <p className="text-[15px] leading-relaxed font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                      {project.description}
                    </p>
                    <p className="text-[15px] leading-relaxed font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                      This project was designed with a heavy emphasis on clean architecture and high-performance structural engineering, perfectly matching the required technical capabilities for <span className="text-[#ECE8E1] font-bold">{project.category}</span> ecosystems. Our primary goal was to ensure seamless scalability and uncompromised user experience.
                    </p>
                  </div>
                </div>
              </section>

              {/* Core Features */}
              <section className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00E5FF]/70" />
                <div className="bg-[#0F1923] p-6 md:p-8 space-y-6 relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#00E5FF]/[0.04] blur-[30px] pointer-events-none" />
                  <CornerBrackets color="rgba(0,229,255,0.25)" size={12} />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF4655] flex items-center justify-center text-white shrink-0" style={{ clipPath: CLIP_BTN }}>
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.16em] text-[#00E5FF] font-black" style={{ fontFamily: "var(--font-mono)" }}>
                        // 02 // ARSENAL
                      </p>
                      <h2 className="text-2xl md:text-3xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                        CORE FEATURES
                      </h2>
                    </div>
                    <span className="ml-auto hidden sm:block w-1.5 h-1.5 bg-[#00E5FF] animate-pulse" />
                  </div>
                  <div className="h-px w-full bg-[#1e2d3a] relative z-10" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
                    {project.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-[#0a131c] border border-[#1e2d3a] hover:border-[#FF4655]/30 hover:bg-[#111A23] transition-colors group" style={{ clipPath: CLIP_PANEL }}>
                        <div className="w-8 h-8 bg-[#0F1923] border border-[#1e2d3a] flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 group-hover:border-emerald-400/30 transition-colors" style={{ clipPath: CLIP_BTN }}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm leading-relaxed font-bold text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Deep Dive & Impact */}
              {project.elaborations && project.elaborations.length > 0 && (
                <section className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFD700]/70" />
                  <div className="bg-[#0F1923] p-6 md:p-8 space-y-6 relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#FFD700]/[0.04] blur-[30px] pointer-events-none" />
                    <CornerBrackets color="rgba(255,215,0,0.25)" size={12} />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF4655] flex items-center justify-center text-white shrink-0" style={{ clipPath: CLIP_BTN }}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.16em] text-[#FFD700] font-black" style={{ fontFamily: "var(--font-mono)" }}>
                          // 03 // INTEL
                        </p>
                        <h2 className="text-2xl md:text-3xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                          DEEP DIVE & IMPACT
                        </h2>
                      </div>
                      <span className="ml-auto hidden sm:block w-1.5 h-1.5 bg-[#FFD700] animate-pulse" />
                    </div>
                    <div className="h-px w-full bg-[#1e2d3a] relative z-10" />
                    <div className="space-y-4 relative z-10">
                      {project.elaborations.map((elaboration, i) => (
                        <div key={i} className="relative bg-[#0a131c] border border-[#1e2d3a] p-5 pl-6 overflow-hidden group hover:border-[#FF4655]/20 transition-colors" style={{ clipPath: CLIP_PANEL }}>
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
                          <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <p className="text-sm md:text-[15px] leading-relaxed font-medium text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                            <span className="text-[#FF4655] font-black mr-2" style={{ fontFamily: "var(--font-mono)" }}>
                              0{i + 1} //
                            </span>
                            {elaboration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* tactical image block — between sections */}
              <div className="relative h-36 md:h-40 overflow-hidden border border-[#1e2d3a] bg-[#0a131c]" style={{ clipPath: CLIP_CARD }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop" alt="Cyber tactical" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923] via-transparent to-[#0F1923]/60" />
                <div className="absolute inset-0 bg-[#FF4655]/[0.05] mix-blend-overlay" />
                <div className="relative z-10 h-full flex items-center gap-4 px-6">
                  <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                      GLOBAL DEPLOYMENT READY
                    </p>
                    <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                      EDGE // WORLDWIDE // SCALABLE
                    </p>
                  </div>
                  <Crosshair className="ml-auto w-5 h-5 text-[#FF4655]/50 hidden sm:block" />
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-6 space-y-4">
                {/* Tech Stack Dossier */}
                <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] z-20" />
                  <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/60 z-20" />
                  <div className="relative bg-[#0F1923] p-6 md:p-7 space-y-6 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#FF4655]/[0.04] blur-[30px] pointer-events-none" />
                    <CornerBrackets color="rgba(255,70,85,0.4)" size={12} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-black tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                          <Layers className="w-4 h-4 text-[#FF4655]" /> // TECH STACK
                        </h3>
                        <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
                      </div>
                      <div className="h-[2px] w-12 bg-[#FF4655] mb-4" />
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tech) => (
                          <span key={tech} className="px-3 py-2 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] hover:text-white hover:border-[#FF4655]/40 hover:bg-[#FF4655]/10 transition-colors text-[11px] font-bold tracking-wide cursor-default" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            {tech.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#1e2d3a] space-y-3 relative z-10">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="group flex w-full items-center justify-center gap-2 bg-[#FF4655] text-white py-3.5 font-black tracking-wide hover:bg-[#e03a49] transition-colors relative overflow-hidden" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                          <span className="relative flex items-center gap-2 text-sm">
                            <ExternalLink className="w-4 h-4" /> LIVE DEMO
                          </span>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 bg-[#ECE8E1] text-[#0F1923] py-3.5 font-black tracking-wide hover:bg-white transition-colors border border-[#ECE8E1]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                          <Code2 className="w-4 h-4" /> VIEW SOURCE CODE
                        </a>
                      )}
                      <Link href="/contact" className="flex w-full items-center justify-center gap-2 py-3.5 font-bold tracking-wide border border-[#1e2d3a] bg-[#0a131c] text-[#ECE8E1] hover:border-[#ECE8E1]/30 hover:bg-[#111A23] transition-all" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                        DISCUSS SIMILAR PROJECT <ChevronRight className="w-4 h-4 text-[#FF4655]" />
                      </Link>
                    </div>

                    {/* mini tactical image */}
                    <div className="relative overflow-hidden border border-[#1e2d3a] bg-[#0a131c] mt-2" style={{ clipPath: CLIP_PANEL }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" alt="Tactical gaming comms" className="w-full h-[110px] object-cover opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a131c] via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-[#FF4655]/10 mix-blend-overlay" />
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between bg-[#0F1923]/85 border-t border-[#1e2d3a]">
                        <span className="text-[10px] tracking-[0.14em] text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                          <span className="w-1 h-1 bg-[#FF4655] animate-pulse" /> COMMS GRID // ONLINE
                        </span>
                        <span className="text-[10px] tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-mono)" }}>
                          VLR-OPS
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] tracking-widest text-[#768079] pt-1" style={{ fontFamily: "var(--font-mono)" }}>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NDA-FIRST // ENCRYPTED
                      <span className="ml-auto flex items-center gap-1.5 text-emerald-300">
                        <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> SECURE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "98/100", l: "SCORE" },
                    { v: "<0.9S", l: "LOAD" },
                    { v: "A+", l: "SECURITY" },
                  ].map((s) => (
                    <div key={s.l} className="bg-[#0a131c] border border-[#1e2d3a] py-3 text-center" style={{ clipPath: CLIP_PANEL }}>
                      <p className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                        {s.v}
                      </p>
                      <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>

                {/* SPIKE PLANT mini CTA */}
                <div className="relative bg-[#FF4655] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <div className="relative bg-[#0F1923] p-5 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[70%] h-[220%] bg-[#FF4655]/[0.06] rotate-[18deg] pointer-events-none" />
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
                    <CornerBrackets color="#FF4655" size={10} />
                    <div className="relative z-10 space-y-3">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        <span className="w-1.5 h-1.5 bg-white animate-pulse" /> SPIKE PLANT // READY
                      </div>
                      <h4 className="text-lg leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                        NEED THIS <span className="text-[#FF4655]">FIREPOWER?</span>
                      </h4>
                      <p className="text-xs leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                        Deploy the same stack for your op. Tactical discovery in 48H.
                      </p>
                      <Link href="/contact" className="group w-full inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white py-3 font-black tracking-wide hover:bg-[#e03a49] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                        <span className="relative flex items-center gap-2 text-sm">
                          INITIATE CONTACT <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM NAV — BACK + NEXT ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1e2d3a]">
            <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] hover:border-[#ECE8E1]/20 hover:bg-[#111A23] transition-colors text-xs font-black tracking-widest" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              <ArrowLeft className="w-4 h-4" /> BACK TO ARSENAL
            </Link>
            <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1 h-1 bg-[#FF4655]" /> CYPHER TECH // VLR-DOSSIER // {project.slug.toUpperCase()}
              <ValorantCrosshair className="w-6 h-6 ml-2 hidden sm:flex bg-[#0a131c] border border-[#1e2d3a]" />
            </div>
          </div>

          {/* footer tag */}
          <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#768079]/50 pt-2" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-INTEL // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
