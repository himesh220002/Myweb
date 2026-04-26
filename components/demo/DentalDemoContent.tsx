"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import PitchFlow from "@/components/demo/PitchFlow";

export default function DentalDemoContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet/20 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border-primary/20 text-primary"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">Premium Pitch Strategy</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]"
            >
              Dr. Tooth <br />
              <span className="text-gradient">Pitch Roadmap</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium"
            >
              A high-conversion framework designed to illustrate the ROI of a full-stack digital transformation for dental professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 pt-6"
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold">Secure Infrastructure</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-violet/5 border border-violet/10">
                <Zap className="w-5 h-5 text-violet" />
                <span className="text-sm font-bold">Real-time Sync</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Flow Section */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <PitchFlow />
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-32 bg-muted/20 border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="glass-card p-10 rounded-[2rem] space-y-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Trust & Authority</h3>
              <p className="text-muted-foreground leading-relaxed">
                Elevate the clinic's reputation with a secure, professional platform that outshines generic social media profiles.
              </p>
            </div>
            <div className="glass-card p-10 rounded-[2rem] space-y-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-violet/10 flex items-center justify-center shadow-sm border border-violet/20">
                <Zap className="w-8 h-8 text-violet" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Frictionless UX</h3>
              <p className="text-muted-foreground leading-relaxed">
                Eliminate manual errors with automated slot validation, instant notifications, and proactive patient engagement.
              </p>
            </div>
            <div className="glass-card p-10 rounded-[2rem] space-y-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Scalable Value</h3>
              <p className="text-muted-foreground leading-relaxed">
                A modular architecture that grows with the clinic, supporting multiple branches and complex medical workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Callout */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            Ready to <span className="text-gradient">Elevate</span> Your Presentation?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium">
            Use this interactive flow during client meetings to guide them through the technical and practical advantages of your custom solutions.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="btn-gradient px-12 py-5 rounded-[2rem] text-white font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-3"
            >
              Start Implementation
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
