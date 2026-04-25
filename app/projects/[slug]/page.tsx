"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ArrowLeft, Calendar, Server, Layout, Database, ShieldCheck, Zap, Layers, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);

    if (!project) return notFound();

    return (
        <div className="relative min-h-screen">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-primary w-[800px] h-[800px] -top-60 -left-40 opacity-10" />
                <div className="orb orb-violet w-[600px] h-[600px] bottom-0 -right-40 opacity-10" />
                <div className="absolute inset-0 mesh-bg opacity-30" />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-24">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary mb-12 transition-all group"
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
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-foreground/60 max-w-3xl leading-relaxed">
                            {project.overview}
                        </p>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-16">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/30">Category</span>
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <Layers className="w-4 h-4 text-primary" />
                                {project.tags[0]}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/30">Platform</span>
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <Server className="w-4 h-4 text-secondary" />
                                Full-Stack App
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/30">Delivered</span>
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <Calendar className="w-4 h-4 text-violet-400" />
                                2026
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/30">Source Code</span>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-bold text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                                <Code2 className="w-4 h-4" />
                                View on GitHub
                            </a>
                        </div>
                    </div>

                    {/* Media Showcase */}
                    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden mb-24 glass-card border border-white/10 group">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 shimmer pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Content Body */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Features */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold">Core Features</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl glass-card border border-white/5 hover:border-primary/20 transition-all">
                                            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            </div>
                                            <span className="text-foreground/80 text-sm leading-relaxed font-medium">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* System Architecture */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold">System Architecture</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl glass-card border border-white/5">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                                            <Layout className="w-4 h-4" /> Frontend Layer
                                        </div>
                                        <p className="text-foreground/70 leading-relaxed">{project.systemArchitecture.frontend}</p>
                                    </div>
                                    <div className="p-6 rounded-2xl glass-card border border-white/5">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
                                            <Server className="w-4 h-4" /> Backend Layer
                                        </div>
                                        <p className="text-foreground/70 leading-relaxed">{project.systemArchitecture.backend}</p>
                                    </div>
                                    {project.systemArchitecture.database && (
                                        <div className="p-6 rounded-2xl glass-card border border-white/5">
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">
                                                <Database className="w-4 h-4" /> Database & Storage
                                            </div>
                                            <p className="text-foreground/70 leading-relaxed">{project.systemArchitecture.database}</p>
                                        </div>
                                    )}
                                    {project.systemArchitecture.devops && (
                                        <div className="p-6 rounded-2xl glass-card border border-white/5">
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 mb-3">
                                                <ShieldCheck className="w-4 h-4" /> DevOps & Deployment
                                            </div>
                                            <p className="text-foreground/70 leading-relaxed">{project.systemArchitecture.devops}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-12">
                            {/* Problem Solver Angle */}
                            <section className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 orb orb-primary opacity-20 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-6">
                                        <Zap className="w-4 h-4 pulse-glow" /> Dynamic Problem Solver
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-6">The Solution Impact</h3>
                                    <div className="space-y-6">
                                        {project.problemSolverAngle.map((i, idx) => {
                                            const [title, desc] = i.split(": ");
                                            return (
                                                <div key={idx} className="space-y-1">
                                                    <div className="text-sm font-bold text-foreground/90">{title}</div>
                                                    <div className="text-xs text-foreground/50 leading-relaxed">{desc}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>

                            {/* Tech Stack List */}
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/30 mb-6">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        ...project.techStack.frontend,
                                        ...project.techStack.backend,
                                        ...(project.techStack.database || []),
                                        ...(project.techStack.devops || [])
                                    ].map(tech => (
                                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium hover:border-primary/40 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* CTAs */}
                            <div className="pt-8 space-y-4">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 btn-gradient text-white py-4 rounded-2xl font-bold shimmer shadow-xl shadow-primary/20"
                                >
                                    <Code2 className="w-5 h-5" /> View Source Code
                                </a>
                                <Link
                                    href="/contact"
                                    className="flex w-full items-center justify-center gap-2 py-4 rounded-2xl font-bold glass-card border border-white/10 hover:border-primary/40 transition-all"
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
