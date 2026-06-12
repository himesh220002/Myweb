"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, ChevronRight, ShieldCheck, Zap, Clock, Users, Quote, Star,
  MapPin, CheckCircle2, ChevronDown, MessageSquare, Mail, Phone, Building, Layout, Globe
} from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Technology logotype SVG render helper
function TechLogo({ name }: { name: string }) {
  const normName = name.toLowerCase();

  if (normName.includes("react")) {
    return (
      <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5 text-[#61dafb] fill-none stroke-current" strokeWidth="1.2">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        <circle r="2" className="fill-current" />
      </svg>
    );
  }
  if (normName.includes("next.js") || normName.includes("next")) {
    return (
      <svg viewBox="0 0 180 180" className="w-5 h-5 dark:text-white text-black fill-current">
        <path d="M150 90c0-33.1-26.9-60-60-60S30 56.9 30 90s26.9 60 60 60 60-26.9 60-60zm-68 33.7V75.6l32.2 47.9c.3.5.7.9 1.2 1.1.5.2 1.1.2 1.6 0 .5-.2.9-.6 1.1-1.1s.2-1.1 0-1.6L99.7 72.8c10.4 4.3 18.2 13.5 20.9 24.6 2.8 11.2.5 23-6.1 32.2-6.6 9.2-17 14.8-28.2 15.2-11.2.4-22.1-4.2-29.6-12.4L82 123.7zm19.8-49.3c.4 0 .7.1 1 .4.3.2.4.6.4 1v22.8c0 .4-.1.7-.4 1-.3.3-.6.4-1 .4s-.7-.1-1-.4c-.3-.3-.4-.6-.4-1V75.8c0-.4.1-.7.4-1 .3-.3.6-.4 1-.4z" />
      </svg>
    );
  }
  if (normName.includes("node")) {
    return (
      <svg viewBox="0 0 256 288" className="w-5 h-5 text-[#68a063] fill-current">
        <path d="M144.2 24.7l97.8 56.5c8.7 5 14 14.3 14 24.3v112.9c0 10.1-5.3 19.3-14 24.3l-97.8 56.5c-8.7 5-19.3 5-28 0L14.4 242.7C5.7 237.7.4 228.4.4 218.4V105.5c0-10.1 5.3-19.3 14-24.3L116.2 24.7c8.7-5 19.3-5 28 0zM128 44.8L41.3 94.9v100.2L128 245.2l86.7-50.1V94.9L128 44.8z" />
      </svg>
    );
  }
  if (normName.includes("postgres")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#336791] fill-current">
        <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm68 132.8c-1.9 14.6-7.8 28.2-16.7 39.4-4.8 5.9-10.6 11-17.1 14.9-5.1-4.8-11.4-8.2-18.4-9.8 12-14.7 18.6-32.9 18.6-51.7 0-6.2-.7-12.3-2.1-18.3 16.2-2.1 29.8 9.3 35.7 25.5zm-59.5 45.4c-6.1.9-12.3 1.3-18.5 1.3-15.6 0-30.8-2.9-45.1-8.5v-18.2c13.7 4.2 28.1 6.3 42.6 6.3 7 0 13.9-.5 20.8-1.5.3 7 0 14-.8 20.6zm-17.9-38.3c-2.4 8.7-6.2 16.9-11.2 24.2-10-2-19.5-6.1-27.8-12.1v-20.9c9 6 19.2 10.1 29.9 12.1 3.1 5.3 6.2 10.9 9.1 16.7z" />
      </svg>
    );
  }
  if (normName.includes("aws")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#FF9900] fill-current">
        <path d="M140.2 60.5c-20.1 0-38.1 7.2-48.4 19.3-3.1 3.6-2.2 9 1.7 11.5l12.4 7.9c3.3 2.1 7.7.9 9.9-2.2 6-8.6 15.6-13.6 27-13.6 17.5 0 29.3 10.4 29.3 26.2v4.8c-9.6-.6-21.2-.9-32.8.2-25.1 2.3-43.7 12.8-43.7 36.3 0 20.4 14.9 31.7 33.7 31.7 17.2 0 29.3-8.1 35.7-18.4 2.3 8.4 9.3 15 19.6 15 9.6 0 16.9-3.9 22.1-9.6v6c0 3.3 2.1 5.7 5.1 5.7h13.9c3 0 5.4-2.4 5.4-5.4V102.3c-.3-28-18.4-41.8-51.4-41.8zm28 89.2c-4.2 9.6-13.9 17.8-24.8 17.8-11.2 0-18.4-6.6-18.4-16.9 0-12.4 10.5-17.8 25.1-18.7 6.6-.4 13.9-.3 18.1.1v17.7zm28.7 50.3c-24.5 19.6-58.4 28-90.4 28-44.6 0-85.9-15.6-115.7-41.5-2.7-2.3-1.8-6.6 1.5-7.5l14.8-4c3-1 6 .6 7.8 3.1 24.8 34.6 69.3 54.2 114.2 45.2 26.5-5.3 47.9-20.5 61.1-39.2 2.3-3.3 6.9-2.7 8.7.9l7.9 15.4c1.8 3.6.3 7.8-3 9.6zm14-11.8c-2.4.9-5.1-.3-5.4-3l-2.4-18.7c-.3-2.7 1.8-4.8 4.5-4.5l18.4 2.7c2.7.4 3.9 3.3 2.4 5.4l-11.8 14.8c-1.4 1.8-3.6 2.7-5.7 3.3z" />
      </svg>
    );
  }
  if (normName.includes("vercel")) {
    return (
      <svg viewBox="0 0 512 512" className="w-5 h-5 dark:text-white text-black fill-current">
        <path d="M256 48L496 464H16L256 48Z" />
      </svg>
    );
  }
  if (normName.includes("tailwind")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#38bdf8] fill-current">
        <path d="M128 65c-20 0-33.3 10-40 30 10-10 21.7-13.3 35-10 7.6 1.9 13 7.4 19 13.5 9.8 10 21.1 21.5 46 21.5 20 0 33.3-10 40-30-10 10-21.7 13.3-35 10-7.6-1.9-13-7.4-19-13.5-9.8-10-21.1-21.5-46-21.5zm-64 60c-20 0-33.3 10-40 30 10-10 21.7-13.3 35-10 7.6 1.9 13 7.4 19 13.5 9.8 10 21.1 21.5 46 21.5 20 0 33.3-10 40-30-10 10-21.7 13.3-35 10-7.6-1.9-13-7.4-19-13.5-9.8-10-21.1-21.5-46-21.5z" />
      </svg>
    );
  }
  if (normName.includes("framer") || normName.includes("motion")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#FF007A] fill-current">
        <path d="M0 0h256v128H128l-128 128V128h128L0 0z" />
      </svg>
    );
  }
  if (normName.includes("typescript") || normName.includes("ts")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#3178c6] fill-current">
        <rect width="256" height="256" rx="20" />
        <path d="M132.8 181.6c-4-8.8-6-19.6-6-32.4V80h17.6v68c0 13.6 5.6 20.4 16.8 20.4 11.2 0 16.8-6.8 16.8-20.4V80h17.6v68.4c0 12.8-2 23.6-6 32.4-4 8.8-11.2 13.2-21.6 13.2s-21.2-4.4-25.2-12.4zm54.4-60.8V80H220v40.8h-32.8z" className="fill-white" />
      </svg>
    );
  }
  if (normName.includes("mongo")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#47A248] fill-current">
        <path d="M128 0C116.5 49 97.4 97.4 97.4 135.5c0 38 30.6 69.3 30.6 92.5 0-23.2 30.6-54.5 30.6-92.5C158.6 97.4 139.5 49 128 0zm0 183.1c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z" />
      </svg>
    );
  }
  if (normName.includes("stripe")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#635BFF] fill-current">
        <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128zm-119.8-59.5c0-10.4-8.4-14.8-22.1-14.8-16.7 0-37.4 5.9-52.9 14.3v27c15-8.7 34.6-13.4 49-13.4 7.6 0 10.9 1.9 10.9 5.3 0 11.8-50.6 15.6-50.6 47.9 0 23.3 18.2 35.7 44.2 35.7 18.4 0 34.6-5.9 44.5-12.7v10.9h27V105.7c0-23.3-18.1-37.2-50-37.2-11.5 0-23.3 2.1-32.2 6.6l4.2 21.8c8.8-4.2 20.6-6 29.3-6 8.7 0 12.1 2.2 12.1 6.1 0 12.2-46.3 16.3-46.3 46.9 0 10.6 7.6 14.8 17.5 14.8 15.6 0 28.7-7.9 34.6-16.7V68.5z" />
      </svg>
    );
  }
  if (normName.includes("prisma")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#1b223c] dark:text-white fill-current">
        <path d="M128 0L16 64v128l112 64 112-64V64L128 0zm88 177.3l-88 50.3-88-50.3V78.7l88-50.3 88 50.3v98.6z" />
      </svg>
    );
  }
  if (normName.includes("docker")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#2496ed] fill-current">
        <path d="M236.4 104.5c-4-4-10-5.7-15.6-4.5 1.7-8.7 1.4-17.8-1.1-26.4-1-3.3-3.6-5.6-7-5.9-20.1-1.9-38.4 7.2-49 23-4-2-8.4-3.1-13-3.1h-85v48.6c0 10.6 8.6 19.2 19.2 19.2h6.4v12.8c0 3.5 2.9 6.4 6.4 6.4h96c3.5 0 6.4-2.9 6.4-6.4v-12.8h30.4c17.7 0 32-14.3 32-32-.1-11.2-5.9-21.2-14.7-27.9zm-136.2 3.1h12.8v12.8H100.2v-12.8zm25.6 0h12.8v12.8h-12.8v-12.8zm-51.2 0h12.8v12.8H74.6v-12.8zm25.6-25.6h12.8v12.8H100.2V82zm25.6 0h12.8v12.8h-12.8V82zm-51.2 0h12.8v12.8H74.6V82z" />
      </svg>
    );
  }
  if (normName.includes("graphql")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#e10098] fill-current">
        <path d="M128 0L24.7 60v120L128 240l103.3-60V60L128 0zm82.8 168.3L128 217.4l-82.8-49.1V82.6L128 33.5l82.8 49.1v85.7z" />
      </svg>
    );
  }
  if (normName.includes("redis")) {
    return (
      <svg viewBox="0 0 256 256" className="w-5 h-5 text-[#d82c20] fill-current">
        <path d="M128 0L16 64l112 64 112-64L128 0zm0 128L16 192l112 64 112-64-112-64zm0-32l80-45.7L128 9.1 48 50.3 128 96z" />
      </svg>
    );
  }

  // Fallback default icon
  return <Zap className="w-5 h-5 text-primary" />;
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    quote: "The team delivered a complex marketplace ahead of schedule. Their solution-oriented approach saved us months of development time.",
    company: "TechFlow Inc.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at RetailPro",
    quote: "CypherTech transformed our legacy CRM into a high-performance cloud solution. Their attention to detail and commitment to quality is unmatched.",
    company: "RetailPro",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Founder of GreenLoop",
    quote: "Working with CypherTech was a breeze. They understood our vision perfectly and built a scalable platform that our users absolutely love.",
    company: "GreenLoop",
    rating: 5
  },
  {
    id: 4,
    name: "Marcus Miller",
    role: "Director of Ops at Nexa",
    quote: "Their dynamic problem solving and structural execution helped us scale operations globally. Truly elite software engineering.",
    company: "Nexa Global",
    rating: 5
  },
  {
    id: 5,
    name: "Emily Watson",
    role: "Product Lead at CoreSaaS",
    quote: "They delivered the project ahead of schedule with robust visual design and clean, modular code. A phenomenal team.",
    company: "CoreSaaS",
    rating: 5
  },
  {
    id: 6,
    name: "David Cole",
    role: "Founder of SaaSify",
    quote: "From initial consultation to deployment, the process was seamless, transparent, and highly professional. Highly recommended.",
    company: "SaaSify",
    rating: 5
  }
];

