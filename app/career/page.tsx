"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowRight, Target, Users, Zap, CheckCircle2, Crosshair, Radio, Swords, ShieldCheck, Skull, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";
import { roles } from "@/lib/data/roles";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

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

export default function CareerPage() {
  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      {/* bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 26px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-10" />
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#FF4655]/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-[#00E5FF]/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-16 md:space-y-20">
        {/* Header HUD */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              <Swords className="w-3.5 h-3.5" /> // SQUAD // RECRUITMENT
            </span>
          </div>
          <div className="relative inline-block">
            <p className="text-[11px] tracking-[0.22em] text-[#FF4655] font-black flex items-center justify-center gap-2 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-6 h-[2px] bg-[#FF4655]" /> VLR-CAREER // SECTOR-07 <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[0.86] tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              <span className="block text-[#ECE8E1]">BUILD THE FUTURE OF</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff7a85]">
                DIGITAL PRODUCTS
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-[3px] w-16 bg-[#FF4655]" />
              <Crosshair className="w-4 h-4 text-[#FF4655]/70" />
              <div className="h-px w-16 bg-[#1e2d3a]" />
            </div>
          </div>
          <p className="text-[#768079] max-w-2xl mx-auto text-[15px] md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-raj)" }}>
            We are a collective of <span className="text-[#ECE8E1] font-semibold">engineers, designers, and strategists</span>. We don&apos;t just write code; we solve complex business problems — valorant-precision, every round.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2" style={{ fontFamily: "var(--font-mono)" }}>
            {[
              { k: "AGENTS", v: "12 ELITE" },
              { k: "STACK", v: "NEXT.JS // NODE" },
              { k: "MODE", v: "REMOTE // GLOBAL" },
            ].map((c) => (
              <span key={c.k} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[11px] tracking-widest" style={{ clipPath: CLIP_BTN }}>
                <span className="w-1 h-1 bg-[#FF4655]" /> <span className="text-[#768079]">{c.k}</span> <span className="text-[#ECE8E1] font-bold">{c.v}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Target, title: "IMPACT DRIVEN", desc: "We focus on outcomes, not output. Every line of code serves a business goal — headshot precision.", color: "#FF4655", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&auto=format&fit=crop" },
            { icon: Users, title: "COLLABORATIVE EXCELLENCE", desc: "We elevate each other. Ego left at spawn — best idea wins, team extracts together.", color: "#00E5FF", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&auto=format&fit=crop" },
            { icon: Zap, title: "CONTINUOUS EVOLUTION", desc: "Technology moves fast. We train daily — new agents, new metas, new paradigms.", color: "#FFD700", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&auto=format&fit=crop" },
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden group hover:border-[#FF4655]/30 transition-colors"
              style={{ clipPath: CLIP_CARD }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: value.color }} />
              <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-60" style={{ background: value.color }} />
              <div className="relative bg-[#0F1923] overflow-hidden p-6 flex flex-col min-h-[280px]" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets color={`${value.color}66`} />
                <img src={value.img} alt={value.title} className="absolute inset-0 w-full h-full object-cover opacity-[0.06] group-hover:opacity-[0.09] transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN, background: value.color }}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[11px] tracking-[0.16em] font-black mt-3" style={{ fontFamily: "var(--font-mono)", color: value.color }}>
                    // PROTOCOL // 0{i + 1}
                  </p>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="text-lg leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>{value.title}</h3>
                  <p className="text-sm leading-relaxed text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>{value.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#FF4655] text-[11px] font-black tracking-[0.16em] mb-3" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Radio className="w-3 h-3 animate-pulse" /> // OPEN POSITIONS // {roles.length} SLOTS
              </div>
              <h2 className="text-3xl md:text-4xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                OPEN <span className="text-[#FF4655]">POSITIONS</span>
              </h2>
              <p className="text-sm text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>Find your agent role — help us shape the future of software.</p>
            </div>
            <div className="flex gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="px-4 py-2 bg-[#FF4655] text-white text-xs font-black tracking-widest" style={{ clipPath: CLIP_BTN }}>ENGINEERING</span>
              <span className="px-4 py-2 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] hover:text-[#ECE8E1] hover:border-[#FF4655]/30 text-xs font-black tracking-widest transition-colors" style={{ clipPath: CLIP_BTN }}>DESIGN</span>
            </div>
          </div>

          <div className="space-y-4">
            {roles.map((role, idx) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden hover:border-[#FF4655]/30 transition-all"
                style={{ clipPath: CLIP_CARD }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#0F1923] p-6 md:p-7 flex flex-col lg:flex-row gap-6 justify-between overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.25)" />
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FF4655]/[0.04] blur-[30px] rotate-12 pointer-events-none" />
                  <div className="flex-1 space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 text-white text-[10px] font-black tracking-widest" style={{ clipPath: CLIP_BTN, background: "#FF4655", fontFamily: "var(--font-mono)" }}>
                        {role.department.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        <MapPin className="w-3 h-3 text-[#FF4655]" /> {role.location.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                        <Calendar className="w-3 h-3 text-[#00E5FF]" /> {role.type.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl leading-none text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>{role.title.toUpperCase()}</h3>
                    <p className="text-sm leading-relaxed text-[#768079] max-w-2xl" style={{ fontFamily: "var(--font-raj)" }}>{role.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {role.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-[11px] font-bold tracking-wide hover:border-[#FF4655]/30 hover:text-[#ECE8E1] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-[#1e2d3a] pt-6 lg:pt-0 lg:pl-6 min-w-[250px] relative z-10">
                    <div className="space-y-3 mb-6 w-full">
                      <h4 className="text-[11px] font-black tracking-[0.16em] text-[#FF4655] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                        <Target className="w-3.5 h-3.5" /> KEY REQUIREMENTS
                      </h4>
                      {role.requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FF4655] mt-2 shrink-0" />
                          <span className="text-xs font-semibold text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>{req}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/career/${role.id}`}
                      className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white px-6 py-3 font-black tracking-wide hover:bg-[#e03a49] transition-colors"
                      style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                    >
                      APPLY NOW <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Culture CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-[#FF4655] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="relative bg-[#0F1923] p-8 md:p-12 text-center overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[70%] h-[220%] bg-[#FF4655]/[0.07] rotate-[18deg] pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
            <CornerBrackets color="#FF4655" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Sparkles className="w-3.5 h-3.5" /> // RECRUIT // OPEN CALL
              </div>
              <h2 className="text-3xl md:text-5xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                <span className="text-[#ECE8E1]">DON&apos;T SEE A</span> <span className="text-[#FF4655]">FIT?</span>
              </h2>
              <p className="text-[#768079] text-sm md:text-base leading-relaxed" style={{ fontFamily: "var(--font-raj)" }}>
                We&apos;re always looking for exceptional talent. Send resume + how you&apos;ll make an impact — we&apos;ll open a channel.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#FF4655] text-white px-8 py-4 font-black tracking-wide hover:bg-[#e03a49] transition-colors mt-2" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                PITCH YOURSELF <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
