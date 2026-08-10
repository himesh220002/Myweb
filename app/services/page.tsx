"use client";

import { motion } from "framer-motion";
import { Code2, Server, Smartphone, Globe, Cloud, Shield, Zap, ArrowRight, Layers, LayoutTemplate, Database, Search, Gauge, ShieldCheck, PenTool } from "lucide-react";
import Link from "next/link";

const mainServices = [
    {
        icon: Code2,
        title: "Frontend Engineering",
        description: "Interactive, high-performance web applications built with React and Next.js. We focus on seamless user experiences, fluid animations, and pixel-perfect implementation.",
        features: ["React / Next.js Architecture", "Progressive Web Apps (PWAs)", "State Management (Redux/Zustand)", "Framer Motion Animations"]
    },
    {
        icon: Server,
        title: "Backend & API Architecture",
        description: "Robust, secure, and infinitely scalable server-side systems. We engineer the hidden foundation that powers your most complex business logic and data workflows.",
        features: ["Node.js / Express Microservices", "REST & GraphQL APIs", "PostgreSQL & MongoDB", "Real-time WebSockets"]
    },
    {
        icon: Cloud,
        title: "Cloud Infrastructure",
        description: "Enterprise-grade deployment strategies. We automate your DevOps pipeline to ensure 99.99% uptime, rapid iterations, and bulletproof security.",
        features: ["AWS / Vercel Architecture", "Docker Containerization", "CI/CD Pipeline Automation", "Load Balancing & Auto-scaling"]
    },
    {
        icon: LayoutTemplate,
        title: "UI/UX & Product Design",
        description: "Data-driven, aesthetic design systems. We bridge the gap between human psychology and digital interfaces to create products that convert and delight.",
        features: ["Wireframing & Prototyping", "Comprehensive Design Systems", "User Research & Usability Testing", "Interactive Micro-interactions"]
    }
];

const specializedServices = [
    { icon: Search, title: "Technical SEO", desc: "Advanced programmatic SEO, schema markup, and speed optimization for massive organic reach." },
    { icon: Database, title: "Database Migration", desc: "Zero-downtime migrations, schema redesigns, and query optimization for legacy systems." },
    { icon: ShieldCheck, title: "Security Auditing", desc: "Penetration testing, vulnerability assessments, and strict compliance (SOC2/GDPR) implementation." },
    { icon: Gauge, title: "Performance Tuning", desc: "Lighthouse optimization, asset delivery tuning, and edge-caching strategies for instant loads." },
    { icon: Globe, title: "E-Commerce Systems", desc: "Custom headless Shopify integrations and Stripe payment infrastructure for global retail." },
    { icon: PenTool, title: "Tech Consultation", desc: "CTO-as-a-service. Strategic roadmapping, team scaling, and architecture blueprinting." }
];

export default function ServicesPage() {
    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 space-y-20 md:space-y-32 relative z-10">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6 shadow-sm">
                        <Layers className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Capabilities</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] text-slate-900 tracking-tight">
                        Engineering Services <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">That Drive Growth</span>
                    </h1>
                    <p className="text-slate-600 text-xl leading-relaxed font-medium">
                        We don't just write code. We deliver strategic technical solutions designed to solve complex business problems, streamline operations, and capture market share.
                    </p>
                </motion.div>

                {/* Core Services (Bento Style) */}
                <div className="space-y-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-slate-900">Core Disciplines</h2>
                        <p className="text-slate-500 font-medium mt-4">The foundational pillars of our engineering practice.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {mainServices.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 group hover:shadow-2xl hover:border-primary/30 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
                                >
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shadow-sm mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        
                                        <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">{service.title}</h3>
                                        <p className="text-slate-600 font-medium leading-relaxed mb-10">{service.description}</p>
                                    </div>
                                    
                                    <div className="relative z-10 pt-8 border-t border-slate-100">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Key Technologies & Capabilities</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                                                    <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Specialized Services Grid */}
                <div className="pt-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-slate-900">Specialized Solutions</h2>
                        <p className="text-slate-500 font-medium mt-4">Targeted technical interventions for complex challenges.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specializedServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-secondary shadow-sm mb-6 group-hover:scale-110 group-hover:text-primary transition-all">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-50 pointer-events-none" />
                    <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/40 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">The Delivery Framework</h2>
                            <p className="text-white/70 text-lg leading-relaxed font-medium">
                                We utilize a battle-tested agile framework to ensure projects are delivered on time, under budget, and beyond expectations. Total transparency from Day 1.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                                Discuss Your Project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        <div className="lg:col-span-7 space-y-6">
                            {[
                                { step: "01", title: "Discovery & Architecture", desc: "Mapping out data flow, tech stack, and user journeys to ensure absolute clarity." },
                                { step: "02", title: "Design & Prototyping", desc: "Creating high-fidelity wireframes and interactive mockups for rapid validation." },
                                { step: "03", title: "Iterative Development", desc: "Writing clean, scalable code in agile sprints with weekly stakeholder demos." },
                                { step: "04", title: "Testing & Deployment", desc: "Rigorous QA testing before seamless CI/CD production deployment and handoff." }
                            ].map((phase, i) => (
                                <div key={i} className="flex gap-6 group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                    <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-display font-bold text-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
                                        {phase.step}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                                        <p className="text-white/60 font-medium text-sm leading-relaxed">{phase.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
                
            </div>
        </div>
    );
}