"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data/projects";
import { useState } from "react";
import { Layers, ArrowRight, ChevronRight, Clock, Box } from "lucide-react";
import Link from "next/link";

// Dynamically extract categories from the projects array
const categories = ["All", ...Array.from(new Set(projects.map(p => p.category.split(" / ")[0])))];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject.id);

  const filteredProjects = activeTab === "All"
    ? otherProjects
    : projects.filter(p => p.category.includes(activeTab));

  return (
    <div className="relative min-h-screen">
      {/* Background orbs for premium Nirmana vibe */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="orb orb-primary w-[700px] h-[700px] -top-48 left-1/2 -translate-x-1/2 dark:opacity-15 opacity-20" />
        <div className="orb orb-violet w-[500px] h-[500px] bottom-0 -right-40 dark:opacity-15 opacity-15" />
        <div className="absolute inset-0 mesh-bg dark:opacity-40 opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 space-y-16">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">Our Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight text-slate-900 dark:text-foreground">
              Projects That <br />
              <span className="text-gradient">Ship and Scale.</span>
            </h1>
            <p className="text-slate-500 dark:text-foreground/60 text-lg leading-relaxed font-medium">
              Over 20 premium projects spanning Web Development, Machine Learning, and FinTech. Built for performance and designed to perfection.
            </p>
            <div className="h-[2px] w-24 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-video xl:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden glass-card shadow-[0_0_50px_rgba(99,102,241,0.15)] group">
              <img
                src={featuredProject.image}
                alt="Scaling Infrastructure and Software Engineering"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3 pt-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${activeTab === category
                ? "text-white shadow-lg shadow-primary/20"
                : "glass-card text-slate-500 dark:text-foreground/50 hover:text-slate-800 dark:hover:text-foreground border-slate-200/80 dark:border-white/10"
                }`}
            >
              {activeTab === category && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full btn-gradient -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              {category.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Featured Project Showcase */}
        <AnimatePresence mode="wait">
          {activeTab === "All" && featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="p-8 rounded-[2.5rem] glass-card border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-crosshair"
            >
              <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(99,102,241,0.06),rgba(34,211,238,0.06))] shadow-[0_0_50px_rgba(99,102,241,0.1)]" />

              <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[#0d0d1a] border border-slate-200 dark:border-white/5 scanline">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider shadow-lg">
                  FEATURED
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6 lg:pl-4 relative z-10 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Box className="w-3.5 h-3.5" /> {featuredProject.category}
                  </span>
                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">{featuredProject.title}</h3>
                  <p className="text-slate-500 dark:text-foreground/60 text-sm leading-relaxed font-medium">
                    {featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-500 dark:text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-foreground/40 text-xs font-bold">
                    <Clock className="w-4 h-4" /> Updated {featuredProject.lastUpdated}
                  </div>
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="group/btn btn-gradient text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20 shimmer"
                  >
                    View Case Study
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-[2rem] glass-card border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-crosshair shadow-lg"
              >
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(99,102,241,0.04),rgba(34,211,238,0.04))]" />

                <div className="space-y-4 relative z-10">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0d0d1a] border border-slate-200 dark:border-white/5 scanline">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-70" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                    {project.category.split(" / ")[0]}
                  </span>

                  <h4 className="text-xl font-display font-bold text-slate-800 dark:text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-slate-500 dark:text-foreground/60 text-xs leading-relaxed font-medium line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-slate-500 dark:text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-slate-500 dark:text-foreground/70">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-foreground/40 text-[10px] font-bold">
                    <Clock className="w-3 h-3" /> {project.lastUpdated}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-bold text-slate-450 dark:text-foreground/70 hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-400 dark:text-foreground/30"
          >
            <p className="text-lg font-bold">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Bottom Banner */}
        <div className="pt-12">
          <div className="p-8 md:p-12 rounded-[2.5rem] glass-card border-slate-200 dark:border-white/10 relative overflow-hidden group text-center space-y-6 shadow-[0_0_40px_rgba(99,102,241,0.05)] hover:shadow-[0_0_60px_rgba(99,102,241,0.15)] transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 orb orb-primary opacity-20" />

            <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">
              Ready to start your <span className="text-gradient">next big thing?</span>
            </h3>
            <p className="text-slate-500 dark:text-foreground/60 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
              We have capacity for 3 new high-impact projects this quarter. Let's discuss your technical requirements and business goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/#estimator"
                className="group btn-gradient text-white px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 shimmer"
              >
                Let's Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 glass-card border-slate-200 dark:border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-slate-800 dark:text-white"
              >
                Contact Sales
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
