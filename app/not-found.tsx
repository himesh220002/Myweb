"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Search, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-2xl mx-auto px-6 text-center space-y-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-primary shadow-sm mb-8">
                    <Compass className="w-10 h-10" />
                </div>
                
                <h1 className="text-7xl md:text-9xl font-display font-extrabold text-slate-900 tracking-tighter">
                    404
                </h1>
                
                <h2 className="text-3xl font-display font-bold text-slate-800">
                    Page not found
                </h2>
                
                <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
                <Link
                    href="/"
                    className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/10"
                >
                    <Home className="w-5 h-5" />
                    Back to Home
                </Link>
                <Link
                    href="/contact"
                    className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                >
                    <Search className="w-5 h-5" />
                    Help & Support
                </Link>
            </motion.div>
        </div>
    </div>
  );
}
