"use client";

import { motion } from "framer-motion";
import { Code2, Server, Globe, Cloud, ArrowRight, LayoutTemplate, Database, Search, Gauge, ShieldCheck, PenTool, Infinity as InfinityIcon } from "lucide-react";
import { SiReact, SiNextdotjs, SiRedux, SiFramer, SiNodedotjs, SiGraphql, SiPostgresql, SiSocketdotio, SiDocker, SiGithubactions, SiVercel, SiFigma, SiTailwindcss } from "react-icons/si";
import { FaAws, FaUsers } from "react-icons/fa";
import Link from "next/link";

const mainServices = [
    {
        icon: Code2,
        title: "Frontend Engineering",
        description: "Interactive, high-performance web applications built with React and Next.js. We focus on seamless user experiences, fluid animations, and pixel-perfect implementation.",
        features: [
            { text: "React / Next.js Architecture", TechIcon: SiNextdotjs },
            { text: "Progressive Web Apps (PWAs)", TechIcon: SiReact },
            { text: "State Management", TechIcon: SiRedux },
            { text: "Framer Motion Animations", TechIcon: SiFramer }
        ],
        color: "from-blue-600 to-cyan-400",
        shadow: "group-hover:shadow-[0_0_50px_rgba(56,189,248,0.2)]",
        border: "group-hover:border-blue-500/50"
    },
    {
        icon: Server,
        title: "Backend Architecture",
        description: "Robust, secure, and infinitely scalable server-side systems. We engineer the hidden foundation that powers your most complex business logic and data workflows.",
        features: [
            { text: "Node.js Microservices", TechIcon: SiNodedotjs },
            { text: "REST & GraphQL APIs", TechIcon: SiGraphql },
            { text: "PostgreSQL & MongoDB", TechIcon: SiPostgresql },
            { text: "Real-time WebSockets", TechIcon: SiSocketdotio }
        ],
        color: "from-purple-600 to-fuchsia-500",
        shadow: "group-hover:shadow-[0_0_50px_rgba(192,38,211,0.2)]",
        border: "group-hover:border-purple-500/50"
    },
    {
        icon: Cloud,
        title: "Cloud Infrastructure",
        description: "Enterprise-grade deployment strategies. We automate your DevOps pipeline to ensure 99.99% uptime, rapid iterations, and bulletproof security.",
        features: [
            { text: "AWS Architecture", TechIcon: FaAws },
            { text: "Docker Containerization", TechIcon: SiDocker },
            { text: "CI/CD Pipeline Automation", TechIcon: SiGithubactions },
            { text: "Load Balancing", TechIcon: SiVercel }
        ],
        color: "from-orange-500 to-amber-500",
        shadow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.2)]",
        border: "group-hover:border-orange-500/50"
    },
    {
        icon: LayoutTemplate,
        title: "UI/UX Product Design",
        description: "Data-driven, aesthetic design systems. We bridge the gap between human psychology and digital interfaces to create products that convert and delight.",
        features: [
            { text: "Wireframing & Prototyping", TechIcon: SiFigma },
            { text: "Comprehensive Design Systems", TechIcon: SiTailwindcss },
            { text: "User Research & Testing", TechIcon: FaUsers },
            { text: "Interactive Micro-interactions", TechIcon: SiFramer }
        ],
        color: "from-red-600 to-rose-500",
        shadow: "group-hover:shadow-[0_0_50px_rgba(225,29,72,0.2)]",
        border: "group-hover:border-red-500/50"
    }
];

const specializedServices = [
    { icon: Search, title: "Technical SEO", desc: "Advanced programmatic SEO and speed optimization for massive organic reach.", color: "text-green-400", glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]", border: "group-hover:border-green-500/40" },
    { icon: Database, title: "Database Migration", desc: "Zero-downtime migrations, schema redesigns, and query optimization for legacy systems.", color: "text-yellow-400", glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]", border: "group-hover:border-yellow-500/40" },
    { icon: ShieldCheck, title: "Security Auditing", desc: "Penetration testing, vulnerability assessments, and strict compliance implementation.", color: "text-blue-400", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]", border: "group-hover:border-blue-500/40" },
    { icon: Gauge, title: "Performance Tuning", desc: "Lighthouse optimization, asset delivery tuning, and edge-caching strategies.", color: "text-red-400", glow: "group-hover:shadow-[0_0_30px_rgba(248,113,113,0.15)]", border: "group-hover:border-red-500/40" },
    { icon: Globe, title: "E-Commerce Systems", desc: "Custom headless Shopify integrations and Stripe payment infrastructure.", color: "text-purple-400", glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]", border: "group-hover:border-purple-500/40" },
    { icon: PenTool, title: "Tech Consultation", desc: "CTO-as-a-service. Strategic roadmapping, team scaling, and architecture blueprinting.", color: "text-orange-400", glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]", border: "group-hover:border-orange-500/40" }
];

