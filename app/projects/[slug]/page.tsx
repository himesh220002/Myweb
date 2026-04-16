"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);

    if (!project) return notFound();

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary mb-12 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">{project.title}</h1>

                <div className="flex flex-wrap gap-6 mb-12 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Project Delivered 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>Himesh Satyam</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span>{project.tags.join(", ")}</span>
                    </div>
                </div>

                <div className="aspect-video w-full rounded-3xl bg-primary/5 mb-16 overflow-hidden flex items-center justify-center text-foreground/20 font-bold text-2xl border border-white/10">
                    {/* Main Project Image Placeholder */}
                    Project Showcase Media
                </div>

                <div className="prose prose-invert max-w-none">
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Overview</h2>
                        <p className="text-foreground/80 leading-relaxed text-lg">
                            {project.description} This project was built with a focus on high performance, scalability, and user-centric design. We implemented a continuous delivery pipeline to ensure regular updates and zero downtime.
                        </p>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 text-gradient inline-block">Key Features</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                            {[
                                "Responsive Modern UI",
                                "Real-time Data Integration",
                                "Secure Multi-tenant Architecture",
                                "Advanced Search & Filtering",
                                "Cloud-native Deployment",
                                "Automated Workflows"
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-foreground/80">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Outcome</h2>
                        <p className="text-foreground/80 leading-relaxed text-lg">
                            The project successfully met all client requirements and demonstrated a significant improvement in user engagement and operational efficiency. We continue to maintain and evolve this solution as part of our commitment to digital excellence.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
