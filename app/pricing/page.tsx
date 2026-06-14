"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, Sparkles, ChevronDown, HelpCircle, ArrowRight, Zap, Shield, Laptop,
  Search, BarChart2, ShoppingCart, Layout, Mail, Lock, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const addonsData = [
  {
    title: "Advanced SEO Package",
    prices: { USD: 799, INR: 14999 },
    icon: Search,
    desc: "Technical SEO audit, keyword research, schema markup, Google Search Console setup, and monthly reporting."
  },
  {
    title: "Analytics Integration",
    prices: { USD: 499, INR: 9999 },
    icon: BarChart2,
    desc: "Google Analytics 4, Mixpanel or Hotjar setup, custom event tracking, and a live metrics dashboard."
  },
  {
    title: "E-Commerce Integration",
    prices: { USD: 1499, INR: 29999 },
    icon: ShoppingCart,
    desc: "Stripe payments, product catalog, inventory management, order processing, and tax/shipping configurations."
  },
  {
    title: "Custom Dashboard",
    prices: { USD: 2499, INR: 49999 },
    icon: Layout,
    desc: "Bespoke admin panel with real-time charts, user management, data export, and role-based access control."
  },
  {
    title: "Email System",
    prices: { USD: 599, INR: 11999 },
    icon: Mail,
    desc: "Transactional emails with Resend or SendGrid, templates, delivery tracking, and bounce handling."
  },
  {
    title: "Security Hardening",
    prices: { USD: 999, INR: 19999 },
    icon: Lock,
    desc: "Rate limiting, CSRF protection, input sanitization, penetration testing report, and compliance review."
  }
];

