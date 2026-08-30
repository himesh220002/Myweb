"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Globe, Rocket, Shield, Smartphone, Star, CheckCircle2, Crosshair, Target, Crown, Radio, Skull, Swords, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import RoadmapSection from "@/components/RoadmapSection";
import StarWarGame from "@/components/StarWar/StarWarGame";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono, Orbitron } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });
const orbitron = Orbitron({ weight: ["600", "800"], subsets: ["latin"], variable: "--font-orbitron" });

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_PANEL = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

function CornerBrackets({ color = "rgba(255,70,85,0.6)" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
    </>
  );
}

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [basePlan, setBasePlan] = useState<"startup" | "growth" | "enterprise">("startup");
  const [scope, setScope] = useState(60);

  const planConfig = {
    startup: { name: 'Startup', baseCost: 500, multiplier: 15, lift: 18, roiMultiplier: 2.4, features: ["Custom UI Design", "Core Database Integration", "Basic Security Pack", "Standard Load Times"], color: "#00E5FF" },
    growth: { name: 'Growth', baseCost: 1200, multiplier: 25, lift: 32, roiMultiplier: 3.1, features: ["Advanced multi-funnel flow design", "High-scale operational bandwidth", "Automated growth trigger funnels", "Priority load time tuning (<1.2s)"], color: "#FF4655" },
    enterprise: { name: 'Enterprise', baseCost: 3500, multiplier: 45, lift: 45, roiMultiplier: 4.2, features: ["Dedicated DevOps Infrastructure", "Zero-downtime SLA Guarantee", "Custom Machine Learning Models", "Global Edge CDN Caching"], color: "#FFD700" },
  } as const;

  const currentPlan = planConfig[basePlan];
  const budget = currentPlan.baseCost + (scope * currentPlan.multiplier);
  const liftPercent = currentPlan.lift;
  const projectedRoi = Math.floor(budget * currentPlan.roiMultiplier);
  const svgX = ((scope - 10) / (150 - 10)) * 200;
  const getSvgY = (calculatedBudget: number) => {
    const minBudget = 500;
    const maxBudget = 11000;
    const percentage = (calculatedBudget - minBudget) / (maxBudget - minBudget);
    return 100 - (percentage * 100);
  };
  const svgY = getSvgY(budget);

  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} ${orbitron.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      {/* global valorant bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465510_1px,transparent_1px),linear-gradient(to_bottom,#FF465510_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 26px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4655]/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-[#00E5FF]/[0.06] rounded-full blur-[120px]" />
      </div>

      {/* ── HERO — 3D SPACE DEPTH with herobackgroundtheme1.jpg ── */}
      <section className="relative min-h-[100vh] flex flex-col justify-center px-6 pt-28 pb-16 overflow-hidden">
        {/* 3D depth space background */}
        <div className="absolute inset-0 z-0">
          {/* base 3D image — HIGH VISIBILITY */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/herobackgroundtheme1.jpg" alt="3D space depth — valorant tactical abyss" className="w-full h-full object-cover object-center brightness-[1.15] contrast-[1.1] saturate-[1.15]" />
          {/* valorant color grade — LIGHT so depth shows */}
          <div className="absolute inset-0 bg-[#0F1923]/38" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/18 via-[#0F1923]/10 to-[#0F1923]/85 " />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923]/28 via-transparent to-[#0F1923]/30" />
          {/* depth haze */}
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#FF465510_1px,transparent_1px),linear-gradient(to_bottom,#FF465510_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 26px)" }} />
          {/* vignette + red tactical glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0F1923_85%)]" />
          <div className="absolute -top-10 left-1/3 w-[36rem] h-[36rem] bg-[#FF4655]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-24 right-1/4 w-80 h-80 bg-[#00E5FF]/[0.07] blur-[80px] rounded-full pointer-events-none" />
          {/* scanline */}
          <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgba(236,232,225,0.7)_2px_3px)] pointer-events-none" />
        </div>
        {/* top rail stays */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-10" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* left */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Swords className="w-3.5 h-3.5" /> // ELITE DIGITAL SQUAD
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-[11px] tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> SYSTEM ONLINE // VLR-01
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
              <div className="absolute -left-4 top-1 bottom-1 w-[3px] bg-[#FF4655] hidden sm:block" />
              <p className="text-[11px] tracking-[0.22em] text-[#FF4655] font-black flex items-center gap-2 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-6 h-[2px] bg-[#FF4655]" /> PROTOCOL // 01 — INSERTION
              </p>
              <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.86] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="block text-[#ECE8E1]">ENGINEERING</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff7a85] relative">
                  AVENGERS
                  <span className="absolute -right-1 -top-1 text-[#FF4655] text-xl">//</span>
                </span>
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-[3px] w-20 bg-[#FF4655]" />
                <div className="h-px flex-1 max-w-[360px] bg-[#1e2d3a]" />
                <Crosshair className="w-5 h-5 text-[#FF4655]/70 hidden sm:block" />
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-raj)" }}>
              <span className="text-[#ECE8E1] font-semibold">We build high-performance web applications, striking interfaces, and scalable systems</span>
              <span className="text-[#768079] font-medium"> — for companies ready to dominate their digital lobby.</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/contact" className="group relative inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white px-8 py-4 font-black tracking-wide hover:bg-[#e03a49] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                <span className="relative flex items-center gap-2 text-sm">START A PROJECT <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
              </Link>
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ECE8E1]/[0.06] border border-[#ECE8E1]/15 text-[#ECE8E1] hover:bg-[#ECE8E1]/10 hover:border-[#ECE8E1]/25 transition-colors font-bold" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                VIEW OUR WORK <span className="text-[#FF4655]">▶</span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 pt-2" style={{ fontFamily: "var(--font-mono)" }}>
              {[
                { k: "UPTIME", v: "99.99%" },
                { k: "AGENTS", v: "50+ DEPLOYED" },
                { k: "STACK", v: "NEXT.JS // NODE" },
              ].map((c) => (
                <span key={c.k} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[11px] tracking-widest" style={{ clipPath: CLIP_BTN }}>
                  <span className="w-1 h-1 bg-[#FF4655]" /> <span className="text-[#768079]">{c.k}</span> <span className="text-[#ECE8E1] font-bold">{c.v}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* right tactical preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="lg:col-span-5 relative hidden lg:block">
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px]" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
              <div className="bg-[#0F1923] p-6" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets color="rgba(255,70,85,0.4)" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] tracking-[0.18em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>// AGENT DOSSIER</span>
                  <span className="w-2 h-2 bg-[#FF4655] animate-pulse" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                    <Code2 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>CYPHER TECH — CONTROLLER</p>
                    <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>PRECISION // SPEED // STYLE</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {[
                    { l: "LOAD", v: "<0.9s" },
                    { l: "SCORE", v: "98/100" },
                    { l: "SECURITY", v: "A+" },
                  ].map((s) => (
                    <div key={s.l} className="bg-[#0a131c] border border-[#1e2d3a] p-3 text-center" style={{ clipPath: CLIP_PANEL }}>
                      <p className="text-[10px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>{s.l}</p>
                      <p className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  <span className="w-1 h-1 bg-emerald-400 animate-pulse" /> ULT READY // DEPLOY
                </div>
              </div>
            </div>
            {/* floating valorant crosshair */}
            <div className="absolute -top-3 -right-3 w-8 h-8 border border-[#FF4655]/40 bg-[#0a131c] flex items-center justify-center" style={{ clipPath: CLIP_BTN }}>
              <Crosshair className="w-4 h-4 text-[#FF4655]" />
            </div>
            {/* second small card */}
            <div className="absolute -bottom-6 -left-6 bg-[#0a131c] border border-[#1e2d3a] px-4 py-3 flex items-center gap-3" style={{ clipPath: CLIP_BTN }}>
              <Globe className="w-5 h-5 text-[#00E5FF]" />
              <div>
                <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>GLOBAL DEPLOYMENT</p>
                <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>EDGE // WORLDWIDE</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom ticker */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 border-y border-[#1e2d3a] bg-[#0a131c]/60 overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_40px,rgba(255,70,85,0.05)_40px_41px)]" />
          <div className="flex items-center gap-6 py-3 px-4 text-[11px] tracking-[0.18em] whitespace-nowrap overflow-hidden" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="text-[#FF4655] font-black flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> LIVE // TICKER</span>
            <span className="text-[#768079]">NEXT.JS 15</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#768079]">TYPESCRIPT</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#768079]">TAILWIND</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#768079]">POSTGRES</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#ECE8E1] font-bold">VALORANT-READY PERFORMANCE</span>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <RoadmapSection />

      {/* ── ADVANTAGE (BENTO) ── */}
      <section className="px-6 py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              <Crown className="w-3.5 h-3.5" /> // SQUAD ADVANTAGE
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">THE</span> <span className="text-[#FF4655]">CYPHERTECH</span> <span className="text-[#ECE8E1]">ADVANTAGE</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-[2px] w-12 bg-[#FF4655]" />
              <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>Elite engineering × valorant polish — products that win rounds.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 h-auto md:h-[600px]">
            {/* PERFORMANCE — with symbolic visual: speed gauge + server */}
            <Reveal delay={0.1} className="md:col-span-2 md:row-span-2">
              <div className="group relative h-full w-full bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden hover:border-[#FF4655]/50 transition-colors" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
                <div className="relative h-full bg-[#0F1923] p-6 md:p-8 flex flex-col overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.45)" />
                  <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FF4655]/10 blur-[50px] rounded-full pointer-events-none" />
                  {/* symbolic image — speed/server */}
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop" alt="performance servers" className="absolute top-0 right-0 w-[55%] h-[42%] object-cover opacity-[0.07] group-hover:opacity-[0.12] transition-opacity pointer-events-none" style={{ clipPath: CLIP_PANEL }} />
                  <div className="absolute top-0 right-0 w-[55%] h-[42%] bg-gradient-to-l from-transparent via-transparent to-[#0F1923] pointer-events-none" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF4655] flex items-center justify-center" style={{ clipPath: CLIP_BTN }}>
                        <Rocket className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#FF4655] font-black" style={{ fontFamily: "var(--font-mono)" }}>
                        <span className="w-1 h-1 bg-[#FF4655] animate-pulse" /> PROTOCOL // SPEED
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] tracking-widest text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                      <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> LIGHTHOUSE 98
                    </div>
                  </div>

                  {/* symbolic HUD visual — speed gauge + metrics */}
                  <div className="relative z-10 mt-4 md:mt-6 grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-5 relative bg-[#0a131c] border border-[#1e2d3a] p-3 overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]/60" />
                      <p className="text-[9px] tracking-[0.14em] text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>// VELOCITY // HUD</p>
                      <div className="mt-2 relative h-[72px] flex items-center justify-center">
                        {/* gauge */}
                        <svg viewBox="0 0 100 60" className="w-full h-full">
                          <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#1e2d3a" strokeWidth="6" strokeLinecap="round" />
                          <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#FF4655" strokeWidth="6" strokeLinecap="round" strokeDasharray="92 100" className="group-hover:stroke-[#ff3344] transition-colors" />
                          <line x1="50" y1="55" x2="78" y2="22" stroke="#ECE8E1" strokeWidth="2" strokeLinecap="round" className="group-hover:rotate-[-4deg] origin-[50px_55px] transition-transform duration-700" />
                          <circle cx="50" cy="55" r="4" fill="#ECE8E1" stroke="#0F1923" strokeWidth="1.5" />
                        </svg>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
                          <p className="text-[11px] font-black tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>0.9s</p>
                          <p className="text-[8px] tracking-[0.12em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>TTFB • EDGE</p>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-1 text-center">
                        {[
                          { k: "FCP", v: "0.8s" },
                          { k: "LCP", v: "1.1s" },
                          { k: "CLS", v: "0.01" },
                        ].map((m) => (
                          <div key={m.k} className="bg-[#0F1923] border border-[#1e2d3a] py-1" style={{ clipPath: CLIP_BTN }}>
                            <p className="text-[8px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>{m.k}</p>
                            <p className="text-[11px] font-black text-emerald-400" style={{ fontFamily: "var(--font-anton)" }}>{m.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-7 space-y-2">
                      <div className="bg-[#0a131c]/60 border border-[#1e2d3a] px-3 py-2 flex items-center gap-2" style={{ clipPath: CLIP_BTN }}>
                        <Zap className="w-3.5 h-3.5 text-[#FF4655]" />
                        <span className="text-[11px] font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>SSR • ISR • Edge Runtime</span>
                        <span className="ml-auto w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
                      </div>
                      {/* informational HUD replaces lighthouse image */}
                      <div className="w-full border border-[#1e2d3a] bg-[#0a131c] p-3 space-y-2.5" style={{ clipPath: CLIP_PANEL }}>
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#FF4655]/20 pointer-events-none" />
                        {[
                          { k: "STREAMING SSR", v: "68ms", d: "React 19 • Suspense", c: "bg-emerald-400" },
                          { k: "ISR REVALIDATION", v: "on-demand", d: "Next.js 15 • Webhooks", c: "bg-[#00E5FF]" },
                          { k: "EDGE RUNTIME", v: "300+ PoPs", d: "Vercel • <50ms cold", c: "bg-[#FF4655]" },
                        ].map((r) => (
                          <div key={r.k} className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[10px] font-black tracking-[0.14em] text-[#ECE8E1] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                                <span className={`w-1 h-1 ${r.c} animate-pulse shrink-0`} /> {r.k}
                              </p>
                              <p className="text-[10px] tracking-wide text-[#768079] truncate" style={{ fontFamily: "var(--font-mono)" }}>{r.d}</p>
                            </div>
                            <span className="shrink-0 px-2 py-1 bg-[#0F1923] border border-[#1e2d3a] text-[10px] font-black tracking-widest text-[#ECE8E1]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{r.v.toUpperCase()}</span>
                          </div>
                        ))}
                        <div className="pt-1 flex items-center gap-1.5">
                          <div className="flex-1 h-1 bg-[#1e2d3a] overflow-hidden" style={{ clipPath: CLIP_BTN }}>
                            <div className="h-full w-[92%] bg-[#FF4655]" />
                          </div>
                          <span className="text-[9px] tracking-[0.12em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>CACHE HIT 92%</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        {["HTTP/3", "CDN", "CACHE"].map((t) => (
                          <span key={t} className="flex-1 text-center px-2 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto pt-4">
                    <h3 className="text-2xl md:text-[2rem] leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>BLAZING FAST PERFORMANCE</h3>
                    <p className="text-sm leading-relaxed text-[#768079] mt-2 max-w-lg" style={{ fontFamily: "var(--font-raj)" }}>
                      Next.js server-rendered • streaming SSR • edge cached — <span className="text-[#ECE8E1] font-semibold">sub-second loads, 98+ Lighthouse, instant interactivity.</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["<0.9s LOAD", "98/100 LIGHTHOUSE", "EDGE CACHED"].map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079] group-hover:border-[#FF4655]/30 group-hover:text-[#ECE8E1] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* PREMIUM UI/UX — symbolic: HUD wireframe */}
            <Reveal delay={0.2} className="md:col-span-1">
              <div className="group relative h-full w-full bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden hover:border-[#00E5FF]/50 transition-colors" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00E5FF]" />
                <div className="relative h-full bg-[#0F1923] p-5 flex flex-col overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(0,229,255,0.35)" />
                  <div className="w-11 h-11 bg-[#0a131c] border border-[#1e2d3a] flex items-center justify-center text-[#00E5FF] shrink-0" style={{ clipPath: CLIP_BTN }}>
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] tracking-[0.16em] text-[#00E5FF] font-black mt-3" style={{ fontFamily: "var(--font-mono)" }}>// PROTOCOL // VISUAL</p>

                  {/* symbolic visual */}
                  <div className="mt-3 relative h-[132px] w-full overflow-hidden bg-[#0a131c] border border-[#1e2d3a]" style={{ clipPath: CLIP_PANEL }}>
                    <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop" alt="premium ui wireframe" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a131c] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[#00E5FF]/[0.06] mix-blend-overlay" />
                    {/* HUD wireframe overlay */}
                    <div className="absolute inset-2 border border-[#00E5FF]/20 pointer-events-none" style={{ clipPath: CLIP_PANEL }} />
                    <div className="absolute top-2 left-2 right-2 h-4 bg-[#0F1923]/80 border border-[#1e2d3a] flex items-center px-2 gap-1">
                      <span className="w-1.5 h-1.5 bg-[#00E5FF] animate-pulse" />
                      <span className="text-[8px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>FIGMA • HUD • 12-COL</span>
                      <Crosshair className="w-3 h-3 text-[#00E5FF]/50 ml-auto" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-1">
                      <div className="h-10 bg-[#0F1923]/70 border border-[#00E5FF]/20 backdrop-blur" style={{ clipPath: CLIP_BTN }} />
                      <div className="h-10 bg-[#00E5FF]/20 border border-[#00E5FF]/30 backdrop-blur flex items-center justify-center">
                        <span className="w-6 h-[2px] bg-[#00E5FF]" />
                      </div>
                      <div className="h-10 bg-[#0F1923]/70 border border-[#00E5FF]/20 backdrop-blur" style={{ clipPath: CLIP_BTN }} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00E5FF]/60" />
                  </div>

                  <div className="mt-auto pt-4">
                    <h3 className="text-lg md:text-xl leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>PREMIUM UI/UX</h3>
                    <p className="text-xs md:text-sm leading-relaxed text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>
                      Glass HUDs, clipped panels, crosshairs & micro-interactions — <span className="text-[#ECE8E1]">built to engage, built to convert.</span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* SECURITY — symbolic: vault / shield */}
            <Reveal delay={0.3} className="md:col-span-1">
              <div className="group relative h-full w-full bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden hover:border-[#FFD700]/50 transition-colors" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFD700]" />
                <div className="relative h-full bg-[#0F1923] p-5 flex flex-col overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,215,0,0.35)" />
                  <div className="w-11 h-11 bg-[#0a131c] border border-[#1e2d3a] flex items-center justify-center text-[#FFD700] shrink-0" style={{ clipPath: CLIP_BTN }}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] tracking-[0.16em] text-[#FFD700] font-black mt-3" style={{ fontFamily: "var(--font-mono)" }}>// PROTOCOL // SHIELD</p>

                  {/* symbolic visual */}
                  <div className="mt-3 relative h-[132px] w-full overflow-hidden bg-[#0a131c] border border-[#1e2d3a]" style={{ clipPath: CLIP_PANEL }}>
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&auto=format&fit=crop" alt="enterprise security vault" className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a131c] via-[#0a131c]/40 to-transparent" />
                    <div className="absolute inset-0 bg-[#FFD700]/[0.06] mix-blend-overlay" />
                    {/* shield HUD */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#FFD700]/10 border border-[#FFD700]/30" style={{ clipPath: CLIP_PANEL }} />
                        <ShieldCheck className="relative w-8 h-8 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 border border-[#0a131c] animate-pulse" style={{ clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-[#0F1923]/80 border border-[#1e2d3a] text-[8px] tracking-[0.14em] text-[#FFD700] font-bold" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                      // AES-256 • OAUTH
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                      <span className="flex-1 h-1 bg-[#FFD700]" />
                      <span className="flex-1 h-1 bg-[#1e2d3a]" />
                      <span className="flex-1 h-1 bg-[#1e2d3a]" />
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <h3 className="text-lg md:text-xl leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>ENTERPRISE SECURITY</h3>
                    <p className="text-xs md:text-sm leading-relaxed text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>
                      AES-256, OAuth2, anti-cheat APIs — <span className="text-[#ECE8E1]">bank-grade, audited, zero-trust.</span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ESTIMATOR ── */}
      <section id="estimator" className="px-6 py-16 md:py-20 relative border-y border-[#1e2d3a] bg-[#0a131c]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_22px,rgba(255,70,85,0.03)_22px_23px)] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <Reveal className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Zap className="w-3.5 h-3.5" /> // LOADOUT // CALCULATOR
              </div>
              <h2 className="text-4xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">TRANSFORMATIONAL</span> <span className="text-[#FF4655]">ROI</span>
              </h2>
              <div className="h-[2px] w-14 bg-[#FF4655]" />
              <p className="text-sm leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                Calculate your investment interactively. Elite businesses, measurable lift — no guesswork, only tac-data.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-[#0F1923] border border-[#1e2d3a] p-[1px] relative" style={{ clipPath: CLIP_CARD }}>
                <div className="bg-[#0F1923] p-5 relative" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.3)" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]/60" />
                  <div className="flex items-center gap-1 text-[#FF4655] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    <span className="ml-2 text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>// COMMS // VERIFIED</span>
                  </div>
                  <p className="text-[#ECE8E1] font-semibold leading-relaxed text-[15px] italic" style={{ fontFamily: "var(--font-raj)" }}>
                    "CypherTech digitalized our booking system, saving 15h/week and doubling bookings in under two months."
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1e2d3a]">
                    <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Sarah" alt="Sarah" className="w-10 h-10 border border-[#1e2d3a] bg-[#0a131c]" style={{ clipPath: CLIP_BTN }} />
                    <div>
                      <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>SARAH JENKINS</p>
                      <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>OPERATIONS DIRECTOR</p>
                    </div>
                    <Crosshair className="ml-auto w-4 h-4 text-[#FF4655]/50 hidden sm:block" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="bg-[#0F1923] border border-[#1e2d3a] p-[1px] relative overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
              <div className="bg-[#0F1923] p-5 md:p-7 relative" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets color="rgba(255,70,85,0.35)" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                    <Target className="w-3.5 h-3.5 text-[#FF4655]" /> TACTICAL SCOPE // ARSENAL GRAPH
                  </span>
                  <span className="text-[11px] tracking-widest text-emerald-400 flex items-center gap-1" style={{ fontFamily: "var(--font-mono)" }}><span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> LIVE</span>
                </div>

                {/* legend */}
                <div className="flex flex-wrap items-center gap-2 mb-3 px-1">
                  <span className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>// LEGEND</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-3 h-[2px] bg-[#00E5FF]" /> <span className="text-[#00E5FF]">STARTUP</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-3 h-[2px] bg-[#FF4655]" /> <span className="text-[#FF4655]">GROWTH</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-3 h-[2px] bg-[#FFD700]" /> <span className="text-[#FFD700]">ENTERPRISE</span>
                  </span>
                  <span className="ml-auto hidden sm:inline-flex items-center gap-1 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> ACTIVE: {currentPlan.name.toUpperCase()}
                  </span>
                </div>

                {/* chart — tactical ROI scope */}
                <div className="relative mb-2">
                  <div className="absolute -left-1 top-0 bottom-8 flex flex-col justify-between items-center py-1">
                    <span className="text-[9px] tracking-[0.16em] text-[#768079] -rotate-90 origin-center whitespace-nowrap" style={{ fontFamily: "var(--font-mono)" }}>BUDGET (USD)</span>
                  </div>
                  <div className="h-[280px] w-[calc(100%-2.5rem)] ml-6 relative border border-[#1e2d3a] bg-[#0a131c] p-0 overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
                    {/* subtle analytics image watermark */}
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop" alt="analytics" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a131c] via-transparent to-transparent pointer-events-none" />
                    <svg className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none" viewBox="0 0 200 100">
                      <defs>
                        <linearGradient id="valorantFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF4655" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#FF4655" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gridFade" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#1e2d3a" stopOpacity="0" />
                          <stop offset="15%" stopColor="#1e2d3a" stopOpacity="1" />
                          <stop offset="85%" stopColor="#1e2d3a" stopOpacity="1" />
                          <stop offset="100%" stopColor="#1e2d3a" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Y labels */}
                      <text x="-2" y="2" fill="#ECE8E1" fontSize="4.8" textAnchor="end" alignmentBaseline="middle" fontFamily="var(--font-mono)" fontWeight="700">$11k</text>
                      <text x="-2" y="33.3" fill="#768079" fontSize="4.2" textAnchor="end" alignmentBaseline="middle" fontFamily="var(--font-mono)">$7.5k</text>
                      <text x="-2" y="66.6" fill="#768079" fontSize="4.2" textAnchor="end" alignmentBaseline="middle" fontFamily="var(--font-mono)">$4k</text>
                      <text x="-2" y="98" fill="#768079" fontSize="4.2" textAnchor="end" alignmentBaseline="middle" fontFamily="var(--font-mono)">$500</text>
                      {/* X labels */}
                      <text x="0" y="108" fill="#768079" fontSize="4.2" textAnchor="middle" fontFamily="var(--font-mono)">10k</text>
                      <text x="66" y="108" fill="#768079" fontSize="4.2" textAnchor="middle" fontFamily="var(--font-mono)">50k</text>
                      <text x="132" y="108" fill="#768079" fontSize="4.2" textAnchor="middle" fontFamily="var(--font-mono)">100k</text>
                      <text x="200" y="108" fill="#768079" fontSize="4.2" textAnchor="middle" fontFamily="var(--font-mono)">150k</text>
                      <text x="100" y="118" fill="#1e2d3a" fontSize="4" textAnchor="middle" fontFamily="var(--font-mono)">MONTHLY ACTIVE USERS →</text>

                      {/* grid */}
                      <line x1="0" y1="0" x2="200" y2="0" stroke="#1e2d3a" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.5" />
                      <line x1="0" y1="33.3" x2="200" y2="33.3" stroke="#1e2d3a" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.5" />
                      <line x1="0" y1="66.6" x2="200" y2="66.6" stroke="#1e2d3a" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.5" />
                      <line x1="0" y1="100" x2="200" y2="100" stroke="#1e2d3a" strokeWidth="0.6" opacity="1" />
                      <line x1="0" y1="0" x2="0" y2="100" stroke="#1e2d3a" strokeWidth="0.6" opacity="1" />
                      <line x1="66" y1="0" x2="66" y2="100" stroke="#1e2d3a" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.25" />
                      <line x1="132" y1="0" x2="132" y2="100" stroke="#1e2d3a" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.25" />
                      <line x1="200" y1="0" x2="200" y2="100" stroke="#1e2d3a" strokeWidth="0.35" strokeDasharray="1 2" opacity="0.25" />

                      {/* inactive plans */}
                      <path d={`M0,${getSvgY(planConfig.startup.baseCost + (10 * planConfig.startup.multiplier))} L200,${getSvgY(planConfig.startup.baseCost + (150 * planConfig.startup.multiplier))}`} fill="none" stroke="#00E5FF" strokeWidth="0.9" opacity="0.32" strokeLinecap="round" />
                      <path d={`M0,${getSvgY(planConfig.enterprise.baseCost + (10 * planConfig.enterprise.multiplier))} L200,${getSvgY(planConfig.enterprise.baseCost + (150 * planConfig.enterprise.multiplier))}`} fill="none" stroke="#FFD700" strokeWidth="0.9" opacity="0.32" strokeLinecap="round" />

                      {/* active fill */}
                      <path d={`M0,${getSvgY(currentPlan.baseCost + (10 * currentPlan.multiplier))} L200,${getSvgY(currentPlan.baseCost + (150 * currentPlan.multiplier))} L200,100 L0,100 Z`} fill="url(#valorantFill)" opacity="1" />
                      {/* active line */}
                      <path d={`M0,${getSvgY(currentPlan.baseCost + (10 * currentPlan.multiplier))} L200,${getSvgY(currentPlan.baseCost + (150 * currentPlan.multiplier))}`} fill="none" stroke={currentPlan.color} strokeWidth="2.2" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(255,70,85,0.5))" }} />
                      {/* endpoint markers */}
                      <circle cx="0" cy={getSvgY(currentPlan.baseCost + (10 * currentPlan.multiplier))} r="2.2" fill="#0F1923" stroke={currentPlan.color} strokeWidth="1.2" />
                      <circle cx="200" cy={getSvgY(currentPlan.baseCost + (150 * currentPlan.multiplier))} r="2.2" fill={currentPlan.color} stroke="#0F1923" strokeWidth="1" />

                      {/* crosshair */}
                      <g style={{ transform: `translate(${svgX}px, ${svgY}px)`, transition: 'transform 0.15s ease-out' }}>
                        <line x1={-svgX} y1="0" x2={200 - svgX} y2="0" stroke={currentPlan.color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.55" />
                        <line x1="0" y1={-svgY} x2="0" y2={100 - svgY} stroke={currentPlan.color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.55" />
                        <circle cx="0" cy="0" r="5" fill="none" stroke={currentPlan.color} strokeWidth="0.6" opacity="0.6" />
                        <circle cx="0" cy="0" r="2.8" fill={currentPlan.color} stroke="#0F1923" strokeWidth="1.2" />
                        <g transform={`translate(${svgX > 130 ? -72 : 10}, ${svgY < 28 ? 14 : svgY > 78 ? -18 : -18})`}>
                          <rect width="68" height="16" rx="0" fill="#0F1923" stroke={currentPlan.color} strokeWidth="0.7" style={{ clipPath: CLIP_BTN }} />
                          <text x="34" y="7" fill="#ECE8E1" fontSize="4.2" fontWeight="800" textAnchor="middle" alignmentBaseline="middle" fontFamily="var(--font-mono)">{currentPlan.name.toUpperCase()} • ${budget.toLocaleString()}</text>
                          <text x="34" y="12.2" fill={currentPlan.color} fontSize="3.6" fontWeight="700" textAnchor="middle" alignmentBaseline="middle" fontFamily="var(--font-mono)">ROI ${projectedRoi.toLocaleString()} • +{liftPercent}%</text>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[10px] tracking-[0.12em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>EST. BUDGET CURVE • LINEAR SCALING MODEL</span>
                    <span className="text-[10px] tracking-[0.12em] text-[#768079] hidden sm:inline" style={{ fontFamily: "var(--font-mono)" }}>HOVER SLIDER → REAL-TIME RECALC</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pb-6 mb-6 border-b border-[#1e2d3a] text-center">
                  {[
                    { k: "BUDGET", v: `$${budget.toLocaleString()}`, c: "text-[#ECE8E1]" },
                    { k: "LIFT", v: `+${liftPercent}%`, c: "text-emerald-400" },
                    { k: "ROI", v: `$${projectedRoi.toLocaleString()}`, c: "text-[#FF4655]" },
                  ].map((s) => (
                    <div key={s.k} className="bg-[#0a131c] border border-[#1e2d3a] py-3" style={{ clipPath: CLIP_PANEL }}>
                      <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>{s.k}</p>
                      <p className={`text-lg md:text-xl font-black ${s.c}`} style={{ fontFamily: "var(--font-anton)" }}>{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>// SELECT LOADOUT FRAME</p>
                  <div className="flex bg-[#0a131c] border border-[#1e2d3a] p-1 gap-1" style={{ clipPath: CLIP_PANEL }}>
                    {(["startup", "growth", "enterprise"] as const).map((p) => (
                      <button key={p} onClick={() => setBasePlan(p)} className={`flex-1 py-2 text-xs font-black tracking-wide capitalize transition-colors ${basePlan === p ? 'bg-[#FF4655] text-white' : 'text-[#768079] hover:text-[#ECE8E1] bg-transparent'}`} style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                        {p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>// ADJUST // USERS</span>
                    <span className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>{scope}K USERS</span>
                  </div>
                  <input type="range" min="10" max="150" value={scope} onChange={(e) => setScope(parseInt(e.target.value))} className="w-full h-1 bg-[#1e2d3a] appearance-none cursor-pointer accent-[#FF4655]" />
                </div>

                <div className="bg-[#0a131c] border border-[#1e2d3a] p-4 mb-6" style={{ clipPath: CLIP_PANEL }}>
                  <p className="text-[11px] tracking-[0.14em] text-[#768079] mb-3" style={{ fontFamily: "var(--font-mono)" }}>// INCLUDED // ARSENAL</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPlan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] space-y-1" style={{ fontFamily: "var(--font-mono)" }}>
                    <p className="font-black tracking-widest text-[#768079]">TRUSTED VALIDATION</p>
                    <p className="text-[#768079]"><span className="text-[#FF4655]">▶</span> Vortex: $2.4M pipeline</p>
                    <p className="text-[#768079]"><span className="text-[#FF4655]">▶</span> Acme: +34% efficiency</p>
                    <p className="text-[#768079]"><span className="text-[#FF4655]">▶</span> CloudFlow: 14 days deploy</p>
                  </div>
                  <Link href="/contact" className="w-full md:w-auto px-6 py-3 bg-[#FF4655] text-white text-sm font-black tracking-wide hover:bg-[#e03a49] transition-colors flex items-center justify-center gap-2" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                    INITIALIZE <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS + BLOG + ABOUT ── */}
      <section className="px-6 py-16 md:py-20 overflow-visible relative">
        <div className="max-w-7xl mx-auto space-y-16 overflow-visible">
          {/* Testimonials — VALORANT PREMIUM (parallax + glass + tilt + micro-interactions) */}
          <div className="overflow-visible relative">
            {/* subtle valorant orbs + grid */}
            <div className="absolute -top-12 -left-12 w-72 h-72 bg-[#FF4655]/8 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#00E5FF]/6 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
            <div className="mb-8 text-center relative">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em] shadow-[0_0_20px_rgba(255,70,85,0.3)]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Radio className="w-3 h-3 animate-pulse" /> // COMMS // TESTIMONIALS
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="mt-3 text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">DON&apos;T JUST TAKE</span> <span className="text-[#FF4655]">OUR WORD.</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="text-sm text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>Trusted by founders, CTOs, and operators — real comms from the field.</motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full min-w-0">
              {[
                { quote: "CypherTech completely transformed our digital presence. The new architecture is blazing fast, and our conversion rates have doubled since launch.", author: "Sarah Jenkins", role: "Director of E-Commerce", image: "/testimonial_1.png" },
                { quote: "Himesh is not just a developer; he's a strategic partner. He understood our business goals immediately and engineered a solution that perfectly aligned with them.", author: "David Chen", role: "Founder, TechFlow AI", image: "/testimonial_2.png" },
                { quote: "The attention to detail in the UI/UX is unmatched. They delivered a product that looks incredible and functions flawlessly under heavy load.", author: "Marcus Thorne", role: "CTO, Global Logistics", image: "/testimonial_3.png" },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="min-w-0 group"
                  style={{ perspective: 1000 } as any}
                >
                  <div className="relative bg-[#111A23]/80 backdrop-blur-xl border border-[#1e2d3a] p-[1px] h-full w-full min-w-0 overflow-hidden hover:border-[#FF4655]/30 hover:shadow-[0_12px_40px_rgba(255,70,85,0.18),0_0_30px_rgba(255,70,85,0.08)] hover:bg-[#111A23] transition-all duration-500" style={{ clipPath: CLIP_PANEL }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4655] via-[#FF4655]/70 to-transparent opacity-80 group-hover:opacity-100 group-hover:h-[2.5px] transition-all" />
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#FF4655]/10 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="bg-[#0F1923]/90 backdrop-blur-xl p-6 relative h-full flex flex-col min-w-0" style={{ clipPath: CLIP_PANEL }}>
                      <CornerBrackets color="rgba(236,232,225,0.12)" />
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, k) => (
                          <motion.div key={k} whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: "spring", stiffness: 400 }}>
                            <Star className="w-3.5 h-3.5 fill-[#FF4655] text-[#FF4655] group-hover:drop-shadow-[0_0_6px_rgba(255,70,85,0.6)] transition-all" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-[#ECE8E1] flex-1 min-w-0 break-words group-hover:text-white transition-colors duration-300" style={{ fontFamily: "var(--font-raj)" }}>"{t.quote}"</p>
                      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#1e2d3a] group-hover:border-[#FF4655]/20 transition-colors min-w-0">
                        <div className="relative shrink-0">
                          <img src={t.image} alt={t.author} className="w-10 h-10 border border-[#1e2d3a] bg-[#0a131c] object-cover group-hover:border-[#FF4655]/40 group-hover:scale-105 transition-all duration-300" style={{ clipPath: CLIP_BTN }} />
                          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-400 border border-[#0F1923] hidden group-hover:block animate-pulse" style={{ clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black tracking-wide text-[#ECE8E1] group-hover:text-white truncate transition-colors" style={{ fontFamily: "var(--font-raj)" }}>{t.author.toUpperCase()}</p>
                          <p className="text-[11px] tracking-wide text-[#768079] group-hover:text-[#9CA3AF] truncate transition-colors" style={{ fontFamily: "var(--font-mono)" }}>{t.role.toUpperCase()}</p>
                        </div>
                        <Crosshair className="w-3.5 h-3.5 text-[#FF4655]/30 group-hover:text-[#FF4655]/70 group-hover:rotate-90 transition-all duration-500 ml-auto hidden sm:block shrink-0" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Blog */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#00E5FF] text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  <TrendingUp className="w-3 h-3" /> // INTEL // INSIGHTS
                </div>
                <h2 className="text-3xl md:text-5xl leading-none tracking-tight mt-3" style={{ fontFamily: "var(--font-anton)" }}><span className="text-[#ECE8E1]">LATEST</span> <span className="text-[#00E5FF]">INSIGHTS</span></h2>
                <p className="text-sm text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>Thoughts on engineering, design, and building the future.</p>
              </div>
              <Link href="/blog" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-xs font-black tracking-widest hover:border-[#FF4655]/40 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                VIEW ALL INTEL <ArrowRight className="w-3.5 h-3.5 text-[#FF4655]" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full min-w-0">
              {[
                { slug: "rsc-ecommerce", category: "Engineering", title: "Why React Server Components are the Future of E-Commerce", date: "Oct 12, 2026", readTime: "5 min read", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop" },
                { slug: "micro-interactions", category: "Design", title: "The Psychology of Micro-Interactions in SaaS Dashboards", date: "Sep 28, 2026", readTime: "4 min read", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop" },
                { slug: "scaling-agency", category: "Strategy", title: "Scaling Your Agency: When to Transition from Freelancer to Firm", date: "Sep 15, 2026", readTime: "7 min read", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop" },
              ].map((post, i) => (
                <Reveal key={i} delay={i * 0.08} className="min-w-0">
                  <Link href={`/blog/${post.slug}`} className="group block bg-[#111A23] border border-[#1e2d3a] hover:border-[#FF4655]/30 transition-colors w-full min-w-0" style={{ clipPath: CLIP_CARD }}>
                    <div className="h-48 bg-[#0a131c] relative overflow-hidden" style={{ clipPath: "polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 14px)" }}>
                      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                      <div className="absolute inset-0 bg-[#0F1923]/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-widest" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{post.category.toUpperCase()}</div>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4655]" />
                    </div>
                    <div className="p-6 bg-[#0F1923]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)" }}>
                      <h3 className="text-[15px] font-bold leading-snug text-[#ECE8E1] group-hover:text-[#FF4655] transition-colors break-words" style={{ fontFamily: "var(--font-raj)" }}>{post.title}</h3>
                      <div className="flex items-center gap-2 mt-3 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        <span>{post.date.toUpperCase()}</span><span className="w-1 h-1 bg-[#1e2d3a] shrink-0" /><span>{post.readTime.toUpperCase()}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* About — fixed overflow + Lyon-safe clip */}
          <div className="overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-visible">
              <div className="order-2 lg:order-1 lg:col-span-6 space-y-5 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  <Skull className="w-3.5 h-3.5" /> // AGENT // HIMESH
                </div>
                <h2 className="text-4xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)", opacity: 1, visibility: "visible", display: "block", color: "#ECE8E1" }}>
                  <span style={{ color: "#ECE8E1", opacity: 1, visibility: "visible", display: "inline" }}>HI, I&apos;M</span> <span style={{ color: "#FF4655", opacity: 1, visibility: "visible", display: "inline" }}>HIMESH.</span>
                </h2>
                <div className="h-[2px] w-14 bg-[#FF4655]" style={{ opacity: 1, visibility: "visible", display: "block" }} />
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-raj)", opacity: 1, visibility: "visible", display: "block", color: "#9CA3AF" }}>
                  I&apos;m a full-stack engineer and designer dedicated to building the intersection of robust backend architecture and stunning front-end user experiences.
                </p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-raj)", opacity: 1, visibility: "visible", display: "block", color: "#9CA3AF" }}>
                  With deep expertise in Next.js, Node, and cloud infrastructure, I partner with companies to turn complex requirements into elegant, high-performance digital products.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link href="/about" className="px-6 py-3 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-xs font-black tracking-widest hover:border-[#ECE8E1]/20 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                    READ DOSSIER
                  </Link>
                  <Link href="/contact" className="px-6 py-3 bg-[#FF4655] text-white text-xs font-black tracking-widest hover:bg-[#e03a49] transition-colors flex items-center gap-2" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                    LET&apos;S CONNECT <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-6 relative min-w-0 flex justify-center">
                <div className="relative w-full max-w-[420px] bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-visible" style={{ clipPath: CLIP_CARD }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] z-10" />
                  <div className="relative aspect-square w-full overflow-hidden bg-[#0a131c]" style={{ clipPath: CLIP_CARD }}>
                    <CornerBrackets color="rgba(255,70,85,0.5)" />
                    <img src="https://static0.srcdn.com/wordpress/wp-content/uploads/2025/11/okabe-steins-gate.jpg?w=1600&h=1200&fit=crop" alt="Himesh Satyam" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0F1923]/90 border-t border-[#FF4655] px-4 py-3 flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-black tracking-widest text-[#ECE8E1] truncate" style={{ fontFamily: "var(--font-raj)" }}>HIMESH SATYAM // CONTROLLER</p>
                        <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>LVL 09 // ELITE</p>
                      </div>
                      <Crosshair className="w-5 h-5 text-[#FF4655] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAYZONE ── */}
      <section className="hidden lg:block px-6 py-16 border-t border-[#1e2d3a] bg-[#0a131c] relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_24px,rgba(255,70,85,0.03)_24px_25px)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              <Zap className="w-3.5 h-3.5" /> // TRAINING GROUND
            </div>
            <h2 className="mt-3 text-4xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="text-[#ECE8E1]">PLAY</span><span className="text-[#FF4655]">ZONE</span>
            </h2>
            <p className="text-sm text-[#768079] mt-3 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-raj)" }}>
              Try out StarWarZ — a fully functioning HTML5 canvas game built directly into this page. Valorant meets arcade.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-[#0F1923] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="bg-[#0F1923] p-3" style={{ clipPath: CLIP_CARD }}>
                <div className="flex items-center justify-between px-2 pb-3 border-b border-[#1e2d3a] mb-3">
                  <span className="text-[11px] tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> STARWARZ // ARCADE PROTOCOL
                  </span>
                  <span className="text-[11px] tracking-widest text-[#FF4655]" style={{ fontFamily: "var(--font-mono)" }}>INSERT COIN ▶</span>
                </div>
                <StarWarGame />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
