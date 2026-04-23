"use client";

import Link from "next/link";
import { Zap, Globe, GitBranch, MessageSquare, Mail, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

const footerLinks = {
    Platform: [
        { name: "Showcase", href: "/projects" },
        { name: "Expertise", href: "/skills" },
        { name: "Success Stories", href: "/clients" },
        { name: "Join Us", href: "/career" },
    ],
    Services: [
        { name: "Full-stack Development", href: "/contact" },
        { name: "CRM Solutions", href: "/contact" },
        { name: "Cloud Architecture", href: "/contact" },
        { name: "Digital Transformation", href: "/contact" },
    ],
};

const socials = [
    { icon: Globe, href: "https://www.linkedin.com/in/himesh-satyam/", label: "LinkedIn" },
    { icon: GitBranch, href: "https://github.com/Himesh220002", label: "GitHub" },
    { icon: MessageSquare, href: "#", label: "WhatsApp" },
    { icon: Mail, href: "mailto:satyamhimesh@gmail.com", label: "Email" },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setStatus("error");
            setErrorMsg("Please enter a valid email address.");
            return;
        }
        setStatus("loading");
        setErrorMsg("");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                const data = await res.json();
                setStatus("error");
                setErrorMsg(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
        }
    };

    return (
        <footer className="relative overflow-hidden mt-auto" style={{ background: "#020617" }}>
            {/* Gradient top border */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Background mesh */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Corner orbs */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(34,211,238,0.5), transparent 70%)", filter: "blur(60px)" }} />

            {/* Social proof strip */}
            <div className="relative z-10 border-b border-white/[0.05] py-3">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-4 text-xs text-white/30 font-medium">
                    <span className="flex items-center gap-2">
                        <span className="live-dot" />
                        <span className="text-white/50">Systems Operational</span>
                    </span>
                    <div className="flex flex-wrap justify-center gap-6">
                        {["Live since 2024", "20+ Projects delivered", "99.9% uptime SLA", "100% client satisfaction"].map((t) => (
                            <span key={t} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-secondary/60" />
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/[0.06] pb-12">

                    {/* Brand column */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-violet-500 to-secondary flex items-center justify-center shadow-lg">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-gradient">CypherTech</span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            Digital Solutions, Delivered Continuously. We build high-performance products that scale with your ambition.
                        </p>
                        {/* Socials */}
                        <div className="flex gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-200"
                                >
                                    <s.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Platform</h4>
                        <ul className="space-y-3">
                            {footerLinks.Platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.Services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Stay Connected</h4>
                        <p className="text-white/40 text-sm mb-5 leading-relaxed">
                            Subscribe for the latest in tech, project updates, and digital strategy insights.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2.5">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === "error") setStatus("idle");
                                    }}
                                    placeholder="your@email.com"
                                    disabled={status === "loading" || status === "success"}
                                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white w-full focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="btn-gradient text-white font-bold px-4 py-2.5 rounded-xl text-sm shimmer disabled:opacity-50 min-w-[60px] flex items-center justify-center"
                                >
                                    {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
                                </button>
                            </div>
                            {status === "success" && (
                                <p className="text-green-400 text-xs flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    You&apos;re in! Welcome to the loop.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-accent text-xs">{errorMsg || "Something went wrong. Try again."}</p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-white/25 text-xs gap-4">
                    <p>© 2026 CypherTech. Designed & Developed by <span className="text-white/40 font-medium">Himesh Satyam</span>. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
