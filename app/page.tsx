"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, ShieldCheck, Zap, Clock, Users } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";
import { useRef, useEffect, useState } from "react";

/* ── Animated counter hook ─────────────────────────────── */
function useCounter(target: number, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

/* ── Stat Card Component ──────────────────────────────── */
function StatCard({ value, suffix, label, icon: Icon, color, delay, started }: {
    value: number; suffix: string; label: string;
    icon: React.ElementType; color: string; delay: number; started: boolean;
}) {
    const count = useCounter(value, 2000, started);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={started ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative glass-card rounded-2xl p-5 float"
            style={{ animationDelay: `${delay}s` }}
        >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-4.5 h-4.5" />
            </div>
            <div className="text-2xl font-display font-bold">
                {count}{suffix}
            </div>
            <div className="text-xs text-foreground/40 mt-1 font-medium">{label}</div>
        </motion.div>
    );
}

/* ── Word reveal animation ────────────────────────────── */
const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" as const }
    })
};

export default function Home() {
    const featuredProjects = projects.filter(p => p.featured);
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

    const trustItems = [
        { title: "Continuous Delivery", desc: "We don't just ship once — we iterate, optimize and improve constantly after launch.", icon: Zap },
        { title: "Solution Oriented", desc: "Every architectural decision and line of code is written to solve a specific client problem.", icon: ShieldCheck },
        { title: "Scalable Architecture", desc: "Cloud-native Next.js infrastructure built to handle exponential growth without friction.", icon: Clock },
        { title: "Professional Partnership", desc: "Transparent communication, real-time tracking and dedicated project ownership.", icon: Users },
    ];

    const headline1 = "Digital Solutions,".split(" ");
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => { setHeroLoaded(true); }, []);

    return (
        <div className="flex flex-col overflow-hidden">

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 pt-16 pb-24 overflow-hidden mesh-bg">

                {/* Orbs */}
                <div className="orb orb-primary w-[700px] h-[700px] -top-48 left-1/2 -translate-x-1/2 opacity-50" style={{ animation: "float-up 8s ease-in-out infinite" }} />
                <div className="orb orb-violet w-[400px] h-[400px] top-1/3 -left-32 opacity-40" style={{ animation: "float-up 10s ease-in-out infinite 1s" }} />
                <div className="orb orb-secondary w-[350px] h-[350px] top-1/4 -right-20 opacity-35" style={{ animation: "float-up 9s ease-in-out infinite 2s" }} />

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <div className="text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 text-sm font-semibold mb-8"
                            style={{ animation: "badge-glow 3s ease-in-out infinite" }}
                        >
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-gradient">Digital Journey Hub</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-glow" />
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.08]">
                            <div className="flex flex-wrap gap-x-4 mb-2">
                                {headline1.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate={heroLoaded ? "visible" : "hidden"}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={heroLoaded ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.55, duration: 0.6 }}
                                className="block text-gradient"
                            >
                                Delivered Continuously.
                            </motion.span>
                        </h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="text-lg md:text-xl text-foreground/55 mb-10 leading-relaxed max-w-xl"
                        >
                            Professional. Enthusiastic. Trustworthy. We bridge complex problems
                            and elegant, scalable digital solutions — on time, every time.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.85, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/projects"
                                className="group btn-gradient text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shimmer"
                            >
                                Explore Our Work
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="group relative px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 glass-card hover:border-primary/40 transition-all"
                            >
                                Start a Conversation
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={heroLoaded ? { opacity: 1 } : {}}
                            transition={{ delay: 1.1, duration: 0.5 }}
                            className="flex flex-wrap gap-6 mt-10 text-sm text-foreground/40"
                        >
                            {["20+ Projects Delivered", "99.9% Uptime SLA", "On-Time Guarantee"].map((badge) => (
                                <span key={badge} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                    {badge}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Floating stat cards */}
                    <div ref={statsRef} className="hidden lg:grid grid-cols-2 gap-4 relative">
                        <StatCard value={20} suffix="+" label="Projects Delivered" icon={Zap} color="bg-primary/15 text-primary" delay={0.9} started={statsInView} />
                        <StatCard value={10} suffix="+" label="Happy Clients" icon={Users} color="bg-secondary/15 text-secondary" delay={1.0} started={statsInView} />
                        <StatCard value={99} suffix="%" label="Uptime Guarantee" icon={ShieldCheck} color="bg-violet-500/15 text-violet-400" delay={1.1} started={statsInView} />
                        <StatCard value={24} suffix="h" label="Avg. Response Time" icon={Clock} color="bg-accent/15 text-accent" delay={1.2} started={statsInView} />
                        {/* Center glow */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)", filter: "blur(20px)" }} />
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-foreground/30 font-medium tracking-widest uppercase">Scroll</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent" style={{ animation: "shimmer-sweep 2s ease-in-out infinite" }} />
                </motion.div>
            </section>

            {/* ── FEATURED PROJECTS ─────────────────────────────── */}
            <section className="px-6 py-28 relative">
                <div className="orb orb-violet w-[500px] h-[500px] -bottom-40 -right-20 opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">Our Work</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                                Featured <span className="text-gradient">Solutions</span>
                            </h2>
                            <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <Link
                                href="/projects"
                                className="group text-sm font-bold inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
                            >
                                View All Projects
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredProjects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                tags={project.tags}
                                slug={project.slug}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-glow-divider mx-6 md:mx-24" />

            {/* ── TRUST & SERVICES ──────────────────────────────── */}
            <section className="relative px-6 py-28 overflow-hidden">
                {/* Aurora bg */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="orb orb-primary w-[600px] h-[600px] -top-40 -left-40 opacity-25" />
                    <div className="orb orb-secondary w-[500px] h-[500px] -bottom-40 -right-40 opacity-20" />
                    <div className="absolute inset-0 mesh-bg opacity-50" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Stats row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        {[
                            { label: "Projects Delivered", val: "20+", color: "text-primary" },
                            { label: "Industries Served", val: "6+", color: "text-secondary" },
                            { label: "Lines of Code", val: "500K+", color: "text-violet-400" },
                            { label: "Client Satisfaction", val: "100%", color: "text-green-400" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card rounded-2xl p-6 text-center"
                            >
                                <div className={`text-3xl font-display font-bold mb-1 ${s.color}`}>{s.val}</div>
                                <div className="text-xs text-foreground/40 font-medium uppercase tracking-widest">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* Trust list */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">Why CypherTech</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
                                Why Choose <span className="text-gradient">CypherTech?</span>
                            </h2>
                            <div className="space-y-6">
                                {trustItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.4 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-foreground/50 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative neon-border rounded-3xl overflow-hidden"
                        >
                            <div
                                className="p-10 rounded-3xl relative shimmer"
                                style={{
                                    background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(34,211,238,0.1) 100%)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(99,102,241,0.2)",
                                }}
                            >
                                {/* Corner orb */}
                                <div className="absolute top-0 right-0 w-40 h-40 orb orb-secondary opacity-20 pointer-events-none" />

                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6">
                                    <span className="live-dot" /> Available for New Projects
                                </div>

                                <h3 className="text-3xl font-display font-bold mb-4 text-gradient">
                                    Let&apos;s Build Something Great
                                </h3>
                                <p className="text-foreground/55 mb-8 leading-relaxed">
                                    Whether you&apos;re looking for a custom CRM, high-performance marketplace,
                                    or a digital transformation partner — CypherTech is ready to deliver.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        href="/contact"
                                        className="block w-full text-center btn-gradient text-white py-4 rounded-xl font-bold shimmer"
                                    >
                                        Get in Touch Today
                                    </Link>
                                    <Link
                                        href="/projects"
                                        className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm text-foreground/60 hover:text-foreground hover:bg-white/5 transition-all border border-white/10"
                                    >
                                        View Our Portfolio →
                                    </Link>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-xs text-foreground/30">
                                    <span>🔒 NDA Protected</span>
                                    <span>⚡ Fast Response</span>
                                    <span>✅ No Lock-in</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
