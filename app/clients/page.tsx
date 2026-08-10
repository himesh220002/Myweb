"use client";

import { motion } from "framer-motion";
import { Users, Star, Quote, ArrowRight, TrendingUp, Zap, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const clientLogos = [
    { name: "TechFlow AI", logo: "TA", color: "bg-blue-50 text-blue-600" },
    { name: "Global Logistics", logo: "GL", color: "bg-emerald-50 text-emerald-600" },
    { name: "Nexus Health", logo: "NH", color: "bg-indigo-50 text-indigo-600" },
    { name: "Vertex Fin", logo: "VF", color: "bg-rose-50 text-rose-600" },
    { name: "Quantum E-Comm", logo: "QE", color: "bg-amber-50 text-amber-600" },
    { name: "Orbit Media", logo: "OM", color: "bg-purple-50 text-purple-600" },
    { name: "Apex Dynamics", logo: "AD", color: "bg-cyan-50 text-cyan-600" },
    { name: "Stellar Cloud", logo: "SC", color: "bg-fuchsia-50 text-fuchsia-600" }
];

const caseStudies = [
    {
        client: "Global Logistics",
        industry: "Supply Chain",
        quote: "CypherTech delivered a complex enterprise dashboard that increased our operational efficiency by 400%. The technical debt was eliminated entirely.",
        author: "Elena Rodriguez, COO",
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
        author: "James Chen, CTO",
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
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 space-y-16 md:space-y-32 relative z-10">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6 shadow-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Partnerships</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] text-slate-900 tracking-tight">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Industry Leaders</span>
                    </h1>
                    <p className="text-slate-600 text-xl leading-relaxed font-medium max-w-3xl mx-auto">
                        From ambitious startups to global enterprises, we partner with visionary teams to build digital products that dominate their markets.
                    </p>
                </motion.div>

                {/* Infinite Marquee of Logos */}
                <div className="relative w-full flex overflow-x-hidden py-10 bg-slate-50 border-y border-slate-200">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        className="flex items-center gap-16 whitespace-nowrap min-w-max px-8"
                    >
                        {[...clientLogos, ...clientLogos].map((client, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-display font-bold border border-current shadow-sm ${client.color}`}>
                                    {client.logo}
                                </div>
                                <span className="text-xl font-bold text-slate-700">{client.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Detailed Case Studies */}
                <div className="space-y-16">
                    <div className="text-center">
                        <h2 className="text-4xl font-display font-bold text-slate-900">Proven Impact</h2>
                        <p className="text-slate-500 font-medium mt-4">Real results from complex engineering challenges.</p>
                    </div>

                    <div className="space-y-12">
                        {caseStudies.map((study, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[80px] -z-10 group-hover:bg-primary/5 transition-colors duration-1000" />

                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-widest uppercase shadow-md">{study.client}</span>
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{study.industry}</span>
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-display font-extrabold leading-tight text-slate-900">
                                        "{study.quote}"
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                            <Quote className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg text-slate-900">{study.author.split(",")[0]}</p>
                                            <p className="text-slate-500 font-bold text-sm">{study.author.split(",")[1]}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                                    {study.metrics.map((metric, mIdx) => (
                                        <div key={mIdx} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                            <metric.icon className="w-6 h-6 text-primary mb-4" />
                                            <p className="text-4xl font-display font-extrabold text-slate-900 mb-2">{metric.value}</p>
                                            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
                                        </div>
                                    ))}
                                    <div className="col-span-1 sm:col-span-2 pt-4">
                                        <Link href="/projects" className="w-full bg-white border-2 border-slate-200 text-slate-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-slate-900 transition-colors shadow-sm hover:shadow-lg">
                                            Read Full Technical Case Study <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-slate-900 p-8 md:p-20 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
                    <h3 className="text-4xl font-display font-extrabold mb-6 relative z-10">Ready to join our partner network?</h3>
                    <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                        Stop dealing with technical debt and missed deadlines. Partner with a team that delivers premium engineering on time, every time.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all text-lg relative z-10">
                        Let's Discuss Your Project <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
