"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { useState } from "react";
import { Layers, ArrowRight, ChevronRight, Clock, Box } from "lucide-react";
import Link from "next/link";

const categories = ["All", ...Array.from(new Set(projects.map(p => p.category.split(" / ")[0])))];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject.id);

  const filteredProjects = activeTab === "All"
    ? otherProjects
    : projects.filter(p => p.category.includes(activeTab));

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
      <div className="max-w-7xl mx-auto px-6 py-32 space-y-16 relative z-10">

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-slate-700">Our Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight tracking-tight text-slate-900">
              Projects That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ship and Scale.</span>
            </h1>
            <p className="text-slate-600 text-xl leading-relaxed font-medium">
              Over 20 premium projects spanning Web Development, Machine Learning, and FinTech. Built for performance and designed to perfection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-video xl:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl group bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200"
                alt="Scaling Infrastructure and Software Engineering"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 via-transparent to-transparent" />
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
              className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 shadow-sm ${activeTab === category
                ? "text-white"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
                }`}
            >
              {activeTab === category && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-slate-900 -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              {category.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Featured Project Banner (if viewing "All") */}
        <AnimatePresence mode="wait">
          {activeTab === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl relative overflow-hidden group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-crosshair transition-all hover:shadow-2xl hover:border-primary/20"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider shadow-sm">
                  FEATURED
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full py-4">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Box className="w-3.5 h-3.5" /> {featuredProject.category}
                  </span>
                  <h3 className="text-3xl font-display font-extrabold text-slate-900">{featuredProject.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                    <Clock className="w-4 h-4" /> Updated {featuredProject.lastUpdated}
                  </div>
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="group/btn bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-slate-900/20 hover:scale-105 transition-transform"
                  >
                    View Case Study
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={project.id}
                className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-crosshair hover:border-primary/30"
              >
                <div className="space-y-4 relative z-10">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                    {project.category.split(" / ")[0]}
                  </span>

                  <h4 className="text-xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-slate-600 text-xs leading-relaxed font-medium line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-600 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-600 shadow-sm">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                    <Clock className="w-3 h-3" /> {project.lastUpdated}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-bold text-slate-600 hover:text-primary flex items-center gap-1 transition-colors"
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
            className="text-center py-20 text-slate-500"
          >
            <p className="text-lg font-bold">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Bottom Banner */}
        <div className="pt-12">
          <div className="p-12 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden text-center space-y-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50 pointer-events-none" />

            <h3 className="text-3xl font-display font-bold relative z-10">
              Ready to start your <span className="text-primary">next big thing?</span>
            </h3>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed font-medium relative z-10">
              We have capacity for 3 new high-impact projects this quarter. Let's discuss your technical requirements and business goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
              <Link
                href="/#estimator"
                className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                Let's Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
