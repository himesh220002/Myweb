"use client";

import React from "react";
import { ExternalLink, CheckCircle2, Terminal } from "lucide-react";

// Tactical clip-path tokens matching CypherTech design system
const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

export interface VerifiedBadgeItem {
  id: string;
  name: string;
  skillType: string;
  issued: string;
  iconSrc: string;
  url: string;
  code: string;
  highlight?: boolean;
}

const VERIFIED_BADGES: VerifiedBadgeItem[] = [
  {
    id: "premium-tier",
    name: "Google Developer Program Premium Tier",
    skillType: "Enterprise Cloud Architecture",
    issued: "Aug 17, 2026",
    iconSrc: "/badges/premium-tier.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-PREM-09",
    highlight: true,
  },
  {
    id: "nvidia-dev",
    name: "Google Cloud & NVIDIA Community",
    skillType: "GPU Computing & Accelerated AI",
    issued: "Sep 28, 2026",
    iconSrc: "/badges/nvidia-developer.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-NVDA-AI",
    highlight: true,
  },
  {
    id: "google-skills",
    name: "Google Skills (Skills Boost)",
    skillType: "Cloud Infrastructure & DevOps",
    issued: "Sep 28, 2026",
    iconSrc: "/badges/google-skills.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-GCP-SKILL",
  },
  {
    id: "android-studio",
    name: "Android Studio User",
    skillType: "Native Mobile Engineering",
    issued: "Feb 7, 2024",
    iconSrc: "/badges/android-studio.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-ANDR-SYS",
  },
  {
    id: "maps-innovators",
    name: "Google Maps Platform Innovators",
    skillType: "Geospatial & Mapping Systems",
    issued: "Sep 28, 2026",
    iconSrc: "/badges/maps-innovator.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-MAPS-GEO",
  },
  {
    id: "code-wiki",
    name: "Code Wiki (SDLC AI Agents)",
    skillType: "AI Code Agents & Automation",
    issued: "Sep 28, 2026",
    iconSrc: "/badges/code-wiki.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-SDLC-AGT",
  },
  {
    id: "gdg-ai-science",
    name: "GDG AI for Science Member",
    skillType: "Applied AI & Scientific Computing",
    issued: "Sep 28, 2026",
    iconSrc: "/badges/gdg-ai-science.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-GDG-SCI",
  },
  {
    id: "gdev-member",
    name: "Google Developer Program",
    skillType: "5+ Years Ecosystem Tenure",
    issued: "Member Since Aug 2021",
    iconSrc: "/badges/google-dev-program.svg",
    url: "https://g.dev/cyphertech",
    code: "VLR-GDP-2021",
    highlight: true,
  },
];

export default function VerifiedCredentialsDossier() {
  return (
    <section className="relative w-full max-w-7xl mx-auto my-12 text-[#ECE8E1]">
      <div
        className="relative bg-[#0B131C] border border-[#1e2d3a] p-6 md:p-8 overflow-hidden shadow-2xl"
        style={{ clipPath: CLIP_CARD }}
      >
        {/* Tactical 3px Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF4655] via-[#00E5FF] to-[#FF4655]" />

        {/* Header HUD with Live Status & Natural Hyperlink */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2d3a] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="px-2.5 py-0.5 bg-[#FF4655]/15 border border-[#FF4655]/40 text-[#FF4655] text-[10px] font-mono tracking-widest uppercase font-bold"
                style={{ clipPath: CLIP_BTN }}
              >
                // CLEARANCE LEVEL 09
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                OFFICIAL VERIFIED BADGES
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight text-[#ECE8E1] uppercase"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              Verified Developer Badges
            </h2>
            <p
              className="text-xs text-[#768079] tracking-wide mt-1"
              style={{ fontFamily: "var(--font-raj)" }}
            >
              Real Google Developer Program accreditations, cloud specializations, and verified ecosystem milestones.
            </p>
          </div>

          {/* Understated Hyperlink to Public Profile */}
          <a
            href="https://g.dev/cyphertech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0F1923] hover:bg-[#00E5FF]/10 border border-[#1e2d3a] hover:border-[#00E5FF]/50 text-xs font-mono text-[#00E5FF] transition-all shrink-0 group rounded-none"
            style={{ clipPath: CLIP_BTN }}
            title="View public Google Developer Profile"
          >
            <span className="text-[#ECE8E1]/80 group-hover:text-white">Profile:</span>
            <span className="font-bold underline decoration-[#00E5FF]/40 underline-offset-4 group-hover:decoration-[#00E5FF]">
              g.dev/cyphertech
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Badges Grid (Responsive: 1 col on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERIFIED_BADGES.map((badge) => (
            <a
              key={badge.id}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-[#0F1923] border p-5 transition-all flex flex-col items-center text-center overflow-hidden hover:scale-[1.01] ${
                badge.highlight
                  ? "border-[#00E5FF]/30 hover:border-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.12)]"
                  : "border-[#1e2d3a] hover:border-[#768079] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
              }`}
              style={{ clipPath: CLIP_CARD }}
            >
              {/* Corner Ambient Glow for highlighted badges */}
              {badge.highlight && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 rounded-full blur-xl pointer-events-none" />
              )}

              {/* Top Row: Discreet External Arrow Indicator */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#768079] mb-3">
                <span className="tracking-wider">{badge.code}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:text-[#00E5FF] transition-all" />
              </div>

              {/* REAL BADGE ICON (70-75px impactful size) */}
              <div className="w-20 h-20 relative flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={badge.iconSrc}
                  alt={badge.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
                  loading="lazy"
                />
              </div>

              {/* Skill Type Tag */}
              <span className="text-[10px] font-mono tracking-wider text-[#00E5FF] uppercase font-semibold mb-1.5 line-clamp-1">
                {badge.skillType}
              </span>

              {/* Badge Name */}
              <h3
                className="text-sm font-bold text-[#ECE8E1] group-hover:text-white transition-colors leading-snug mb-3 flex-1 flex items-center justify-center"
                style={{ fontFamily: "var(--font-raj)" }}
              >
                {badge.name}
              </h3>

              {/* Verification Date Footer */}
              <div className="w-full pt-2.5 border-t border-[#1e2d3a]/70 flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{badge.issued}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Authority Bar */}
        <div className="mt-8 pt-4 border-t border-[#1e2d3a]/60 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#768079]">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#FF4655]" />
            AUTHENTICATED VIA GOOGLE DEVELOPER PLATFORM &bull; g.dev/cyphertech
          </span>
          <span className="text-emerald-400/80">STATUS: VERIFIED ACTIVE // LIVE SYNC</span>
        </div>
      </div>
    </section>
  );
}
