"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, TrendingUp, Zap, Clock, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";

const clientLogos = [
    { name: "TechFlow AI", logo: "TA" },
    { name: "Global Logistics", logo: "GL" },
    { name: "Nexus Health", logo: "NH" },
    { name: "Vertex Fin", logo: "VF" },
    { name: "Quantum E-Comm", logo: "QE" },
    { name: "Orbit Media", logo: "OM" },
    { name: "Apex Dynamics", logo: "AD" },
    { name: "Stellar Cloud", logo: "SC" }
];

const caseStudies = [
    {
        client: "Global Logistics",
        industry: "Supply Chain",
        quote: "CypherTech delivered a complex enterprise dashboard that increased our operational efficiency by 400%. The technical debt was eliminated entirely.",
        author: "Cypher Harley, COO",
        gradient: "from-emerald-500/20 to-blue-500/20",
        border: "border-emerald-500/30",
        metrics: [
            { label: "Efficiency Increase", value: "400%", icon: TrendingUp },
            { label: "Query Load Time", value: "<2s", icon: Zap },
            { label: "Downtime", value: "Zero", icon: ShieldCheck },
            { label: "Daily Requests", value: "1.2M", icon: Clock }
        ]
    },
    {
        client: "Vertex Fin",
        industry: "FinTech",
        quote: "Our payment processing gateway needed absolute precision and zero-latency architecture. They delivered a system that securely processes millions in volume daily.",
        author: "Himesh Satyam, CTO",
        gradient: "from-blue-500/20 to-indigo-500/20",
        border: "border-blue-500/30",
        metrics: [
            { label: "Tx Volume", value: "$50M+", icon: TrendingUp },
            { label: "Latency", value: "<50ms", icon: Zap },
            { label: "Uptime", value: "99.99%", icon: ShieldCheck },
            { label: "Conversion Lift", value: "32%", icon: TrendingUp }
        ]
    }
];

export default function ClientsPage() {
    return (
        <div className="bg-[#030305] text-slate-300 min-h-screen font-sans selection:bg-blue-500/30 relative overflow-hidden">

            {/* Animated Background Mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-24 md:space-y-30 relative z-10">

                {/* --- HERO SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-4xl mt-16 mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Elite Partnerships</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight text-white tracking-tight">
                        Trusted by <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Industry Leaders
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                        From ambitious startups to global enterprises, we partner with visionary teams to build digital products that dominate their markets and redefine industry standards.
                    </p>
                </motion.div>

                {/* --- DYNAMIC MARQUEE --- */}
                <div className="relative w-[100vw] left-1/2 -translate-x-1/2 py-12 border-y border-white/5 overflow-hidden flex flex-col gap-6">
                    <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#030305] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#030305] to-transparent z-10 pointer-events-none" />

                    {/* Row 1 */}
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                        className="flex items-center gap-4 md:gap-8 whitespace-nowrap min-w-max px-4"
                    >
                        {[...clientLogos, ...clientLogos].map((client, i) => (
                            <div key={`row1-${i}`} className="flex items-center gap-4 bg-[#1a1c23]/80 backdrop-blur-md border border-slate-800/80 px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl hover:border-blue-500/50 hover:bg-[#272a35] transition-all duration-300 group cursor-default">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-base md:text-lg font-display font-bold bg-slate-800 text-slate-300 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                    {client.logo}
                                </div>
                                <span className="text-base md:text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{client.name}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Row 2 (Reverse) */}
                    <motion.div
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                        className="flex items-center gap-4 md:gap-8 whitespace-nowrap min-w-max px-4 ml-12"
                    >
                        {[...clientLogos.reverse(), ...clientLogos.reverse()].map((client, i) => (
                            <div key={`row2-${i}`} className="flex items-center gap-4 bg-[#1a1c23]/80 backdrop-blur-md border border-slate-800/80 px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl hover:border-indigo-500/50 hover:bg-[#272a35] transition-all duration-300 group cursor-default">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-base md:text-lg font-display font-bold bg-slate-800 text-slate-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                                    {client.logo}
                                </div>
                                <span className="text-base md:text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{client.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* --- BENTO GRID CASE STUDIES --- */}
                <div className="space-y-16 md:space-y-20">
                    <div className="text-center space-y-4 px-4">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Proven Impact</h2>
                        <p className="text-slate-400 font-medium text-base md:text-lg">Real-world results delivered through complex engineering.</p>
                    </div>

                    <div className="space-y-12 md:space-y-16">
                        {caseStudies.map((study, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`bg-[#0a0a0f] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border ${study.border} shadow-2xl relative overflow-hidden group`}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-bl ${study.gradient} blur-[80px] md:blur-[120px] -z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-700`} />

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">

                                    {/* Left: Testimonial & Info */}
                                    <div className="lg:col-span-5 space-y-6 md:space-y-8 relative z-10">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-4 py-1.5 rounded-full bg-white text-slate-900 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                {study.client}
                                            </span>
                                            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-700 px-4 py-1.5 rounded-full">
                                                {study.industry}
                                            </span>
                                        </div>

                                        <div className="relative">
                                            <Quote className="absolute -top-4 -left-2 md:-top-6 md:-left-4 w-8 h-8 md:w-12 md:h-12 text-slate-700/30 rotate-180 -z-10" />
                                            <h3 className="text-xl md:text-3xl font-display font-medium leading-snug text-slate-200">
                                                "{study.quote}"
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-4 pt-2 md:pt-4">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                                                <img src={`https://api.dicebear.com/9.x/notionists/svg?seed=${study.author}`} alt={study.author} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm md:text-base text-white">{study.author.split(",")[0]}</p>
                                                <p className="text-blue-400 font-semibold text-xs md:text-sm">{study.author.split(",")[1]}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Bento Metrics */}
                                    <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-6 relative z-10">
                                        {study.metrics.map((metric, mIdx) => (
                                            <div key={mIdx} className="bg-[#1a1c23]/50 backdrop-blur-sm p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-800/80 shadow-inner hover:border-blue-500/40 hover:bg-[#1a1c23] transition-all duration-300">
                                                <metric.icon className="w-5 h-5 md:w-8 md:h-8 text-blue-400 mb-3 md:mb-6" />
                                                <p className="text-2xl md:text-5xl font-display font-extrabold text-white mb-1 md:mb-2">{metric.value}</p>
                                                <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">{metric.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- CALL TO ACTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-b from-[#1a1c23] to-[#0a0a0f] p-8 md:p-24 rounded-[2rem] md:rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-80" />

                    <h3 className="text-3xl md:text-5xl font-display font-extrabold mb-4 md:mb-6 relative z-10 text-white">
                        Ready to command your market?
                    </h3>
                    <p className="text-slate-400 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                        Stop dealing with technical debt and missed deadlines. Partner with an elite team that delivers premium engineering on time, every time.
                    </p>

                    <Link href="/contact" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all text-base md:text-lg relative z-10 group">
                        Initiate Project Alpha
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
