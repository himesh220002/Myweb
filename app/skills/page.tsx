"use client";

import { motion } from "framer-motion";
import { TrendingUp, Layers, Server, ShieldCheck, Globe, Layout } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: Layout,
        strength: "Modern UI/UX with premium theme-aware styling",
        image: "/skills_frontend_bg.png",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"]
    },
    {
        title: "Backend & Cloud",
        icon: Server,
        strength: "Secure APIs, scalable microservices, real-time communication",
        image: "/performance_bg.png",
        skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "JWT & Security", "Socket.io", "GraphQL"]
    },
    {
        title: "DevOps & Utilities",
        icon: ShieldCheck,
        strength: "Automated deployments and operational transparency",
        image: "/security_bg.png",
        skills: ["Git / GitHub", "GitHub Actions", "CI/CD Pipelines", "Docker", "Postman", "AWS", "Vercel"]
    },
    {
        title: "Solutions & Architecture",
        icon: Layers,
        strength: "Workflow optimization and role-based systems",
        image: "/design_bg.png",
        skills: ["CRM Development", "Inventory Systems", "Service Dashboards", "System Design", "Database Schema", "Auth Architecture"]
    },
    {
        title: "Digital Strategy",
        icon: Globe,
        strength: "Bridging technical architecture with persuasive communication",
        image: "/growth_bg.png",
        skills: ["SEO & Ranking", "Agile Delivery", "UX Strategy", "Stakeholder Mgmt", "Product Roadmap", "Tech Writing"]
    }
];

export default function SkillsPage() {
    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
            <div className="max-w-7xl mx-auto px-6 py-32 space-y-24 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 mb-6 border border-slate-200 shadow-sm">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Expertise & Capacity</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] text-slate-900 tracking-tight">
                        Technical Depth & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Operational Clarity</span>
                    </h1>
                    <p className="text-slate-600 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                        I bridge complex technical architecture with human-centric design and agile delivery.
                        Each category reflects my commitment to solving real-world operational challenges.
                    </p>
                </motion.div>

                {/* Big Visual Skill Sections */}
                <div className="space-y-12">
                    {skillCategories.map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className="relative w-full rounded-[3rem] overflow-hidden border border-slate-200 bg-slate-900 group"
                            >
                                {/* Background Image */}
                                <img 
                                    src={category.image} 
                                    alt={category.title} 
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-[2s]" 
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900/40 to-transparent" />

                                <div className="relative p-10 md:p-16 flex flex-col justify-between min-h-[400px]">
                                    <div className="max-w-2xl">
                                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
                                            {category.title}
                                        </h2>
                                        <p className="text-xl text-white/70 font-medium mb-12">
                                            {category.strength}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Core Technologies</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {category.skills.map(skill => (
                                                <span 
                                                    key={skill}
                                                    className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm shadow-lg hover:bg-white/20 hover:border-white/40 transition-colors"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center bg-slate-50 border border-slate-200 rounded-[3rem] p-16 relative overflow-hidden shadow-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 pointer-events-none" />
                    <h3 className="text-4xl font-display font-bold mb-6 relative z-10 text-slate-900">
                        Ready for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dynamic Problem Solving?</span>
                    </h3>
                    <p className="text-slate-600 mb-10 max-w-xl mx-auto relative z-10 text-lg leading-relaxed font-medium">
                        Beyond the tech stack, I focus on the problem solved. Whether it's scaling inventory or securing patient data, let's build your vision.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 relative z-10"
                    >
                        Start a Conversation →
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
