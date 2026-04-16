"use client";

import Link from "next/link";
import { Rocket, Globe, Link as LinkIcon, MessageSquare, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
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
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <footer className="bg-dark text-white pt-20 pb-10 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <Rocket className="w-6 h-6 text-secondary" />
                        <span className="text-xl font-display font-bold">CypherTech</span>
                    </Link>
                    <p className="text-white/60 leading-relaxed mb-6">
                        Digital Solutions, Delivered Continuously. We build high-performance products that scale.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/in/himesh-satyam/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Globe size={20} /></a>
                        <a href="https://github.com/Himesh220002" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><LinkIcon size={20} /></a>
                        <a href="#" className="hover:text-secondary transition-colors"><MessageSquare size={20} /></a>
                        <a href="mailto:satyamhimesh@gmail.com" className="hover:text-secondary transition-colors"><Mail size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6">Platform</h4>
                    <ul className="space-y-4 text-white/60">
                        <li><Link href="/projects" className="hover:text-white transition-colors">Showcase</Link></li>
                        <li><Link href="/skills" className="hover:text-white transition-colors">Expertise</Link></li>
                        <li><Link href="/clients" className="hover:text-white transition-colors">Success Stories</Link></li>
                        <li><Link href="/career" className="hover:text-white transition-colors">Join Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6">Services</h4>
                    <ul className="space-y-4 text-white/60">
                        <li>Full-stack Development</li>
                        <li>CRM Solutions</li>
                        <li>Cloud Architecture</li>
                        <li>Digital Transformation</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6">Stay Connected</h4>
                    <p className="text-white/60 mb-6 text-sm">
                        Subscribe to our newsletter for latest updates in tech.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                disabled={status === "loading" || status === "success"}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-secondary transition-colors disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="bg-secondary text-dark font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 min-w-[70px] flex items-center justify-center"
                            >
                                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
                            </button>
                        </div>
                        {status === "success" && (
                            <p className="text-secondary text-xs flex items-center gap-1 mt-1">
                                <CheckCircle2 className="w-3 h-3" /> Welcome to the loop!
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-accent text-xs mt-1">
                                Something went wrong. Try again.
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm gap-4">
                <p>© 2026 CypherTech. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
