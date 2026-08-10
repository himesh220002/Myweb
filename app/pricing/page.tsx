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
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 space-y-16 md:space-y-24 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6 shadow-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-slate-900">
            Simple Plans, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">No Surprises.</span>
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed font-medium">
            Every plan includes a full production-ready feature set. Pay for what you need, add more as you grow.
          </p>

          {/* Toggle Switch & Location Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            {/* Flat/Retainer Billing Toggle */}
            <div className="bg-slate-50 p-1.5 rounded-full flex items-center border border-slate-200 shadow-sm relative">
              <button
                type="button"
                onClick={() => setBillingPeriod("project")}
                className={`relative px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all ${billingPeriod === "project" ? "text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                {billingPeriod === "project" && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-slate-900 -z-10" />
                )}
                PER PROJECT
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("retainer")}
                className={`relative px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all flex items-center gap-2 ${billingPeriod === "retainer" ? "text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                {billingPeriod === "retainer" && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-slate-900 -z-10" />
                )}
                RETAINER <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">SAVE 20%</span>
              </button>
            </div>

            {/* Region Selector Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="currency" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Currency</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold shadow-sm appearance-none cursor-pointer"
              >
                <option value="USD">🇺🇸 Global USD ($)</option>
                <option value="INR">🇮🇳 India INR (₹)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "p-8 md:p-10 rounded-[3rem] border flex flex-col justify-between space-y-10 relative overflow-hidden transition-all duration-500 bg-white group",
                plan.popular 
                  ? "border-primary/30 shadow-2xl scale-100 lg:scale-[1.04] ring-4 ring-primary/5" 
                  : "border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none -z-10" />
              )}

              <div className="space-y-8">
                <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary block">{plan.sub}</span>
                      {plan.tag && (
                        <span className={cn(
                          "text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase border",
                          plan.popular ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-50 text-slate-500 border-slate-200"
                        )}>
                          {plan.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-4xl font-display font-extrabold text-slate-900">{plan.name}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-4xl font-display font-extrabold text-slate-900">
                      {formatVal(plan.price)}
                    </span>
                    {typeof plan.price === "number" && (
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-2">
                        {billingPeriod === "project" ? "flat fee" : "per month"}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-base text-slate-600 leading-relaxed font-medium">
                  {plan.desc}
                </p>

                {/* Features List */}
                <ul className="space-y-4 pt-4">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-4 text-sm">
                      {feat.included ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3" />
                        </div>
                      )}
                      <span className={cn("font-bold leading-relaxed", feat.included ? "text-slate-800" : "text-slate-400 line-through")}>
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
                  "w-full py-5 rounded-2xl font-bold text-sm tracking-wider text-center transition-all shadow-md block",
                  plan.popular
                    ? "bg-slate-900 text-white shadow-slate-900/20 hover:scale-105 active:scale-95"
                    : "bg-white border-2 border-slate-200 hover:border-slate-900 text-slate-900 hover:bg-slate-50"
                )}
              >
                {plan.popular ? "START PROJECT" : plan.btnText}
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="space-y-16 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-bold uppercase tracking-widest text-primary block">Project Add-Ons</span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">Extend Your Capabilities.</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Integrate powerful specialized features into any base plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addonsData.map((addon, aIdx) => (
              <div
                key={aIdx}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                    <addon.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-sm line-through text-slate-400 font-bold mb-1">
                      {formatVal(addon.prices[currency])}
                    </span>
                    <span className="text-xl font-display font-extrabold text-slate-900">
                      +{formatVal(Math.round(addon.prices[currency] * 0.4))}
                    </span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold mt-2 uppercase tracking-widest">
                      60% Off Add-on
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {addon.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {addon.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion FAQs Section */}
        <div className="space-y-16 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-sm font-bold uppercase tracking-widest text-primary block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">Common Questions.</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full text-left p-8 flex justify-between items-center gap-6 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all", activeFaq === fIdx ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === fIdx ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === fIdx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-6">
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
        <div className="pt-16">
          <div className="p-8 md:p-20 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group text-center space-y-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50 pointer-events-none" />
            
            <h3 className="text-4xl md:text-5xl font-display font-extrabold relative z-10">
              Ready to bring your <span className="text-primary">vision to life?</span>
            </h3>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium relative z-10">
              Let's build something exceptional together. Book a free discovery call to discuss your vision, and we'll craft a detailed technical roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 relative z-10">
              <Link
                href="/#estimator"
                className="group bg-white text-slate-900 px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform text-lg"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
