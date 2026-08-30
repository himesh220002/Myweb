"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, CheckCircle2, Briefcase, MapPin, Calendar, Crosshair, Radio, Target, Swords, ShieldCheck, User, Mail, Phone, Globe2, FileText, Send, Skull } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { roles } from "@/lib/data/roles";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";

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

export default function ApplyPage() {
  const { id } = useParams();
  const role = roles.find(r => r.id.toString() === id);

  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 18, restDelta: 0.001 });

  if (!role) return notFound();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setCv(e.target.files[0]);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.coverLetter) {
      setError("Please fill in all required fields (Name, Email, Cover Letter).");
      return;
    }
    setPending(true);
    setError("");
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("company", formData.portfolio ? `Portfolio: ${formData.portfolio}` : "");
      data.append("message", `[Role Applied: ${role.title}]\n\nCover Letter:\n${formData.coverLetter}`);
      if (cv) data.append("cv", cv);
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
      } else {
        const d = await res.json();
        setError(d.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

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
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF4655] origin-left z-50">
        <div className="absolute right-0 top-0 w-3 h-[3px] bg-[#ECE8E1]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-20 space-y-8">
        {/* back */}
        <Link href="/career" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] hover:text-[#ECE8E1] hover:border-[#FF4655]/40 text-xs font-black tracking-[0.14em] transition-colors group" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> BACK TO SQUAD
        </Link>

        {/* dossier header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
          <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#FF4655]/60" />
          <div className="relative bg-[#0F1923] p-6 md:p-8 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <CornerBrackets color="rgba(255,70,85,0.45)" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF4655]/[0.06] blur-[30px] pointer-events-none" />
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                {role.department.toUpperCase()} // RECRUIT
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <MapPin className="w-3 h-3 text-[#FF4655]" /> {role.location.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                <Calendar className="w-3 h-3 text-[#00E5FF]" /> {role.type.toUpperCase()}
              </span>
              <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-emerald-400" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> OPEN // {role.experience.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
              APPLY FOR <span className="text-[#FF4655]">{role.title.toUpperCase()}</span>
            </h1>
            <div className="mt-3 h-[2px] w-14 bg-[#FF4655]" />
            <p className="text-sm leading-relaxed text-[#768079] mt-3 max-w-2xl" style={{ fontFamily: "var(--font-raj)" }}>
              {role.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {role.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-[11px] font-bold tracking-wide" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* key requirements dossier */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00E5FF]" />
          <div className="relative bg-[#0F1923] p-6 md:p-7" style={{ clipPath: CLIP_CARD }}>
            <CornerBrackets color="rgba(0,229,255,0.35)" />
            <p className="text-[11px] tracking-[0.16em] text-[#00E5FF] font-black flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <Target className="w-3.5 h-3.5" /> // MISSION BRIEF // REQUIREMENTS
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {role.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2 bg-[#0a131c] border border-[#1e2d3a] px-3 py-2.5" style={{ clipPath: CLIP_BTN }}>
                  <span className="w-1.5 h-1.5 bg-[#FF4655] mt-2 shrink-0 rotate-45" />
                  <span className="text-xs font-semibold leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* form dossier */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
          <div className="relative bg-[#0F1923] p-6 md:p-8" style={{ clipPath: CLIP_CARD }}>
            <CornerBrackets color="rgba(255,70,85,0.5)" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF4655] flex items-center justify-center text-white" style={{ clipPath: CLIP_BTN }}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-black" style={{ fontFamily: "var(--font-mono)" }}>
                  // AGENT DOSSIER // APPLICATION
                </p>
                <p className="text-sm font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>YOUR DETAILS // ENCRYPTED</p>
              </div>
              <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NDA-FIRST
              </span>
            </div>

            {success ? (
              <div className="text-center py-10 space-y-5">
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#FF4655] blur-[18px] opacity-30" style={{ clipPath: CLIP_BTN }} />
                  <div className="relative w-20 h-20 bg-emerald-500 flex items-center justify-center border border-emerald-400" style={{ clipPath: CLIP_BTN }}>
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl leading-none" style={{ fontFamily: "var(--font-anton)" }}>APPLICATION <span className="text-emerald-400">SUBMITTED!</span></h3>
                <p className="text-sm text-[#768079] max-w-md mx-auto" style={{ fontFamily: "var(--font-raj)" }}>
                  Thank you for applying. Our talent team will review your dossier and open a channel shortly.
                </p>
                <button onClick={() => setSuccess(false)} className="px-6 py-2.5 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-xs font-black tracking-widest hover:border-[#FF4655]/40 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  SUBMIT ANOTHER // RE-QUEUE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Full Name *", placeholder: "Jett Phoenix", type: "text", icon: User, required: true },
                    { name: "email", label: "Email *", placeholder: "jett@valorant.ops", type: "email", icon: Mail, required: true },
                    { name: "phone", label: "Phone (Optional)", placeholder: "+1 (000) 000-0000", type: "tel", icon: Phone, required: false },
                    { name: "portfolio", label: "Portfolio / LinkedIn", placeholder: "https://...", type: "text", icon: Globe2, required: false },
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
                    <FileText className="w-3 h-3 text-[#FF4655]/70" /> Upload CV / Resume (PDF, DOCX)
                  </label>
                  <input name="cv" onChange={handleFileChange} type="file" accept=".pdf,.doc,.docx" className="w-full bg-[#0a131c] border border-[#1e2d3a] px-4 py-3 text-sm font-medium text-[#ECE8E1] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-black file:tracking-widest file:bg-[#FF4655] file:text-white hover:file:bg-[#e03a49] file:cursor-pointer cursor-pointer" style={{ clipPath: CLIP_PANEL, fontFamily: "var(--font-raj)" }} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    <Briefcase className="w-3 h-3 text-[#FF4655]/70" /> Cover Letter *
                  </label>
                  <textarea
                    required
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us why you're a great fit for this squad — valor, precision, clutch plays..."
                    className="w-full bg-[#0a131c] border border-[#1e2d3a] px-4 py-3 text-sm font-medium text-[#ECE8E1] placeholder:text-[#768079] focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_0_1px_rgba(255,70,85,0.5)] transition-all resize-none"
                    style={{ clipPath: CLIP_PANEL, fontFamily: "var(--font-raj)" }}
                  />
                </div>

                {error && (
                  <div className="bg-[#FF4655]/10 border border-[#FF4655]/30 px-4 py-3 flex items-start gap-2" style={{ clipPath: CLIP_PANEL }}>
                    <span className="w-1.5 h-1.5 bg-[#FF4655] mt-2 shrink-0" />
                    <p className="text-sm font-bold text-[#FF4655]" style={{ fontFamily: "var(--font-raj)" }}>{error}</p>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <span className="text-[11px] tracking-widest text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    <Crosshair className="w-3 h-3 text-[#FF4655]/50" /> ENCRYPTED TRANSMISSION
                  </span>
                  <button type="submit" disabled={pending} className="w-full sm:w-auto justify-center group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-8 py-3.5 font-black tracking-wide hover:bg-[#e03a49] transition-colors shadow-[0_0_20px_rgba(255,70,85,0.35)] disabled:opacity-70 disabled:cursor-not-allowed" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}>
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                    <span className="relative flex items-center gap-2 text-sm">
                      {pending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" style={{ clipPath: "circle(50%)" }} /> TRANSMITTING...
                        </>
                      ) : (
                        <>
                          SUBMIT APPLICATION <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
