import Link from "next/link";
import { Mail, MapPin, Phone, Crosshair, ShieldCheck, Radio } from "lucide-react";
import { Anton, Rajdhani, JetBrains_Mono, Bebas_Neue } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const rajdhani = Rajdhani({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-raj" });
const jetmono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

function CornerBrackets({ color = "rgba(255,70,85,0.85)" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
    </>
  );
}

export default function Footer() {
  return (
    <footer
      className={`${anton.variable} ${bebas.variable} ${rajdhani.variable} ${jetmono.variable} relative bg-[#0F1923] text-[#ECE8E1] mx-2 sm:mx-4 2xl:mx-10 mt-10 overflow-hidden border border-[#1e2d3a]`}
      style={{ clipPath: CLIP_CARD }}
    >
      {/* top valorant rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-20" />
      {/* diagonal hazard watermark */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ background: "repeating-linear-gradient(-45deg, #ECE8E1 0 1px, transparent 1px 24px)" }}
      />
      <div className="absolute -right-20 -top-20 w-[420px] h-[420px] bg-[#FF4655]/[0.06] blur-[60px] rotate-12 pointer-events-none" />

      {/* inner */}
      <div className="relative px-6 sm:px-8 lg:px-10 py-12 lg:py-14" style={{ clipPath: CLIP_CARD }}>
        <CornerBrackets color="rgba(255,70,85,0.35)" />

        {/* HUD header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-6 border-b border-[#1e2d3a]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#FF4655] animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] text-[#FF4655] font-black" style={{ fontFamily: "var(--font-mono)" }}>
              // FOOTER // VLR-HQ // SECTOR-09
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079] border border-[#1e2d3a] px-2.5 py-1 bg-[#0a131c]" style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}>
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> SYSTEM ONLINE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
            <Crosshair className="w-3.5 h-3.5 text-[#FF4655]/70" /> CYPHER TECH // EST. 2026
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* BRAND */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div
                  className="relative w-10 h-10 md:w-11 md:h-11 bg-[#000] flex items-center justify-center shrink-0 border border-[#FF4655] group-hover:bg-[#e03a49] group-hover:border-[#e03a49] transition-colors shadow-[0_0_12px_rgba(255,70,85,0.35)] overflow-hidden"
                  style={{ clipPath: CLIP_BTN }}
                >
                  <img src="/hexagon-alien.png" alt="CypherTech Logo" className="w-full h-full object-contain p-1" />
                </div>
                <h2 className="text-3xl md:text-4xl leading-none tracking-tight" style={{ fontFamily: "var(--font-anton)" }}>
                  <span className="text-[#ECE8E1]">CYPHER</span>
                  <span className="text-[#FF4655]">TECH</span>
                </h2>
              </Link>
              <div className="h-[2px] w-16 bg-[#FF4655]" />
              <p className="text-sm leading-relaxed text-[#768079] max-w-md" style={{ fontFamily: "var(--font-raj)" }}>
                Building high-performance digital products that scale and delight. Valorant-grade precision for elite teams.
              </p>
            </div>

            <div className="flex gap-2.5 pt-1">
              {[
                { href: "https://github.com/himesh220002", label: "GH", svg: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                { href: "https://x.com/CypherHarley", label: "X", svg: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { href: "https://www.linkedin.com/in/himesh", label: "IN", svg: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 bg-[#0a131c] border border-[#1e2d3a] flex items-center justify-center text-[#ECE8E1] hover:bg-[#FF4655] hover:text-white hover:border-[#FF4655] transition-colors"
                  style={{ clipPath: CLIP_BTN }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d={s.svg} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#768079] border border-[#1e2d3a] bg-[#0a131c] px-3 py-2" style={{ fontFamily: "var(--font-mono)", clipPath: CLIP_BTN }}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ANTI-CHEAT // VERIFIED SQUAD
            </div>
          </div>

          {/* COMPANY */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black tracking-[0.18em] text-[#FF4655] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1 h-3 bg-[#FF4655]" /> // COMPANY
            </h3>
            <ul className="space-y-2.5" style={{ fontFamily: "var(--font-raj)" }}>
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/projects", label: "Portfolio" },
                { href: "/career", label: "Careers" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-[#768079] hover:text-[#ECE8E1] transition-colors">
                    <span className="w-1 h-1 bg-[#FF4655] opacity-0 group-hover:opacity-100 transition-opacity" /> {l.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black tracking-[0.18em] text-[#00E5FF] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1 h-3 bg-[#00E5FF]" /> // RESOURCES
            </h3>
            <ul className="space-y-2.5" style={{ fontFamily: "var(--font-raj)" }}>
              {[
                { href: "/blog", label: "Blog" },
                { href: "/skills", label: "Skills & Tech" },
                { href: "/clients", label: "Clients" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-[#768079] hover:text-[#ECE8E1] transition-colors">
                    <span className="w-1 h-1 bg-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" /> {l.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT — dossier */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black tracking-[0.18em] text-[#ECE8E1] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-1 h-3 bg-[#ECE8E1]" /> // COMMS // GET IN TOUCH
            </h3>
            <div className="space-y-2.5">
              {[
                { Icon: Mail, text: "satyamhimesh@gmail.com", sub: "COMMS // PRIMARY" },
                { Icon: Phone, text: "+91-8105542318", sub: "TAC-LINE // SECURE" },
                { Icon: MapPin, text: "Remote Worldwide", sub: "GLOBAL // DEPLOYMENT" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-3 bg-[#0a131c] border border-[#1e2d3a] px-3 py-3" style={{ clipPath: CLIP_BTN }}>
                  <div className="w-8 h-8 bg-[#FF4655] flex items-center justify-center shrink-0" style={{ clipPath: CLIP_BTN }}>
                    <c.Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wide text-[#ECE8E1]" style={{ fontFamily: "var(--font-raj)" }}>{c.text}</p>
                    <p className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1e2d3a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> © {new Date().getFullYear()} CYPHERTECH // ALL RIGHTS RESERVED // VLR-09
          </p>
          <div className="flex gap-4 text-[11px] font-black tracking-[0.14em]" style={{ fontFamily: "var(--font-mono)" }}>
            <Link href="/privacy" className="text-[#768079] hover:text-[#ECE8E1] transition-colors border border-transparent hover:border-[#1e2d3a] px-2 py-1" style={{ clipPath: CLIP_BTN }}>
              PRIVACY PROTOCOL
            </Link>
            <Link href="/terms" className="text-[#768079] hover:text-[#ECE8E1] transition-colors border border-transparent hover:border-[#1e2d3a] px-2 py-1" style={{ clipPath: CLIP_BTN }}>
              TERMS OF ENGAGEMENT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
