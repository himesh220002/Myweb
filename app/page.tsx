"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Cpu, Globe, Rocket, Shield, Smartphone, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import RoadmapSection from "@/components/RoadmapSection";


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
  const [basePlan, setBasePlan] = useState<"startup" | "growth" | "enterprise">("growth");
  const [pages, setPages] = useState(5);

  const prices = { startup: 2500, growth: 5000, enterprise: 10000 };
  const pageCost = 150;
  const estimate = prices[basePlan] + (pages * pageCost);

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 pt-32 pb-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/hero_bg.png" alt="Modern Architecture" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mx-auto"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Top Rated Digital Agency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-extrabold tracking-tight leading-[1.05] text-slate-900"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            We build high-performance web applications, striking interfaces, and scalable systems for companies ready to dominate their digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-slate-900/20">
              Start a Project
            </Link>
            <Link href="/projects" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-sm">
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

          {/* Left Text */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">
                Transparent <span className="text-primary">Pricing</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Calculate your investment interactively or submit a customized request. We partner with elite businesses to deliver massive ROI.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="pt-8 border-t border-slate-200 flex flex-col gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-900 font-bold italic">"CypherTech delivered our platform under budget and transformed our business metrics instantly."</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">— VP of Engineering, TechFlow</p>
            </Reveal>
          </div>

          {/* Right Estimator Tool */}
          <Reveal delay={0.3} className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

              <h3 className="text-2xl font-bold mb-8 text-slate-900">Project Estimator</h3>

              <div className="space-y-8">
                {/* Plan Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Base Architecture</label>
                  <div className="grid grid-cols-3 gap-4">
                    {["startup", "growth", "enterprise"].map((plan) => (
                      <button
                        key={plan}
                        onClick={() => setBasePlan(plan as any)}
                        className={cn(
                          "px-4 py-4 rounded-2xl border text-sm font-bold capitalize transition-all",
                          basePlan === plan
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 shadow-sm"
                        )}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Platform Scale (Pages/Views)</label>
                    <span className="text-xl font-bold text-slate-900">{pages}</span>
                  </div>
                  <input
                    type="range" min="1" max="50" value={pages} onChange={(e) => setPages(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Result */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated Investment</p>
                    <p className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">
                      ${estimate.toLocaleString()}
                    </p>
                  </div>
                  <Link href="/contact" className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all text-center">
                    Request Formal Quote
                  </Link>
                </div>
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
                  <img src="https://api.dicebear.com/9.x/adventurer/svg?seed=AnimeHero&backgroundColor=e2e8f0" alt="Himesh Satyam" className="absolute inset-0 w-full h-full object-cover p-4" />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

    </div>
  );
}