const faqs = [
  {
    q: "What is included in every project regardless of plan?",
    a: "All projects include responsive design, SSL certificate, domain configuration, SEO baseline setup, hosting or cloud deployment, and post-launch support. We never charge extra for these fundamentals."
  },
  {
    q: "How long does a typical project take?",
    a: "A Starter project typically takes 1 to 2 weeks. A Growth project takes between 2 to 4 weeks. Custom enterprise products vary depending on complexity but usually range from 4 to 8 weeks."
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, we offer a 50/50 payment split for all flat fee per-project plans. 50% is due at project kickoff, and the remaining 50% is due upon successful deployment. Retainer plans are billed monthly."
  },
  {
    q: "What happens after the included support period ends?",
    a: "You can opt for a monthly maintenance retainer which covers hosting management, minor text or visual edits, security monitoring, and regular backups. Otherwise, we charge a flat hourly rate for ad-hoc requests."
  },
  {
    q: "Can I add features mid-project?",
    a: "Yes! You can easily scale your project mid-term by attaching any of our flat-rate Add-Ons. We'll simply integrate them into the sprint timeline and adjust the final payment milestone."
  },
  {
    q: "Do you work with existing codebases?",
    a: "Yes, we can help refactor, upgrade, or add features to your existing React, Next.js, or Node.js codebases. We'll perform a thorough technical audit first to establish a solid roadmap."
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"project" | "retainer">("project");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  // Geolocation detection
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code !== "IN") {
          setCurrency("USD");
        }
      })
      .catch((err) => console.log("IP Geolocation check error:", err));
  }, []);

  const plans = [
    {
      name: "Starter",
      sub: "STARTER",
      tag: "ESSENTIAL",
      price: currency === "USD"
        ? (billingPeriod === "project" ? 2499 : 1999)
        : (billingPeriod === "project" ? 49999 : 39999),
      desc: "Perfect for landing pages, portfolios, and small business sites.",
      features: [
        { text: "Up to 5 pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Custom database architecture", included: false },
        { text: "Authentication & User Roles", included: false },
        { text: "Basic SEO & domain setup", included: true },
        { text: "E-commerce integration", included: false },
        { text: "CMS for content management", included: false },
        { text: "Serverless Cloud deployment", included: true },
        { text: "1 round of revisions", included: true },
        { text: "30-day post-launch support", included: true },
        { text: "Custom animations & WebGL", included: false }
      ],
      btnText: "GET STARTED",
      ctaHref: "/#estimator",
      popular: false
    },
    {
      name: "Growth",
      sub: "GROWTH",
      tag: "MOST POPULAR",
      price: currency === "USD"
        ? (billingPeriod === "project" ? 6999 : 5599)
        : (billingPeriod === "project" ? 149999 : 119999),
      desc: "Full-stack web apps with auth, database, and production deployment.",
      features: [
        { text: "Up to 20 pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Custom database architecture", included: true },
        { text: "Authentication & User Roles", included: true },
        { text: "Advanced SEO & sitemaps", included: true },
        { text: "E-commerce integration", included: false },
        { text: "CMS for content management", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "3 rounds of revisions", included: true },
        { text: "90-day post-launch support", included: true },
        { text: "Custom animations & WebGL", included: false }
      ],
      btnText: "START PROJECT",
      ctaHref: "/#estimator",
      popular: true
    },
    {
      name: "Enterprise",
      sub: "ENTERPRISE",
      tag: "SCALABLE",
      price: "Custom",
      desc: "Complex platforms, SaaS products, and multi-tenant systems.",
      features: [
        { text: "Unlimited pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Custom database architecture", included: true },
        { text: "Authentication & User Roles", included: true },
        { text: "Enterprise SEO optimization", included: true },
        { text: "E-commerce integration", included: true },
        { text: "CMS for content management", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "Unlimited revisions", included: true },
        { text: "6-month post-launch support", included: true },
        { text: "Custom animations & WebGL", included: true }
      ],
      btnText: "REQUEST A QUOTE",
      ctaHref: "/#estimator",
      popular: false
    }
  ];

  const formatVal = (val: number | string) => {
    if (typeof val === "string") return val;
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  return (
    <div className="relative min-h-screen">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="orb orb-primary w-[700px] h-[700px] -top-48 left-1/2 -translate-x-1/2 dark:opacity-10 opacity-20" />
        <div className="orb orb-violet w-[500px] h-[500px] bottom-0 -right-40 dark:opacity-10 opacity-15" />
        <div className="absolute inset-0 mesh-bg dark:opacity-20 opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 space-y-24">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block">Transparent Pricing</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-foreground">
            Simple Plans, <span className="text-gradient">No Surprises.</span>
          </h1>
          <p className="text-slate-500 dark:text-foreground/50 text-lg leading-relaxed font-medium">
            Every plan includes a full production-ready feature set. Pay for what you need, add more as you grow.
          </p>

          {/* Toggle Switch & Location Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            {/* Flat/Retainer Billing Toggle */}
            <div className="glass-card p-1 rounded-full flex items-center border-slate-200 dark:border-white/5 relative">
              <button
                type="button"
                onClick={() => setBillingPeriod("project")}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all ${billingPeriod === "project" ? "text-slate-800 dark:text-white" : "text-slate-500 dark:text-foreground/50"}`}
              >
                {billingPeriod === "project" && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full btn-gradient -z-10" />
                )}
                PER PROJECT
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("retainer")}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 ${billingPeriod === "retainer" ? "text-slate-800 dark:text-white" : "text-slate-500 dark:text-foreground/50"}`}
              >
                {billingPeriod === "retainer" && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full btn-gradient -z-10" />
                )}
                RETAINER <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">SAVE 20%</span>
              </button>
            </div>

            {/* Region Selector Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none font-bold shadow-sm"
              >
                <option value="USD" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">🇺🇸 Global USD ($)</option>
                <option value="INR" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">🇮🇳 India INR (₹)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "p-8 rounded-[2.5rem] glass-card border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-300",
                plan.popular ? "border-primary/40 dark:border-primary/40 shadow-2xl scale-[1.02] lg:scale-[1.03]" : "hover:border-slate-300 dark:hover:border-white/20"
              )}
            >
              {/* Popular Badge / Orb */}
              {plan.popular && (
                <div className="absolute top-0 right-0 w-32 h-32 orb orb-primary opacity-20" />
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">{plan.sub}</span>
                      {plan.tag && (
                        <span className={cn(
                          "text-[8px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase",
                          plan.popular ? "bg-primary text-white shadow-sm" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-foreground/60"
                        )}>
                          {plan.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">{plan.name}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">
                      {formatVal(plan.price)}
                    </span>
                    {typeof plan.price === "number" && (
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-foreground/45 font-bold mt-1">
                        {billingPeriod === "project" ? "flat fee" : "per month"}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-foreground/50 leading-relaxed font-medium">
                  {plan.desc}
                </p>

                {/* Features List */}
                <ul className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-white/5">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3.5 text-xs">
                      {feat.included ? (
                        <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-foreground/20 flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3" />
                        </div>
                      )}
                      <span className={cn("font-medium leading-normal", feat.included ? "text-slate-700 dark:text-foreground/80" : "text-slate-400 dark:text-foreground/25 line-through")}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href={plan.ctaHref}
                className={cn(
                  "w-full py-4.5 rounded-2xl font-bold text-xs tracking-wider text-center transition-all shadow-md block shimmer",
                  plan.popular
                    ? "btn-gradient text-white shadow-primary/20"
                    : "bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/30 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white"
                )}
              >
                {plan.popular ? "START PROJECT" : plan.btnText}
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="space-y-12 pt-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block">Project Add-Ons</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-foreground">Extend Your Project.</h2>
            <p className="text-sm text-slate-500 dark:text-foreground/55 leading-relaxed font-medium">
              Add exceptional capabilities to any plan. Pricing is based on hourly surpluses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addonsData.map((addon, aIdx) => (
              <div
                key={aIdx}
                className="p-6 rounded-3xl glass-card border-slate-200/80 dark:border-white/10 hover:border-primary/20 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform duration-300">
                      <addon.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs line-through text-slate-550 dark:text-foreground/30 font-medium">
                        {formatVal(addon.prices[currency])}
                      </span>
                      <span className="text-sm font-bold text-secondary">
                        +{formatVal(Math.round(addon.prices[currency] * 0.4))}
                      </span>
                      <span className="text-[9px] bg-secondary/15 text-secondary px-1.5 py-0.5 rounded-full font-bold mt-1 border border-secondary/20">
                        Founders 60% Off
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-foreground group-hover:text-primary transition-colors">
                    {addon.title}
                  </h4>
                  <p className="text-slate-500 dark:text-foreground/50 text-xs leading-relaxed font-medium">
                    {addon.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion FAQs Section */}
        <div className="space-y-12 pt-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-foreground">Common Questions.</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-2xl glass-card border-slate-200/80 dark:border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 text-sm font-bold text-slate-800 dark:text-foreground"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-foreground/40 transition-transform duration-300 ${activeFaq === fIdx ? "rotate-180 text-primary" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === fIdx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-xs text-slate-500 dark:text-foreground/50 leading-relaxed font-medium border-t border-slate-100 dark:border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-12">
          <div className="p-8 md:p-12 rounded-[2.5rem] glass-card border-slate-200/80 dark:border-white/10 relative overflow-hidden group text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 orb orb-primary opacity-15" />

            <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">
              Ready to bring your <span className="text-gradient">project to life?</span>
            </h3>
            <p className="text-slate-500 dark:text-foreground/50 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
              Let's build something exceptional together. Book a free discovery call to discuss your vision, and we'll craft a detailed technical roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/#estimator"
                className="group btn-gradient text-white px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 shimmer"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="group px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 glass-card border-slate-200/80 dark:border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-slate-800 dark:text-white"
              >
                View Portfolio
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
