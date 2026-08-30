import React from 'react';
import {
  Lightbulb,
  Layout,
  Server,
  Database,
  Link as LinkIcon,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Cpu,
  RefreshCw,
  Crosshair,
  Target,
  Radio,
} from 'lucide-react';
import { Anton, Rajdhani, JetBrains_Mono } from 'next/font/google';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const rajdhani = Rajdhani({ weight: ['500', '600', '700'], subsets: ['latin'], variable: '--font-raj' });
const jetmono = JetBrains_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' });

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

const roadmapPhases = [
  {
    id: 1,
    title: "DISCOVERY // STRATEGY",
    description: "Deep dive into business logic, user flows, and product architecture. We blueprint the entire operation before a single line of code.",
    icon: <Lightbulb className="w-5 h-5" />,
    tech: ["Figma", "Miro", "Notion"],
    color: "#FF4655",
    duration: "3-4 DAYS",
    output: "PRD • SITEMAP • STACK",
    extra: ["2× stakeholder workshops", "User journey maps + edge cases", "Tech risk matrix + estimate lock"],
  },
  {
    id: 2,
    title: "UI/UX // DESIGN",
    description: "Striking, accessible, high-conversion interfaces. Micro-interactions and tactical HUDs for premium feel.",
    icon: <Layout className="w-5 h-5" />,
    tech: ["Framer", "Tailwind", "Adobe CC"],
    color: "#00E5FF",
    duration: "5-7 DAYS",
    output: "HUD KIT • PROTOTYPE",
    extra: ["Clickable Figma prototype 60fps", "Design tokens + clipped HUD system", "A11y + responsive stress test"],
  },
  {
    id: 3,
    title: "FRONTEND // ARCH",
    description: "Blazing-fast, server-rendered apps — instant loads, buttery interactions, Valorant-grade responsiveness.",
    icon: <Cpu className="w-5 h-5" />,
    tech: ["Next.js", "React", "TypeScript"],
    color: "#FF4655",
    duration: "1-2 WEEKS",
    output: "SSR • ISR • PWA",
    extra: ["Streaming SSR + edge cache", "Framer Motion HUD directives", "Lighthouse 98+ locked"],
  },
  {
    id: 4,
    title: "BACKEND // SYSTEMS",
    description: "Robust, scalable services handling millions of requests with complex logic and real-time processing.",
    icon: <Server className="w-5 h-5" />,
    tech: ["Node.js", "Python", "Go"],
    color: "#FFD700",
    duration: "1-2 WEEKS",
    output: "API • MICROSERVICES",
    extra: ["REST + GraphQL type-safe", "Real-time sockets / queues", "Rate-limit + idempotency"],
  },
  {
    id: 5,
    title: "DATA // CACHE",
    description: "High-performance data layers — optimal indexing, relational modeling, in-memory cache for lightning queries.",
    icon: <Database className="w-5 h-5" />,
    tech: ["PostgreSQL", "MongoDB", "Redis"],
    color: "#00E5FF",
    duration: "3-5 DAYS",
    output: "SCHEMA • INDEX • CACHE",
    extra: ["Query <40ms p95", "Redis hot-path cache", "Backups + point-in-time"],
  },
  {
    id: 6,
    title: "API // INTEGRATIONS",
    description: "Secure, type-safe APIs connecting payments, AI models, and third-party squads.",
    icon: <LinkIcon className="w-5 h-5" />,
    tech: ["GraphQL", "REST", "OpenAI"],
    color: "#FF4655",
    duration: "4-6 DAYS",
    output: "WEBHOOKS • OAUTH",
    extra: ["Stripe + auth flows", "OpenAI / vector search", "Webhook replay + logs"],
  },
  {
    id: 7,
    title: "DEVOPS // CLOUD",
    description: "Containerized, CI/CD zero-downtime deployments to enterprise cloud battlefields.",
    icon: <Cloud className="w-5 h-5" />,
    tech: ["Docker", "AWS", "GitHub Actions"],
    color: "#B14AFF",
    duration: "2-3 DAYS",
    output: "DOCKER • CI/CD • EDGE",
    extra: ["Zero-downtime blue/green", "Preview env per PR", "Observability + alerts"],
  },
  {
    id: 8,
    title: "SECURITY // TESTING",
    description: "Bank-grade encryption, OAuth, and rigorous automated testing — anti-cheat for your platform.",
    icon: <ShieldCheck className="w-5 h-5" />,
    tech: ["Cypress", "Jest", "JWT"],
    color: "#00E5FF",
    duration: "CONTINUOUS",
    output: "JWT • VAULT • TESTS",
    extra: ["Pen-test + OWASP checklist", "E2E + unit 80%+", "Secret vault + rotation"],
  },
  {
    id: 9,
    title: "SEO // ANALYTICS",
    description: "Core Web Vitals tuned, dynamic metadata injected — dominate search, track every movement.",
    icon: <TrendingUp className="w-5 h-5" />,
    tech: ["Next SEO", "Lighthouse", "Mixpanel"],
    color: "#FFD700",
    duration: "2-4 DAYS",
    output: "SITEMAP • SCHEMA • CWV",
    extra: ["Programmatic SEO 10k pages", "Pillar + schema markup", "Mixpanel funnels"],
  },
  {
    id: 10,
    title: "SCALE // MAINTENANCE",
    description: "Continuous monitoring, backups, and proactive scaling to handle exponential agent influx.",
    icon: <RefreshCw className="w-5 h-5" />,
    tech: ["Datadog", "Sentry", "Kubernetes"],
    color: "#FF4655",
    duration: "ONGOING",
    output: "K8S • SENTRY • ON-CALL",
    extra: ["Auto-scale HPA + CDN", "On-call + SLO 99.99%", "Weekly tactical review"],
  }
];

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

