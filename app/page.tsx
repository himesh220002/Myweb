"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, Zap, ShieldCheck, Layout, Globe, Clock, Box, Play, Star } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

// Minimal animated wrapper for sections
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-primary/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-6 pt-32 pb-24 overflow-hidden">
        {/* Subtle mesh & orbs for depth */}
        <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
        <div className="orb orb-primary w-[600px] h-[600px] -top-20 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none mix-blend-screen" />
        
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-gray-300">Available for new projects in 2026</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold leading-[1.05] tracking-tight text-white"
          >
            Crafting Digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
              Masterpieces.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl font-medium leading-relaxed"
          >
            We are a premium structural engineering and design agency. We transform complex logic into flawlessly executed, high-conversion web platforms.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link href="/projects" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              Explore Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#contact" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold text-sm transition-all hover:bg-white/10">
              <Play className="w-4 h-4 fill-white" />
              Start a Project
            </Link>
          </motion.div>
        </div>
        
        {/* Subtle scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
      </section>

      {/* --- BENTO GRID CAPABILITIES --- */}
      <section className="px-6 py-32 relative border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto space-y-16">
          <Reveal className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Engineered for <span className="text-primary">Performance.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Every pixel, every route, and every database query is optimized for speed, scale, and extreme visual fidelity.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[280px]">
            {/* Bento Item 1: Large Span */}
            <Reveal delay={0.1} className="md:col-span-2 md:row-span-2 group">
              <div className="h-full w-full rounded-[2rem] glass-card p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Lightning Fast Architecture</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    We utilize Next.js App Router, React Server Components, and Edge computing to deliver sub-100ms load times globally. Uncompromised speed.
                  </p>
                </div>
                {/* Abstract visualization */}
                <div className="relative h-32 mt-8 rounded-xl border border-white/5 bg-[#080808] overflow-hidden flex items-end px-4 gap-2">
                  {[40, 70, 45, 90, 65, 100, 85].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t-sm"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Bento Item 2 */}
            <Reveal delay={0.2} className="md:col-span-2 md:row-span-1 group">
              <div className="h-full w-full rounded-[2rem] glass-card p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[50px] group-hover:bg-secondary/20 transition-colors duration-500" />
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">Bespoke UI/UX Design</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Hand-crafted, highly interactive interfaces utilizing Framer Motion and custom CSS architecture. We don't use templates.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 3 */}
            <Reveal delay={0.3} className="md:col-span-1 md:row-span-1 group">
              <div className="h-full w-full rounded-[2rem] glass-card p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <ShieldCheck className="w-8 h-8 text-violet-400" />
                  <h3 className="text-lg font-bold">Enterprise Security</h3>
                  <p className="text-xs text-gray-500">Zero-trust architecture, robust OAuth, and strict data validation layers.</p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 4 */}
            <Reveal delay={0.4} className="md:col-span-1 md:row-span-1 group">
              <div className="h-full w-full rounded-[2rem] glass-card p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <Globe className="w-8 h-8 text-green-400" />
                  <h3 className="text-lg font-bold">Global SEO</h3>
                  <p className="text-xs text-gray-500">Advanced JSON-LD schemas and metadata tuning for maximum search visibility.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- FEATURED WORK (BENTO STYLE) --- */}
      <section className="px-6 py-32 relative border-t border-white/5 bg-[#000000]">
        <div className="orb orb-violet w-[500px] h-[500px] top-40 right-0 opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <Reveal className="space-y-4 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Selected <span className="text-secondary">Work.</span>
              </h2>
              <p className="text-gray-400 text-lg">
                A curated selection of our finest technical achievements. Built to scale, designed to convert.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Massive Featured Project */}
            {featuredProjects[0] && (
              <Reveal delay={0.1} className="md:col-span-12 group cursor-pointer block">
                <Link href={`/projects/${featuredProjects[0].slug}`} className="block relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/10">
                  <img src={featuredProjects[0].image} alt={featuredProjects[0].title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-3xl">
                      <div className="flex gap-2">
                        {featuredProjects[0].tags.slice(0, 3).map(t => (
                          <span key={t} className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/10">{t}</span>
                        ))}
                      </div>
                      <h3 className="text-4xl md:text-6xl font-display font-bold">{featuredProjects[0].title}</h3>
                      <p className="text-gray-300 md:text-lg max-w-xl">{featuredProjects[0].description}</p>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Smaller Featured Projects */}
            {featuredProjects.slice(1, 4).map((proj, idx) => (
              <Reveal key={proj.id} delay={0.2 + (idx * 0.1)} className="md:col-span-4 group cursor-pointer block">
                <Link href={`/projects/${proj.slug}`} className="block relative h-[400px] w-full rounded-[2rem] overflow-hidden border border-white/10">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-primary">{proj.category.split(" / ")[0]}</span>
                      <h3 className="text-2xl font-display font-bold">{proj.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{proj.description}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM CTA / CONTACT --- */}
      <section id="contact" className="px-6 py-32 relative border-t border-white/5 bg-[#030303] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1a2e_0%,#030303_70%)] pointer-events-none opacity-50" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10">
          <Reveal className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Scale?</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              We have capacity for 3 new enterprise-grade projects this quarter. <br className="hidden md:block" />
              Let's discuss architecture, timelines, and execution.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:hello@cyphertech.com" className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-black font-bold text-sm transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/projects" className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-white/10 bg-white/5 text-white font-bold text-sm transition-all hover:bg-white/10">
              Review Portfolio
            </Link>
          </Reveal>

          {/* Social Proof minimal */}
          <Reveal delay={0.3} className="pt-16 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Rated 5.0 by 20+ global teams
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
