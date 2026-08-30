"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono } from "next/font/google";

// ── VALORANT FONTS (match clients/page.tsx & Footer.tsx) ──
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

// ── HELPERS ──
function CornerBrackets({ color = "rgba(255,70,85,0.9)", size = 14 }: { color?: string; size?: number }) {
  return (
    <>
      <span
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderLeft: `2px solid ${color}`,
          borderTop: `2px solid ${color}`,
        }}
      />
      <span
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRight: `2px solid ${color}`,
          borderTop: `2px solid ${color}`,
        }}
      />
      <span
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderLeft: `2px solid ${color}`,
          borderBottom: `2px solid ${color}`,
        }}
      />
      <span
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRight: `2px solid ${color}`,
          borderBottom: `2px solid ${color}`,
        }}
      />
    </>
  );
}

function ValorantCrosshair({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-7 h-7 flex items-center justify-center shrink-0 ${className}`}>
      <div className="absolute w-full h-[1px] bg-[#FF4655]/70" />
      <div className="absolute h-full w-[1px] bg-[#FF4655]/70" />
      <div className="w-1.5 h-1.5 bg-[#FF4655] rotate-45" />
      <div className="absolute inset-0 border border-[#FF4655]/20" style={{ clipPath: CLIP_BTN }} />
    </div>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/projects" },
  { name: "Pricing", href: "/pricing" },
  {
    name: "More",
    dropdown: [
      { name: "Career", href: "/career" },
      { name: "Skills", href: "/skills" },
      { name: "Clients", href: "/clients" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock scroll when mobile open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          `${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} fixed top-0 inset-x-0 z-50 border-b transition-all duration-300`,
          scrolled
            ? "bg-[#0F1923]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] border-[#1e2d3a]"
            : "bg-[#0F1923] border-[#1e2d3a]"
        )}
      >
        {/* 3px red top rule */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-50" />

        {/* subtle tac grid + diagonal hazard - very faint */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 22px)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[64px] md:h-[68px] gap-4">
          {/* Logo area */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="relative w-10 h-10 md:w-11 md:h-11 bg-[#FF4655] flex items-center justify-center shrink-0 border border-[#FF4655] group-hover:bg-[#e03a49] group-hover:border-[#e03a49] transition-colors shadow-[0_0_12px_rgba(255,70,85,0.35)]"
              style={{ clipPath: CLIP_BTN }}
            >
              <span
                className="text-white font-black text-[13px] tracking-widest leading-none"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                CT
              </span>
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#ECE8E1] rotate-45 opacity-80" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[1.22rem] md:text-[1.3rem] tracking-[-0.01em] leading-none text-[#ECE8E1] flex items-baseline gap-0.5"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                CYPHER<span className="text-[#FF4655]">TECH</span>
              </span>
              <span
                className="text-[10px] tracking-[0.18em] font-bold text-[#768079] hidden sm:flex items-center gap-1.5 leading-none mt-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="w-2 h-[1px] bg-[#FF4655]" /> // VLR-09
              </span>
            </div>
            {/* desktop tac meta */}
            <div className="hidden xl:flex items-center gap-2 ml-4 pl-4 border-l border-[#1e2d3a]/80">
              <Crosshair className="w-3.5 h-3.5 text-[#FF4655]/60" />
              <span className="text-[10px] tracking-[0.16em] text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                TACTICAL // HQ
              </span>
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse ml-1" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href ? pathname === link.href : false;

              if (link.dropdown) {
                const isMoreActive = link.dropdown.some((d) => pathname === d.href);
                return (
                  <div key={link.name} className="relative group">
                    <button
                      className={cn(
                        "relative flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors duration-200",
                        isMoreActive ? "text-[#FF4655]" : "text-[#768079] group-hover:text-[#ECE8E1]"
                      )}
                      style={{ fontFamily: "var(--font-raj)" }}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                      {isMoreActive && (
                        <>
                          <motion.span
                            layoutId="nav-active-indicator-more"
                            className="absolute left-3 right-3 -bottom-[9px] h-[2px] bg-[#FF4655]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                          <span className="absolute left-1/2 -bottom-[13px] -translate-x-1/2 w-1 h-1 bg-[#FF4655] rotate-45" />
                        </>
                      )}
                    </button>

                    {/* Dropdown panel */}
                    <div className="absolute top-full right-0 pt-4 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div
                        className="relative bg-[#0F1923] border border-[#1e2d3a] p-2 w-[240px] flex flex-col gap-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden"
                        style={{ clipPath: CLIP_CARD }}
                      >
                        {/* top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655] opacity-90" />
                        <div className="absolute -right-10 -top-10 w-28 h-28 bg-[#FF4655]/[0.06] blur-[18px] rotate-12 pointer-events-none" />
                        <CornerBrackets color="rgba(255,70,85,0.45)" size={10} />

                        <div className="flex items-center gap-2 px-2 pt-1 pb-1">
                          <span className="w-1 h-1 bg-[#FF4655] animate-pulse" />
                          <span
                            className="text-[10px] tracking-[0.16em] font-black text-[#FF4655]"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            // MORE // OPERATIONS
                          </span>
                          <Crosshair className="ml-auto w-3 h-3 text-[#FF4655]/40" />
                        </div>

                        {link.dropdown.map((dropLink) => {
                          const isDropActive = pathname === dropLink.href;
                          return (
                            <Link
                              key={dropLink.name}
                              href={dropLink.href}
                              className={cn(
                                "relative px-4 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-200 flex items-center justify-between border",
                                isDropActive
                                  ? "bg-[#FF4655] text-white border-[#FF4655] shadow-[0_0_10px_rgba(255,70,85,0.3)]"
                                  : "bg-[#0a131c] text-[#768079] border-[#1e2d3a] hover:text-[#ECE8E1] hover:border-[#2e4154] hover:bg-[#111A23]"
                              )}
                              style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}
                            >
                              <span>{dropLink.name}</span>
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rotate-45 transition-colors",
                                  isDropActive ? "bg-white" : "bg-[#FF4655] opacity-0 group-hover:opacity-100"
                                )}
                              />
                            </Link>
                          );
                        })}

                        <div className="mx-1 mt-1 pt-2 border-t border-[#1e2d3a]/60 flex items-center gap-2 px-1">
                          <Crosshair className="w-3 h-3 text-[#FF4655]/50" />
                          <span
                            className="text-[9px] tracking-[0.18em] text-[#768079]/80"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            VLR // SECURE // 09
                          </span>
                          <span className="ml-auto w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href!}
                  className={cn(
                    "relative px-4 py-2 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors duration-200",
                    isActive ? "text-[#FF4655]" : "text-[#768079] hover:text-[#ECE8E1]"
                  )}
                  style={{ fontFamily: "var(--font-raj)" }}
                >
                  {link.name}
                  {isActive && (
                    <>
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute left-3 right-3 -bottom-[9px] h-[2px] bg-[#FF4655]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                      <span className="absolute left-1/2 -bottom-[13px] -translate-x-1/2 w-1 h-1 bg-[#FF4655] rotate-45" />
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="hidden xl:flex items-center gap-2 pr-3 border-r border-[#1e2d3a]/60">
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
              <span className="text-[11px] tracking-[0.14em] text-[#768079] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                ONLINE
              </span>
            </div>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-[#FF4655] text-white px-6 py-[11px] text-[12px] font-black tracking-[0.14em] uppercase hover:bg-[#e03a49] transition-colors shadow-[0_0_16px_rgba(255,70,85,0.25)]"
              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.07] transition-colors" style={{ clipPath: CLIP_BTN }} />
              <span className="relative flex items-center gap-2">
                REQUEST A QUOTE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] hover:border-[#FF4655]/40 hover:text-[#FF4655] transition-colors shrink-0"
            style={{ clipPath: CLIP_BTN }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* bottom hairline glow when scrolled */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4655]/30 to-transparent opacity-0 transition-opacity",
            scrolled && "opacity-100"
          )}
        />
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} fixed inset-0 z-40 bg-[#0F1923]/95 backdrop-blur-xl pt-[68px] px-4 pb-6 overflow-y-auto lg:hidden border-t border-[#1e2d3a]`}
          >
            {/* bg textures */}
            <div className="pointer-events-none absolute inset-0 top-[68px]">
              <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:36px_36px]" />
              <div className="absolute inset-0 opacity-[0.025]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 22px)" }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[18rem] bg-[#FF4655]/10 blur-[80px] rounded-full" />
            </div>
            <div className="absolute top-[68px] left-0 right-0 h-[2px] bg-[#FF4655] z-10" />

            <div className="relative max-w-md mx-auto flex flex-col gap-5 pt-6">
              {/* HUD header */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] font-black text-[#FF4655]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> NAV // SELECT OPERATION
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                  <ValorantCrosshair className="w-5 h-5 scale-75" /> VLR-09
                </span>
              </div>

              {/* Primary links */}
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div
                      key={link.name}
                      className="relative bg-[#0a131c] border border-[#1e2d3a] p-3 flex flex-col gap-3 overflow-hidden"
                      style={{ clipPath: CLIP_CARD }}
                    >
                      <CornerBrackets color="rgba(255,70,85,0.28)" size={10} />
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]/70" />
                      <div
                        className="text-[11px] font-black tracking-[0.18em] text-[#FF4655] px-1 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        <span className="w-5 h-[1px] bg-[#FF4655]" /> // MORE // OPERATIONS
                        <Crosshair className="ml-auto w-3 h-3 text-[#FF4655]/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {link.dropdown.map((drop) => {
                          const isDropActive = pathname === drop.href;
                          return (
                            <Link
                              key={drop.name}
                              href={drop.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "px-4 py-3 text-[11px] font-black tracking-[0.14em] uppercase border transition-colors flex items-center justify-between",
                                isDropActive
                                  ? "bg-[#FF4655] text-white border-[#FF4655] shadow-[0_0_10px_rgba(255,70,85,0.3)]"
                                  : "bg-[#0F1923] text-[#ECE8E1] border-[#1e2d3a] hover:border-[#FF4655]/30 hover:text-[#FF4655]"
                              )}
                              style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                            >
                              {drop.name.toUpperCase()}
                              <span className={cn("w-1 h-1 rotate-45 shrink-0", isDropActive ? "bg-white" : "bg-[#FF4655]")} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href!}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "relative px-5 py-4 text-[22px] tracking-tight flex items-center justify-between border transition-colors overflow-hidden group",
                        pathname === link.href
                          ? "bg-[#FF4655] text-white border-[#FF4655] shadow-[0_0_16px_rgba(255,70,85,0.35)]"
                          : "bg-[#0a131c] text-[#ECE8E1] border-[#1e2d3a] hover:border-[#FF4655]/35 hover:bg-[#111A23]"
                      )}
                      style={{ clipPath: CLIP_CARD, fontFamily: "var(--font-anton)" }}
                    >
                      {/* left rail */}
                      <span className={cn("absolute left-0 top-0 bottom-0 w-[2px]", pathname === link.href ? "bg-white" : "bg-[#FF4655]")} />
                      <span className="pl-2">{link.name.toUpperCase()}</span>
                      <span
                        className={cn(
                          "w-8 h-8 flex items-center justify-center border shrink-0 transition-colors",
                          pathname === link.href
                            ? "bg-white/15 border-white/20 text-white"
                            : "bg-[#0F1923] border-[#1e2d3a] text-[#FF4655] group-hover:bg-[#FF4655] group-hover:text-white group-hover:border-[#FF4655]"
                        )}
                        style={{ clipPath: CLIP_BTN }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      <CornerBrackets color={pathname === link.href ? "rgba(255,255,255,0.4)" : "rgba(255,70,85,0.25)"} size={10} />
                    </Link>
                  )
                )}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="group relative w-full inline-flex items-center justify-center gap-2 bg-[#FF4655] text-white py-4 text-[13px] font-black tracking-[0.16em] uppercase hover:bg-[#e03a49] transition-colors shadow-[0_0_20px_rgba(255,70,85,0.35)] mt-2"
                style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" style={{ clipPath: CLIP_BTN }} />
                <span className="relative flex items-center gap-2">
                  REQUEST A QUOTE <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              {/* footer tac line */}
              <div className="flex items-center justify-center gap-2 pt-2 text-[10px] tracking-[0.16em] text-[#768079]/70" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-6 h-px bg-[#1e2d3a]" /> CYPHER TECH // VLR-09 // SECURE COMMS <span className="w-6 h-px bg-[#1e2d3a]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
