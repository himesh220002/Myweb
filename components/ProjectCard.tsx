"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink, Code2, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
    github?: string;
    problemSolverAngle?: string[];
    index?: number;
}

const tagColors: Record<number, string> = {
    0: "bg-primary/10 text-primary border-primary/20",
    1: "bg-secondary/10 text-secondary border-secondary/20",
    2: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    3: "bg-accent/10 text-accent border-accent/20",
};

export default function ProjectCard({ 
    title, 
    description, 
    image, 
    tags, 
    slug, 
    github, 
    problemSolverAngle,
    index = 0 
}: ProjectCardProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl overflow-hidden flex flex-col h-full cursor-crosshair"
            style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
            }}
        >
            {/* Hover glow border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05), rgba(34,211,238,0.08))",
                    boxShadow: "0 0 40px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.3)",
                }}
            />

            {/* Image/Visual area */}
            <div className="aspect-video relative overflow-hidden scanline bg-[#0d0d1a]">
                {/* Project Image */}
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    />
                )}

                {/* Holographic shimmer gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.1) 50%, rgba(34,211,238,0.2) 100%)",
                    }}
                />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                {/* Center hover reveal */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="flex gap-3">
                        <Link className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold cursor-pointer hover:bg-white/20 transition-colors"
                            href={`/projects/${slug}`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Details
                        </Link>
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm font-semibold cursor-pointer hover:bg-black/60 transition-colors"
                            >
                                <Code2 className="w-4 h-4" />
                                Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Corner badge */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-secondary opacity-60 pulse-glow" />
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags.map((tag, i) => (
                        <span
                            key={tag}
                            className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-all duration-300 group-hover:scale-105 ${tagColors[i % 4]}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold mb-3 flex items-center justify-between group-hover:text-gradient transition-all duration-300">
                    <span className="group-hover:text-gradient">{title}</span>
                    <ArrowUpRight
                        className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                    />
                </h3>

                {/* Description */}
                <p className="text-foreground/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Solution Highlight */}
                {problemSolverAngle && problemSolverAngle.length > 0 && (
                    <div className="flex items-center gap-2 mb-6 py-2 px-3 rounded-lg bg-primary/5 border border-primary/10">
                        <Zap className="w-3 h-3 text-primary pulse-glow" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider line-clamp-1">
                            {problemSolverAngle[0].split(": ")[0]}
                        </span>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                    <Link
                        href={`/projects/${slug}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors duration-200"
                    >
                        Explore Case Study
                        <span className="h-[1.5px] w-0 bg-gradient-to-r from-secondary to-primary group-hover/link:w-24 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
