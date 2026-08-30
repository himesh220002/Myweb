"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Briefcase,
  Zap,
  Building2,
  User,
  Crosshair,
  ShieldCheck,
  Radio,
  Target,
  Swords,
  Clock,
  Send,
  Globe2,
  Skull,
} from "lucide-react";
import { useState } from "react";
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

// ── TOKENS ──
const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_PANEL = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

// ── helpers ──
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

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    budget: "",
    details: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => {
    setError("");
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.details) {
      setError("Please fill in all required fields (Name, Email, Project Details).");
      return;
    }

    setPending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: `[Project Type: ${formData.type}] [Budget: ${formData.budget}]\n\n${formData.details}`,
        }),
      });

      if (res.ok) {
        setStep(4);
        setFormData({ type: "", budget: "", details: "", name: "", email: "", phone: "", company: "" });
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

  const projectTypes = [
    { id: "Web Application", title: "Web Application", icon: Zap, sub: "FULL-STACK // SPA" },
    { id: "E-Commerce", title: "E-Commerce", icon: Briefcase, sub: "STORE // CHECKOUT" },
    { id: "Technical Consulting", title: "Technical Consulting", icon: MessageSquare, sub: "STRAT // AUDIT" },
  ];

  const budgets = ["Under $5k", "$5k - $10k", "$10k - $20k", "$20+"];

  return (
    <div
      className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}
    >
      {/* ── VALORANT BG ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }} />
        <motion.div
          animate={{ x: [0, 14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[18%] left-[-8%] w-[42rem] h-[42rem] bg-[#FF4655]/10 blur-[120px] rounded-full"
        />
        <div className="absolute top-[14%] right-[-12%] w-[36rem] h-[36rem] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[28%] w-[30rem] h-[30rem] bg-[#FF4655]/[0.05] blur-[110px] rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
      </div>

      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50">
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-10 md:space-y-14">
        {/* ── HEADER HUD ── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          {/* top HUD badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white" style={{ clipPath: CLIP_BTN }}>
              <Swords className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)" }}>
                // COMMS // CONTACT
              </span>
            </div>
            <span
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-[#768079] border border-[#1e2d3a] px-3 py-1.5 bg-[#111A23]/60"
              style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
            >
              <Radio className="w-3 h-3 text-[#00E5FF] animate-pulse" /> // ENCRYPTED CHANNEL
            </span>
            <span
              className="ml-auto hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> COMMS ONLINE // VLR-CT-09
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* title */}
            <div className="lg:col-span-7 space-y-5">
              <div className="relative">
                <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-[3px] bg-[#FF4655] hidden sm:block" />
                <p className="text-[11px] tracking-[0.22em] text-[#FF4655] font-bold flex items-center gap-2 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <span className="w-6 h-[2px] bg-[#FF4655]" /> ESTABLISH CONNECTION // 09
                </p>
                <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[3.9rem] leading-[0.88] tracking-[-0.02em]" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="block text-[#ECE8E1]">LET&apos;S BUILD</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4655] to-[#ff6b7a] relative">
                    SOMETHING GREAT
                    <span className="absolute -right-2 -top-1 text-[#FF4655] text-2xl md:text-3xl font-black">//</span>
                  </span>
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-[3px] w-24 bg-[#FF4655]" />
                  <div className="h-[1px] flex-1 bg-[#1e2d3a] max-w-[420px]" />
                  <Crosshair className="hidden sm:block w-5 h-5 text-[#FF4655]/70" />
                </div>
              </div>
              <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-raj)" }}>
                <span className="text-[#ECE8E1] font-semibold">Tell us about your project, timeline and firepower.</span>
                <span className="text-[#768079] font-medium"> We respond within 24H with a tactical plan — no fluff, just extraction-ready strategy.</span>
              </p>
              <div className="flex flex-wrap gap-2 pt-1" style={{ fontFamily: "var(--font-mono)" }}>
                {[
                  { k: "RESPONSE", v: "<24H", dot: "bg-emerald-400" },
                  { k: "COMMS", v: "ENCRYPTED" },
                  { k: "NDA", v: "FIRST CONTACT" },
                  { k: "RANGE", v: "WORLDWIDE" },
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
              </div>
            </div>

            {/* tactical side image — dossier card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative bg-[#111A23] border border-[#243442] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
                <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/50" />
                <div className="relative bg-[#0F1923] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                  <CornerBrackets color="rgba(255,70,85,0.45)" size={12} />
                  <div className="relative h-[260px] md:h-[280px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                      alt="Tactical communications"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/40 to-transparent" />
                    <div className="absolute inset-0 bg-[#FF4655]/[0.06] mix-blend-overlay" />
                    {/* HUD overlays */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.16em]"
                        style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                      >
                        // COMMS RELAY // ACTIVE
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] tracking-widest bg-[#0F1923]/80 border border-[#1e2d3a] px-2 py-1" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                      <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> <span className="text-[#ECE8E1]">LIVE FEED</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0F1923] to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                          <Target className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                            TACTICAL OPERATIONS CENTER
                          </p>
                          <p className="text-[11px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                            ENCRYPTED // GLOBAL COMMS GRID
                          </p>
                        </div>
                        <Skull className="w-4 h-4 text-[#FF4655]/70 hidden sm:block" />
                      </div>
                    </div>
                  </div>
                  {/* bottom stats strip */}
                  <div className="grid grid-cols-3 divide-x divide-[#1e2d3a] border-t border-[#1e2d3a] bg-[#0a131c]">
                    {[
                      { l: "UPTIME", v: "99.99%" },
                      { l: "SQUADS", v: "50+ OPS" },
                      { l: "LATENCY", v: "<24H" },
                    ].map((s) => (
                      <div key={s.l} className="px-3 py-2.5 text-center">
                        <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          {s.l}
                        </p>
                        <p className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                          {s.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <ValorantCrosshair className="absolute -top-3 -right-3 hidden lg:flex bg-[#0a131c] border border-[#1e2d3a]" />
            </motion.div>
          </div>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── Left sidebar: Direct Contact ── */}
          <div className="lg:col-span-4 space-y-4">
            {/* Direct Contact dossier */}
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px]" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
              <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/60" />
              <div className="relative bg-[#0F1923] p-5 sm:p-6 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute -right-16 -top-16 w-48 h-48 opacity-[0.04] pointer-events-none" style={{ background: "repeating-linear-gradient(-45deg, #FF4655 0 2px, transparent 2px 10px)" }} />
                <CornerBrackets color="rgba(255,70,85,0.45)" size={12} />

                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-black flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-6 h-[2px] bg-[#FF4655]" /> DIRECT COMMS
                  </p>
                  <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-xl leading-none tracking-tight text-[#ECE8E1] mb-1" style={{ fontFamily: "var(--font-anton)" }}>
                  OPEN A <span className="text-[#FF4655]">CHANNEL</span>
                </h3>
                <p className="text-xs leading-relaxed text-[#768079] mb-5" style={{ fontFamily: "var(--font-raj)" }}>
                  Encrypted lines. Real operators. No bots, no ticket queues.
                </p>

                <div className="space-y-3">
                  {/* Email */}
                  <a
                    href="mailto:satyamhimesh@gmail.com"
                    className="group flex items-center gap-3 bg-[#0a131c] border border-[#1e2d3a] p-3 hover:border-[#FF4655]/60 hover:bg-[#111A23] transition-colors relative overflow-hidden"
                    style={{ clipPath: CLIP_BTN }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-11 h-11 bg-[#FF4655] flex items-center justify-center text-white shrink-0 group-hover:bg-[#e03a49] transition-colors" style={{ clipPath: CLIP_BTN }}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-[0.14em] text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                        // EMAIL // PRIMARY
                      </p>
                      <p className="text-sm font-bold tracking-wide text-[#ECE8E1] truncate group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                        satyamhimesh@gmail.com
                      </p>
                      <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        SECURE // PGP READY
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#768079] group-hover:text-[#FF4655] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+918105542318"
                    className="group flex items-center gap-3 bg-[#0a131c] border border-[#1e2d3a] p-3 hover:border-[#FF4655]/60 hover:bg-[#111A23] transition-colors relative overflow-hidden"
                    style={{ clipPath: CLIP_BTN }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-11 h-11 bg-[#FF4655] flex items-center justify-center text-white shrink-0 group-hover:bg-[#e03a49] transition-colors" style={{ clipPath: CLIP_BTN }}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-[0.14em] text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                        // HOTLINE // VOICE
                      </p>
                      <p className="text-sm font-bold tracking-wide text-[#ECE8E1] group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                        +91-8105542318
                      </p>
                      <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        MON-SAT // 09:00-20:00 IST
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#768079] group-hover:text-[#FF4655] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3 bg-[#0a131c] border border-[#1e2d3a] p-3 relative overflow-hidden" style={{ clipPath: CLIP_BTN }}>
                    <div className="w-11 h-11 bg-[#0a131c] border border-[#1e2d3a] flex items-center justify-center text-[#FF4655] shrink-0" style={{ clipPath: CLIP_BTN }}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-[0.14em] text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                        // COORDS // GRID
                      </p>
                      <p className="text-sm font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                        Remote Worldwide
                      </p>
                      <p className="text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                        EDGE // GLOBAL DEPLOY
                      </p>
                    </div>
                    <Globe2 className="w-4 h-4 text-[#768079]/60 shrink-0" />
                  </div>
                </div>

                {/* mini tactical image */}
                <div className="mt-5 relative overflow-hidden border border-[#1e2d3a] bg-[#0a131c]" style={{ clipPath: CLIP_PANEL }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
                    alt="Tactical gaming comms"
                    className="w-full h-[108px] object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a131c] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#FF4655]/10 mix-blend-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between bg-[#0F1923]/85 border-t border-[#1e2d3a]">
                    <span className="text-[10px] tracking-[0.14em] text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                      <span className="w-1 h-1 bg-[#FF4655] animate-pulse" /> COMMS GRID // ONLINE
                    </span>
                    <span className="text-[10px] tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-mono)" }}>
                      03-NODES
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  <Clock className="w-3.5 h-3.5 text-[#FF4655]" /> AVG RESPONSE // &lt; 6H
                  <span className="ml-auto flex items-center gap-1.5 text-emerald-300">
                    <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> OPERATORS STANDBY
                  </span>
                </div>
              </div>
            </div>

            {/* Schedule a Call — spike plant */}
            <div className="relative bg-[#FF4655] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="relative bg-[#0F1923] p-6 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                {/* diagonal slash */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[70%] h-[220%] bg-[#FF4655]/[0.07] rotate-[18deg] pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
                <CornerBrackets color="#FF4655" size={12} />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                    <span className="w-1.5 h-1.5 bg-white animate-pulse" /> SPIKE PLANT // CALL PROTOCOL
                  </div>
                  <h3 className="text-xl leading-none tracking-tight text-[#ECE8E1] mt-3" style={{ fontFamily: "var(--font-anton)" }}>
                    SCHEDULE A <span className="text-[#FF4655]">CALL</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-[#768079] mt-2" style={{ fontFamily: "var(--font-raj)" }}>
                    Prefer voice comms? Book a 30-min discovery op with our lead operator. Valorant-grade prep, zero fluff.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://calendly.com/satyamhimesh/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        // if Calendly widget script is loaded, use popup; otherwise fallback to new tab
                        const w = window as any;
                        if (w.Calendly && w.Calendly.initPopupWidget) {
                          e.preventDefault();
                          w.Calendly.initPopupWidget({ url: "https://calendly.com/satyamhimesh/30min" });
                        }
                      }}
                      className="group w-full inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white py-3 font-black tracking-wide hover:bg-[#e03a49] transition-colors relative overflow-hidden cursor-pointer"
                      style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                    >
                      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                      <span className="relative flex items-center gap-2 text-sm">
                        OPEN CALENDLY <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                    <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <script src="https://assets.calendly.com/assets/external/widget.js" async />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NDA-FIRST // 30 MIN // NO PITCH
                  </div>
                </div>
              </div>
            </div>

            {/* trust mini */}
            <div className="hidden lg:grid grid-cols-3 gap-2">
              {[
                { v: "50+", l: "OPS SHIPPED" },
                { v: "4.9/5", l: "COMBAT RATING" },
                { v: "99.99%", l: "UPTIME SLA" },
              ].map((s) => (
                <div key={s.l} className="bg-[#111A23] border border-[#1e2d3a] p-3 text-center" style={{ clipPath: CLIP_PANEL }}>
                  <p className="text-sm font-black text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                    {s.v}
                  </p>
                  <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Main form dossier ── */}
          <div className="lg:col-span-8">
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
              <div className="relative bg-[#0F1923] p-6 md:p-8 lg:p-10 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ECE8E120_1px,transparent_1px),linear-gradient(to_bottom,#ECE8E120_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#FF4655]/[0.05] blur-[40px] rotate-12 pointer-events-none" />
                <CornerBrackets color="rgba(255,70,85,0.55)" size={14} />

                {/* header + step HUD */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-black" style={{ fontFamily: "var(--font-mono)" }}>
                        // INQUIRY DOSSIER // VLR-CT
                      </p>
                      <p className="text-sm font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                        INITIATE CONTACT PROTOCOL
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="hidden sm:inline">PHASE</span>
                    <span className="px-2 py-1 bg-[#FF4655] text-white font-black" style={{ clipPath: CLIP_BTN }}>
                      0{step > 3 ? 3 : step} / 03
                    </span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse hidden sm:block" />
                  </div>
                </div>

                {/* valorant step segments */}
                <div className="relative z-10 mb-8">
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex-1 relative">
                        <div
                          className="h-2 border transition-colors duration-500"
                          style={{
                            clipPath: CLIP_PANEL,
                            background: step >= i ? "#FF4655" : "#1e2d3a",
                            borderColor: step >= i ? "#FF4655" : "#1e2d3a",
                          }}
                        />
                        {/* notch */}
                        <div className="absolute top-0 right-0 w-2 h-2 bg-[#0F1923] -translate-y-0" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["TYPE", "BUDGET", "DETAILS"].map((label, idx) => (
                      <span
                        key={label}
                        className={`text-[10px] tracking-[0.16em] font-bold ${step === idx + 1 ? "text-[#FF4655]" : step > idx + 1 ? "text-emerald-400" : "text-[#768079]"}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {step > idx + 1 ? "✓ " : `0${idx + 1} // `}
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* form steps */}
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#FF4655]" />
                          <h3 className="text-xl md:text-2xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                            WHAT DO YOU NEED <span className="text-[#FF4655]">HELP WITH?</span>
                          </h3>
                        </div>
                        <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                          Select your operation type. Each loadout is tuned for speed, polish and scale.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {projectTypes.map((type) => {
                            const active = formData.type === type.id;
                            return (
                              <button
                                key={type.id}
                                onClick={() => setFormData({ ...formData, type: type.id })}
                                className={`group relative flex flex-col items-center justify-center gap-3 p-6 border text-center transition-all text-left overflow-hidden ${
                                  active
                                    ? "bg-[#FF4655] border-[#FF4655] text-white shadow-[0_0_20px_rgba(255,70,85,0.35)]"
                                    : "bg-[#0a131c] border-[#1e2d3a] hover:border-[#FF4655]/60 hover:bg-[#111A23] text-[#ECE8E1]"
                                }`}
                                style={{ clipPath: CLIP_BTN }}
                              >
                                {active && <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/80" />}
                                <div
                                  className={`w-11 h-11 flex items-center justify-center border ${active ? "bg-white text-[#FF4655] border-white" : "bg-[#111A23] border-[#1e2d3a] text-[#768079] group-hover:text-[#FF4655] group-hover:border-[#FF4655]/40"}`}
                                  style={{ clipPath: CLIP_BTN }}
                                >
                                  <type.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className={`text-sm font-black tracking-wide leading-none ${active ? "text-white" : "text-[#ECE8E1]"}`} style={{ fontFamily: "var(--font-raj)" }}>
                                    {type.title.toUpperCase()}
                                  </p>
                                  <p className={`text-[11px] tracking-[0.14em] mt-1 ${active ? "text-white/80" : "text-[#768079]"}`} style={{ fontFamily: "var(--font-mono)" }}>
                                    {type.sub}
                                  </p>
                                </div>
                                {active && (
                                  <span className="absolute top-2 right-2 w-2 h-2 bg-white animate-pulse" style={{ clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-4 flex justify-end border-t border-[#1e2d3a]">
                          <button
                            onClick={handleNext}
                            disabled={!formData.type}
                            className="group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-8 py-3.5 font-black tracking-wide hover:bg-[#e03a49] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                          >
                            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                            <span className="relative flex items-center gap-2 text-sm">
                              NEXT PHASE <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NDA-FIRST // ENCRYPTED // NO SPAM
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#FF4655]" />
                          <h3 className="text-xl md:text-2xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                            ESTIMATED <span className="text-[#FF4655]">BUDGET?</span>
                          </h3>
                        </div>
                        <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                          Rough range is enough — we&apos;ll scope accurately after discovery. No bait, fixed-price sprints.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {budgets.map((budget) => {
                            const active = formData.budget === budget;
                            return (
                              <button
                                key={budget}
                                onClick={() => setFormData({ ...formData, budget })}
                                className={`relative p-6 border text-center transition-all overflow-hidden group ${
                                  active
                                    ? "bg-[#FF4655] border-[#FF4655] text-white shadow-[0_0_20px_rgba(255,70,85,0.35)]"
                                    : "bg-[#0a131c] border-[#1e2d3a] hover:border-[#FF4655]/60 hover:bg-[#111A23] text-[#ECE8E1]"
                                }`}
                                style={{ clipPath: CLIP_BTN }}
                              >
                                {active && <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/80" />}
                                <p className="text-[10px] tracking-[0.14em] font-bold" style={{ fontFamily: "var(--font-mono)", color: active ? "rgba(255,255,255,0.8)" : "#768079" }}>
                                  // BUDGET // TIER
                                </p>
                                <p className={`text-lg font-black tracking-wide mt-1 ${active ? "text-white" : "text-[#ECE8E1]"}`} style={{ fontFamily: "var(--font-anton)" }}>
                                  {budget.toUpperCase()}
                                </p>
                                <div className={`mt-2 h-px w-10 mx-auto ${active ? "bg-white/40" : "bg-[#1e2d3a] group-hover:bg-[#FF4655]/40"}`} />
                              </button>
                            );
                          })}
                        </div>

                        {/* trust strip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-[#0a131c] border border-[#1e2d3a] p-3" style={{ clipPath: CLIP_PANEL }}>
                          {[
                            "F500 → SEED RANGE",
                            "FIXED-PRICE SPRINTS",
                            "CANCEL ANYTIME",
                          ].map((t) => (
                            <span key={t} className="flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                              <span className="w-1 h-1 bg-[#FF4655]" /> {t}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 flex justify-between border-t border-[#1e2d3a] gap-3">
                          <button onClick={handlePrev} className="px-7 py-3.5 border border-[#ECE8E1]/15 text-[#ECE8E1] bg-[#ECE8E1]/[0.06] hover:bg-[#ECE8E1]/10 hover:border-[#ECE8E1]/25 transition-colors font-bold tracking-wide text-sm" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                            BACK
                          </button>
                          <button
                            onClick={handleNext}
                            disabled={!formData.budget}
                            className="group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-8 py-3.5 font-black tracking-wide hover:bg-[#e03a49] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                          >
                            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                            <span className="relative flex items-center gap-2 text-sm">
                              FINAL PHASE <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.form key="step3" onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#FF4655]" />
                          <h3 className="text-xl md:text-2xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                            PROJECT <span className="text-[#FF4655]">DETAILS</span>
                          </h3>
                          <span className="ml-auto text-[11px] tracking-[0.14em] text-[#768079] border border-[#1e2d3a] px-2 py-1 bg-[#0a131c]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            ENCRYPTED COMMS
                          </span>
                        </div>

                        {/* summary chips */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-wide" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            <Target className="w-3 h-3" /> {formData.type.toUpperCase()}
                          </span>
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-[11px] font-bold tracking-wide" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            {formData.budget.toUpperCase()}
                          </span>
                          <button type="button" onClick={() => setStep(1)} className="text-[11px] tracking-widest text-[#768079] hover:text-[#FF4655] underline decoration-dotted underline-offset-4" style={{ fontFamily: "var(--font-mono)" }}>
                            EDIT
                          </button>
                        </div>

                        <div className="space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { name: "name", label: "Name *", placeholder: "Jett Phoenix", type: "text", icon: User, required: true },
                              { name: "email", label: "Email *", placeholder: "jett@valorant.ops", type: "email", icon: Mail, required: true },
                              { name: "phone", label: "Phone (Optional)", placeholder: "+1 (000) 000-0000", type: "tel", icon: Phone, required: false },
                              { name: "company", label: "Company (Optional)", placeholder: "Cypher Tech Ops", type: "text", icon: Building2, required: false },
                            ].map((f) => (
                              <div key={f.name} className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                                  <f.icon className="w-3 h-3 text-[#FF4655]/70" /> {f.label}
                                </label>
                                <input
                                  required={f.required}
                                  name={f.name}
                                  value={(formData as any)[f.name]}
                                  onChange={handleChange}
                                  type={f.type}
                                  placeholder={f.placeholder}
                                  className="w-full bg-[#0a131c] border border-[#1e2d3a] px-4 py-3 text-sm font-medium text-[#ECE8E1] placeholder:text-[#768079] focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_0_1px_rgba(255,70,85,0.5)] transition-all"
                                  style={{ clipPath: CLIP_PANEL, fontFamily: "var(--font-raj)" }}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                              <MessageSquare className="w-3 h-3 text-[#FF4655]/70" /> Project Details *
                            </label>
                            <textarea
                              required
                              name="details"
                              value={formData.details}
                              onChange={handleChange}
                              rows={4}
                              placeholder="Mission briefing: goals, timeline, stack, must-haves..."
                              className="w-full bg-[#0a131c] border border-[#1e2d3a] px-4 py-3 text-sm font-medium text-[#ECE8E1] placeholder:text-[#768079] focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_0_1px_rgba(255,70,85,0.5)] transition-all resize-none"
                              style={{ clipPath: CLIP_PANEL, fontFamily: "var(--font-raj)" }}
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="bg-[#FF4655]/10 border border-[#FF4655]/30 px-4 py-3 flex items-start gap-2" style={{ clipPath: CLIP_PANEL }}>
                            <span className="w-1.5 h-1.5 bg-[#FF4655] mt-2 shrink-0" />
                            <p className="text-sm font-bold text-[#FF4655]" style={{ fontFamily: "var(--font-raj)" }}>
                              {error}
                            </p>
                          </div>
                        )}

                        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#1e2d3a]">
                          <button type="button" onClick={handlePrev} className="w-full sm:w-auto px-8 py-3.5 border border-[#ECE8E1]/15 text-[#ECE8E1] bg-[#ECE8E1]/[0.06] hover:bg-[#ECE8E1]/10 hover:border-[#ECE8E1]/25 transition-colors font-bold tracking-wide text-sm" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                            BACK
                          </button>
                          <button
                            type="submit"
                            disabled={pending}
                            className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-8 py-3.5 font-black tracking-wide hover:bg-[#e03a49] transition-colors shadow-[0_0_20px_rgba(255,70,85,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                          >
                            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                            <span className="relative flex items-center gap-2 text-sm">
                              {pending ? (
                                <>
                                  <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" style={{ clipPath: "circle(50%)" }} /> TRANSMITTING...
                                </>
                              ) : (
                                <>
                                  SUBMIT INQUIRY <Send className="w-4 h-4" />
                                </>
                              )}
                            </span>
                          </button>
                        </div>

                        <p className="text-center text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          NDA-FIRST • NO SPAM • ENCRYPTED TRANSMISSION
                        </p>
                      </motion.form>
                    )}

                    {step === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} className="text-center py-8 md:py-10 space-y-6">
                        {/* success badge */}
                        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                          <div className="absolute inset-0 bg-[#FF4655] blur-[18px] opacity-30" style={{ clipPath: CLIP_BTN }} />
                          <div className="relative w-20 h-20 bg-[#FF4655] flex items-center justify-center border border-[#FF4655]" style={{ clipPath: CLIP_BTN }}>
                            <CheckCircle2 className="w-10 h-10 text-white" />
                          </div>
                          <ValorantCrosshair className="absolute -top-2 -right-2 bg-[#0a131c] border border-[#1e2d3a] w-7 h-7" />
                        </div>

                        <div className="space-y-2">
                          <p className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> EXTRACTION CONFIRMED // SECURE
                          </p>
                          <h3 className="text-3xl md:text-4xl leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                            INQUIRY <span className="text-[#FF4655]">RECEIVED</span>
                          </h3>
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-[2px] w-10 bg-[#FF4655]" />
                            <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                              Transmission verified. Tactical review in progress.
                            </p>
                          </div>
                        </div>

                        <div className="bg-[#0a131c] border border-[#1e2d3a] p-4 text-left max-w-md mx-auto" style={{ clipPath: CLIP_PANEL }}>
                          <p className="text-[11px] tracking-[0.14em] text-[#768079] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                            // NEXT STEPS // PROTOCOL
                          </p>
                          <div className="space-y-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-raj)" }}>
                            <p className="flex gap-2 text-[#ECE8E1]">
                              <span className="text-[#FF4655] font-black">01</span> Engineering lead reviews your briefing — no sales theatre.
                            </p>
                            <p className="flex gap-2 text-[#768079]">
                              <span className="text-[#FF4655] font-black">02</span> You’ll receive a strategic reply within 24H with scope & timeline.
                            </p>
                            <p className="flex gap-2 text-[#768079]">
                              <span className="text-[#FF4655] font-black">03</span> Encrypted follow-up via your preferred channel.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                          <button
                            onClick={() => setStep(1)}
                            className="px-6 py-3 bg-[#FF4655] text-white font-black tracking-wide hover:bg-[#e03a49] transition-colors text-sm"
                            style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                          >
                            SUBMIT ANOTHER // INQUIRY
                          </button>
                          <Link href="/" className="text-sm font-bold tracking-wide text-[#768079] hover:text-[#ECE8E1] transition-colors underline decoration-dotted underline-offset-4" style={{ fontFamily: "var(--font-mono)" }}>
                            RETURN TO BASE
                          </Link>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NDA-FIRST • ENCRYPTED • NO SPAM
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* footer tag */}
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] tracking-[0.2em] text-[#768079]/60" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-CONTACT // EST. 2026 <span className="w-6 h-px bg-[#1e2d3a]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