const capabilities = [
  {
    title: "Authentication",
    desc: "Robust OAuth and JWT integration with complex role-based access policies to protect sensitive information.",
    icon: ShieldCheck,
    color: "text-primary bg-primary/10 border-primary/20"
  },
  {
    title: "Responsive Design",
    desc: "Mobile-first, fluid responsive layouts engineered to render perfectly on all devices and screen sizes.",
    icon: Layout,
    color: "text-secondary bg-secondary/10 border-secondary/20"
  },
  {
    title: "SEO Optimization",
    desc: "Advanced search engine tuning with structured JSON-LD schemas, sitemaps, and indexing strategies.",
    icon: Globe,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20"
  },
  {
    title: "Custom Design",
    desc: "Hand-crafted visually stunning user interfaces aligned specifically with your unique brand identity.",
    icon: Sparkles,
    color: "text-accent bg-accent/10 border-accent/20"
  },
  {
    title: "Cloud Hosting",
    desc: "High-availability, horizontally-scalable cloud hosting deployments across Vercel, AWS, or GCP.",
    icon: Zap,
    color: "text-green-400 bg-green-500/10 border-green-500/20"
  },
  {
    title: "Queue Management",
    desc: "Integrated background worker architecture (BullMQ, Redis) to execute high-volume batch processing smoothly.",
    icon: Clock,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
  }
];

const timelineSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We analyze your technical goals, evaluate project feasibility, and chart a detailed architectural roadmap.",
    duration: "1-2 days"
  },
  {
    num: "02",
    title: "Design & Proposal",
    desc: "We outline high-fidelity mockups, structure data schemas, and draft a transparent, structured project proposal.",
    duration: "3-5 days"
  },
  {
    num: "03",
    title: "Development",
    desc: "Our elite engineers write clean, typed code, commit to modular practices, and provide continuous updates.",
    duration: "1-2 weeks"
  },
  {
    num: "04",
    title: "Deployment",
    desc: "We test codebases fully, execute multi-stage deployments, configure domain routes, and launch your product safely.",
    duration: "2-3 days"
  },
  {
    num: "05",
    title: "Maintenance",
    desc: "We provide comprehensive uptime guarantees, schedule priority updates, and support continuous feature additions.",
    duration: "Ongoing"
  }
];

const techStack = [
  "React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Vercel", "Tailwind CSS", "Framer Motion",
  "TypeScript", "MongoDB", "Stripe", "Prisma", "Docker", "GraphQL", "Redis"
];

function ScrollAnimatedSection({ children, className = "", delay = 0, yOffset = 30 }: { children: React.ReactNode, className?: string, delay?: number, yOffset?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [basePlan, setBasePlan] = useState<"starter" | "growth" | "enterprise">("growth");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  // Custom contact state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("India");
  const [projectType, setProjectType] = useState("Web Apps");
  const [budget, setBudget] = useState("₹1,00,000 - ₹2,00,000");
  const [message, setMessage] = useState("");

  const budgetOptions = {
    USD: [
      "$2,500 - $5,000",
      "$5,000 - $10,000",
      "$10,000 - $25,000",
      "$25,000+"
    ],
    INR: [
      "₹50,000 - ₹1,00,050",
      "₹1,00,000 - ₹2,00,000",
      "₹2,00,000 - ₹5,00,000",
      "₹5,00,050+"
    ]
  };

  // Geolocation detection
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code !== "IN") {
          setCurrency("USD");
          setCountry("United States");
          setBudget("$5,000 - $10,000");
        }
      })
      .catch((err) => console.log("IP Geolocation check error:", err));
  }, []);

  const pricingEstimates = {
    USD: { starter: 2499, growth: 6999, enterprise: 14999 },
    INR: { starter: 49999, growth: 149999, enterprise: 299999 }
  };

  const addonsPrices = {
    USD: {
      "Advanced SEO": 799,
      "E-commerce": 1499,
      "Analytics": 499,
      "Custom Dashboard": 2499,
      "Email System": 599,
      "Security": 999
    },
    INR: {
      "Advanced SEO": 14999,
      "E-commerce": 29999,
      "Analytics": 9999,
      "Custom Dashboard": 49999,
      "Email System": 11999,
      "Security": 19999
    }
  };

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    const basePrice = pricingEstimates[currency][basePlan];
    const ratesMap = addonsPrices[currency] as Record<string, number>;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + Math.round((ratesMap[addon] || 0) * 0.4), 0);
    return basePrice + addonsPrice;
  };

  const formatCurrency = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  const handleCustomRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `Project Type: ${projectType}\nCountry: ${country}\nBudget: ${budget}\nEstimated Total: ${formatCurrency(calculateTotal())}\nSelected Plan: ${basePlan}\nAdd-ons: ${selectedAddons.join(", ")}\n\nDetails: ${message}`,
          company: "CypherTech Quick Request"
        })
      });
      if (res.ok) {
        setFormStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setSelectedAddons([]);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="flex flex-col">
      {/* === HERO ============================================ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-16 pb-24 overflow-hidden mesh-bg">
        {/* Glow orbs */}
        <div className="orb orb-primary w-[750px] h-[750px] -top-36 left-1/2 -translate-x-1/2 opacity-35" style={{ animation: "float-up 9s ease-in-out infinite" }} />
        <div className="orb orb-violet w-[450px] h-[450px] top-1/3 -left-36 opacity-30" style={{ animation: "float-up 11s ease-in-out infinite 1s" }} />
        <div className="orb orb-secondary w-[400px] h-[400px] top-1/4 -right-24 opacity-25" style={{ animation: "float-up 10s ease-in-out infinite 2s" }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 text-left space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-card border-slate-200/50 dark:border-white/10 text-sm font-semibold"
              style={{ animation: "badge-glow 3s ease-in-out infinite" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-gradient">Next-Gen Engineering Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-glow" />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-bold leading-[1.08] tracking-tight">
              We Build Websites <br />
              <span className="text-gradient">That Scale With You.</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-foreground/60 leading-relaxed max-w-2xl font-medium">
              High-performance engineering, stunning design, and reliable delivery for modern startups and enterprise teams. We bridge tech architecture with human-centric solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/projects"
                className="group btn-gradient text-white px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 shimmer shadow-lg shadow-primary/20"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#process"
                className="group px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 glass-card hover:border-primary/40 hover:bg-primary/5 transition-all text-slate-800 dark:text-foreground border-slate-200/80 dark:border-white/10"
              >
                How We Work
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Metrics Panel */}
          <div className="lg:col-span-5 relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative p-8 rounded-[2.5rem] glass-card border-slate-200/60 dark:border-white/10 shadow-2xl space-y-8 overflow-hidden neon-border"
            >
              <div className="absolute top-0 right-0 w-48 h-48 orb orb-primary opacity-20" />
              <h3 className="text-lg font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary animate-pulse" /> Engineering Dashboard
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 pt-2">
                {[
                  { val: "20+", label: "Projects Delivered", desc: "Production-grade codebases running globally", color: "text-primary border-primary/20" },
                  { val: "2+ Years", label: "Core Experience", desc: "Specialized Next.js & Node.js architecture", color: "text-secondary border-secondary/20" },
                  { val: "98%", label: "Client Satisfaction", desc: "Long-term partnerships and ongoing support", color: "text-green-400 border-green-500/20" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex items-start gap-4 hover:bg-slate-500/10 dark:hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 font-display font-bold text-lg text-primary border border-slate-200/60 dark:border-white/10">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold font-display text-slate-800 dark:text-foreground">{stat.val}</div>
                      <div className="text-sm font-bold text-slate-700 dark:text-foreground/80">{stat.label}</div>
                      <div className="text-xs text-slate-400 dark:text-foreground/40 font-medium">{stat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === PROCESS TIMELINE ================================= */}
      <section id="process" className="px-6 py-28 relative overflow-hidden bg-slate-50 dark:bg-[#020617] border-y border-slate-200/60 dark:border-white/5">
        <div className="orb orb-violet w-[600px] h-[600px] -bottom-40 -left-20 opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollAnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-foreground">
              From Idea to <span className="text-gradient">Live Product.</span>
            </h2>
            <div className="h-[2.5px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
            <p className="text-slate-500 dark:text-foreground/50 leading-relaxed font-medium">
              We operate with absolute transparency and high structural execution, transforming your concepts into scalable, clean products in weeks.
            </p>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8" delay={0.15}>
            {/* Left timeline buttons */}
            <div className="lg:col-span-5 space-y-4 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 top-10 bottom-8 w-[2px] bg-gradient-to-b from-primary via-violet-500 to-secondary opacity-25" />

              {timelineSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl flex items-center gap-6 border transition-all duration-300 relative z-10",
                    activeStep === idx
                      ? "bg-slate-100 dark:bg-white/5 border-primary/50 dark:border-primary/50 shadow-[0_4px_24px_rgba(99,102,241,0.08)] dark:shadow-[0_4px_24px_rgba(99,102,241,0.15)]"
                      : "bg-transparent border-transparent hover:bg-slate-200/40 dark:hover:bg-white/2"
                  )}
                >
                  <div
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center font-display font-bold border transition-all duration-300",
                      activeStep === idx
                        ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                        : "bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-foreground/40 border-slate-200/80 dark:border-white/10"
                    )}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h4 className={cn("font-bold transition-colors", activeStep === idx ? "text-primary" : "text-slate-700 dark:text-foreground/60")}>
                      {step.title}
                    </h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-400 dark:text-foreground/35">
                      {step.duration}
                    </span>
                  </div>
                  <ChevronRight className={cn("w-5 h-5 text-slate-400 dark:text-foreground/20 transition-transform", activeStep === idx ? "rotate-90 text-primary" : "")} />
                </button>
              ))}
            </div>

            {/* Right step details */}
            <div className="lg:col-span-7 h-full min-h-[300px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 md:p-12 rounded-[2.5rem] glass-card border-slate-200/80 dark:border-white/10 shadow-2xl relative w-full space-y-6 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 orb orb-secondary opacity-15" />
                  <div className="text-6xl font-display font-bold text-primary/10 tracking-widest absolute top-6 right-8">
                    {timelineSteps[activeStep].num}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Stage {timelineSteps[activeStep].num}
                  </span>

                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground">
                    {timelineSteps[activeStep].title}
                  </h3>

                  <p className="text-slate-600 dark:text-foreground/60 text-lg leading-relaxed font-medium">
                    {timelineSteps[activeStep].desc}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-xs font-semibold text-slate-500 dark:text-foreground/50">
                      ⚡ Priority Delivery
                    </span>
                    <span className="px-4 py-2 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-xs font-semibold text-slate-500 dark:text-foreground/50">
                      📅 {timelineSteps[activeStep].duration} Estimated
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* === CORE CAPABILITIES =============================== */}
      <section id="services" className="px-6 py-28 relative overflow-hidden bg-background">
        <div className="orb orb-primary w-[500px] h-[500px] -top-20 -right-20 opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollAnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-foreground">
              Everything You Need, <span className="text-gradient">Built In.</span>
            </h2>
            <div className="h-[2.5px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
            <p className="text-slate-550 dark:text-foreground/50 leading-relaxed font-medium">
              We package every project with elite technical capabilities, ensuring zero bottlenecks in security, responsiveness, or hosting scaling.
            </p>
          </ScrollAnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {capabilities.map((cap, idx) => (
              <ScrollAnimatedSection
                key={idx}
                delay={idx * 0.08}
                className="flex"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 rounded-3xl glass-card border-slate-200/60 dark:border-white/10 hover:border-primary/20 transition-all flex flex-col space-y-5 cursor-crosshair group relative overflow-hidden w-full"
                >
                  {/* Subtle card grid effect */}
                  <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 group-hover:scale-105 transition-transform duration-300", cap.color)}>
                    <cap.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-slate-800 dark:text-foreground group-hover:text-primary transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-slate-550 dark:text-foreground/50 text-sm leading-relaxed font-medium flex-grow">
                    {cap.desc}
                  </p>
                </motion.div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === TECH STACK MARQUEE ============================== */}
      <ScrollAnimatedSection yOffset={20}>
        <section className="py-16 relative overflow-hidden bg-slate-50 dark:bg-[#020617] border-y border-slate-200/60 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-foreground/30">Technologies We Master</span>
          </div>
          <div className="relative flex overflow-x-hidden">
            <div className="marquee-track flex gap-8 whitespace-nowrap">
              {techStack.concat(techStack).map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-sm font-semibold text-slate-700 dark:text-foreground/60 hover:text-primary dark:hover:text-white hover:border-primary/30 transition-all duration-300 cursor-default shadow-sm dark:shadow-none"
                >
                  <TechLogo name={tech} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* === OUR ECOSYSTEM =================================== */}
      <section id="ecosystem" className="px-6 py-28 relative overflow-hidden bg-background">
        <div className="orb orb-primary w-[500px] h-[500px] top-0 left-0 opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollAnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">Our Ecosystem</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-foreground">
              Explore Our <span className="text-gradient">Projects.</span>
            </h2>
            <div className="h-[2.5px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
            <p className="text-slate-550 dark:text-foreground/50 leading-relaxed font-medium">
              A scalable micro-frontend architecture hosting our core platforms and tools across a unified network.
            </p>
          </ScrollAnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {[
              { id: "proj1", title: "Project Alpha", desc: "A robust client-server architecture built for scale.", link: "/proj1" },
              { id: "proj2", title: "Project Beta", desc: "An intelligent data processing platform.", link: "/proj2" },
              { id: "proj3", title: "Project Gamma", desc: "Next-generation analytics dashboard.", link: "/proj3" }
            ].map((proj, idx) => (
              <ScrollAnimatedSection key={idx} delay={idx * 0.1} className="flex">
                <Link href={proj.link} className="p-8 rounded-3xl glass-card border-slate-200/60 dark:border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col space-y-5 group relative overflow-hidden w-full cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 orb orb-secondary opacity-20 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover:scale-105 transition-transform duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-slate-800 dark:text-foreground group-hover:text-primary transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-slate-550 dark:text-foreground/50 text-sm leading-relaxed font-medium flex-grow">
                    {proj.desc}
                  </p>
                  <div className="pt-4 flex items-center text-sm font-bold text-primary gap-2">
                    Launch Application <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS ==================================== */}
      <section className="px-6 py-28 relative overflow-hidden bg-background">
        <div className="orb orb-secondary w-[600px] h-[600px] -bottom-40 -right-20 opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          <ScrollAnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-foreground">
              Trusted by <span className="text-gradient">Product Teams.</span>
            </h2>
            <div className="h-[2.5px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
            <p className="text-slate-550 dark:text-foreground/50 leading-relaxed font-medium">
              We design and construct high-conversion platforms for teams and startups who trust our execution standards.
            </p>
          </ScrollAnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {testimonials.map((t, tIdx) => (
              <ScrollAnimatedSection
                key={t.id}
                delay={tIdx * 0.08}
                className="flex"
              >
                <div className="p-8 rounded-3xl glass-card border-slate-200/60 dark:border-white/10 hover:border-primary/20 transition-all relative space-y-6 flex flex-col justify-between w-full">
                  <div className="space-y-4">
                    <div className="flex items-center text-yellow-400 gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-slate-200 dark:text-foreground/5 opacity-50 absolute top-6 right-8" />
                    <p className="text-slate-655 dark:text-foreground/60 italic text-sm leading-relaxed font-medium">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4.5 pt-4 border-t border-slate-200/50 dark:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-slate-200/50 dark:border-white/10 flex items-center justify-center font-display font-bold text-sm text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-800 dark:text-foreground">{t.name}</h5>
                      <span className="text-xs text-slate-400 dark:text-foreground/40 font-semibold">{t.role}</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === START YOUR PROJECT (ESTIMATOR + FORM) ============= */}
      <section id="estimator" className="px-6 py-28 relative overflow-hidden bg-slate-50 dark:bg-[#020617] border-t border-slate-200/60 dark:border-white/5">
        <div className="orb orb-primary w-[700px] h-[700px] top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <ScrollAnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">Start Your Project</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Ready to Build <span className="text-gradient">Something Real?</span>
            </h2>
            <div className="h-[2.5px] w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
            <p className="text-gray-400 leading-relaxed font-medium">
              Calculate your budget estimate interactively below or submit a customized request. Let's build your next high-performance platform.
            </p>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-stretch" delay={0.15}>
            {/* Quick Estimator Card */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="p-8 rounded-[2.5rem] glass-card border-slate-200/80 dark:border-white/10 shadow-2xl flex-grow flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 orb orb-primary opacity-10" />

                <div className="space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
                      <Sparkles className="w-5.5 h-5.5 text-primary animate-pulse" /> Quick Estimator
                    </h3>

                    {/* Geolocation currency toggle */}
                    <div className="flex items-center gap-2">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as any)}
                        className="bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-white focus:outline-none font-bold"
                      >
                        <option value="USD" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">🇺🇸 USD ($)</option>
                        <option value="INR" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">🇮🇳 INR (₹)</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-foreground/40 font-medium">Calculate a baseline pricing for your development scope.</p>

                  {/* Select Base Plan */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/60">Select Your Plan</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "starter", name: "Starter", prices: { USD: "$2,499", INR: "₹49,999" } },
                        { id: "growth", name: "Growth", prices: { USD: "$6,999", INR: "₹1,49,999" } },
                        { id: "enterprise", name: "Enterprise", prices: { USD: "$14,999", INR: "₹2,99,999" } }
                      ].map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setBasePlan(plan.id as any)}
                          className={cn(
                            "p-4 rounded-2xl border text-center flex flex-col gap-1 transition-all duration-300 font-semibold",
                            basePlan === plan.id
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-slate-100 dark:bg-white/2 border-slate-200 dark:border-white/5 text-slate-600 dark:text-foreground/60 hover:border-slate-300 dark:hover:border-white/20"
                          )}
                        >
                          <span className="text-xs">{plan.name}</span>
                          <span className="text-sm font-bold">{plan.prices[currency]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/60">Additional Features</label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.keys(addonsPrices[currency]).map((addon) => {
                        const active = selectedAddons.includes(addon);
                        const ratesMap = addonsPrices[currency] as Record<string, number>;
                        const discountedPrice = Math.round(ratesMap[addon] * 0.4);
                        const formattedOriginal = currency === "INR" ? `₹${ratesMap[addon].toLocaleString()}` : `$${ratesMap[addon]}`;
                        const formattedDiscounted = currency === "INR" ? `₹${discountedPrice.toLocaleString()}` : `$${discountedPrice}`;
                        return (
                          <button
                            key={addon}
                            type="button"
                            onClick={() => toggleAddon(addon)}
                            className={cn(
                              "p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 font-medium text-xs space-y-1 relative overflow-hidden min-h-[72px]",
                              active
                                ? "bg-white/10 border-secondary text-secondary"
                                : "bg-slate-100 dark:bg-white/2 border-slate-200 dark:border-white/5 text-slate-600 dark:text-foreground/60 hover:border-slate-300 dark:hover:border-white/20"
                            )}
                          >
                            <span className="font-bold pr-6">{addon}</span>
                            <div className="flex items-center gap-1.5 mt-auto">
                              <span className="line-through text-[10px] text-slate-450 dark:text-foreground/35 font-normal">+{formattedOriginal}</span>
                              <span className={cn(
                                "font-bold text-[11px]",
                                active ? "text-secondary" : "text-primary/95 dark:text-secondary/90"
                              )}>+{formattedDiscounted}</span>
                            </div>
                            <span className="absolute top-1 right-1 text-[8px] bg-secondary/15 text-secondary px-1 py-0.5 rounded font-bold border border-secondary/15 scale-90">60% Off</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Estimate Total */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/5 space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-foreground/40">Estimated Total</span>
                    <span className="text-4xl font-display font-bold text-gradient">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-foreground/30 font-medium leading-relaxed">
                    *Estimates are calculated at flat production rates. Custom scope adjustments can change overall cost.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Request Form */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="p-8 rounded-[2.5rem] glass-card border-slate-200/80 dark:border-white/10 shadow-2xl flex-grow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 orb orb-secondary opacity-10" />

                <form onSubmit={handleCustomRequest} className="space-y-5">
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
                    <Mail className="w-5.5 h-5.5 text-secondary" /> Custom Request
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-foreground/40 font-medium">Send detailed custom development requirements directly to our dashboard.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/40">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/40">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/40">Country / Region</label>
                      <select
                        value={country}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCountry(val);
                          if (val === "India") {
                            setCurrency("INR");
                            setBudget("₹1,00,000 - ₹2,00,000");
                          } else {
                            setCurrency("USD");
                            setBudget("$5,000 - $10,000");
                          }
                        }}
                        className="w-full bg-slate-100 dark:bg-[#0d1527] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all"
                      >
                        <option value="United States" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">United States (USD)</option>
                        <option value="India" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">India (INR)</option>
                        <option value="United Kingdom" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">United Kingdom (USD)</option>
                        <option value="Canada" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">Canada (USD)</option>
                        <option value="Australia" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">Australia (USD)</option>
                        <option value="Other" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">Other (USD)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/40">Project Type</label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-[#0d1527] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all"
                      >
                        <option value="Web Apps" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">Web Apps</option>
                        <option value="E-Commerce" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">E-Commerce</option>
                        <option value="Dashboards" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">Dashboards</option>
                        <option value="Custom Project" className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">Custom Project</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/40">Select Budget</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-[#0d1527] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all"
                      >
                        {budgetOptions[currency].map((opt) => (
                          <option key={opt} value={opt} className="text-slate-800 dark:text-white bg-white dark:bg-[#0c1527]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/40">Project Details</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Outline features, scope details, and tech needs here..."
                      className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full py-4.5 rounded-2xl bg-primary text-white font-bold text-sm hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/25 shimmer"
                  >
                    {formStatus === "loading" ? "Submitting Inquiry..." : "Send Request"}
                  </button>

                  {formStatus === "success" && (
                    <p className="text-green-400 text-xs text-center font-bold animate-pulse mt-2 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Inquiry received successfully! Node is notifying our dispatch.
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="text-red-400 text-xs text-center font-bold mt-2">
                      ❌ Failed to process inquiry. Please check network.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}
