"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Rocket, Heart, Lightbulb, Shield } from "lucide-react";
import Link from "next/link";

const openings = [
    {
        title: "Full-stack Developer",
        location: "Remote / Hybrid",
        type: "Full-time",
        tech: "Next.js · Node.js · PostgreSQL",
        description: "Looking for an enthusiastic React/Node.js developer to join our continuous delivery team. You'll own features end-to-end — from design decisions to production deployment.",
        active: true
    },
    {
        title: "UI/UX Designer",
        location: "Remote",
        type: "Contract",
        tech: "Figma · Framer · Design Systems",
        description: "Help us design professional, premium interfaces that wow our clients. You'll work directly with clients to translate complex workflows into elegant, intuitive experiences.",
        active: true
    },
    {
        title: "Project Coordinator",
        location: "On-site",
        type: "Full-time",
        tech: "Jira · Notion · Agile",
        description: "Ensure smooth delivery and communication between clients and our technical team. Own timelines, manage expectations, and keep every project on track.",
        active: false
    }
];

const culture = [
    {
        icon: Lightbulb,
        title: "Innovation First",
        desc: "We experiment, iterate, and push boundaries. Every project is an opportunity to try a better approach.",
        gradient: "from-yellow-500 to-orange-500",
    },
    {
        icon: Heart,
        title: "People Over Process",
        desc: "We value autonomy, trust, and open communication over rigid hierarchies and bureaucratic processes.",
        gradient: "from-pink-500 to-accent",
    },
    {
        icon: Shield,
        title: "Own Your Impact",
        desc: "Everyone here ships real work with real impact. No busy work, no hand-holding — just meaningful contribution.",
        gradient: "from-primary to-violet-500",
    },
];

export default function CareerPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Orbs */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-violet w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
                <div className="orb orb-primary w-[400px] h-[400px] bottom-20 -left-40 opacity-15" />
                <div className="absolute inset-0 mesh-bg opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-lg">
                            <Rocket className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-secondary">Join the Team</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.05]">
                        Build the <span className="text-gradient">Future</span>
                        <br />With Us
                    </h1>
                    <p className="text-foreground/50 max-w-2xl text-lg leading-relaxed">
                        Join CypherTech and be part of a team that values innovation,
                        professional growth, and the pursuit of digital excellence.
                    </p>
                    <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </motion.div>

                {/* Culture pillars */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-2xl font-display font-bold mb-8 text-foreground/80">Our Culture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {culture.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group glass-card rounded-2xl p-7 hover:border-primary/30 transition-all"
                            >
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <c.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                                <p className="text-sm text-foreground/50 leading-relaxed">{c.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Job Openings */}
                <div>
                    <h2 className="text-2xl font-display font-bold mb-8 text-foreground/80">Open Positions</h2>
                    <div className="space-y-5">
                        {openings.map((job, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${job.active
                                    ? "glass-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                                    : "bg-white/[0.01] border-white/[0.04] opacity-50 grayscale"
                                    }`}
                            >
                                {/* Active gradient left bar */}
                                {job.active && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-violet-500 to-secondary rounded-l-3xl" />
                                )}

                                <div className="p-8 pl-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex-grow">
                                            <div className="flex items-center flex-wrap gap-3 mb-3">
                                                <h3 className="text-xl md:text-2xl font-bold font-display">{job.title}</h3>
                                                {job.active ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                                                        <span className="live-dot w-1.5 h-1.5" /> Actively Hiring
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/30 text-[10px] font-bold uppercase tracking-widest">
                                                        Closed
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-5 text-sm text-foreground/40 mb-4 font-medium">
                                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                                                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{job.tech}</span>
                                            </div>
                                            <p className="text-foreground/55 leading-relaxed max-w-2xl text-sm">{job.description}</p>
                                        </div>

                                        {job.active && (
                                            <Link
                                                href="/contact?type=career"
                                                className="group/btn btn-gradient text-white px-7 py-3.5 rounded-2xl font-bold flex items-center gap-2 whitespace-nowrap shimmer flex-shrink-0"
                                            >
                                                Apply Now
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center glass-card rounded-3xl p-12 relative overflow-hidden neon-border"
                >
                    <div className="orb orb-primary w-[300px] h-[300px] -top-20 left-1/2 -translate-x-1/2 opacity-15 pointer-events-none" />
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 relative z-10">
                        Don&apos;t see the right role?
                    </h3>
                    <p className="text-foreground/50 mb-8 max-w-lg mx-auto relative z-10">
                        We&apos;re always open to exceptional talent. Send us your resume and tell us how you&apos;d add value to CypherTech.
                    </p>
                    <Link
                        href="/contact?type=career"
                        className="inline-flex btn-gradient text-white px-8 py-4 rounded-2xl font-bold shimmer"
                    >
                        Get in Touch →
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
