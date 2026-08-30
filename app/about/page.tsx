"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Skull, Crosshair, ShieldCheck, Target, Radio, Swords, Zap, Layers, Cpu, Award, Calendar, MapPin, Mail, Globe, ExternalLink } from "lucide-react";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

function CornerBrackets({ color = "rgba(255,70,85,0.5)" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
    </>
  );
}

export default function AboutPage() {
  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 26px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#FF4655]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-12">
        {/* HUD header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            <Skull className="w-3.5 h-3.5" /> // AGENT DOSSIER
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-[11px] tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> VLR-AGENT-01 // HIMESH SATYAM
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* portrait dossier */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-5">
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
              <div className="relative overflow-hidden bg-[#0a131c]" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets />
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img src="https://static0.srcdn.com/wordpress/wp-content/uploads/2025/11/okabe-steins-gate.jpg?w=1200&h=1500&fit=crop" alt="Himesh Satyam" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-widest" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>LVL 09 // ELITE</div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-400 animate-pulse border border-[#0F1923]" style={{ clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
                </div>
                <div className="bg-[#0F1923] border-t border-[#FF4655] p-4">
                  <p className="text-sm font-black tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>HIMESH SATYAM // CONTROLLER</p>
                  <p className="text-[11px] tracking-[0.14em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                    <MapPin className="w-3 h-3 text-[#FF4655]" /> REMOTE WORLDWIDE <span className="w-1 h-1 bg-[#1e2d3a]" /> FULL-STACK
                  </p>
                  <div className="mt-3 flex gap-2">
                    {[
                      { Icon: ExternalLink, href: "https://github.com/himesh220002", label: "GH" },
                      { Icon: Globe, href: "https://www.linkedin.com/in/himesh", label: "IN" },
                      { Icon: Mail, href: "mailto:satyamhimesh@gmail.com", label: "ML" },
                      { Icon: Globe, href: "https://x.com/CypherHarley", label: "X" },
                    ].map(({ Icon, href }, i) => (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#0a131c] border border-[#1e2d3a] flex items-center justify-center text-[#768079] hover:text-[#FF4655] hover:border-[#FF4655]/30 transition-colors" style={{ clipPath: CLIP_BTN }}>
                        <Icon className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* stats */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { k: "OPS", v: "50+" },
                { k: "UPTIME", v: "99.99%" },
                { k: "STACK", v: "NEXT.JS" },
              ].map((s) => (
                <div key={s.k} className="bg-[#0a131c] border border-[#1e2d3a] py-2 text-center" style={{ clipPath: CLIP_BTN }}>
                  <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>{s.k}</p>
                  <p className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* bio */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">HI, I&apos;M</span> <span className="text-[#FF4655]">HIMESH.</span>
              </h1>
              <div className="mt-3 h-[2px] w-16 bg-[#FF4655]" />
              <p className="text-[11px] tracking-[0.16em] text-[#00E5FF] font-black mt-2 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                <Crosshair className="w-3.5 h-3.5" /> FULL-STACK ENGINEER // CONTROLLER
              </p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
              <p>
                I&apos;m a <span className="text-[#ECE8E1] font-semibold">full-stack engineer and designer</span> obsessed with the intersection of robust backend architecture and stunning front-end experiences. I don&apos;t just ship features — I engineer valorant-precision systems that dominate lobbies.
              </p>
              <p>
                Deep expertise in <span className="text-[#ECE8E1] font-semibold">Next.js, Node, and cloud infrastructure</span>. From streaming SSR to edge-cached APIs, I turn complex requirements into elegant, high-performance digital products that scale to millions.
              </p>
              <p>
                When not coding, I&apos;m studying game HUDs, clipping polygons, and tuning `clipPath` like an agent loadout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Cpu, title: "Frontend Mastery", desc: "Next.js 15, React 19, Framer Motion — 98+ Lighthouse, <0.9s loads." },
                { icon: Layers, title: "Backend & Cloud", desc: "Node, PostgreSQL, Redis, AWS — zero-downtime, 99.99% SLO." },
                { icon: ShieldCheck, title: "Security First", desc: "OAuth2, AES-256, anti-cheat APIs — bank-grade, audited." },
                { icon: Target, title: "Design Systems", desc: "Clipped HUDs, tokens, micro-interactions that convert." },
              ].map((c) => (
                <div key={c.title} className="relative bg-[#0a131c] border border-[#1e2d3a] p-4 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]/50" />
                  <CornerBrackets color="rgba(255,70,85,0.25)" />
                  <c.icon className="w-5 h-5 text-[#FF4655] mb-2" />
                  <h3 className="text-sm font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>{c.title.toUpperCase()}</h3>
                  <p className="text-xs leading-relaxed text-[#768079] mt-1">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="px-6 py-3 bg-[#FF4655] text-white text-xs font-black tracking-widest hover:bg-[#e03a49] transition-colors inline-flex items-center gap-2" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                LET&apos;S CONNECT <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/projects" className="px-6 py-3 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-xs font-black tracking-widest hover:border-[#FF4655]/30 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                VIEW ARSENAL
              </Link>
              <Link href="/blog" className="px-6 py-3 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-xs font-black tracking-widest hover:text-[#ECE8E1] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                READ INTEL
              </Link>
            </div>
          </motion.div>
        </div>

        {/* timeline */}
        <div className="relative bg-[#0a131c] border border-[#1e2d3a] p-6 md:p-8 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]" />
          <CornerBrackets />
          <h2 className="text-xl md:text-2xl leading-none text-[#ECE8E1] flex items-center gap-2" style={{ fontFamily: "var(--font-anton)" }}>
            <Award className="w-5 h-5 text-[#FFD700]" /> TIMELINE // DOSSIER
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { year: "2021", title: "First Deploy", desc: "Shipped first Next.js app — 10k users in 3 months." },
              { year: "2023", title: "Full-Stack Ops", desc: "50+ products, 99.99% uptime, 4.9/5 rating." },
              { year: "2026", title: "CypherTech Elite", desc: "Valorant-grade systems for global squads." },
            ].map((t) => (
              <div key={t.year} className="bg-[#0F1923] border border-[#1e2d3a] p-4" style={{ clipPath: CLIP_CARD }}>
                <p className="text-xs font-black tracking-[0.16em] text-[#FF4655]" style={{ fontFamily: "var(--font-mono)" }}>{t.year} // PHASE</p>
                <h3 className="text-sm font-black text-[#ECE8E1] mt-1" style={{ fontFamily: "var(--font-raj)" }}>{t.title.toUpperCase()}</h3>
                <p className="text-xs text-[#768079] mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
