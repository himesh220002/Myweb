"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ArrowLeft, Calendar, Server, Layers, Code2, Zap, Layout, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";


export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);

    if (!project) return notFound();

    return (
        <div className="bg-white text-slate-900 min-h-screen pt-20 font-sans selection:bg-primary/30 relative">

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-12 relative z-10 space-y-2">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-4 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    {/* Header */}
                    <div>

                        <div className="flex justify-center items-center mb-2 gap-4">
                            <h1 className="text-3xl md:text-5xl font-display font-extrabold leading-[1.05] text-slate-900 tracking-tight">
                                {project.title}
                            </h1>
                            <a href="https://github.com/himesh220002" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-slate-900 hover:text-primary transition-colors shrink-0 border border-gray-200 rounded-[1rem] p-1">
                                <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-lg text-slate-600 max-w-7xl text-center leading-relaxed font-medium">
                            {project.overview}
                        </p>
                        <div className="flex justify-center flex-wrap gap-2 mt-6">
                            {project.tags.slice(0, 5).map(tag => (
                                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-5 py-3 border-y border-slate-200">
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Category</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                                <Layers className="w-4 h-4 text-primary" />
                                {project.category.split(" / ")[0]}
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Domain</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                                <Server className="w-4 h-4 text-secondary" />
                                {project.category.includes("/") ? project.category.split(" / ")[1] : "Software"}
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Last Updated</span>
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                                <Calendar className="w-4 h-4 text-primary" />
                                {project.lastUpdated}
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
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
                    <ProjectCarousel
                        images={project.images && project.images.length > 0 ? project.images : [project.image]}
                        title={project.title}
                    />


                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-12">
                        {/* Content Body */}
                        <div className="lg:col-span-8 space-y-8">

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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-4 p-3 rounded-[1rem] bg-slate-50 border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all">
                                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0 mt-0.5 shadow-sm">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            </div>
                                            <span className="text-slate-700 text-base leading-relaxed font-bold">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {project.elaborations && project.elaborations.length > 0 && (
                                <section className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-4xl font-display font-bold text-slate-900">Deep Dive & Impact</h2>
                                    </div>
                                    <div className="space-y-6">
                                        {project.elaborations.map((elaboration, i) => (
                                            <div key={i} className="p-6 rounded-[1rem] bg-white border border-slate-200 shadow-inner relative overflow-hidden group">
                                                <div className="absolute top-2 left-2 w-1 h-full bg-gray-50" />
                                                <div className="absolute top-2 left-0 w-full h-1 bg-gray-50" />
                                                <div className="absolute bottom-2 right-2 w-1 h-full bg-gray-50" />
                                                <div className="absolute bottom-2 right-0 w-full h-1 bg-gray-50" />
                                                <p className="text-slate-700 text-lg leading-relaxed font-medium pl-4">{elaboration}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
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
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold transition-transform hover:scale-105 shadow-lg shadow-primary/20"
                                        >
                                            <ExternalLink className="w-5 h-5" /> Live Demo
                                        </a>
                                    )}
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
