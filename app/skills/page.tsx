"use client";

import { motion, useInView } from "framer-motion";
import { Globe, Layers, Layout, Server, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: Layout,
        gradient: "from-primary to-violet-500",
        glow: "rgba(99,102,241,0.3)",
        skills: [
            { name: "React", level: 95 },
            { name: "Next.js", level: 95 },
            { name: "TypeScript", level: 88 },
            { name: "Tailwind CSS", level: 92 },
            { name: "Framer Motion", level: 80 },
            { name: "Redux", level: 78 },
        ]
    },
    {
        title: "Backend & Cloud",
        icon: Server,
        gradient: "from-secondary to-blue-500",
        glow: "rgba(34,211,238,0.3)",
        skills: [
            { name: "Node.js", level: 90 },
            { name: "Express", level: 88 },
            { name: "PostgreSQL", level: 82 },
            { name: "MongoDB", level: 85 },
            { name: "AWS / Vercel", level: 75 },
            { name: "GitHub Actions", level: 78 },
        ]
    },
    {
        title: "Solutions & Architecture",
        icon: Layers,
        gradient: "from-violet-500 to-purple-700",
        glow: "rgba(139,92,246,0.3)",
        skills: [
            { name: "CRM Development", level: 92 },
            { name: "Microservices", level: 78 },
            { name: "REST APIs", level: 93 },
            { name: "Socket.io", level: 80 },
            { name: "CI/CD Pipelines", level: 75 },
            { name: "System Design", level: 82 },
        ]
    },
    {
        title: "Digital Strategy",
        icon: Globe,
        gradient: "from-green-400 to-secondary",
        glow: "rgba(34,197,94,0.3)",
        skills: [
            { name: "SEO & Search Ranking", level: 85 },
            { name: "Social Ad Strategy", level: 78 },
            { name: "Google Rank Improvement", level: 80 },
            { name: "Agile Delivery", level: 90 },
            { name: "UX Strategy", level: 82 },
            { name: "Stakeholder Management", level: 88 },
        ]
    }
];

function ProgressBar({ level, started }: { level: number; started: boolean }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        if (started) {
            const t = setTimeout(() => setWidth(level), 150);
            return () => clearTimeout(t);
        }
    }, [started, level]);

    return (
        <div className="w-full h-5.5 rounded-full bg-white/10 overflow-hidden">
            <div
                className="progress-fill h-full rounded-full"
                style={{ width: `${width}%`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }}
            />
        </div>
    );
}

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const Icon = category.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative group rounded-3xl shadow-inner shadow-blue-300/20 overflow-hidden glass-card p-8"
        >
            {/* Corner glow on hover */}
            <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${category.glow}, transparent 70%)`, filter: "blur(30px)" }}
            />

            {/* Icon */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                <Icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-display font-bold mb-6">{category.title}</h3>

            <div className="space-y-4">
                {category.skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm font-medium text-foreground/70">{skill.name}</span>
                            <span className="text-xs font-bold text-foreground/40">{skill.level}%</span>
                        </div>
                        <ProgressBar level={skill.level} started={inView} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillsPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Orbs */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-violet w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
                <div className="orb orb-secondary w-[400px] h-[400px] bottom-0 -left-40 opacity-15" />
                <div className="absolute inset-0 mesh-bg opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">Our Expertise</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.05]">
                        Expertise &amp; <span className="text-gradient">Services</span>
                    </h1>
                    <p className="text-foreground/50 max-w-2xl mx-auto text-lg leading-relaxed">
                        Technical precision combined with creative problem-solving — delivering
                        solutions that drive growth and institutionalize excellence.
                    </p>
                    <div className="mt-6 h-[2px] w-16 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
                </motion.div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((category, idx) => (
                        <SkillCard key={idx} category={category} index={idx} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-20 text-center glass-card rounded-3xl p-12 relative overflow-hidden"
                >
                    <div className="orb orb-primary w-[300px] h-[300px] -top-20 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" />
                    <h3 className="text-3xl font-display font-bold mb-4 relative z-10">
                        Need a <span className="text-gradient">Custom Solution?</span>
                    </h3>
                    <p className="text-foreground/50 mb-8 max-w-lg mx-auto relative z-10">
                        Don&apos;t see exactly what you need? We build bespoke systems tailored to your unique requirements.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex btn-gradient text-white px-8 py-4 rounded-2xl font-bold shimmer"
                    >
                        Discuss Your Requirements →
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
