"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Cpu, Globe, Rocket, Shield, Smartphone, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import RoadmapSection from "@/components/RoadmapSection";
import StarWarGame from "@/components/StarWar/StarWarGame";
import PathTravelerShip from "@/components/PathTravelerShip";


const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [basePlan, setBasePlan] = useState<"startup" | "growth" | "enterprise">("startup");
  const [scope, setScope] = useState(60); // Target monthly users in thousands (10k to 150k)

  const planConfig = {
    startup: { name: 'Startup', baseCost: 500, multiplier: 15, lift: 18, roiMultiplier: 2.4, features: ["Custom UI Design", "Core Database Integration", "Basic Security Pack", "Standard Load Times"] },
    growth: { name: 'Growth', baseCost: 1200, multiplier: 25, lift: 32, roiMultiplier: 3.1, features: ["Advanced multi-funnel flow design", "High-scale operational bandwidth", "Automated growth trigger funnels", "Priority load time tuning (<1.2s)"] },
    enterprise: { name: 'Enterprise', baseCost: 3500, multiplier: 45, lift: 45, roiMultiplier: 4.2, features: ["Dedicated DevOps Infrastructure", "Zero-downtime SLA Guarantee", "Custom Machine Learning Models", "Global Edge CDN Caching"] },
  };

  const currentPlan = planConfig[basePlan];

  // 2. Accurate Financial Formulas
  const budget = currentPlan.baseCost + (scope * currentPlan.multiplier);
  const liftPercent = currentPlan.lift;
  const projectedRoi = Math.floor(budget * currentPlan.roiMultiplier);

  // 3. Perfect SVG Math Blueprint
  // Map x-range (10 to 150) straight onto the SVG view width (0 to 200)
  const svgX = ((scope - 10) / (150 - 10)) * 200;

  // Map budget range ($500 to $11k) onto the inverted SVG view height (100 to 0)
  const getSvgY = (calculatedBudget: number) => {
    const minBudget = 500;
    const maxBudget = 11000;
    const percentage = (calculatedBudget - minBudget) / (maxBudget - minBudget);
    return 100 - (percentage * 100);
  };

  const svgY = getSvgY(budget);

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30">
      <PathTravelerShip />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 pt-32 pb-24 overflow-hidden bg-slate-50">

        {/* Advanced Background Design */}
        {/* 1. Base Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* 2. Abstract Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply" />

        {/* Floating Abstract Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[5%] xl:left-[10%] hidden lg:block z-0"
        >
          <div className="w-24 h-24 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl flex items-center justify-center rotate-12">
            <Code2 className="w-10 h-10 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[5%] xl:right-[10%] hidden lg:block z-0"
        >
          <div className="w-28 h-28 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl flex items-center justify-center -rotate-12">
            <Globe className="w-12 h-12 text-indigo-500" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-10">

          {/* Premium Glass Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-slate-200/50 shadow-[0_8px_16px_rgb(0_0_0_/_0.05)] mx-auto relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 drop-shadow-sm" />
            <span className="text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">Elite Digital Agency</span>
          </motion.div>

          {/* Hero Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[7.5rem] font-display font-extrabold tracking-tight leading-[1.05] text-slate-900 relative"
          >
            Engineering <br className="hidden md:block" />
            <span className="relative inline-block mt-4 md:mt-0">
              <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 blur-2xl opacity-20" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-blue-600 via-red-700 to-purple-700">Avengers</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            We build high-performance web applications, striking interfaces, and scalable systems for companies ready to dominate their digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link href="/contact" className="group relative w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg transition-all shadow-[0_10px_40px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_50px_rgba(15,23,42,0.4)] hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/projects" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-center">
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- ROADMAP / PROCESS SECTION --- */}
      <RoadmapSection />

      {/* --- WHY CHOOSE US (BENTO GRID) --- */}
      <section className="px-6 py-32 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CypherTech</span> Advantage
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              We combine elite engineering with stunning, conversion-optimized design to deliver digital products that dominate your market.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8 h-auto md:h-[600px]">
            {/* Bento Item 1: Large Span */}
            <Reveal delay={0.1} className="md:col-span-2 md:row-span-2">
              <div className="group relative h-full w-full rounded-[2.5rem] bg-[#0a0a0f] p-10 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] border border-slate-800 hover:border-blue-500/30">
                {/* Abstract grid & glow */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[120px] group-hover:bg-blue-600/30 transition-colors duration-700" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[1px] mb-8 shadow-lg shadow-blue-500/20">
                    <div className="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 max-w-lg mt-auto">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">Blazing Fast Performance</h3>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                    Our Next.js server-rendered architecture ensures sub-second load times, dramatically improving your SEO rankings and user retention rates.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 2 */}
            <Reveal delay={0.2} className="md:col-span-1 md:row-span-1">
              <div className="group relative h-full w-full rounded-[2.5rem] bg-white border border-slate-200 p-8 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 hover:border-pink-500/30">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-[60px] group-hover:bg-pink-500/20 transition-colors duration-700" />

                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 p-[1px] mb-6 shadow-md shadow-pink-500/10">
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-pink-500 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-pink-600 transition-colors duration-500">Premium UI/UX</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Award-winning design systems with glassmorphism and micro-interactions built for absolute engagement.</p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 3 */}
            <Reveal delay={0.3} className="md:col-span-1 md:row-span-1">
              <div className="group relative h-full w-full rounded-[2.5rem] bg-white border border-slate-200 p-8 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-500/30">
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-colors duration-700" />

                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-[1px] mb-6 shadow-md shadow-emerald-500/10">
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors duration-500">Enterprise Security</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Bank-grade encryption, OAuth authentication, and secure API layers out of the box.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- ESTIMATOR / REQUEST A QUOTE --- */}
      <section id="estimator" className="px-6 py-32 relative border-t border-slate-200 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-start">

          {/* Left Text */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">
                Transformational <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ROI</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Calculate your investment interactively and see exactly what you get. We partner with elite businesses to deliver massive, measurable business lift.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="pt-8 border-t border-slate-200 flex flex-col gap-4">
              <div className="flex items-center gap-1 text-blue-600">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-900 font-bold text-xl italic leading-relaxed">
                "CypherTech digitalized our manual booking system, saving our team 15 hours a week and doubling our client bookings in under two months."
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                  <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Sarah" alt="Sarah" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Sarah Jenkins</p>
                  <p className="text-sm font-medium text-slate-500">Operations Director</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Estimator Tool */}
          <Reveal delay={0.3} className="lg:col-span-7">
            <div className="bg-[#1a1c23] rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden text-slate-300 font-sans border border-slate-800/60">

              {/* Highly Optimized SVG Live Chart Area */}
              <div className="h-[280px] w-[calc(100%-3rem)] ml-4 relative mb-12 border-b border-l border-slate-800/80 pr-2 pt-4 pb-4 mt-4">
                <svg className="w-full h-full overflow-visible text-slate-500 font-sans" preserveAspectRatio="none" viewBox="0 0 200 100">

                  {/* Y-Axis Value Indicators */}
                  <text x="-4" y="0" fill="currentColor" fontSize="4.5" textAnchor="end" alignmentBaseline="middle">$11k</text>
                  <text x="-4" y="33.3" fill="currentColor" fontSize="4.5" textAnchor="end" alignmentBaseline="middle">$7.5k</text>
                  <text x="-4" y="66.6" fill="currentColor" fontSize="4.5" textAnchor="end" alignmentBaseline="middle">$4k</text>
                  <text x="-4" y="100" fill="currentColor" fontSize="4.5" textAnchor="end" alignmentBaseline="middle">$500</text>

                  {/* X-Axis Value Indicators */}
                  <text x="0" y="112" fill="currentColor" fontSize="4.5" textAnchor="middle">10k users</text>
                  <text x="100" y="112" fill="currentColor" fontSize="4.5" textAnchor="middle">80k users</text>
                  <text x="200" y="112" fill="currentColor" fontSize="4.5" textAnchor="middle">150k users</text>

                  {/* Static Grid Layer */}
                  <line x1="0" y1="0" x2="200" y2="0" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.4" />
                  <line x1="0" y1="33.3" x2="200" y2="33.3" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.4" />
                  <line x1="0" y1="66.6" x2="200" y2="66.6" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.4" />

                  <line x1="0" y1="0" x2="0" y2="100" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.2" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.2" />
                  <line x1="200" y1="0" x2="200" y2="100" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.2" />

                  {/* Inactive Structural Comparison Paths */}
                  {/* Startup Path */}
                  <path d={`M0,${getSvgY(planConfig.startup.baseCost + (10 * planConfig.startup.multiplier))} L200,${getSvgY(planConfig.startup.baseCost + (150 * planConfig.startup.multiplier))}`} fill="none" stroke="#6366f1" strokeWidth="0.75" opacity="0.25" />
                  {/* Growth Path */}
                  <path d={`M0,${getSvgY(planConfig.growth.baseCost + (10 * planConfig.growth.multiplier))} L200,${getSvgY(planConfig.growth.baseCost + (150 * planConfig.growth.multiplier))}`} fill="none" stroke="#10b981" strokeWidth="0.75" opacity="0.25" />
                  {/* Enterprise Path */}
                  <path d={`M0,${getSvgY(planConfig.enterprise.baseCost + (10 * planConfig.enterprise.multiplier))} L200,${getSvgY(planConfig.enterprise.baseCost + (150 * planConfig.enterprise.multiplier))}`} fill="none" stroke="#f59e0b" strokeWidth="0.75" opacity="0.25" />

                  {/* Main Dynamic Active Focus Line */}
                  <path
                    d={`M0,${getSvgY(currentPlan.baseCost + (10 * currentPlan.multiplier))} L200,${getSvgY(currentPlan.baseCost + (150 * currentPlan.multiplier))}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    style={{ transition: 'd 0.3s ease' }}
                  />

                  {/* Self-Anchoring Graph Target Crosshair & Node Marker */}
                  <g style={{ transform: `translate(${svgX}px, ${svgY}px)`, transition: 'transform 0.15s ease-out' }}>
                    {/* Horizontal Crosshair Ray */}
                    <line x1={-svgX} y1="0" x2={200 - svgX} y2="0" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                    {/* Vertical Crosshair Ray */}
                    <line x1="0" y1={-svgY} x2="0" y2={100 - svgY} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />

                    {/* Core High-Contrast Target Point */}
                    <circle cx="0" cy="0" r="4" fill="#3b82f6" stroke="#1a1c23" strokeWidth="2" />

                    {/* Context-Aware Floating Information Label */}
                    <g transform={`translate(${svgX > 120 ? -65 : 10}, ${svgY > 80 ? -12 : 12})`}>
                      <rect width="60" height="14" rx="4" fill="#272a35" stroke="#3b82f6" strokeWidth="0.5" opacity="0.95" />
                      <text x="30" y="8" fill="#f8fafc" fontSize="4.5" fontWeight="700" textAnchor="middle" alignmentBaseline="middle">
                        {currentPlan.name} Scale
                      </text>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pb-8 mb-8 border-b border-slate-800/80 text-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Project budget</p>
                  <p className="text-xl md:text-2xl font-bold text-white">${budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Business lift</p>
                  <p className="text-xl md:text-2xl font-bold text-emerald-400">+{liftPercent}% lift</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Projected ROI</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-500">${projectedRoi.toLocaleString()}</p>
                </div>
              </div>

              {/* Framework Selector */}
              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select operation scale framework</label>
                <div className="flex bg-[#272a35] rounded-full p-1 border border-slate-700/50">
                  {(["startup", "growth", "enterprise"] as const).map(p => (
                    <button key={p} onClick={() => setBasePlan(p)} className={`flex-1 py-2 rounded-full text-sm font-bold capitalize transition-all duration-300 ${basePlan === p ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adjust target monthly users</label>
                  <span className="text-sm font-bold text-white">{scope}k users</span>
                </div>
                <input
                  type="range" min="10" max="150" value={scope} onChange={(e) => setScope(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Features & Deliverables */}
              <div className="bg-[#272a35]/40 rounded-xl p-5 mb-8 border border-slate-800/80">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Included Features & Deliverables</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  {currentPlan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-[10px] text-slate-400 font-medium space-y-1.5">
                  <p className="font-bold text-slate-300 uppercase tracking-widest mb-2">Trusted validation performance</p>
                  <p><span className="text-blue-500 text-sm leading-none mr-1">•</span> Vortex Analytics: $2.4M pipeline added</p>
                  <p><span className="text-blue-500 text-sm leading-none mr-1">•</span> Acme Scale: +34% checkout efficiency</p>
                  <p><span className="text-blue-500 text-sm leading-none mr-1">•</span> CloudFlow: Launched platform in 14 days</p>
                </div>

                <Link href="/contact" className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2">
                  Initialize Project Scope <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* --- EXPANDED SECTIONS: TESTIMONIALS & BLOG & ABOUT ME --- */}
      <section className="px-6 py-32 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto space-y-32">

          {/* Testimonials */}
          <div>
            <Reveal className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">
                Don't just take <span className="text-primary">our word for it.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "CypherTech completely transformed our digital presence. The new architecture is blazing fast, and our conversion rates have doubled since launch.",
                  author: "Sarah Jenkins",
                  role: "Director of E-Commerce",
                  image: "/testimonial_1.png"
                },
                {
                  quote: "Himesh is not just a developer; he's a strategic partner. He understood our business goals immediately and engineered a solution that perfectly aligned with them.",
                  author: "David Chen",
                  role: "Founder, TechFlow AI",
                  image: "/testimonial_2.png"
                },
                {
                  quote: "The attention to detail in the UI/UX is unmatched. They delivered a product that looks incredible and functions flawlessly under heavy load.",
                  author: "Marcus Thorne",
                  role: "CTO, Global Logistics",
                  image: "/testimonial_3.png"
                }
              ].map((t, i) => (
                <Reveal key={i} delay={i * 0.2}>
                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 relative shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <div className="text-4xl text-primary/20 absolute top-6 right-8 font-serif">"</div>
                    <p className="text-slate-700 font-medium leading-relaxed text-lg mb-8 relative z-10">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full border border-slate-200 object-cover" />
                      <div>
                        <p className="text-slate-900 font-bold">{t.author}</p>
                        <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Blog / Insights */}
          <div>
            <Reveal className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mb-4">Latest Insights</h2>
                <p className="text-slate-600 font-medium">Thoughts on engineering, design, and building the future.</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all">
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  category: "Engineering",
                  title: "Why React Server Components are the Future of E-Commerce",
                  date: "Oct 12, 2026",
                  readTime: "5 min read",
                  image: "/blog_1.png"
                },
                {
                  category: "Design",
                  title: "The Psychology of Micro-Interactions in SaaS Dashboards",
                  date: "Sep 28, 2026",
                  readTime: "4 min read",
                  image: "/blog_2.png"
                },
                {
                  category: "Strategy",
                  title: "Scaling Your Agency: When to Transition from Freelancer to Firm",
                  date: "Sep 15, 2026",
                  readTime: "7 min read",
                  image: "/blog_3.png"
                }
              ].map((post, i) => (
                <Reveal key={i} delay={i * 0.2}>
                  <Link href="#" className="group block bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-700" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                        <span>{post.date}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* About Me Section */}
          <div>
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">
                  Hi, I'm <span className="text-primary">Himesh.</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  I'm a full-stack engineer and designer dedicated to building the intersection of robust backend architecture and stunning front-end user experiences.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  With deep expertise in Next.js, Node, and cloud infrastructure, I partner with companies to turn complex requirements into elegant, high-performance digital products.
                </p>
                <div className="pt-4 flex gap-4">
                  <Link href="/about" className="px-8 py-4 bg-slate-100 text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                    Read My Story
                  </Link>
                  <Link href="/contact" className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg shadow-slate-900/20 hover:scale-105 transition-all">
                    Let's Connect
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[3rem] blur-xl opacity-50" />
                <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border border-slate-200 bg-slate-50 shadow-2xl">
                  <img src="https://static0.srcdn.com/wordpress/wp-content/uploads/2025/11/okabe-steins-gate.jpg?w=1600&h=1200&fit=crop" alt="Himesh Satyam" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* --- MINI GAME SECTION --- */}
      <section className="hidden lg:block px-6 py-32 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <Reveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
              Play<span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-800">Z</span>one
            </h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              Try out StarWarZ, a fully functioning HTML5 canvas game built directly into this page.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <StarWarGame />
          </Reveal>
        </div>
      </section>

    </div>
  );
}
