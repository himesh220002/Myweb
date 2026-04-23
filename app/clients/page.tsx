"use client";

import { motion, useInView } from "framer-motion";
import { Quote, Star, Users, Building2, CheckCircle2, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const clients = [
    { name: "Yamaha", industry: "Automotive", solution: "Digital Showroom & CRM", logo: "Y", gradient: "from-blue-600 to-primary" },
    { name: "SmileSync", industry: "Healthcare", solution: "Patient Management Portal", logo: "S", gradient: "from-green-500 to-secondary" },
    { name: "EcoDrive", industry: "Marketplace", solution: "E-commerce Engine", logo: "E", gradient: "from-emerald-500 to-teal-500" },
    { name: "TechNitro", industry: "Digital Agency", solution: "Custom Internal CRM", logo: "T", gradient: "from-violet-500 to-primary" },
];

const testimonials = [
    {
        author: "Himesh Satyam",
        role: "CEO, TechNitro",
        rating: 5,
        content: "CypherTech transformed our project delivery timeline. Their continuous update cycle and proactive communication is a game changer — we always knew exactly what was happening.",
        avatar: "R",
        company: "TechNitro",
    },
    {
        author: "Priya Mehta",
        role: "Marketing Director, EcoDrive",
        rating: 5,
        content: "The attention to detail and professional tone of the solution provided was exactly what we needed. The platform handles thousands of listings without breaking a sweat.",
        avatar: "P",
        company: "EcoDrive",
    }
];

const metrics = [
    { label: "Clients Served", value: 10, suffix: "+", icon: Users, color: "text-primary" },
    { label: "Industries Covered", value: 6, suffix: "+", icon: Building2, color: "text-secondary" },
    { label: "Projects Completed", value: 20, suffix: "+", icon: CheckCircle2, color: "text-violet-400" },
    { label: "Satisfaction Rate", value: 100, suffix: "%", icon: TrendingUp, color: "text-green-400" },
];

function AnimatedCounter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / 1800, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [target, started]);
    return <span>{count}{suffix}</span>;
}

/* Marquee strip */
const marqueeItems = ["Yamaha", "SmileSync", "EcoDrive", "TechNitro", "Yamaha", "SmileSync", "EcoDrive", "TechNitro"];

export default function ClientsPage() {
    const metricsRef = useRef(null);
    const metricsInView = useInView(metricsRef, { once: true, margin: "-60px" });

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Orbs */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-primary w-[600px] h-[600px] -top-40 -left-40 opacity-20" />
                <div className="orb orb-violet w-[500px] h-[500px] bottom-0 -right-40 opacity-15" />
                <div className="absolute inset-0 mesh-bg opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                        <Star className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">Trusted Partners</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.05]">
                        Clients &amp; <span className="text-gradient">Partners</span>
                    </h1>
                    <p className="text-foreground/50 max-w-2xl mx-auto text-lg leading-relaxed">
                        Trusted by innovative companies to deliver high-performance digital solutions
                        across various industries — on time, every time.
                    </p>
                    <div className="mt-6 h-[2px] w-16 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
                </motion.div>

                {/* Marquee strip */}
                <div className="overflow-hidden mb-16 py-4 glass-card rounded-2xl border border-white/[0.06]">
                    <div className="flex">
                        <div className="marquee-track">
                            {marqueeItems.map((name, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-3 mx-12 text-foreground/30 font-bold text-lg  tracking-widest"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                    {name}
                                </span>
                            ))}
                        </div>
                        {/* Duplicate for seamless loop */}
                        <div className="marquee-track" aria-hidden>
                            {marqueeItems.map((name, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-3 mx-12 text-foreground/30 font-bold text-lg  tracking-widest"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Client Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {clients.map((client, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="group flex flex-col items-center justify-center p-8 rounded-3xl glass-card cursor-default"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${client.gradient} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                {client.logo}
                            </div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-gradient transition-all">{client.name}</h3>
                            <p className="text-xs text-foreground/40 uppercase tracking-widest mb-2">{client.industry}</p>
                            <p className="text-xs text-center text-foreground/30">{client.solution}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Metrics */}
                <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={metricsInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="glass-card rounded-2xl p-6 text-center"
                        >
                            <m.icon className={`w-6 h-6 mx-auto mb-3 ${m.color}`} />
                            <div className={`text-3xl font-display font-bold mb-1 ${m.color}`}>
                                <AnimatedCounter target={m.value} suffix={m.suffix} started={metricsInView} />
                            </div>
                            <div className="text-xs text-foreground/40 font-medium uppercase tracking-widest">{m.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">What They Say</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
                        Client <span className="text-gradient">Testimonials</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12, duration: 0.5 }}
                            className="relative p-10 rounded-3xl glass-card overflow-hidden group"
                        >
                            {/* Big quote mark */}
                            <Quote className="absolute top-6 right-8 w-16 h-16 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            <p className="text-base leading-relaxed text-foreground/70 mb-8 relative z-10 italic">
                                &ldquo;{t.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold">{t.author}</h4>
                                    <p className="text-sm text-foreground/40">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
