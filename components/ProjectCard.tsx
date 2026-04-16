"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";


interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
}

export default function ProjectCard({ title, description, tags, slug }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
        >
            <div className="aspect-video relative overflow-hidden">
                {/* Placeholder for real images */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View Detail
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
                    {title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>

                <p className="text-foreground/60 text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto">
                    <Link
                        href={`/projects/${slug}`}
                        className="text-sm font-bold text-secondary inline-flex items-center gap-1 group/link"
                    >
                        Explore Case Study
                        <span className="block w-0 h-[2px] bg-secondary group-hover/link:w-full transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
