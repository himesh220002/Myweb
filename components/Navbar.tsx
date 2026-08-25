"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/projects" },
    { name: "Pricing", href: "/pricing" },
    {
        name: "More",
        dropdown: [
            { name: "Career", href: "/career" },
            { name: "Skills", href: "/skills" },
            { name: "Clients", href: "/clients" },
            { name: "Contact", href: "/contact" },
        ]
    }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-500 w-full",
                scrolled ? "px-2" : "p-4"
            )}
        >
            <div
                className={cn(
                    "mx-auto w-full transition-all duration-500 flex justify-between items-center",
                    scrolled
                        ? "max-w-7xl px-4 py-2 rounded-t-sm rounded-full bg-white/90 backdrop-blur-xl border border-slate-200 shadow-sm"
                        : "max-w-7xl px-6 py-3 bg-white/90 rounded-full backdrop-blur-lg border border-slate-200 shadow-sm"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-sm border border-slate-200 bg-white group-hover:border-primary/50 transition-colors">
                        <Logo className="w-8 h-8 rounded-full" />
                    </div>
                    <span className="text-xl font-display font-extrabold text-slate-900 tracking-tight">CypherTech</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
                    {navLinks.map((link) => {
                        const isActive = link.href ? pathname === link.href : false;

                        if (link.dropdown) {
                            return (
                                <div key={link.name} className="relative group">
                                    <button className="flex items-center gap-1 px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-50 transition-all">
                                        {link.name}
                                        <ChevronDown className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-300" />
                                    </button>
                                    <div className="absolute top-full right-0 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                                        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2 w-48 flex flex-col gap-1">
                                            {link.dropdown.map((dropLink) => {
                                                const isDropActive = pathname === dropLink.href;
                                                return (
                                                    <Link
                                                        key={dropLink.name}
                                                        href={dropLink.href}
                                                        className={cn(
                                                            "px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-300",
                                                            isDropActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                        )}
                                                    >
                                                        {dropLink.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                href={link.href!}
                                className={cn(
                                    "relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300",
                                    isActive ? "text-primary" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-bg"
                                        className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        href="/contact"
                        className="h-11 px-6 flex items-center justify-center bg-slate-900 text-white rounded-full text-sm font-bold shadow-md shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        Request a Quote
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-6 pb-6 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-8 h-full max-w-md mx-auto">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    link.dropdown ? (
                                        <div key={link.name} className="flex flex-col gap-2 bg-slate-50 border border-slate-200 rounded-3xl p-5">
                                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">{link.name}</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {link.dropdown.map(drop => (
                                                    <Link
                                                        key={drop.name}
                                                        href={drop.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:text-slate-900 shadow-sm"
                                                    >
                                                        {drop.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            key={link.name}
                                            href={link.href!}
                                            onClick={() => setIsOpen(false)}
                                            className="px-5 py-4 rounded-3xl font-bold text-xl text-slate-700 border border-transparent hover:bg-slate-50"
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <Link href="/contact" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg text-center shadow-xl mt-auto">
                                Request a Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
