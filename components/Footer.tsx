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
        <footer className="relative pt-20 pb-10 overflow-hidden bg-[#020617]">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Big CTA Section */}
                <div className="relative mb-20 p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                                Ready to bring your <span className="text-gradient">vision to life?</span>
                            </h2>
                            <p className="text-white/60 text-lg">
                                Let&apos;s build something extraordinary together. Our team is ready to turn your ideas into high-performance digital reality.
                            </p>
                        </div>
                        <Link 
                            href="/contact"
                            className="flex-shrink-0 group/btn relative px-8 py-4 bg-white text-[#020617] rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-white/10"
                        >
                            Start a Project
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
                    {/* Brand & Socials */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-violet-500 to-secondary flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold text-gradient">CypherTech</span>
                        </Link>
                        <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-sm">
                            Pioneering digital excellence through innovative engineering and human-centric design.
                        </p>
                        <div className="flex gap-4">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group/social"
                                >
                                    <s.icon size={20} className="group-hover/social:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {footerLinks.Platform.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 group/link">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover/link:scale-100 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold text-lg mb-6">Expertise</h4>
                        <ul className="space-y-4">
                            {footerLinks.Services.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/50 hover:text-secondary transition-colors flex items-center gap-2 group/link">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary scale-0 group-hover/link:scale-100 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-white/50 mb-6 leading-relaxed">
                            Get the latest insights on digital transformation and tech trends.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="absolute right-2 top-2 bottom-2 px-6 bg-white text-[#020617] rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                            >
                                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
                            </button>
                        </form>
                        {status === "success" && (
                            <p className="mt-3 text-green-400 text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Success!
                            </p>
                        )}
                    </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-sm">
                        © 2026 CypherTech. Built by <span className="text-white/50 font-medium">Himesh Satyam</span>
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-white/30 hover:text-white transition-colors text-sm font-medium">Privacy</Link>
                        <Link href="/terms" className="text-white/30 hover:text-white transition-colors text-sm font-medium">Terms</Link>
                        <Link href="/sitemap" className="text-white/30 hover:text-white transition-colors text-sm font-medium">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
