"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";

export default function ProjectsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our <span className="text-gradient">Portfolio</span></h1>
                <p className="text-foreground/60 max-w-2xl text-lg">
                    Explore our collection of digital solutions, from enterprise CRMs to consumer-facing marketplaces. Each project represents a unique journey of innovation and delivery.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        slug={project.slug}
                    />
                ))}
            </div>
        </div>
    );
}
