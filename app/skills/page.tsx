"use client";

import { motion } from "framer-motion";
import { Globe, Layers, Layout, Server } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: <Layout className="w-6 h-6" />,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"]
    },
    {
        title: "Backend & Cloud",
        icon: <Server className="w-6 h-6" />,
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Hostinger / Render", "AWS / Vercel", "GitHub Actions", "Git"]
    },
    {
        title: "Solutions & Architecture",
        icon: <Layers className="w-6 h-6" />,
        skills: ["CRM Development", "Microservices", "REST APIs", "Socket.io", "CI/CD", "System Design"]
    },
    {
        title: "Digital Strategy",
        icon: <Globe className="w-6 h-6" />,
        skills: ["Social Ad Strategy", "Google Rank Improvement", "SEO & Search Ranking", "Agile Delivery", "UX Strategy", "Stakeholder Management"]
    }
];

export default function SkillsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Expertise & <span className="text-gradient">Services</span></h1>
                <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
                    We combine technical precision with creative problem-solving to deliver solutions that drive growth and institutionalize excellence.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-500"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                            {category.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-6 font-display">{category.title}</h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map(skill => (
                                <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-primary/10 hover:border-primary/20 transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
