"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, ShieldCheck, Zap, Clock, Users, Quote, Star } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "CEO at TechFlow",
        quote: "CypherTech transformed our legacy CRM into a high-performance cloud solution. Their attention to detail and commitment to quality is unmatched.",
        company: "TechFlow Inc.",
        companyLink: "https://example.com",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "CTO at RetailPro",
        quote: "The team delivered a complex marketplace ahead of schedule. Their solution-oriented approach saved us months of development time.",
        company: "RetailPro",
        companyLink: "https://example.com",
        rating: 5
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Founder of GreenLoop",
        quote: "Working with CypherTech was a breeze. They understood our vision perfectly and built a scalable platform that our users love.",
        company: "GreenLoop",
        companyLink: "https://example.com",
        rating: 5
    },
    {
        id: 4,
        name: "David Smith",
        role: "Marketing Director at Nexa",
        quote: "Their digital transformation strategy helped us scale our operations globally. Highly professional and enthusiastic team.",
        company: "Nexa Global",
        companyLink: "https://example.com",
        rating: 4
    }
];

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
        { title: "Dynamic Problem Solving", desc: "Every line of code is written to solve a specific operational challenge, from inventory scaling to patient security.", icon: Zap },
        { title: "Technical Precision", desc: "Built with elite Next.js architecture, ensuring your platform is scalable, fast, and future-proof.", icon: ShieldCheck },
        { title: "Operational Clarity", desc: "Continuous delivery and transparent communication — you'll always know the state of your project.", icon: Clock },
        { title: "Solution Oriented", desc: "Bridging technical depth with persuasive digital strategy to deliver impactful results.", icon: Users },
    ];

    const headline1 = "Digital Solutions,".split(" ");
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => { setHeroLoaded(true); }, []);

    return (
        <div className="flex flex-col">

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
                            Bridging complex technical architecture with human-centric solutions.
                            From digital showrooms to healthcare platforms, I solve real operational
                            challenges with precision and clarity.
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
            <section className="px-6 py-28 relative overflow-hidden">
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
                                github={project.github}
                                problemSolverAngle={project.problemSolverAngle}
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

            {/* ── TESTIMONIALS ──────────────────────────────────── */}
            <section className="relative px-6 py-28 overflow-hidden">
                <div className="orb orb-violet w-[400px] h-[400px] -top-20 left-1/2 -translate-x-1/2 opacity-15 pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">Kind Words</span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                            What Our <span className="text-gradient">Clients Say</span>
                        </h2>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
                        <p className="text-foreground/40 mt-4 max-w-2xl mx-auto">Don&apos;t just take our word for it — see the impact we&apos;ve delivered for businesses worldwide.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="glass-card rounded-3xl p-8 hover:border-primary/20 transition-colors relative"
                            >
                                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center text-primary text-lg font-bold border-4 border-background">
                                    {t.name.charAt(0)}
                                </div>

                                <Quote className="w-6 h-6 text-foreground/10 mb-4" />

                                <p className="text-foreground/60 italic mb-6 leading-relaxed">"{t.quote}"</p>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="font-bold text-sm">{t.name}</div>
                                        <div className="text-xs text-foreground/40">{t.role}</div>
                                    </div>
                                    <div className="flex items-center text-yellow-400">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Link
                                        href={t.companyLink || "#"}
                                        target="_blank"
                                        className={cn(
                                            "text-xs font-semibold transition-colors inline-flex items-center gap-1",
                                            t.companyLink ? "text-primary hover:text-primary/80" : "text-foreground/40"
                                        )}
                                    >
                                        {t.company} {t.companyLink && <ArrowRight className="w-3 h-3" />}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Bottom */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 text-center"
                    >
                        <div className="glass-card max-w-3xl mx-auto p-10 rounded-3xl">
                            <h3 className="text-2xl font-display font-bold mb-4">
                                Ready for Your Own Success Story?
                            </h3>
                            <p className="text-foreground/50 mb-8">Let&apos;s discuss how CypherTech can transform your business.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact" className="btn-gradient text-white py-3.5 px-8 rounded-xl font-bold">
                                    Get a Free Consultation
                                </Link>
                                <Link href="/career" className="py-3.5 px-8 rounded-xl font-bold text-sm border border-white/10 hover:border-primary/40 hover:text-primary transition-colors">
                                    Join Our Team
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
