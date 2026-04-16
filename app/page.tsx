"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 md:pt-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Digital Journey Hub</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1]"
          >
            Digital Solutions, <br />
            <span className="text-gradient">Delivered Continuously.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-12 leading-relaxed"
          >
            Professional. Enthusiastic. Trustworthy. We bridge the gap between complex problems and elegant, scalable digital solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <Link
              href="/projects"
              className="group bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105"
            >
              Explore My Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl font-bold border border-foreground/10 hover:bg-foreground/5 transition-all"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Solutions</h2>
              <p className="text-foreground/60 max-w-lg">
                A selection of high-impact projects that demonstrate our commitment to excellence and continuous delivery.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-primary font-bold inline-flex items-center gap-1 group"
            >
              View All Projects
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
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
      </section>

      {/* Trust & Services */}
      <section className="px-6 bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Why Choose CypherTech?</h2>
            <div className="space-y-6">
              {[
                { title: "Continuous Delivery", desc: "We don't just ship once; we update and optimize constantly." },
                { title: "Solution Oriented", desc: "Every line of code is written to solve a specific client problem." },
                { title: "Scalable Architecture", desc: "Built with Next.js and Cloud-native tools for infinite growth." },
                { title: "Professional Partnership", desc: "Transparent communication and dedicated project tracking." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-foreground/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/20 shadow-2xl bg-gradient-to-br from-white/10 to-white/5">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Let&apos;s Build Something Great</h3>
            <p className="text-foreground/60 mb-8">
              Whether you&apos;re looking for a custom CRM, a high-performance marketplace, or a digital transformation partner, CypherTech is ready to deliver.
            </p>
            <Link
              href="/contact"
              className="block text-center bg-white text-dark py-4 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Get in Touch Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
