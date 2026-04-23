"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Clients", href: "/clients" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
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
                "fixed top-0 w-full z-50 transition-all duration-500 px-6",
                scrolled
                    ? "py-3 bg-white/80 dark:bg-[#020617]/85 backdrop-blur-2xl border-b border-black/[0.05] dark:border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
                    : "py-5 bg-transparent"
            )}
        >
            {/* Gradient border bottom when scrolled */}
            {scrolled && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            )}

            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-violet-500 to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300">
                        <Zap className="w-5 h-5 text-white" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-violet-500 to-secondary opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300" />
                    </div>
                    <span className="text-xl font-display font-bold text-gradient shimmer">
                        CypherTech
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "text-primary"
                                        : scrolled
                                            ? "text-white/70 hover:text-white"
                                            : "text-foreground/70 hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-bg"
                                        className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/40"
                                        style={{ boxShadow: "0 0 12px rgba(99,102,241,0.2)" }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10 font-semibold">{link.name}</span>
                                {isActive && (
                                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary" />
                                )}
                                {/* Hover underline */}
                                <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop CTA & Theme Toggle */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="relative btn-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold shimmer overflow-hidden"
                    >
                        Get a Solution
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        className={cn(
                            "relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
                            scrolled
                                ? "border border-white/20 bg-white/10 text-white hover:border-primary/40"
                                : "border border-foreground/20 bg-foreground/5 text-foreground hover:border-primary/40"
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <X className="w-5 h-5" />
                                </motion.span>
                            ) : (
                                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Menu className="w-5 h-5" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full mt-2 mx-auto"
                        style={{ transformOrigin: "top" }}
                    >
                        <div className="mx-4 rounded-2xl bg-white/90 dark:bg-[#020617]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/10 shadow-2xl overflow-hidden">
                            <div className="p-4 space-y-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                                                pathname === link.href
                                                    ? "text-primary bg-primary/10 border border-primary/20"
                                                    : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                                            )}
                                        >
                                            {pathname === link.href && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-glow" />
                                            )}
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="px-4 pb-4">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block btn-gradient text-white px-5 py-3.5 rounded-xl text-center font-semibold shimmer"
                                >
                                    Get a Solution
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
