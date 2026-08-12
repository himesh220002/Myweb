"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowRight, Target, Users, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { roles } from "@/lib/data/roles";

export default function CareerPage() {
    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
            <div className="max-w-7xl mx-auto px-6 py-32 space-y-32 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6 shadow-sm">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Join the Team</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] text-slate-900 tracking-tight">
                        Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Products</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                        We are a collective of engineers, designers, and strategists. We don't just write code; we solve complex business problems.
                    </p>
                </motion.div>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Target, title: "Impact Driven", desc: "We focus on outcomes, not output. Every line of code should serve a business goal." },
                        { icon: Users, title: "Collaborative Excellence", desc: "We elevate each other. Ego is left at the door in pursuit of the best solution." },
                        { icon: Zap, title: "Continuous Evolution", desc: "Technology moves fast. We actively invest in learning and adopting new paradigms." },
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary mb-6 shadow-sm border border-slate-200">
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                            <p className="text-slate-600 font-medium leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Open Positions */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Open Positions</h2>
                            <p className="text-slate-600 font-medium max-w-xl">Find your next role and help us shape the future of software development.</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold shadow-inner">Engineering</span>
                            <span className="px-4 py-2 bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100 cursor-pointer rounded-full text-sm font-bold transition-colors border border-slate-200">Design</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {roles.map((role, idx) => (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-500"
                            >
                                <div className="flex flex-col lg:flex-row gap-8 justify-between">
                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${role.color}`}>
                                                    {role.department}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                                    <MapPin className="w-4 h-4" /> {role.location}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                                    <Calendar className="w-4 h-4" /> {role.type}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">{role.title}</h3>
                                            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">{role.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {role.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 min-w-[250px]">
                                        <div className="space-y-3 mb-8 w-full">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Key Requirements</h4>
                                            {role.requirements.map((req, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <span className="text-sm font-semibold text-slate-700">{req}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Link
                                            href={`/career/${role.id}`}
                                            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-md hover:bg-slate-800 transition-colors"
                                        >
                                            Apply Now <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Culture CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-16 text-center shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none opacity-50" />
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">Don't see a fit?</h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-10 relative z-10 text-lg leading-relaxed font-medium">
                        We're always looking for exceptional talent. Send us your resume and tell us how you can make an impact.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-transform relative z-10"
                    >
                        Pitch Yourself →
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
