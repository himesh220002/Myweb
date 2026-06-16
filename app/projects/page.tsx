"use client";

import { motion } from "framer-motion";
import { projects, Project } from "@/lib/data/projects";
import { useState } from "react";
import { Layers, ArrowRight, ExternalLink, Zap, ChevronRight, BarChart2 } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Web Apps", "E-Commerce", "Dashboards"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const featuredProject = projects.find(p => p.slug === "stackline-analytics") || projects[0];
  const otherProjects = projects.filter(p => p.slug !== "stackline-analytics");

  // Fix: Include the featured project in dynamic tab filtering, and only omit it under 'All' tab grid
  const filteredProjects = activeTab === "All"
    ? otherProjects
    : projects.filter(p => p.tags.includes(activeTab));

  const getMetricBadge = (slug: string) => {
    switch (slug) {
      case "brightleaf-store":
        return { label: "LIGHTHOUSE SCORE", val: "96/100" };
      case "saasline-analytics":
      case "stackline-analytics":
        return { label: "THROUGHPUT", val: "2M+ events/day" };
      case "routemaster-saas":
        return { label: "ROUTE PLANNING", val: "3x faster" };
      case "folkery-marketing-site":
        return { label: "ORGANIC TRAFFIC", val: "+140%" };
      case "noxbridge-admin":
        return { label: "MANAGED", val: "50K+ users" };
      case "gridlock-marketplace":
        return { label: "FIRST YEAR", val: "$1.2M GMV" };
      case "yamaha-showroom":
        return { label: "INVENTORY SYNC", val: "< 15s" };
      case "dr-tooth":
        return { label: "BOOKING RATE LOCK", val: "0% overlap" };
      case "ecodrive-marketplace":
        return { label: "CONVERSIONS", val: "+28% scale" };
      case "myweb-portfolio":
        return { label: "PERFORMANCE SCORE", val: "100/100" };
      case "ai-chatbot":
        return { label: "LATENCY DELAY", val: "< 100ms" };
      case "dbank-banking":
        return { label: "LEDGER BLOCKS", val: "2s speed" };
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="orb orb-primary w-[700px] h-[700px] -top-48 left-1/2 -translate-x-1/2 dark:opacity-10 opacity-20" />
        <div className="orb orb-violet w-[500px] h-[500px] bottom-0 -right-40 dark:opacity-10 opacity-15" />
        <div className="absolute inset-0 mesh-bg dark:opacity-20 opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 space-y-16">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Header Text */}
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
            <p className="text-slate-500 dark:text-foreground/50 text-lg leading-relaxed font-medium">
              20+ projects delivered across startups, SMBs, and enterprise teams. Each one built to production standards from day one.
            </p>
            <div className="h-[2.5px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </motion.div>

          {/* Header Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-video xl:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden glass-card border border-slate-200/80 dark:border-white/10 shadow-2xl group">
              <img
                src="/portfolio-header.png"
                alt="Scaling Infrastructure and Software Engineering"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/40 via-transparent to-transparent opacity-80" />
            </div>
            {/* Decorative Orbs behind the image */}
            <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 orb orb-secondary opacity-30 transform -translate-y-1/2" />
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2.5 pt-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${activeTab === category
                ? "text-white shadow-lg shadow-primary/20"
                : "glass-card text-slate-500 dark:text-foreground/50 hover:text-slate-800 dark:hover:text-foreground hover:border-slate-350 dark:hover:border-white/20 border-slate-200/80 dark:border-white/10"
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
        {activeTab === "All" && featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="p-8 rounded-[2.5rem] glass-card border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-crosshair"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(99,102,241,0.06),rgba(34,211,238,0.06))] shadow-[0_0_50px_rgba(99,102,241,0.1)]" />

            {/* Featured Visual Image */}
            <div className="lg:col-span-6 relative aspect-video w-full rounded-3xl overflow-hidden bg-[#0d0d1a] border border-slate-200 dark:border-white/5 scanline">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-65" />
              <div className="absolute inset-0 shimmer pointer-events-none" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider shadow-md">
                FEATURED
              </div>
            </div>

            {/* Featured Details */}
            <div className="lg:col-span-6 space-y-6 lg:pl-4 relative z-10 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">DASHBOARDS</span>
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">{featuredProject.title}</h3>
                <p className="text-slate-500 dark:text-foreground/50 text-sm leading-relaxed font-medium">
                  {featuredProject.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProject.tags.slice(1).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-500 dark:text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Showcase stats & Case Study link */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-foreground/30 uppercase tracking-widest block">THROUGHPUT</span>
                  <span className="text-xl font-bold font-display text-secondary">2M+ events/day</span>
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

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
        >
          {filteredProjects.map((project, idx) => {
            const metric = getMetricBadge(project.slug);
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-[2rem] glass-card border-slate-200 dark:border-white/10 hover:border-primary/20 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-crosshair"
              >
                {/* Hover gradient glow */}
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(99,102,241,0.04),rgba(34,211,238,0.04))]" />

                <div className="space-y-4">
                  {/* Card Visual Image */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0d0d1a] border border-slate-200 dark:border-white/5 scanline">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-50" />
                  </div>

                  {/* Category sub-badge */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                    {project.tags[0].toUpperCase()}
                  </span>

                  {/* Title */}
                  <h4 className="text-xl font-display font-bold text-slate-800 dark:text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-foreground/50 text-xs leading-relaxed font-medium line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(1).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[9px] font-bold text-slate-450 dark:text-foreground/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card metrics & Action */}
                {metric && (
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 dark:text-foreground/35 uppercase tracking-widest block">{metric.label}</span>
                      <span className="text-sm font-bold font-display text-secondary">{metric.val}</span>
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold text-slate-450 dark:text-foreground/50 hover:text-primary flex items-center gap-1 transition-colors"
                    >
                      Case Study
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-400 dark:text-foreground/30"
          >
            <p className="text-lg font-bold">No projects found in this category yet.</p>
          </motion.div>
        )}

        {/* Bottom Banner */}
        <div className="pt-12">
          <div className="p-8 md:p-12 rounded-[2.5rem] glass-card border-slate-200 dark:border-white/10 relative overflow-hidden group text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 orb orb-primary opacity-15" />

            <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">
              Your project <span className="text-gradient">could be next.</span>
            </h3>
            <p className="text-slate-500 dark:text-foreground/50 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
              We have capacity for 3 new projects this quarter. Let's talk about what you're building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/#estimator"
                className="group btn-gradient text-white px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 shimmer"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="group px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 glass-card border-slate-200 dark:border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-slate-800 dark:text-white"
              >
                View Pricing
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