export default function ServicesPage() {
    return (
        <div className="bg-[#030305] text-slate-200 min-h-screen font-sans selection:bg-purple-500/30 relative overflow-hidden">
            
            {/* Cosmic Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                
                {/* Infinity Stone Nebula Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '14s', animationDelay: '2s' }} />
                <div className="absolute bottom-[-10%] left-[20%] w-[60rem] h-[40rem] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="max-w-[1600px] mx-auto px-6 py-24 md:py-32 space-y-32 relative z-10">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-5xl mx-auto pt-10"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <InfinityIcon className="w-5 h-5 text-purple-400 animate-pulse" />
                        <span className="text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Avengers Level Tech</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-[1.05] tracking-tight text-white relative">
                        <span className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-red-600 to-blue-600 blur-3xl opacity-20" />
                        <span className="relative">Technology to <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-red-500 to-orange-500">Save The World</span></span>
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl leading-relaxed font-medium max-w-3xl mx-auto">
                        We don't just write code. We engineer cosmic-scale solutions designed to solve impossible problems and power the future of humanity.
                    </p>
                </motion.div>

                {/* Core Services (Infinity Stones Style) */}
                <div className="space-y-12">
                    <div className="text-center mb-16 relative">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Core Disciplines</h2>
                        <p className="text-slate-400 font-medium mt-4 text-lg">The foundational pillars of our engineering universe.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {mainServices.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 group transition-all duration-700 relative overflow-hidden flex flex-col justify-between ${service.border} ${service.shadow}`}
                                >
                                    {/* Inner Glow */}
                                    <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${service.color} rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />
                                    
                                    <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm mb-10 group-hover:scale-110 transition-all duration-500 relative">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`} />
                                            <Icon className="w-10 h-10 text-slate-300 group-hover:text-white transition-colors duration-500" />
                                        </div>
                                        
                                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">{service.title}</h3>
                                        <p className="text-slate-400 font-medium leading-relaxed mb-12 text-lg">{service.description}</p>
                                    </div>
                                    
                                    <div className="relative z-10 pt-8 border-t border-white/10">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Key Technologies</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.features.map((feature, i) => {
                                                const TechIcon = feature.TechIcon;
                                                return (
                                                    <li key={i} className="flex items-center gap-3 text-slate-300 font-bold text-sm bg-white/5 rounded-lg px-4 py-3 border border-white/5 group-hover:border-white/10 transition-colors">
                                                        <TechIcon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                                                        {feature.text}
                                                    </li>
                                                );
                                            })}
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
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Specialized Solutions</h2>
                        <p className="text-slate-400 font-medium mt-4 text-lg">Targeted technical interventions for complex challenges.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specializedServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className={`p-8 rounded-[2rem] bg-[#0a0a0f]/80 backdrop-blur-md border border-white/10 transition-all duration-500 group ${service.border} ${service.glow}`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <service.icon className={`w-7 h-7 ${service.color}`} />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                                <p className="text-slate-400 font-medium leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Command Center Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#050508] border border-white/10 rounded-[3rem] p-8 md:p-24 text-white relative overflow-hidden shadow-2xl"
                >
                    {/* High-tech grid background inside the box */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] opacity-50 pointer-events-none" />
                    
                    <div className="absolute -bottom-48 -right-48 w-[40rem] h-[40rem] bg-gradient-to-tl from-purple-600/30 to-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase">
                                <ShieldCheck className="w-4 h-4" /> Protocol Alpha
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight">The Delivery <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Framework</span></h2>
                            <p className="text-slate-400 text-xl leading-relaxed font-medium">
                                We utilize a battle-tested agile framework to ensure projects are delivered on time, under budget, and beyond expectations. Absolute precision from Day 1.
                            </p>
                            <div className="pt-4">
                                <Link href="/contact" className="group relative inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all overflow-hidden">
                                    <span className="relative z-10">Initiate Project</span> 
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-7 space-y-6">
                            {[
                                { step: "01", title: "Strategic Blueprint", desc: "Mapping out data flow, tech stack, and user journeys to ensure absolute clarity." },
                                { step: "02", title: "Cosmic Prototyping", desc: "Creating high-fidelity wireframes and interactive mockups for rapid validation." },
                                { step: "03", title: "Quantum Development", desc: "Writing clean, scalable code in agile sprints with weekly stakeholder demos." },
                                { step: "04", title: "Launch Sequence", desc: "Rigorous QA testing before seamless CI/CD production deployment and handoff." }
                            ].map((phase, i) => (
                                <div key={i} className="flex gap-6 group bg-[#0a0a0f] border border-white/5 p-6 md:p-8 rounded-3xl hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-2xl text-slate-500 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent transition-all shadow-inner">
                                        {phase.step}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-2">{phase.title}</h4>
                                        <p className="text-slate-400 font-medium text-base leading-relaxed">{phase.desc}</p>
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