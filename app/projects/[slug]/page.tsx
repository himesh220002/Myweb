"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ArrowLeft, Calendar, Server, Layers, Code2, Zap, Layout, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);

    if (!project) return notFound();

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
            
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-32 relative z-10 space-y-16">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-16"
                >
                    {/* Header */}
                    <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-[1.05] text-slate-900 tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed font-medium">
                            {project.overview}
                        </p>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-200">
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Category</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                                <Layers className="w-4 h-4 text-primary" />
                                {project.category.split(" / ")[0]}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Domain</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                                <Server className="w-4 h-4 text-secondary" />
                                {project.category.includes("/") ? project.category.split(" / ")[1] : "Software"}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Last Updated</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                                <Calendar className="w-4 h-4 text-primary" />
                                {project.lastUpdated}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Source Code</span>
                            {project.github ? (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 font-bold text-sm text-primary hover:text-slate-900 transition-colors"
                                >
                                    <Code2 className="w-4 h-4" />
                                    View on GitHub
                                </a>
                            ) : (
                                <div className="flex items-center gap-2 font-bold text-sm text-slate-400">
                                    <Code2 className="w-4 h-4" />
                                    Private Repo
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Media Showcase */}
                    <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-200 shadow-2xl group">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-8">
                        {/* Content Body */}
                        <div className="lg:col-span-8 space-y-20">
                            
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                                        <Layout className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-4xl font-display font-bold text-slate-900">Project Overview</h2>
                                </div>
                                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-medium">
                                    <p className="text-slate-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <p className="text-slate-600 leading-relaxed">
                                        This project was designed with a heavy emphasis on clean architecture and high-performance structural engineering, perfectly matching the required technical capabilities for <strong>{project.category}</strong> ecosystems. Our primary goal was to ensure seamless scalability and uncompromised user experience.
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-4xl font-display font-bold text-slate-900">Core Features</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-4 p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all">
                                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mt-0.5 shadow-sm">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            </div>
                                            <span className="text-slate-700 text-base leading-relaxed font-bold">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            {/* Tech Stack List */}
                            <section className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 shadow-sm space-y-6 sticky top-8">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-primary" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tech => (
                                        <span key={tech} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-primary hover:border-primary/30 transition-colors shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="pt-8 border-t border-slate-200 space-y-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold transition-transform hover:scale-105 shadow-lg shadow-slate-900/20"
                                        >
                                            <Code2 className="w-5 h-5" /> View Source Code
                                        </a>
                                    )}
                                    <Link
                                        href="/contact"
                                        className="flex w-full items-center justify-center gap-2 py-4 rounded-2xl font-bold border-2 border-slate-200 bg-white text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-50"
                                    >
                                        Discuss Similar Project →
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
