"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ArrowLeft, Calendar, Server, Layers, Code2, Zap, Layout } from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);

    if (!project) return notFound();

    return (
        <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-primary/30 relative">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-primary w-[800px] h-[800px] -top-60 -left-40 opacity-15" />
                <div className="orb orb-violet w-[600px] h-[600px] bottom-0 -right-40 opacity-15" />
                <div className="absolute inset-0 mesh-bg opacity-30" />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white mb-12 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full bg-white/10 text-gray-300 border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight text-white tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl leading-relaxed font-medium">
                            {project.overview}
                        </p>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-16 bg-[#050505]/50 backdrop-blur-md px-6 rounded-3xl">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Category</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-gray-300">
                                <Layers className="w-4 h-4 text-primary" />
                                {project.category.split(" / ")[0]}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Domain</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-gray-300">
                                <Server className="w-4 h-4 text-secondary" />
                                {project.category.includes("/") ? project.category.split(" / ")[1] : "Software"}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Last Updated</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-gray-300">
                                <Calendar className="w-4 h-4 text-violet-400" />
                                {project.lastUpdated}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Source Code</span>
                            {project.github ? (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 font-bold text-sm text-primary hover:text-white transition-colors"
                                >
                                    <Code2 className="w-4 h-4" />
                                    View on GitHub
                                </a>
                            ) : (
                                <div className="flex items-center gap-2 font-bold text-sm text-gray-400">
                                    <Code2 className="w-4 h-4" />
                                    Private Repo
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Media Showcase */}
                    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden mb-24 glass-card border-white/10 border-slate-200 group p-2">
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Content Body */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Features */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-white">Core Features</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all">
                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-primary flex-shrink-0 mt-0.5 border border-white/5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            </div>
                                            <span className="text-gray-400 text-sm leading-relaxed font-medium">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                                        <Layout className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-white">Technical Details</h2>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 space-y-6">
                                    <p className="text-gray-400 leading-relaxed font-medium">
                                        {project.description}
                                    </p>
                                    <p className="text-gray-400 leading-relaxed font-medium">
                                        This project was designed with a heavy emphasis on clean architecture and high-performance structural engineering, perfectly matching the required technical capabilities for <strong>{project.category}</strong> ecosystems.
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-12">
                            {/* Tech Stack List */}
                            <section className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-primary" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tech => (
                                        <span key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:border-white/30 transition-colors shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* CTAs */}
                            <div className="pt-8 space-y-4">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-2 bg-white text-black py-5 rounded-2xl font-bold transition-transform hover:scale-105"
                                    >
                                        <Code2 className="w-5 h-5" /> View Source Code
                                    </a>
                                )}
                                <Link
                                    href="/contact"
                                    className="flex w-full items-center justify-center gap-2 py-5 rounded-2xl font-bold border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10"
                                >
                                    Discuss Similar Project →
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
