"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/lib/data/projects";
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
  Video,
  Play,
} from "lucide-react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";
import Image from "next/image";

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

// Convert common video links into safe embed format
function getEmbedUrl(url?: string): { type: "iframe" | "video"; src: string } | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // YouTube
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1` };
  }

  // Loom
  const loomMatch = trimmed.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (loomMatch && loomMatch[1]) {
    return { type: "iframe", src: `https://www.loom.com/embed/${loomMatch[1]}` };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return { type: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Direct MP4 / WebM video
  if (trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.endsWith(".ogg")) {
    return { type: "video", src: trimmed };
  }

  return { type: "iframe", src: trimmed };
}

interface ProjectDetailClientProps {
  initialProject: Project;
}

export default function ProjectDetailClient({ initialProject }: ProjectDetailClientProps) {
  const [project, setProject] = useState<Project>(initialProject);

  // Background sync in case details are updated
  useEffect(() => {
    let isMounted = true;
    async function syncProject() {
      if (!initialProject.slug) return;
      try {
        const res = await fetch(`/api/portfolio-projects?slug=${encodeURIComponent(initialProject.slug)}`);
        const json = await res.json();
        if (isMounted && json.success && json.project) {
          setProject(json.project);
        }
      } catch (e) {
        console.error("Failed to sync project details:", e);
      }
    }
    syncProject();
    return () => {
      isMounted = false;
    };
  }, [initialProject.slug]);

  const categoryPrimary = project.category.split(" / ")[0];
  const categorySecondary = project.category.includes("/") ? project.category.split(" / ")[1] : "Software";
  const videoEmbed = getEmbedUrl(project.videoUrl);

  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      <div className="fixed inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image src="/herobackgroundtheme4.jpg" alt="" className="w-full h-screen object-cover object-center" />
        <div className="absolute inset-0 bg-[#0B131C]/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B131C] via-[#0B131C]/20 to-[#0B131C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0B131C_85%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-12">
        {/* top navigation bar */}
        <div className="flex items-center justify-between mt-6">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#768079] hover:text-[#FF4655] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> // BACK TO ARSENAL
          </Link>
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#768079] border border-[#1e2d3a] px-3 py-1 bg-[#0a131c]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" /> DOSSIER // {project.id.toString().padStart(2, "0")}
          </div>
        </div>

        {/* ── HERO HEADER ── */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              // VLR-INTEL // {categoryPrimary.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
              {categorySecondary.toUpperCase()}
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-[#FFD700] text-[#0F1923] text-[11px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                ★ ELITE // FEATURED
              </span>
            )}
            {project.deploymentStatus === "github_only" && (
              <span className="px-3 py-1 bg-[#768079]/30 border border-[#768079]/60 text-[#ECE8E1] text-[11px] font-bold tracking-[0.14em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                GITHUB REPO ONLY
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl leading-[0.88] tracking-tight uppercase" style={{ fontFamily: "var(--font-anton)" }}>
            <span className="text-[#ECE8E1]">{project.title}</span> <span className="text-[#FF4655]">//</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[#768079] font-medium max-w-3xl mx-auto" style={{ fontFamily: "var(--font-raj)" }}>
            {project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
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

        {/* ── PROJECT SCREENSHOTS CAROUSEL ── */}
        <ProjectCarousel images={project.images && project.images.length > 0 ? project.images : [project.image]} title={project.title} />



        {/* ── PROJECT VIDEO SHOWCASE (HIDDEN IF NO VIDEO URL PROVIDED) ── */}
        {videoEmbed && (
          <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00E5FF] z-10" />
            <div className="absolute top-0 left-[3px] right-0 h-[2px] bg-[#00E5FF]/70 z-10" />
            <div className="relative bg-[#0F1923] p-5 sm:p-7 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <CornerBrackets color="rgba(0,229,255,0.45)" size={14} />

              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1e2d3a]" style={{ fontFamily: "var(--font-mono)" }}>
                <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest text-[#ECE8E1]">
                  <span className="w-2 h-2 bg-[#00E5FF] animate-pulse" />
                  <Video className="w-4 h-4 text-[#00E5FF]" /> // PROJECT VIDEO SHOWCASE // LIVE DEMONSTRATION
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-2.5 py-1" style={{ clipPath: CLIP_BTN }}>
                  <Play className="w-3 h-3 fill-current" /> HIGH BITRATE FEED
                </div>
              </div>

              <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-[#0a131c] border border-[#1e2d3a]">
                {videoEmbed.type === "iframe" ? (
                  <iframe
                    src={videoEmbed.src}
                    title={`${project.title} Video Showcase`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoEmbed.src}
                    controls
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#00E5FF]" /> PROTOCOL // IN-DEPTH CODE WALKTHROUGH & INTERFACE RUNTHROUGH
                </span>
                <span className="text-[#ECE8E1]">CYPHER MEDIA RELAY</span>
              </div>
            </div>
          </div>
        )}

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

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Overview, Features, Deep Dive (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Project Overview */}
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-6 sm:p-8" style={{ clipPath: CLIP_CARD }}>
              <CornerBrackets color="rgba(255,70,85,0.4)" size={12} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FF4655] text-white flex items-center justify-center font-black" style={{ clipPath: CLIP_BTN }}>
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-[#FF4655] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    // 01 // OVERVIEW
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                    PROJECT OVERVIEW
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#ECE8E1] font-semibold" style={{ fontFamily: "var(--font-raj)" }}>
                {project.overview}
              </p>
              {project.elaborations && project.elaborations.length > 0 && (
                <p className="text-sm sm:text-base leading-relaxed text-[#768079] font-medium mt-3" style={{ fontFamily: "var(--font-raj)" }}>
                  {project.elaborations[0]}
                </p>
              )}
            </div>

            {/* Core Features */}
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-6 sm:p-8" style={{ clipPath: CLIP_CARD }}>
              <CornerBrackets color="rgba(0,229,255,0.4)" size={12} />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FF4655] text-white flex items-center justify-center font-black" style={{ clipPath: CLIP_BTN }}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-[#00E5FF] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    // 02 // MODULES
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                    CORE FEATURES
                  </h3>
                </div>
                <span className="ml-auto w-2 h-2 bg-[#00E5FF] animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="bg-[#0F1923] border border-[#1e2d3a] p-3.5 flex items-start gap-2.5 group hover:border-[#FF4655]/50 transition-colors" style={{ clipPath: CLIP_PANEL }}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Dive & Impact */}
            {project.elaborations && project.elaborations.length > 1 && (
              <div className="relative bg-[#111A23] border border-[#1e2d3a] p-6 sm:p-8" style={{ clipPath: CLIP_CARD }}>
                <CornerBrackets color="rgba(255,215,0,0.4)" size={12} />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#FF4655] text-white flex items-center justify-center font-black" style={{ clipPath: CLIP_BTN }}>
                    <Crosshair className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-[#FFD700] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                      // 03 // INTEL
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                      DEEP DIVE & IMPACT
                    </h3>
                  </div>
                  <span className="ml-auto w-2 h-2 bg-[#FFD700] animate-pulse" />
                </div>

                <div className="space-y-3">
                  {project.elaborations.slice(1).map((point, idx) => (
                    <div key={idx} className="bg-[#0F1923] border border-[#1e2d3a] p-4 flex items-start gap-3" style={{ clipPath: CLIP_PANEL }}>
                      <span className="text-[11px] font-black text-[#FF4655] pt-0.5 shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
                        {(idx + 1).toString().padStart(2, "0")} //
                      </span>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions, Links, Tech Stack (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Panel */}
            <div className="relative bg-[#111A23] border border-[#1e2d3a] p-6" style={{ clipPath: CLIP_CARD }}>
              <CornerBrackets color="rgba(255,70,85,0.4)" size={12} />
              <p className="text-[11px] font-black tracking-[0.18em] text-[#FF4655] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                <Crosshair className="w-3.5 h-3.5" /> // TECH STACK
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] font-bold tracking-wide text-[#ECE8E1]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white py-3.5 text-xs font-black tracking-widest hover:bg-[#e03a49] transition-colors"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                  >
                    <Globe className="w-4 h-4" /> LIVE DEMO
                  </a>
                ) : (
                  <div
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#111A23] border border-[#1e2d3a] text-[#768079] py-3 text-xs font-bold tracking-widest cursor-not-allowed"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                  >
                    GITHUB REPO ONLY // IN SPRINT
                  </div>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#ECE8E1] text-[#0F1923] py-3.5 text-xs font-black tracking-widest hover:bg-white transition-colors"
                    style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                  >
                    <Code2 className="w-4 h-4" /> VIEW SOURCE CODE
                  </a>
                )}

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 border border-[#1e2d3a] bg-[#0a131c] text-[#ECE8E1] py-3 text-xs font-bold tracking-widest hover:border-[#FF4655] transition-colors"
                  style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-raj)" }}
                >
                  DISCUSS SIMILAR PROJECT <ChevronRight className="w-3.5 h-3.5 text-[#FF4655]" />
                </Link>
              </div>

              {/* mini visual card */}
              <div className="mt-6 pt-5 border-t border-[#1e2d3a] relative overflow-hidden">
                <div className="relative h-20 bg-[#0a131c] border border-[#1e2d3a] overflow-hidden" style={{ clipPath: CLIP_PANEL }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[10px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-1.5 h-1.5 bg-[#FF4655]" /> DEPLOY 2026 // ONLINE
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] tracking-widest text-[#FF4655]" style={{ fontFamily: "var(--font-mono)" }}>
                    VLC-017
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  <span>99/100 SPEED</span>
                  <span>4.9★ RATING</span>
                  <span>READY</span>
                </div>
              </div>
            </div>

            {/* SPIKE PLANT mini CTA */}
            <div className="relative bg-[#FF4655] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
              <div className="relative bg-[#0F1923] p-5 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[70%] h-[220%] bg-[#FF4655]/[0.06] rotate-[18deg] pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
                <CornerBrackets color="#FF4655" size={10} />
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FF4655] text-white text-[10px] font-black tracking-[0.16em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                    <span className="w-1.5 h-1.5 bg-white animate-pulse" /> // READY
                  </div>
                  <h4 className="text-lg leading-none tracking-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>
                    NEED THESE <span className="text-[#FF4655]">FEATURES?</span>
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

        {/* ── FOOTER HUD ── */}
        <div className="pt-8 border-t border-[#1e2d3a] flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-[#ECE8E1] hover:text-[#FF4655] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> BACK TO ARSENAL
          </Link>
          <div className="flex items-center gap-3">
            <span>CYPHER TECH // VLR-INTEL // EST. 2026</span>
            <span className="w-1.5 h-1.5 bg-[#FF4655]" />
          </div>
        </div>
      </div>
    </div>
  );
}
