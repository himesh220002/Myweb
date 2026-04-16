"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const openings = [
    {
        title: "Full-stack Developer",
        location: "Remote / Hybrid",
        type: "Full-time",
        description: "Looking for an enthusiastic React/Node.js enthusiast to join our continuous delivery team.",
        active: true
    },
    {
        title: "UI/UX Designer",
        location: "Remote",
        type: "Contract",
        description: "Help us design professional, premium interfaces that wow our clients.",
        active: true
    },
    {
        title: "Project Coordinator",
        location: "On-site",
        type: "Full-time",
        description: "Ensure smooth delivery and communication between clients and our technical team.",
        active: false
    }
];

export default function CareerPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Build the <span className="text-gradient">Future</span></h1>
                <p className="text-foreground/60 max-w-2xl text-lg leading-relaxed">
                    Join CypherTech and be part of a team that values innovation, professional growth, and the pursuit of digital excellence.
                </p>
            </motion.div>

            <div className="space-y-6">
                {openings.map((job, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`p-8 rounded-3xl border transition-all ${job.active
                                ? "bg-white/5 border-white/10 hover:border-primary/50 cursor-pointer"
                                : "bg-white/[0.02] border-white/5 opacity-60 grayscale"
                            }`}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-grow">
                                <div className="flex items-center gap-4 mb-3">
                                    <h3 className="text-2xl font-bold font-display">{job.title}</h3>
                                    {job.active && (
                                        <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] uppercase font-bold rounded-full">
                                            Actively Hiring
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-6 text-sm text-foreground/40 mb-6 font-medium">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        <span>Next.js Stack</span>
                                    </div>
                                </div>
                                <p className="text-foreground/60 leading-relaxed max-w-2xl">
                                    {job.description}
                                </p>
                            </div>

                            {job.active && (
                                <Link
                                    href="/contact?type=career"
                                    className="group bg-white text-dark px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                                >
                                    Apply Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
