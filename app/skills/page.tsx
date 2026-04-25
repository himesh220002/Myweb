"use client";

import { motion, useInView } from "framer-motion";
import { Globe, Layers, Layout, Server, TrendingUp, Code2, ShieldCheck, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: Layout,
        gradient: "from-primary to-violet-500",
        glow: "rgba(99,102,241,0.3)",
        strength: "Modern UI/UX with premium theme-aware styling",
        skills: [
            { name: "React", level: 95 },
            { name: "Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Tailwind CSS", level: 92 },
            { name: "Framer Motion", level: 85 },
            { name: "Redux Toolkit", level: 80 },
        ]
    },
    {
        title: "Backend & Cloud",
        icon: Server,
        gradient: "from-secondary to-blue-500",
        glow: "rgba(34,211,238,0.3)",
        strength: "Secure APIs, scalable microservices, real-time communication",
        skills: [
            { name: "Node.js", level: 90 },
            { name: "Express.js", level: 88 },
            { name: "MongoDB", level: 85 },
            { name: "PostgreSQL", level: 82 },
            { name: "JWT & Security", level: 88 },
            { name: "Socket.io", level: 80 },
        ]
    },
    {
        title: "DevOps & Utilities",
        icon: ShieldCheck,
        gradient: "from-violet-500 to-purple-700",
        glow: "rgba(139,92,246,0.3)",
        strength: "Automated deployments and operational transparency",
        skills: [
            { name: "Git / GitHub", level: 92 },
            { name: "GitHub Actions", level: 80 },
            { name: "CI/CD Pipelines", level: 78 },
            { name: "Postman", level: 90 },
            { name: "ESLint / Jest", level: 82 },
            { name: "AWS / Vercel", level: 85 },
        ]
    },
    {
        title: "Solutions & Architecture",
        icon: Layers,
        gradient: "from-orange-500 to-rose-500",
        glow: "rgba(249,115,22,0.3)",
        strength: "Workflow optimization and role-based systems",
        skills: [
            { name: "CRM Development", level: 94 },
            { name: "Inventory Systems", level: 88 },
            { name: "Service Dashboards", level: 90 },
            { name: "System Design", level: 85 },
            { name: "Database Schema", level: 88 },
            { name: "Auth Architecture", level: 90 },
        ]
    },
    {
        title: "Digital Strategy",
        icon: Globe,
        gradient: "from-green-400 to-secondary",
        glow: "rgba(34,197,94,0.3)",
        strength: "Bridging technical architecture with persuasive communication",
        skills: [
            { name: "SEO & Ranking", level: 88 },
            { name: "Agile Delivery", level: 92 },
            { name: "UX Strategy", level: 85 },
            { name: "Stakeholder Mgmt", level: 90 },
            { name: "Product Roadmap", level: 82 },
            { name: "Tech Writing", level: 85 },
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
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
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
            transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative group rounded-3xl overflow-hidden glass-card p-8 border border-white/5 hover:border-primary/20 transition-all duration-500"
        >
            <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${category.glow}, transparent 70%)`, filter: "blur(40px)" }}
            />

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white mb-6 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-display font-bold mb-2">{category.title}</h3>
            <p className="text-sm text-primary font-medium mb-8 opacity-80">{category.strength}</p>

            <div className="space-y-5">
                {category.skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                            <span className="text-xs font-bold text-foreground/30">{skill.level}%</span>
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
                <div className="orb orb-violet w-[800px] h-[800px] -top-60 -right-60 opacity-20" />
                <div className="orb orb-secondary w-[600px] h-[600px] bottom-0 -left-40 opacity-15" />
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 border border-white/10">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">Expertise & Capacity</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.05]">
                        Technical Depth & <span className="text-gradient">Operational Clarity</span>
                    </h1>
                    <p className="text-foreground/50 max-w-3xl mx-auto text-xl leading-relaxed">
                        I bridge complex technical architecture with human-centric design and agile delivery.
                        Each category reflects my commitment to solving real-world operational challenges.
                    </p>
                    <div className="mt-8 h-[2.5px] w-24 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
                </motion.div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
                    className="mt-24 text-center glass-card rounded-[2.5rem] p-16 relative overflow-hidden border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    <div className="orb orb-primary w-[400px] h-[400px] -top-20 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" />
                    <h3 className="text-4xl font-display font-bold mb-6 relative z-10">
                        Ready for <span className="text-gradient">Dynamic Problem Solving?</span>
                    </h3>
                    <p className="text-foreground/60 mb-10 max-w-xl mx-auto relative z-10 text-lg leading-relaxed">
                        Beyond the tech stack, I focus on the problem solved. Whether it's scaling inventory or securing patient data, let's build your vision.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex btn-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
                    >
                        Start a Conversation →
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
