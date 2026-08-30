"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Skull, Crosshair, Radio, Share2 } from "lucide-react";
import { Anton, Rajdhani, JetBrains_Mono } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

const posts: Record<string, { category: string; title: string; date: string; readTime: string; image: string; color: string; content: string[] }> = {
  "rsc-ecommerce": {
    category: "Engineering",
    title: "Why React Server Components are the Future of E-Commerce",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    color: "#FF4655",
    content: [
      "React Server Components shift rendering to the edge — zero JS by default, streaming SSR, and cache that actually hits. For E-Commerce, that means TTFB down 68% and conversion up.",
      "We migrated a headless Shopify storefront to RSC + ISR. Bundle dropped from 380kb to 92kb, LCP 1.1s, and add-to-cart interaction stayed at 60fps even on mid-tier Android.",
      "Key loadout: Next.js 15 App Router, fetch memoization, and on-demand revalidation via webhooks. No client waterfall, no hydration jank.",
    ],
  },
  "micro-interactions": {
    category: "Design",
    title: "The Psychology of Micro-Interactions in SaaS Dashboards",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    color: "#00E5FF",
    content: [
      "A 120ms feedback loop feels alive. Clipped HUDs, crosshair hovers, and staggered reveals tell the user: system heard you, round is yours.",
      "We A/B tested 3 dashboard variants. The valorant HUD variant (clipped panels + corner brackets + 1.5px red rail) lifted task completion 22% and NPS from 41 to 58.",
      "Recipe: Tailwind clipPath tokens, Framer Motion whileHover, and 1-frame haptics. Don’t animate opacity — animate y and scale.",
    ],
  },
  "scaling-agency": {
    category: "Strategy",
    title: "Scaling Your Agency: When to Transition from Freelancer to Firm",
    date: "Sep 15, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
    color: "#FFD700",
    content: [
      "Solo clutch → full squad is not hiring — it’s ops. Margins, utilization, and the 3 triggers: waitlist >2 weeks, rework >18%, and founder doing QA at midnight.",
      "We moved from solo to 6 at CypherTech with fixed-price sprints, clipped HUD ops, and a single SLO: 99.99%. No standups longer than 9 minutes.",
      "First hire: not a dev — a dispatcher. Then design, then backend. Front-end last, because system matters more than pixels.",
    ],
  },
};

export default function BlogSlugPage() {
  const { slug } = useParams() as { slug: string };
  const post = posts[slug as string];
  if (!post) return notFound();

  return (
    <div className={`${anton.variable} ${rajdhani.variable} ${jetmono.variable} bg-[#0F1923] text-[#ECE8E1] min-h-screen selection:bg-[#FF4655]/30 relative overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#FF465520_1px,transparent_1px),linear-gradient(to_bottom,#FF465520_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] hover:text-[#ECE8E1] text-xs font-black tracking-widest" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO INTEL
        </Link>

        <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: post.color }} />
          <div className="relative bg-[#0F1923] overflow-hidden" style={{ clipPath: CLIP_CARD }}>
            <div className="relative h-[320px] w-full overflow-hidden">
              <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-white text-[11px] font-black tracking-widest" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>{post.category.toUpperCase()}</div>
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                <Calendar className="w-3 h-3 text-[#FF4655]" /> {post.date.toUpperCase()} <span className="w-1 h-1 bg-[#1e2d3a]" /> <Clock className="w-3 h-3" /> {post.readTime.toUpperCase()} <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[#768079]"><Crosshair className="w-3 h-3 text-[#FF4655]/60" /> TACTICAL READ</span>
              </div>
              <h1 className="text-3xl md:text-4xl leading-tight" style={{ fontFamily: "var(--font-anton)" }}>{post.title}</h1>
              <div className="h-[2px] w-12" style={{ background: post.color }} />
              <div className="space-y-4 text-sm leading-relaxed text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
                {post.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pt-4 flex gap-2">
                <Link href="/contact" className="px-5 py-2.5 bg-[#FF4655] text-white text-xs font-black tracking-widest hover:bg-[#e03a49] transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>REQUEST DOSSIER</Link>
                <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="px-5 py-2.5 bg-[#0a131c] border border-[#1e2d3a] text-[#768079] text-xs font-black tracking-widest hover:text-[#ECE8E1] inline-flex items-center gap-2" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}><Share2 className="w-3.5 h-3.5" /> SHARE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
