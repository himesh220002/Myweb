"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Layout,
  Zap,
  ShieldCheck,
  Globe,
  Star,
  ShoppingBag,
  Cloud,
  Code2,
  Crosshair,
  Radio,
  Swords,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RoadmapSection from "@/components/RoadmapSection";
import StarWarGame from "@/components/StarWar/StarWarGame";
import { PLANS as SHARED_PLANS, dualPrice } from "@/lib/pricing";
import { Anton, Bebas_Neue, Rajdhani, JetBrains_Mono, Orbitron } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" });
const orbitron = Orbitron({ weight: ["600", "800"], subsets: ["latin"], variable: "--font-orbitron" });

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

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

const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-2xl mx-auto text-center mb-12">
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-semibold tracking-[0.18em] text-white/70"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655]" />
        {eyebrow}
      </span>
      <h2
        className="mt-5 text-4xl md:text-5xl leading-[1.02] tracking-tight text-[#ECE8E1]"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        {title} {accent && <span className="text-[#FF4655]">{accent}</span>}
      </h2>
      {description && (
        <p
          className="mt-4 text-[15px] leading-relaxed text-white/55"
          style={{ fontFamily: "var(--font-raj)" }}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

const SERVICES = [
  {
    title: "High-Performance Web Apps",
    desc: "Server-rendered Next.js apps with streaming, edge caching and sub-second loads.",
    points: ["Next.js + TypeScript", "Streaming SSR & ISR", "98+ Lighthouse"],
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80&auto=format&fit=crop",
    icon: Code2,
  },
  {
    title: "E-Commerce That Converts",
    desc: "Fast storefronts, frictionless checkout and search that actually sells.",
    points: ["Headless storefronts", "Stripe + payments", "SEO-ready catalog"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
    icon: ShoppingBag,
  },
  {
    title: "Premium UI/UX Design",
    desc: "Clean, modern interfaces with thoughtful motion — designed to convert.",
    points: ["Design systems", "Prototypes in Figma", "Accessible & responsive"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop",
    icon: Layout,
  },
  {
    title: "Cloud, APIs & Security",
    desc: "Solid backends, integrations and hardened security you don't have to think about.",
    points: ["Node / Postgres / Redis", "Auth, payments, AI APIs", "CI/CD + monitoring"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
    icon: Cloud,
  },
];

const ADVANTAGES = [
  {
    title: "Speed as a feature",
    desc: "Every page is tuned for Core Web Vitals — so visitors stay and Google ranks you higher.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    icon: Zap,
    metrics: [
      { k: "<0.9s", v: "Avg. load" },
      { k: "98+", v: "Lighthouse" },
      { k: "Edge", v: "Cached" },
    ],
    points: ["Streaming SSR + ISR", "Image & font optimization", "HTTP/3 + global CDN"],
  },
  {
    title: "Design that earns trust",
    desc: "Modern, calm interfaces with clear hierarchy — no noise, just what moves users forward.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop",
    icon: Layout,
    metrics: [
      { k: "2x", v: "Avg. conversion lift" },
      { k: "A11y", v: "WCAG-minded" },
      { k: "100%", v: "Responsive" },
    ],
    points: ["Conversion-first layouts", "Micro-interactions", "Brand-aligned systems"],
  },
  {
    title: "Security without friction",
    desc: "Bank-grade practices baked in from day one — auth, payments and data handled right.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80&auto=format&fit=crop",
    icon: ShieldCheck,
    metrics: [
      { k: "AES", v: "256 encryption" },
      { k: "OAuth2", v: " + MFA ready" },
      { k: "0", v: "Secrets in code" },
    ],
    points: ["Secure auth & sessions", "Audited API patterns", "Backups + monitoring"],
  },
];

const PLANS = SHARED_PLANS.map((p) => {
  const { inr, usd } = dualPrice(p, "project");
  const isCustom = p.inr.project === "Custom";
  return {
    id: p.id,
    name: p.name,
    tag: p.tag,
    pricePrimary: isCustom ? "Custom" : inr,
    priceSecondary: isCustom ? "Tailored scope" : `${usd} USD`,
    billingNote: p.billingNoteProject,
    blurb: p.blurb,
    features: p.highlights,
    cta: p.cta,
    ctaHref: p.ctaHref,
    trust: p.trust,
    popular: p.popular,
  };
});

const STACK = [
  {
    group: "Frontend",
    items: [
      { label: "Next.js 16", icons: ["https://cdn.simpleicons.org/nextdotjs/white"] },
      { label: "React 19", icons: ["https://cdn.simpleicons.org/react/white"] },
      { label: "TypeScript", icons: ["https://cdn.simpleicons.org/typescript/white"] },
      { label: "Tailwind CSS", icons: ["https://cdn.simpleicons.org/tailwindcss/white"] },
      { label: "Framer Motion", icons: ["https://cdn.simpleicons.org/framer/white"] },
    ],
  },
  {
    group: "Backend",
    items: [
      { label: "Node.js", icons: ["https://cdn.simpleicons.org/nodedotjs/white"] },
      { label: "PostgreSQL", icons: ["https://cdn.simpleicons.org/postgresql/white"] },
      { label: "Redis", icons: ["https://cdn.simpleicons.org/redis/white"] },
      { label: "GraphQL / REST", icons: ["https://cdn.simpleicons.org/graphql/white"] },
      { label: "Prisma", icons: ["https://cdn.simpleicons.org/prisma/white"] },
    ],
  },
  {
    group: "Platform",
    items: [
      { label: "Vercel", icons: ["https://cdn.simpleicons.org/vercel/white"] },
      { label: "AWS", icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"], wordmark: true },
      { label: "Docker", icons: ["https://cdn.simpleicons.org/docker/white"] },
      { label: "GitHub Actions", icons: ["https://cdn.simpleicons.org/githubactions/white"] },
      { label: "Sentry", icons: ["https://cdn.simpleicons.org/sentry/white"] },
      { label: "Mixpanel", icons: ["https://cdn.simpleicons.org/mixpanel/white"] },
    ],
  },
];

export default function Home() {
  const [activePlan, setActivePlan] = useState<"starter" | "growth" | "enterprise">("growth");

  // ── showreel player (3:54, autoplay muted loop + custom unmute + smooth fade-out on leave) ──
  const SHOWREEL_ID = "x8jAY2CoOBg";
  const showreelRef = useRef<any>(null);
  const showreelFadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const showreelFading = useRef(false);
  const [showreelMuted, setShowreelMuted] = useState(true);
  const showreelMutedRef = useRef(true);
  const setMutedState = (m: boolean) => {
    showreelMutedRef.current = m;
    setShowreelMuted(m);
  };

  // gently blend volume to 0, then stop + destroy. The iframe is moved out
  // of React's tree first so an SPA navigation can't hard-cut the sound.
  const smoothStopShowreel = (ms = 600) => {
    const p = showreelRef.current;
    if (!p?.getIframe || showreelFading.current) return;
    if (showreelMutedRef.current) return; // already silent — nothing to blend
    showreelFading.current = true;
    try {
      const iframe = p.getIframe() as HTMLIFrameElement | undefined;
      if (iframe && iframe.parentNode && iframe.parentNode !== document.body) {
        iframe.style.position = "fixed";
        iframe.style.width = "4px";
        iframe.style.height = "4px";
        iframe.style.bottom = "0";
        iframe.style.right = "0";
        iframe.style.opacity = "0";
        iframe.style.pointerEvents = "none";
        document.body.appendChild(iframe);
      }
    } catch {
      /* noop */
    }
    let startVol = 100;
    try {
      startVol = p.getVolume?.() ?? 100;
    } catch {
      /* noop */
    }
    const ticks = Math.max(1, Math.round(ms / 50));
    let i = 0;
    if (showreelFadeTimer.current) clearInterval(showreelFadeTimer.current);
    showreelFadeTimer.current = setInterval(() => {
      i += 1;
      const v = Math.max(0, Math.round(startVol * (1 - i / ticks)));
      try {
        p.setVolume?.(v);
      } catch {
        /* noop */
      }
      if (i >= ticks) {
        if (showreelFadeTimer.current) clearInterval(showreelFadeTimer.current);
        showreelFadeTimer.current = null;
        try {
          p.mute?.();
          p.stopVideo?.();
          p.destroy?.();
        } catch {
          /* noop */
        }
        showreelRef.current = null;
      }
    }, 50);
  };

  useEffect(() => {
    const initPlayer = () => {
      if (showreelRef.current || !(window as any).YT?.Player) return;
      showreelRef.current = new (window as any).YT.Player("cypher-showreel", {
        videoId: SHOWREEL_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: SHOWREEL_ID,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
            const iframe = e.target.getIframe?.();
            if (iframe) {
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              iframe.style.position = "absolute";
              iframe.style.inset = "0";
            }
          },
        },
      });
    };
    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
    // start blending out the moment a leave-navigation begins
    const onLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target === "_blank") return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      } catch {
        return;
      }
      smoothStopShowreel(450);
    };
    const onLeave = () => smoothStopShowreel(500);
    document.addEventListener("click", onLinkClick, true);
    window.addEventListener("popstate", onLeave);
    window.addEventListener("pagehide", onLeave);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
      window.removeEventListener("popstate", onLeave);
      window.removeEventListener("pagehide", onLeave);
      // a blend-out already running (iframe lives on <body>) is left to finish;
      // otherwise tear the player down immediately
      if (showreelFading.current) return;
      if (showreelFadeTimer.current) clearInterval(showreelFadeTimer.current);
      try {
        showreelRef.current?.destroy?.();
      } catch {
        /* noop */
      }
      showreelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleShowreelMute = () => {
    const p = showreelRef.current;
    if (!p?.unMute) return;
    if (showreelMutedRef.current) {
      p.unMute();
      p.setVolume?.(100);
      setMutedState(false);
    } else {
      p.mute();
      setMutedState(true);
    }
  };

  return (
    <div className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} ${orbitron.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      {/* global valorant bg */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465510_1px,transparent_1px),linear-gradient(to_bottom,#FF465510_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 26px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4655]/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-[#00E5FF]/[0.06] rounded-full blur-[120px]" />
      </div> */}

      {/* ── HERO — 3D SPACE DEPTH with herobackgroundtheme1.jpg ── */}
      <section className="relative min-h-[100vh] flex flex-col justify-center px-6 pt-28 pb-16 overflow-hidden">
        {/* 3D depth space background — FIXED to viewport, stays vivid while scrolling */}
        <div className="fixed inset-0 z-0">
          {/* base 3D image — HIGH VISIBILITY */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/herobackgroundtheme1.jpg" alt="3D space depth — valorant tactical abyss" className="w-full h-full object-cover object-center brightness-[1.15] contrast-[1.1] saturate-[1.15]" />
          {/* valorant color grade — LIGHT so depth shows */}
          <div className="absolute inset-0 bg-[#0F1923]/38" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/18 via-[#0F1923]/10 to-[#0F1923]/85 " />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923]/28 via-transparent to-[#0F1923]/30" />
          {/* depth haze */}
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#FF465510_1px,transparent_1px),linear-gradient(to_bottom,#FF465510_1px,transparent_1px)] bg-[size:48px_48px]" />
          {/* <div className="absolute inset-0 opacity-[0.04]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 26px)" }} /> */}
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
                    <div key={s.l} className="bg-[#0a131c] border border-[#1e2d3a] p-3 text-center" style={{ clipPath: CLIP_CARD }}>
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
        <div className="relative z-10 max-w-7xl mx-auto hidden w-full mt-12 border-y border-[#1e2d3a] bg-[#0a131c]/60 overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_40px,rgba(255,70,85,0.05)_40px_41px)]" />
          <div className="flex items-center justify-center gap-6 py-6 px-4 text-[11px] tracking-[0.18em] whitespace-nowrap overflow-hidden" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="text-[#FF4655] font-black flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> LIVE // TICKER</span>
            <span className="text-[#768079]">NEXT.JS 15</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#768079]">TYPESCRIPT</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#768079]">TAILWIND</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#768079]">POSTGRES</span><span className="text-[#1e2d3a]">—</span>
            <span className="text-[#ECE8E1] font-bold">HIGH PERFORMANCE</span>
          </div>
        </div>
      </section>

      {/* ══════════ NEW · SERVICES (just below hero) ══════════ */}
      <section id="services" className="relative bg-[#0F1923] px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="SERVICES"
            title="What we build"
            accent="for you"
            description="Four focused offerings. No jargon, no filler — just the work that moves revenue."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/30 to-transparent" />
                    <span className="absolute bottom-3 left-4 w-10 h-10 rounded-2xl bg-black/55 backdrop-blur border border-white/15 flex items-center justify-center text-white">
                      <s.icon className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-[17px]" style={{ fontFamily: "var(--font-raj)" }}>
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55" style={{ fontFamily: "var(--font-raj)" }}>
                      {s.desc}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-[13px] text-white/70" style={{ fontFamily: "var(--font-raj)" }}>
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* results band */}
          <Reveal delay={0.1} className="mt-6">
            <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl px-6 py-5 md:px-8 flex flex-col md:flex-row items-center gap-5 justify-between">
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-2xl bg-[#FF4655]/15 border border-[#FF4655]/25 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#FF4655]" />
                </span>
                <div>
                  <p className="font-bold text-white" style={{ fontFamily: "var(--font-raj)" }}>
                    Deployed globally on the edge — fast everywhere.
                  </p>
                  <p className="text-sm text-white/50" style={{ fontFamily: "var(--font-raj)" }}>
                    Vercel / AWS · CI/CD · monitoring included in every build.
                  </p>
                </div>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors shrink-0"
                style={{ fontFamily: "var(--font-raj)" }}
              >
                See case studies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          {/* ── showreel: full 3:54 video, muted loop + unmute option ── */}
          <Reveal delay={0.15} className="mt-6">
            <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 relative min-h-[260px] md:min-h-[400px] bg-black">
                  <div id="cypher-showreel" className="absolute inset-0 w-full h-full" aria-label="CypherTech showreel video" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F1923]/60 pointer-events-none" />
                  <span className="absolute top-2 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur border border-white/15 text-[11px] tracking-[0.14em] text-white/80" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className="w-2 h-2 rounded-full bg-[#FF4655] animate-pulse" /> CHAMPIONS · 2026
                  </span>
                  <button
                    onClick={toggleShowreelMute}
                    className="absolute bottom-1 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white text-xs font-bold tracking-widest hover:bg-black/80 hover:border-[#FF4655]/60 transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                    aria-label={showreelMuted ? "Unmute showreel" : "Mute showreel"}
                  >
                    {showreelMuted ? <VolumeX className="w-4 h-4 text-[#FF4655]" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    {showreelMuted ? "UNMUTE" : "MUTE"}
                  </button>
                </div>
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-center">
                  <p className="text-[11px] tracking-[0.18em] text-[#FF4655] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    THE FULL STORY · 03:54
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl text-white leading-tight" style={{ fontFamily: "var(--font-anton)" }}>
                    Watch what we mean by <span className="text-[#FF4655]">modern.</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55" style={{ fontFamily: "var(--font-raj)" }}>
                    The full cut — plays muted on loop. Hit unmute anytime for
                    the complete experience with sound.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-[#FF4655] px-6 py-3 text-sm font-bold text-white hover:bg-[#e03a49] transition-colors"
                      style={{ fontFamily: "var(--font-raj)" }}
                    >
                      Digitalize my business <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <RoadmapSection />

      {/* ══════════ ADVANTAGE — rebuilt with modern imagery ══════════ */}
      <section id="why" className="relative px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="WHY CYPHERTECH"
            title="Clean builds,"
            accent="real outcomes"
            description="We keep it simple: fast pages, honest design and infrastructure you can trust."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ADVANTAGES.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <article className="h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/25 to-transparent" />
                    <span className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-black/55 backdrop-blur border border-white/15 flex items-center justify-center text-white">
                      <a.icon className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-raj)" }}>
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55" style={{ fontFamily: "var(--font-raj)" }}>
                      {a.desc}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-5">
                      {a.metrics.map((m) => (
                        <div key={m.k} className="rounded-2xl bg-black/30 border border-white/10 py-2.5 text-center">
                          <p className="text-white text-[15px]" style={{ fontFamily: "var(--font-anton)" }}>{m.k}</p>
                          <p className="text-[11px] text-white/50">{m.v}</p>
                        </div>
                      ))}
                    </div>
                    <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
                      {a.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-[13px] text-white/70" style={{ fontFamily: "var(--font-raj)" }}>
                          <Check className="w-3.5 h-3.5 text-[#FF4655] shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEW · STACK + DELIVERY (below advantages) ══════════ */}
      <section className="relative px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8">
              <p className="text-[11px] tracking-[0.18em] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
                OUR STACK
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl text-white" style={{ fontFamily: "var(--font-anton)" }}>
                Modern tools, <span className="text-[#FF4655]">proven in production.</span>
              </h3>
              <div className="mt-6 space-y-5">
                {STACK.map((g) => (
                  <div key={g.group}>
                    <p className="text-xs font-bold tracking-[0.14em] text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
                      {g.group.toUpperCase()}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.items.map((t) => (
                        <span key={t.label} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 border border-white/10 text-[13px] text-white/75 hover:border-white/25 hover:text-white transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                          <span className="flex items-center gap-1.5 shrink-0">
                            {t.icons.map((src) => (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                key={src}
                                src={src}
                                alt=""
                                loading="lazy"
                                className={"wordmark" in t && t.wordmark ? "h-3.5 w-auto brightness-0 invert" : "w-4 h-4"}
                              />
                            ))}
                          </span>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <div className="relative h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/skills_frontend_bg.png" alt="Delivery" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <p className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-raj)" }}>
                    How we deliver
                  </p>
                  <span className="px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/25 text-emerald-300 text-xs font-semibold">
                    On time, on budget
                  </span>
                </div>
              </div>
              <ul className="p-6 md:p-8 space-y-4">
                {[
                  { t: "Fixed scope & timeline", d: "You approve milestones before we write code." },
                  { t: "Weekly demos", d: "See progress every week — no surprises at launch." },
                  { t: "Launch + 30-day care", d: "Monitoring, fixes and handover docs included." },
                ].map((r) => (
                  <li key={r.t} className="flex gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-[#FF4655]/15 border border-[#FF4655]/25 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#FF4655]" />
                    </span>
                    <div>
                      <p className="font-bold text-white text-[15px]" style={{ fontFamily: "var(--font-raj)" }}>{r.t}</p>
                      <p className="text-sm text-white/55" style={{ fontFamily: "var(--font-raj)" }}>{r.d}</p>
                    </div>
                  </li>
                ))}
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-white text-[#0F1923] px-6 py-3 text-sm font-bold hover:bg-white/85 transition-colors"
                  style={{ fontFamily: "var(--font-raj)" }}
                >
                  Get a free estimate <ArrowRight className="w-4 h-4" />
                </Link>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ ENGAGEMENT — replaces ROI graph ══════════ */}
      <section id="pricing" className="relative px-6 py-16 md:py-20 border-y border-white/10 bg-[#0C141D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="ENGAGEMENT"
            title="Simple plans,"
            accent="honest pricing"
            description="Pick the fit for where you are. Every plan includes design, build, launch and support."
          />
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1 gap-1">
              {(["starter", "growth", "enterprise"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePlan(p)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest capitalize transition-colors ${activePlan === p ? "bg-[#FF4655] text-white" : "text-white/55 hover:text-white"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => {
              const active = activePlan === plan.id;
              return (
                <Reveal key={plan.id} delay={i * 0.08}>
                  <div
                    className={`relative h-full rounded-3xl border p-6 md:p-7 transition-all duration-300 ${"popular" in plan && plan.popular
                      ? "border-[#FF4655]/50 bg-[#FF4655]/[0.07] backdrop-blur-xl"
                      : active
                        ? "border-white/25 bg-white/[0.06] backdrop-blur-xl"
                        : "border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20"
                      }`}
                  >
                    {"popular" in plan && plan.popular && (
                      <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#FF4655] text-white text-[11px] font-bold tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                        MOST POPULAR
                      </span>
                    )}
                    <p className="text-[11px] tracking-[0.18em] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
                      {plan.name.toUpperCase()} · {plan.tag}
                    </p>
                    <p className="mt-2 text-3xl text-white" style={{ fontFamily: "var(--font-anton)" }}>
                      {plan.pricePrimary}
                    </p>
                    {/* <p className="mt-1 text-sm font-bold text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
                        {plan.priceSecondary}
                      </p> */}
                    <p className="mt-1 text-[11px] tracking-[0.14em] text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
                      {plan.billingNote.toUpperCase()}
                    </p>
                    <p className="mt-2 text-sm text-white/55" style={{ fontFamily: "var(--font-raj)" }}>
                      {plan.blurb}
                    </p>
                    <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/75" style={{ fontFamily: "var(--font-raj)" }}>
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.ctaHref}
                      className={`mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-colors ${"popular" in plan && plan.popular
                        ? "bg-[#FF4655] text-white hover:bg-[#e03a49]"
                        : "border border-white/15 text-white hover:bg-white/10"
                        }`}
                      style={{ fontFamily: "var(--font-raj)" }}
                    >
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="mt-3 text-center text-[10px] tracking-[0.14em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                      {plan.trust}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COMPARE ALL FEATURES <ArrowRight className="w-3.5 h-3.5 text-[#FF4655]" />
            </Link>
            <span className="hidden sm:inline text-white/20">·</span>
            <span className="text-[11px] tracking-[0.14em] text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
              Non-Disclosure-Agreement-FIRST // 48H PROPOSAL
            </span>
          </div>
          <Reveal delay={0.15} className="mt-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-1 text-[#FF4655]">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" />
                ))}
                <p className="ml-3 text-sm text-white/70 italic" style={{ fontFamily: "var(--font-raj)" }}>
                  “CypherTech rebuilt our booking flow — saved 15h/week and doubled bookings in two months.”
                </p>
              </div>
              <p className="text-xs tracking-[0.14em] text-white/45 shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
                SARAH J. · OPERATIONS DIRECTOR
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="relative  px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="TESTIMONIALS"
            title="Loved by"
            accent="founders & teams"
            description="Real feedback from real launches."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: "CypherTech completely transformed our digital presence. The new site is blazing fast, and conversions have doubled since launch.", author: "Sarah Jenkins", role: "Director of E-Commerce", image: "/testimonial_1.png" },
              { quote: "Himesh is not just a developer; he's a strategic partner. He understood our goals immediately and engineered the perfect solution.", author: "David Chen", role: "Founder, TechFlow AI", image: "/testimonial_2.png" },
              { quote: "The attention to detail is unmatched. A product that looks incredible and holds up flawlessly under heavy load.", author: "Marcus Thorne", role: "CTO, Global Logistics", image: "/testimonial_3.png" },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <figure className="h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex flex-col hover:border-white/20 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} className="w-3.5 h-3.5 fill-[#FF4655] text-[#FF4655]" />
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-relaxed text-white/80 flex-1" style={{ fontFamily: "var(--font-raj)" }}>
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.author} className="w-11 h-11 rounded-full object-cover border border-white/15" />
                    <div>
                      <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-raj)" }}>{t.author}</p>
                      <p className="text-xs text-white/50" style={{ fontFamily: "var(--font-raj)" }}>{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BLOG ══════════ */}
      <section className="relative px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] tracking-[0.18em] text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" /> INSIGHTS
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl text-white" style={{ fontFamily: "var(--font-anton)" }}>
                Latest <span className="text-[#00E5FF]">thinking</span>
              </h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold tracking-widest text-white hover:bg-white/10 transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
              VIEW ALL <ArrowRight className="w-3.5 h-3.5 text-[#FF4655]" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { slug: "rsc-ecommerce", category: "Engineering", title: "Why React Server Components are the future of e-commerce", date: "Oct 12, 2026", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop" },
              { slug: "micro-interactions", category: "Design", title: "The psychology of micro-interactions in SaaS dashboards", date: "Sep 28, 2026", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&auto=format&fit=crop" },
              { slug: "scaling-agency", category: "Strategy", title: "Scaling your agency: from freelancer to firm transformation", date: "Sep 15, 2026", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format&fit=crop" },
            ].map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-white/20 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF4655] text-white text-[11px] font-bold tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-white leading-snug group-hover:text-[#FF4655] transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                      {post.title}
                    </h3>
                    <p className="mt-3 text-xs tracking-widest text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
                      {post.date.toUpperCase()}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section className="relative px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] tracking-[0.18em] text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655]" /> ABOUT
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl text-white" style={{ fontFamily: "var(--font-anton)" }}>
              Hi, I&apos;m <span className="text-[#FF4655]">Himesh.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60" style={{ fontFamily: "var(--font-raj)" }}>
              Full-stack engineer and designer working at the intersection of robust
              backend architecture and beautiful front-ends.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60" style={{ fontFamily: "var(--font-raj)" }}>
              I help companies turn complex requirements into elegant,
              high-performance products — from first sketch to global scale.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="px-6 py-3 rounded-full border border-white/15 text-white text-sm font-bold hover:bg-white/10 transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                More about me
              </Link>
              <Link href="/contact" className="px-6 py-3 rounded-full bg-[#FF4655] text-white text-sm font-bold hover:bg-[#e03a49] transition-colors inline-flex items-center gap-2" style={{ fontFamily: "var(--font-raj)" }}>
                Let&apos;s connect <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile_avatar.png" alt="Himesh" className="w-full aspect-square object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-raj)" }}>HIMESH SATYAM</p>
                  <p className="text-[11px] tracking-[0.14em] text-white/55" style={{ fontFamily: "var(--font-mono)" }}>FULL-STACK ENGINEER</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ PLAYZONE (kept, calmed) ══════════ */}
      <section className="hidden lg:block relative px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] tracking-[0.18em] text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
              TRAINING GROUND
            </span>
            <h2 className="mt-3 text-4xl text-white" style={{ fontFamily: "var(--font-anton)" }}>
              Play<span className="text-[#FF4655]">zone</span>
            </h2>
            <p className="mt-2 text-sm text-white/50" style={{ fontFamily: "var(--font-raj)" }}>
              StarWarZ — hit PLAY for the full-page arena. ESC pauses, EXIT brings you back here.
            </p>
          </div>
          <StarWarGame />
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="relative px-6 pb-20">
        <Reveal className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-[#FF4655] px-8 py-12 md:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/25" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl text-white" style={{ fontFamily: "var(--font-anton)" }}>
                HAVE AN IDEA? LET&apos;S SHIP IT.
              </h2>
              <p className="mt-3 text-white/85 max-w-xl mx-auto" style={{ fontFamily: "var(--font-raj)" }}>
                Tell us about your project — get a clear scope, timeline and fixed quote within 48 hours.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0F1923] hover:bg-white/90 transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                  Get my free quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                  Browse work
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
