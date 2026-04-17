"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, User, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setPending(false);
        setSuccess(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">Let&apos;s Discuss <br /><span className="text-gradient">Your Solution</span></h1>
                    <p className="text-foreground/60 text-lg mb-12 leading-relaxed max-w-lg">
                        Whether you have a specific project in mind or just want to explore possibilities, we&apos;re here to help you navigate the digital landscape.
                    </p>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/40 font-medium">Email Us</p>
                                <p className="font-bold">satyamhimesh@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/40 font-medium">Call Us</p>
                                <p className="font-bold">+91-8105542318</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/40 font-medium">Social</p>
                                <div className="flex gap-4 font-bold">
                                    <a href="https://www.linkedin.com/in/himesh-satyam/" className="hover:text-primary transition-colors">LinkedIn</a>
                                    <a href="https://github.com/Himesh220002" className="hover:text-primary transition-colors">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 md:p-12 rounded-[40px] border border-white/20 shadow-2xl"
                >
                    {success ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6">
                                <Send className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                            <p className="text-foreground/60 max-w-xs mx-auto mb-8">
                                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-primary font-bold hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/60 ml-1">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/60 ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/60 ml-1">Subject</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:outline-none focus:bg-dark focus:border-primary transition-all appearance-none cursor-pointer">
                                    <option>New Project Inquiry</option>
                                    <option>Career Opportunity</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/60 ml-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-primary transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                disabled={pending}
                                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50"
                            >
                                {pending ? "Sending..." : "Deliver Solution"}
                                {!pending && <ArrowRight className="w-6 h-6" />}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
