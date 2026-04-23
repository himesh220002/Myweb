"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, User, Building2, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "New Project Inquiry", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setError("Please fill in all required fields.");
            return;
        }
        setPending(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    company: form.company,
                    message: `[${form.subject}]\n\n${form.message}`,
                }),
            });
            if (res.ok) {
                setSuccess(true);
                setForm({ name: "", email: "", phone: "", company: "", subject: "New Project Inquiry", message: "" });
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setPending(false);
        }
    };

    const contactCards = [
        {
            icon: Mail,
            label: "Email Us",
            value: "satyamhimesh@gmail.com",
            href: "mailto:satyamhimesh@gmail.com",
            gradient: "from-primary to-violet-500",
            glow: "rgba(99,102,241,0.3)",
        },
        {
            icon: Phone,
            label: "Call Us",
            value: "+91-8105542318",
            href: "tel:+918105542318",
            gradient: "from-secondary to-blue-500",
            glow: "rgba(34,211,238,0.3)",
        },
        {
            icon: MessageSquare,
            label: "Social",
            value: "LinkedIn / GitHub",
            href: "https://www.linkedin.com/in/himesh-satyam/",
            gradient: "from-violet-500 to-accent",
            glow: "rgba(139,92,246,0.3)",
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Orbs */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="orb orb-primary w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
                <div className="orb orb-secondary w-[400px] h-[400px] bottom-0 -left-20 opacity-15" />
                <div className="absolute inset-0 mesh-bg opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-4">Let&apos;s Connect</span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-[1.08]">
                            Let&apos;s Discuss <br />
                            <span className="text-gradient">Your Solution</span>
                        </h1>
                        <p className="text-foreground/50 text-lg mb-10 leading-relaxed max-w-lg">
                            Whether you have a specific project in mind or just want to explore possibilities,
                            we&apos;re here to help you navigate the digital landscape.
                        </p>

                        {/* Response time badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-card mb-10 border-green-500/20">
                            <span className="live-dot" />
                            <div>
                                <p className="text-xs font-bold text-green-400">Available Now</p>
                                <p className="text-xs text-foreground/40">We typically respond within 24 hours</p>
                            </div>
                            <Clock className="w-4 h-4 text-foreground/30 ml-2" />
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactCards.map((card, i) => (
                                <motion.a
                                    key={i}
                                    href={card.href}
                                    target={card.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                                    className="group flex gap-5 items-center p-5 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300"
                                >
                                    <div
                                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                        style={{ boxShadow: `0 8px 24px ${card.glow}` }}
                                    >
                                        <card.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/40 font-medium mb-0.5">{card.label}</p>
                                        <p className="font-bold group-hover:text-primary transition-colors">{card.value}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="mt-8 flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/himesh-satyam/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-xl glass-card text-sm font-semibold hover:border-primary/40 hover:text-primary transition-all"
                            >
                                LinkedIn ↗
                            </a>
                            <a
                                href="https://github.com/Himesh220002"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-xl glass-card text-sm font-semibold hover:border-primary/40 hover:text-primary transition-all"
                            >
                                GitHub ↗
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative neon-border rounded-3xl"
                    >
                        <div
                            className="p-8 md:p-10 rounded-3xl relative overflow-hidden shimmer"
                            style={{
                                background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 50%, rgba(34,211,238,0.06) 100%)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(99,102,241,0.15)",
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {success ? (
                                    /* Success State */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex flex-col items-center justify-center text-center py-16"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                                            className="w-24 h-24 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6"
                                            style={{ boxShadow: "0 0 40px rgba(34,197,94,0.2)" }}
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-green-400" />
                                        </motion.div>
                                        <h3 className="text-3xl font-display font-bold mb-3">Message Sent!</h3>
                                        <p className="text-foreground/50 max-w-xs mx-auto mb-2">
                                            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                        </p>
                                        <p className="text-xs text-foreground/30 mb-8">Check your inbox — a confirmation is on its way.</p>
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="btn-gradient text-white px-8 py-3 rounded-2xl font-bold shimmer"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    /* Form */
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div>
                                            <h2 className="text-2xl font-display font-bold mb-1">Send a Message</h2>
                                            <p className="text-sm text-foreground/40 mb-6">All fields marked * are required.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Name */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Name *</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
                                                    <input
                                                        required
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        placeholder="John Doe"
                                                        className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.02] dark:focus:bg-white/[0.08] transition-all placeholder:text-foreground/40 text-foreground"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Email *</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
                                                    <input
                                                        required
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.02] dark:focus:bg-white/[0.08] transition-all placeholder:text-foreground/40 text-foreground"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone (Optional) */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Phone (Optional)</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={form.phone}
                                                        onChange={handleChange}
                                                        placeholder="+1 (555) 000-0000"
                                                        className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.02] dark:focus:bg-white/[0.08] transition-all placeholder:text-foreground/40 text-foreground"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Company */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Company / Organisation</label>
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={form.company}
                                                    onChange={handleChange}
                                                    placeholder="Your company (optional)"
                                                    className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.02] dark:focus:bg-white/[0.08] transition-all placeholder:text-foreground/40 text-foreground"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Subject *</label>
                                            <select
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/60 transition-all appearance-none cursor-pointer text-foreground"
                                            >
                                                <option className="text-white dark:text-black">New Project Inquiry</option>
                                                <option className="text-white dark:text-black">Career Opportunity</option>
                                                <option className="text-white dark:text-black">Partnership</option>
                                                <option className="text-white dark:text-black">Other</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Message *</label>
                                            <textarea
                                                required
                                                rows={5}
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                placeholder="Tell us about your project, goals, and timeline..."
                                                className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/[0.02] dark:focus:bg-white/[0.08] transition-all resize-none placeholder:text-foreground/40 text-foreground"
                                            />
                                        </div>

                                        {/* Error */}
                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-accent text-sm flex items-center gap-2 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                                {error}
                                            </motion.p>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={pending}
                                            className="w-full btn-gradient text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shimmer disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {pending ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>

                                        {/* Bottom trust row */}
                                        <div className="flex items-center gap-3 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                                            <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-medium">
                                                <span className="text-base">🔒</span>
                                                Confidential &amp; secure
                                            </span>
                                            <span className="flex-1 h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                                            <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                Reply within 24h
                                            </span>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
