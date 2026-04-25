"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";
import { useState } from "react";
import { Layers } from "lucide-react";

const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags))).slice(0, 6)];

export default function ProjectsPage() {
    const [active, setActive] = useState("All");

    const filtered = active === "All"
        ? projects
        : projects.filter(p => p.tags.includes(active));

    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* Background orbs */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-primary w-[600px] h-[600px] -top-40 -left-40 opacity-20" />
                <div className="orb orb-secondary w-[500px] h-[500px] bottom-0 -right-40 opacity-15" />
                <div className="absolute inset-0 mesh-bg opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <Layers className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-secondary">Our Portfolio</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-bold mb-6 leading-[1.05]">
                        Digital <span className="text-gradient">Solutions</span>
                        <br />We&apos;ve Built
                    </h1>
                    <p className="text-foreground/50 max-w-2xl text-lg leading-relaxed">
                        From enterprise CRMs to consumer-facing marketplaces — each project
                        represents a unique journey of innovation and precise delivery.
                    </p>
                    <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap gap-3 mb-12"
                >
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActive(tag)}
                            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${active === tag
                                ? "text-white shadow-lg"
                                : "glass-card text-foreground/60 hover:text-foreground hover:border-primary/30"
                                }`}
                        >
                            {active === tag && (
                                <motion.span
                                    layoutId="filter-active"
                                    className="absolute inset-0 rounded-full btn-gradient"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                            )}
                            <span className="relative z-10">{tag}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                        >
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                tags={project.tags}
                                slug={project.slug}
                                github={project.github}
                                problemSolverAngle={project.problemSolverAngle}
                                index={i}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-foreground/30"
                    >
                        <p className="text-lg">No projects in this category yet.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
