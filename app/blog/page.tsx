"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Search, Layers, Cpu, Radio, Crosshair, Calendar, Clock, Skull, Swords } from "lucide-react";
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

const posts = [
  {
    slug: "rsc-ecommerce",
    category: "Engineering",
    title: "Why React Server Components are the Future of E-Commerce",
    excerpt: "Streaming SSR, zero JS by default, and edge caching — how RSC cuts TTFB by 68% and lifts conversion.",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
    color: "#FF4655",
  },
  {
    slug: "micro-interactions",
    category: "Design",
    title: "The Psychology of Micro-Interactions in SaaS Dashboards",
    excerpt: "Clipped HUDs, haptics, and 120ms feedback loops that make dashboards feel alive — and keep users.",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    color: "#00E5FF",
  },
  {
    slug: "scaling-agency",
    category: "Strategy",
    title: "Scaling Your Agency: When to Transition from Freelancer to Firm",
    excerpt: "From solo clutch to full squad — ops, margins, and the hiring triggers that actually matter.",
    date: "Sep 15, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
    color: "#FFD700",
  },
  {
    slug: "edge-runtime",
    category: "Engineering",
    title: "Edge Runtime vs Node: Where to Run Your Next.js Workloads",
    excerpt: "Cold start, cache, and cost — a valorant-tested decision tree for edge vs serverless.",
    date: "Sep 02, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80&auto=format&fit=crop",
    color: "#FF4655",
  },
  {
    slug: "design-systems",
    category: "Design",
    title: "Building a Clipped HUD Design System in Tailwind",
    excerpt: "Tokens, clips, and corner brackets — shipping a valorant-grade system that scales to 200+ screens.",
    date: "Aug 21, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80&auto=format&fit=crop",
    color: "#B14AFF",
  },
  {
    slug: "observability",
    category: "Strategy",
    title: "Observability That Actually Saves Rounds: Logs, Traces, SLOs",
    excerpt: "From Sentry to Datadog — how we keep 99.99% uptime without pager fatigue.",
    date: "Aug 09, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format&fit=crop",
    color: "#00E5FF",
  },
];

export default function BlogPage() {
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
        {/* header HUD */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            <Radio className="w-3.5 h-3.5 animate-pulse" /> // INTEL // ARCHIVE
          </div>
          <h1 className="text-4xl md:text-6xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
            LATEST <span className="text-[#FF4655]">INTEL</span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-[#FF4655]" />
            <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>Engineering, design, and strategy — valorant-precision.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["All", "Engineering", "Design", "Strategy"].map((c) => (
              <span key={c} className={`px-3 py-1 text-[11px] font-black tracking-widest border ${c === "All" ? "bg-[#FF4655] border-[#FF4655] text-white" : "bg-[#0a131c] border-[#1e2d3a] text-[#768079]"}`} style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{c.toUpperCase()}</span>
            ))}
          </div>
        </motion.div>

        {/* featured */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]" />
          <div className="relative bg-[#0F1923] grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="lg:col-span-7 relative h-[320px] lg:h-[380px] overflow-hidden">
              <img src={posts[0].image} alt={posts[0].title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-widest" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{posts[0].category.toUpperCase()} // FEATURED</div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-[11px] tracking-widest text-[#ECE8E1]" style={{ fontFamily: "var(--font-mono)" }}>
                <Calendar className="w-3 h-3 text-[#FF4655]" /> {posts[0].date.toUpperCase()} <span className="w-1 h-1 bg-[#1e2d3a]" /> <Clock className="w-3 h-3" /> {posts[0].readTime.toUpperCase()}
              </div>
            </div>
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col">
              <CornerBrackets color="rgba(255,70,85,0.35)" />
              <h2 className="text-2xl md:text-3xl leading-tight text-[#ECE8E1]" style={{ fontFamily: "var(--font-anton)" }}>{posts[0].title}</h2>
              <p className="text-sm leading-relaxed text-[#768079] mt-3" style={{ fontFamily: "var(--font-raj)" }}>{posts[0].excerpt}</p>
              <div className="mt-auto pt-6">
                <Link href={`/blog/${posts[0].slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4655] text-white text-xs font-black tracking-widest hover:bg-[#e03a49] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                  READ INTEL <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(1).map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="group relative bg-[#111A23] border border-[#1e2d3a] hover:border-[#FF4655]/30 transition-colors" style={{ clipPath: CLIP_CARD }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: post.color }} />
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="h-48 relative overflow-hidden bg-[#0a131c]" style={{ clipPath: "polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 14px)" }}>
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-[#0F1923]/15 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0F1923]/80 border border-[#1e2d3a] text-white text-[11px] font-black tracking-widest backdrop-blur" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{post.category.toUpperCase()}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: post.color }} />
                </div>
                <div className="p-6 bg-[#0F1923]">
                  <h3 className="text-[16px] font-bold leading-snug text-[#ECE8E1] group-hover:text-[#FF4655] transition-colors" style={{ fontFamily: "var(--font-raj)" }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed text-[#768079] mt-2 line-clamp-2" style={{ fontFamily: "var(--font-raj)" }}>{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                    <span>{post.date.toUpperCase()}</span><span className="w-1 h-1 bg-[#1e2d3a]" /><span>{post.readTime.toUpperCase()}</span>
                    <span className="ml-auto text-[#FF4655] flex items-center gap-1">READ <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a131c] border border-[#1e2d3a] text-[#ECE8E1] text-xs font-black tracking-widest hover:border-[#FF4655]/30 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            REQUEST DOSSIER <Swords className="w-3.5 h-3.5 text-[#FF4655]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
