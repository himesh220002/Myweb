"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/#process" },
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
                scrolled ? "px-2" : "p-2"
            )}
        >
            <div
                className={cn(
                    "mx-auto w-full transition-all duration-500 flex justify-between items-center transition-all ease-in-out duration-300",
                    scrolled
                        ? "max-w-[1600px] px-4 py-1 rounded-t-sm rounded-b-3xl bg-[#020617]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "max-w-7xl px-5 py-2 dark:bg-[#f20617]/20 rounded-full backdrop-blur-lg border border-black/5 dark:border-white/5"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-transform duration-300 ease-in-out group-hover:scale-105">
                        {/* Actual Logo */}
                        <Logo className="w-10 h-10 rounded-full" />

                        {/* Gradient Glow */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-violet-500 to-secondary opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300" />
                    </div>

                    {/* Brand Name */}
                    <span className="text-xl font-display font-bold text-gradient shimmer tracking-tight">
                        CytherTech
                    </span>
                </Link>


                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
                    {navLinks.map((link) => {
                        const isActive = link.href ? pathname === link.href : false;

                        if (link.dropdown) {
                            return (
                                <div key={link.name} className="relative group">
                                    <button
                                        className={cn(
                                            "flex items-center gap-1 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                                            "text-white/90 hover:text-slate-900 dark:hover:text-foreground"
                                        )}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <ChevronDown className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-rotate-180" />
                                    </button>
                                    
                                    <div className="absolute top-full right-0 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                                        <div className="bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-xl p-2 w-48 flex flex-col gap-1">
                                            {link.dropdown.map((dropLink) => {
                                                const isDropActive = pathname === dropLink.href;
                                                return (
                                                    <Link
                                                        key={dropLink.name}
                                                        href={dropLink.href}
                                                        className={cn(
                                                            "px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                                                            isDropActive
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-foreground/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white"
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
                                    "relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 group",
                                    isActive
                                        ? "text-primary"
                                        : "text-white/90 hover:text-slate-900 dark:hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-bg"
                                        className="absolute inset-0 rounded-full bg-white dark:bg-[#020617] shadow-sm border border-black/5 dark:border-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        href="/#estimator"
                        className="relative h-10 px-6 flex items-center justify-center bg-primary text-white rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.4)] group"
                    >
                        <span className="relative z-10">Request a Quote</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex lg:hidden items-center gap-2">
                    <button
                        className={cn(
                            "relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300",
                            scrolled
                                ? "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                                : "bg-foreground/5 dark:bg-white/5"
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <X className="w-5 h-5" />
                                </motion.span>
                            ) : (
                                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Menu className="w-5 h-5" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-3xl pt-[100px] px-6 overflow-y-auto pb-6"
                    >
                        <div className="flex flex-col min-h-full justify-between gap-8 max-w-md mx-auto">
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        {link.dropdown ? (
                                            <div className="flex flex-col gap-2 rounded-3xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 p-5">
                                                <div className="text-sm font-bold text-foreground/50 dark:text-white/50 px-2 mb-1">{link.name}</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {link.dropdown.map((dropLink) => (
                                                        <Link
                                                            key={dropLink.name}
                                                            href={dropLink.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className={cn(
                                                                "flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all",
                                                                pathname === dropLink.href
                                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                                    : "text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 bg-white/50 dark:bg-black/20"
                                                            )}
                                                        >
                                                            {dropLink.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href!}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center justify-between px-5 py-4 rounded-3xl font-bold text-xl transition-all",
                                                    pathname === link.href
                                                        ? "bg-primary/5 text-primary border border-primary/10"
                                                        : "text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                                                )}
                                            >
                                                {link.name}
                                                <ArrowRight className={cn("w-6 h-6 transition-transform", pathname === link.href ? "translate-x-0 opacity-100 text-primary" : "-translate-x-4 opacity-0")} />
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            <Link
                                href="/#estimator"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all mt-auto"
                            >
                                Request a Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