export default function RoadmapSection() {
  return (
    <section className={`${anton.variable} ${rajdhani.variable} ${jetmono.variable} relative w-full bg-[#0F1923] overflow-hidden selection:bg-[#FF4655]/30 border-y border-[#1e2d3a]`}>
      {/* top red rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-20" />
      {/* hazard stripes bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF465510_1px,transparent_1px),linear-gradient(to_bottom,#FF465510_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[24rem] bg-[#FF4655]/10 blur-[80px] rounded-full pointer-events-none" />

      {/* header */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4655] text-white text-[11px] font-black tracking-[0.18em]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
            <Radio className="w-3 h-3 animate-pulse" /> // OPERATION // ROADMAP
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
            <span className="text-[#ECE8E1]">OUR</span> <span className="text-[#FF4655]">PROCESS</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[2px] w-12 bg-[#FF4655]" />
            <p className="text-sm text-[#768079]" style={{ fontFamily: "var(--font-raj)" }}>
              From spark to global scale — the valorant-precision pipeline.
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {/* vertical spine */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#1e2d3a] -translate-x-1/2 hidden md:block" />
        {/* dotted snake overlay for valorant tac */}
        <div
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-32 -translate-x-1/2 pointer-events-none opacity-[0.18] hidden md:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='128' height='400' viewBox='0 0 128 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M64,0 C128,100 0,300 64,400' stroke='%23FF4655' stroke-width='2' stroke-dasharray='8,10' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% 400px'
          }}
        />

        <div className="space-y-8 md:space-y-10 relative z-10">
          {roadmapPhases.map((phase, index) => {
            const isRight = index % 2 === 0;
            return (
              <div
                key={phase.id}
                className={`relative flex flex-col md:flex-row items-center ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* center node — valorant spike */}
                <div className="absolute left-8 md:left-1/2 w-3 h-3 md:w-3.5 md:h-3.5 bg-[#FF4655] rotate-45 -translate-x-1/2 z-20 shadow-[0_0_12px_rgba(255,70,85,0.6)]">
                  <span className="absolute inset-[3px] bg-[#ECE8E1] rotate-45" />
                </div>
                {/* connector */}
                <div className={`hidden md:block absolute top-1/2 h-px bg-[#1e2d3a] w-12 lg:w-20 -translate-y-1/2 ${isRight ? "left-1/2" : "right-1/2"}`} />
                <div className={`hidden md:block absolute top-1/2 w-1.5 h-1.5 bg-[#FF4655] -translate-y-1/2 ${isRight ? "left-[calc(50%+3rem)] lg:left-[calc(50%+5rem)]" : "right-[calc(50%+3rem)] lg:right-[calc(50%+5rem)]"}`} />

                <div className="hidden md:flex w-1/2" />

                <div className={`w-full md:w-1/2 pl-14 md:pl-0 flex ${isRight ? "md:pl-12 lg:pl-20 justify-start" : "md:pr-12 lg:pr-20 justify-end"}`}>
                  <div className="relative w-full max-w-xl group/card">
                    {/* step badge */}
                    <div
                      className="absolute -top-3 left-6 md:left-auto z-30 px-3 py-1 text-white text-[11px] font-black tracking-[0.16em] flex items-center gap-1.5"
                      style={{ background: phase.color, color: phase.color === "#FFD700" ? "#0F1923" : "#fff", clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}
                    >
                      <Target className="w-3 h-3" /> STEP {phase.id.toString().padStart(2, "0")}
                    </div>

                    <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-visible group-hover/card:border-[#2e4154] group-hover/card:shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover/card:-translate-y-[2px] transition-all duration-300" style={{ clipPath: CLIP_CARD }}>
                      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: phase.color }} />
                      <div className="absolute top-0 left-[3px] right-0 h-[2px] opacity-70 group-hover/card:opacity-100 transition-opacity" style={{ background: phase.color }} />
                      <div className="relative bg-[#0F1923] p-6 md:p-7" style={{ clipPath: CLIP_CARD }}>
                        <CornerBrackets color={`${phase.color}66`} />
                        <div className="flex gap-4">
                          {/* icon with step animation — slight hover only, no layout push */}
                          <div className="shrink-0">
                            <div className="w-12 h-12 bg-[#0a131c] border border-[#1e2d3a] flex items-center justify-center text-[#ECE8E1] group-hover/card:text-white group-hover/card:scale-110 group-hover/card:rotate-[-6deg] group-hover/card:shadow-[0_0_12px_rgba(255,70,85,0.35)] transition-all duration-400" style={{ clipPath: CLIP_BTN, background: `${phase.color}18`, borderColor: `${phase.color}40`, color: phase.color }}>
                              {phase.icon}
                            </div>
                            <div className="mt-2 text-center">
                              <span className="inline-flex px-1.5 py-0.5 bg-[#0a131c] border border-[#1e2d3a] text-[9px] font-black tracking-widest text-[#768079] group-hover/card:text-[#ECE8E1] group-hover/card:border-[#FF4655]/40 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                                0{phase.id}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-black tracking-wide text-[#ECE8E1] group-hover/card:text-white transition-colors" style={{ fontFamily: "var(--font-raj)" }}>
                              {phase.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[#768079] mt-1.5" style={{ fontFamily: "var(--font-raj)" }}>
                              {phase.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {phase.tech.map((t) => (
                                <span key={t} className="px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[11px] font-bold tracking-wide text-[#768079] group-hover/card:border-[#FF4655]/20 transition-colors" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                                  {t.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-[#768079]/70 group-hover/card:text-[#FF4655]/80 transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
                          <Crosshair className="w-3 h-3" /> HOVER FOR DOSSIER
                          <span className="ml-auto w-1 h-1 bg-[#FF4655] opacity-0 group-hover/card:opacity-100 animate-pulse transition-opacity" />
                        </div>
                      </div>
                    </div>

                    {/* hover overlay — does NOT push siblings, slight lower drop only */}
                    <div className="absolute left-0 right-0 top-[calc(100%-10px)] z-20 opacity-0 translate-y-[-6px] pointer-events-none group-hover/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <div className="mx-[1px] bg-[#0F1923] border border-[#FF4655]/30 border-t-0 p-4 pt-5 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(255,70,85,0.15)] backdrop-blur-xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}>
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4655]" />
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a131c] border border-[#1e2d3a] text-[10px] font-black tracking-[0.14em] text-[#768079]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            <span className="w-1 h-1 bg-emerald-400 animate-pulse" /> {phase.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF4655]/10 border border-[#FF4655]/20 text-[10px] font-black tracking-[0.14em] text-[#FF4655]" style={{ clipPath: CLIP_BTN, fontFamily: "var(--font-mono)" }}>
                            {phase.output}
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {phase.extra.map((e) => (
                            <li key={e} className="flex items-start gap-2 text-xs leading-relaxed text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>
                              <span className="mt-1.5 w-1 h-1 bg-[#FF4655] shrink-0 rotate-45" />
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
                          <span className="flex-1 h-px bg-[#1e2d3a]" />
                          EXPANDED • TACTICAL DOSSIER
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* bottom fade — keep original white transition but valorant style: use #ECE8E1 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1e2d3a]" />
    </section>
  );
}
