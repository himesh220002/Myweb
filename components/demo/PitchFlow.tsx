"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hinglishContent } from "./hinglishSteps";
import {
  MessageSquare,
  Play,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Globe,
  Layers,
  CheckCircle2,
  HelpCircle,
  Clock,
  Check,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  type: "start" | "decision" | "action" | "end";
  connections: string[];
}

const steps: Step[] = [
  {
    id: "start",
    label: "Start Pitch",
    icon: <Play className="w-5 h-5" />,
    type: "start",
    connections: ["busy-check"],
    content: (
      <div className="space-y-4  max-h-[60vh] overflow-y-auto">
        {/* <p className="text-lg font-medium text-foreground">Opening Hook</p> */}
        <h1 className="text-lg font-bold text-primary uppercase">Polite & Respectful</h1>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
          "Hi Doctor, am I speaking with the clinic’s owner? I’m Himesh — I came across your work and it’s impressive.
          But I noticed one gap: while your digital profile is strong, you don’t yet have a dedicated clinic website.
          I took the initiative to build a demo full‑stack platform tailored for your clinic. Are you busy right now?"
        </div>


        <h1 className="text-lg font-bold text-primary uppercase">Energetic & Opportunity‑Focused</h1>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
          "Hello Doctor, I’m Himesh. I was reviewing your clinic’s profile and it’s fantastic — but I realized you don’t yet have a personal clinic website. That’s a missed opportunity for patient trust and bookings. So I went ahead and built a demo full‑stack platform for you. Do you have a moment to explore this?"
        </div>

        <h1 className="text-lg font-bold text-primary uppercase">Empathetic & Patient‑Centric</h1>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
          "Hi Doctor, I’m Himesh. Your clinic’s reputation is excellent, and patients clearly value your work. What I noticed, though, is that while your social presence is strong, there’s no dedicated clinic website to streamline bookings and communication. I’ve built a demo platform to show how this could ease your workload and improve patient comfort. Are you available now, or should I share it for later review?"
        </div>

        <h1 className="text-lg font-bold text-primary uppercase">Business‑Value Angle</h1>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
          "Good day Doctor, I’m Himesh. I admire your clinic’s profile — it’s impressive. But I also noticed there’s no dedicated clinic website yet. That’s where I stepped in: I’ve created a demo full‑stack platform that can reduce admin hours, prevent double bookings, and build long‑term patient trust. Would you like me to walk you through it now, or send it for later?"
        </div>

        <h1 className="text-lg font-bold text-primary uppercase">Casual & Friendly</h1>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
          "Hi Doctor, I’m Himesh. I came across your clinic’s work and it’s awesome. But I noticed one thing missing — a personal clinic website. So I built a demo platform for you, just to show what’s possible. Are you busy right now, or can I quickly share the details?"
        </div>

        <h1 className="text-lg font-bold text-primary uppercase">Direct & Value‑First</h1>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
          "Good morning Doctor, I’m Himesh. I noticed your clinic doesn’t have a website yet, which creates unnecessary friction in patient communication and bookings. I’ve already built a full‑stack demo to show how this can be solved instantly. Do you have five minutes to see how you can save hours each month?"
        </div>
      </div>
    ),
  },
  {
    id: "busy-check",
    label: "Are you busy?",
    icon: <Clock className="w-5 h-5" />,
    type: "decision",
    connections: ["respect-time", "explain-demo"],
    content: (
      <div className="space-y-4">
        <p>Qualifying the prospect's availability. This shows respect for their professional time.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            <strong>Yes:</strong> Move to respect time.
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
            <strong>No:</strong> Proceed to value proposition.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "respect-time",
    label: "Respect Time",
    icon: <ShieldCheck className="w-5 h-5" />,
    type: "action",
    connections: [],
    content: (
      <div className="space-y-4">
        <p>Respect time, share demo later.</p>
        <div className="p-4 rounded-xl bg-muted border border-border italic text-muted-foreground">
          "I completely understand. I'll send you the link so you can check it out when you're free. Looking forward to your thoughts!"
        </div>
      </div>
    ),
  },
  {
    id: "explain-demo",
    label: "Explain Demo",
    icon: <Sparkles className="w-5 h-5" />,
    type: "action",
    connections: ["why-need"],
    content: (
      <div className="space-y-4">
        <p>I created a demo platform showing smart booking, real‑time alerts, and transparent treatment catalogs. This gives you a preview of how your clinic could operate digitally.</p>
      </div>
    ),
  },
  {
    id: "why-need",
    label: "Why need website?",
    icon: <HelpCircle className="w-5 h-5" />,
    type: "decision",
    connections: ["social-media", "ai-build", "practical-benefits"],
    content: (
      <div className="space-y-4 max-h-[50vh] overflow-y-auto">
        <p>Common objections from doctors who rely on social media or AI tools.</p>
        <p>
          Closing Line - “Doctor, think of it this way: your clinic already has a strong reputation.
          A dedicated website makes sure patients can find you, trust you, and book you instantly.
          It’s not just marketing — it’s operational peace of mind.”
        </p>

        <ul className="list-disc space-y-2 pl-4">
          <li>
            <span className="font-semibold">Patient Convenience</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>Patients can book appointments anytime, without calling.</li>
              <li>No more missed calls or messages.</li>
              <li>Reduces phone interruptions during procedures.</li>
              <li>Patients can view treatments, pricing, and FAQs instantly.</li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Brand Trust &amp; Professionalism</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>A dedicated website establishes credibility.</li>
              <li>A clean, modern site builds patient confidence.</li>
              <li>Professional presentation enhances clinic reputation.</li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Operational Efficiency</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>Smart slot validation prevents double bookings.</li>
              <li>Real-time alerts for urgent cases.</li>
              <li>Automated appointment reminders reduce no-shows.</li>
              <li>Centralized patient data improves workflow.</li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Competitive Edge</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>Stand out from clinics relying only on social media.</li>
              <li>Attract tech-savvy patients seeking convenience.</li>
              <li>Offer a superior booking experience.</li>
              <li>Build long-term patient relationships through digital engagement.</li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">24/7 Availability</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>Patients can book appointments anytime, day or night.</li>
              <li>No missed opportunities due to time zone differences.</li>
              <li>Reduced workload for clinic staff.</li>
              <li>Improved patient satisfaction through instant service.</li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Growth &amp; Visibility</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>SEO ensures your clinic shows up in Google searches.</li>
              <li>Patients searching “dentist near me” will find you, not just competitors.</li>
              <li>Integration with social profiles drives traffic to your site.</li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Future‑Proofing</span>
            <ul className="list-disc pl-6 space-y-1">
              <li>Cloud‑ready, scalable for multiple branches.</li>
              <li>Modular design allows adding features like dental imaging or insurance claims.</li>
              <li>AI chatbots and virtual consultations can be integrated later.</li>
            </ul>
          </li>
        </ul>
      </div>

    ),
  },
  {
    id: "social-media",
    label: "Social Media Enough?",
    icon: <Globe className="w-5 h-5" />,
    type: "action",
    connections: ["practical-benefits"],
    content: (
      <div className="space-y-4">
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>Prevents double bookings with smart slot validation.</li>
          <li>Sends instant alerts to admins for urgent cases.</li>
          <li>Builds patient trust with a transparent treatment catalog.</li>
          <li>Tracks revenue and performance with analytics.</li>
          <li>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Visibility vs Functionality
                <ul className="list-disc pl-6">
                  <li>Social platforms show visibility but don’t handle bookings.</li>
                  <li>Patients may miss important info buried in feeds.</li>
                </ul>
              </li>
              <li>
                Patient Experience
                <ul className="list-disc pl-6">
                  <li>No slot validation → risk of double bookings.</li>
                  <li>No secure patient communication or data storage.</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "ai-build",
    label: "AI can build?",
    icon: <Cpu className="w-5 h-5" />,
    type: "action",
    connections: ["practical-benefits"],
    content: (
      <div className="space-y-4">
        <p>AI templates can’t integrate real‑time booking, Socket.io alerts, WhatsApp redirection, Mailgun emails, or analytics dashboards. My solution is customized for dental workflows, not generic.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Limitations of AI Templates
            <ul className="list-disc pl-6 space-y-1">
              <li>AI generates generic designs, not clinic‑specific workflows.</li>
              <li>No compliance with patient data security standards.</li>
              <li>Outputs are surface‑level — mostly static pages without dynamic booking logic.</li>
              <li>Designs lack optimization for medical use cases (e.g., treatment catalogs, patient portals).</li>
            </ul>
          </li>

          <li>
            Missing Integrations
            <ul className="list-disc pl-6 space-y-1">
              <li>No real‑time sync with admins or staff.</li>
              <li>Doesn’t integrate WhatsApp, Mailgun, or analytics dashboards.</li>
              <li>No slot validation or double‑booking prevention.</li>
              <li>No proactive communication features like urgent alerts.</li>
            </ul>
          </li>

          <li>
            Why a Purpose‑Built Website Wins
            <ul className="list-disc pl-6 space-y-1">
              <li>Designed specifically for dental workflows — not generic templates.</li>
              <li>Smart booking system with slot validation and instant alerts.</li>
              <li>Transparent treatment catalog builds patient trust.</li>
              <li>Analytics dashboard tracks revenue and performance.</li>
              <li>Secure patient data handling with role‑based access and JWT authentication.</li>
              <li>Scalable architecture for multiple branches and future features.</li>
            </ul>
          </li>
        </ul>

      </div>
    ),
  },
  {
    id: "practical-benefits",
    label: "Practical Benefits",
    icon: <CheckCircle2 className="w-5 h-5" />,
    type: "action",
    connections: ["tech-stack"],
    content: (
      <div className="space-y-4">
        {/* Practical Benefits */}
        <li>
          <span className="font-semibold">Practical Benefits</span>
          <ul className="space-y-4 pl-6">
            {/* Operational Efficiency */}
            <li>
              <span className="font-medium">Operational Efficiency</span>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <span>Smart slot validation prevents double bookings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <span>Instant alerts for urgent cases improve response time.</span>
                </li>
              </ul>
            </li>

            {/* Patient Trust */}
            <li>
              <span className="font-medium">Patient Trust</span>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <span>Transparent treatment catalog builds confidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <span>Patients can view treatments, pricing, and FAQs instantly.</span>
                </li>
              </ul>
            </li>

            {/* Growth Tracking */}
            <li>
              <span className="font-medium">Growth Tracking</span>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <span>Analytics dashboard tracks revenue and performance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <span>Helps identify which treatments bring the most value.</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>

      </div>
    ),
  },
  {
    id: "tech-stack",
    label: "Tech Stack",
    icon: <Layers className="w-5 h-5" />,
    type: "action",
    connections: ["roi"],
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-xs font-bold text-primary uppercase">Frontend</p>
            <p className="text-sm">Next.js, React 19, Framer Motion</p>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-xs font-bold text-primary uppercase">Backend</p>
            <p className="text-sm">Node.js, Socket.io, Mailgun</p>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-xs font-bold text-primary uppercase">Database</p>
            <p className="text-sm">MongoDB Atlas + Mongoose</p>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-xs font-bold text-primary uppercase">Focus</p>
            <p className="text-sm">Real-time sync, Proactive UI</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "roi",
    label: "Cost vs Benefit (ROI)",
    icon: <TrendingUp className="w-5 h-5" />,
    type: "decision",
    connections: ["security"],
    content: (
      <div className="space-y-4">
        <p>The cost is a one‑time investment in a system that saves admin hours, reduces patient friction, and builds long‑term trust. ROI comes from smoother operations and higher patient retention.</p>
        <ul className="space-y-4 pl-6">
          {/* Cost */}
          <li>
            <span className="font-medium">The Cost</span>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>One‑time investment — no recurring surprises.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>Predictable, bundled hosting with SSL for peace of mind.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>Designed specifically for dental workflows, not generic templates.</span>
              </li>
            </ul>
          </li>

          {/* Benefits */}
          <li>
            <span className="font-medium">The Benefits</span>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>Saves admin hours with automated booking and reminders.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>Reduces patient friction by streamlining communication.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>Builds long‑term trust with transparent treatment catalogs.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-1 text-primary" />
                <span>ROI comes from smoother operations and higher patient retention.</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "security",
    label: "Data Security",
    icon: <ShieldCheck className="w-5 h-5" />,
    type: "action",
    connections: ["scalability"],
    content: (
      <div className="space-y-4">
        <p>Patient data is stored securely in MongoDB Atlas with role‑based access (RBAC) and JWT authentication.</p>
      </div>
    ),
  },
  {
    id: "scalability",
    label: "Scalability",
    icon: <Globe className="w-5 h-5" />,
    type: "action",
    connections: ["discovery"],
    content: (
      <div className="space-y-4">
        <p>The architecture is cloud‑ready and supports multiple branches with real‑time synchronization.</p>
      </div>
    ),
  },
  {
    id: "discovery",
    label: "Patient Discovery",
    icon: <MessageSquare className="w-5 h-5" />,
    type: "action",
    connections: ["custom-features"],
    content: (
      <div className="space-y-4">
        <p>SEO optimization, Google ranking strategies, and integration with your existing social profiles help patients find the site.</p>
      </div>
    ),
  },
  {
    id: "custom-features",
    label: "Custom Features",
    icon: <Sparkles className="w-5 h-5" />,
    type: "action",
    connections: ["close"],
    content: (
      <div className="space-y-4">
        <p>The modular design allows adding new workflows (e.g., dental imaging, insurance claims) without disruption.</p>
      </div>
    ),
  },
  {
    id: "close",
    label: "Close & Call to Action",
    icon: <CheckCircle2 className="w-5 h-5" />,
    type: "end",
    connections: [],
    content: (
      <div className="space-y-4 text-center">
        <p className="text-xl font-semibold text-primary">Invitation</p>
        <p>Invite the doctor to see the demo and discuss implementation.</p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-transform">
          View Live Demo
        </button>
      </div>
    ),
  },
];

export default function PitchFlow() {
  const [activeStep, setActiveStep] = useState<string>("start");
  const [isHinglish, setIsHinglish] = useState(false);

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];
  const displayContent = isHinglish && hinglishContent[currentStep.id]
    ? hinglishContent[currentStep.id]
    : currentStep.content;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] py-12">
      {/* Sidebar Flow Navigation */}
      <div className="lg:col-span-5 space-y-4 overflow-y-auto max-h-[90vh] pr-4 custom-scrollbar scroll-smooth">
        <div className="sticky top-0 bg-background backdrop-blur-2xl p-4 z-20 pb-4 mb-6 border-b border-border/50">
          <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Pitch Roadmap</h3>
          <p className="text-sm text-muted-foreground mt-1">Click any phase to explore details</p>
        </div>

        <div className="relative pl-10 space-y-4">
          {/* Vertical Progress Line */}
          <div className="absolute left-[1.125rem] top-3 bottom-3 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = steps.findIndex(s => s.id === activeStep) > index;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative group cursor-pointer transition-all duration-500",
                  isActive ? "translate-x-2" : "hover:translate-x-1"
                )}
                onClick={() => setActiveStep(step.id)}
              >
                {/* Connector Dot */}
                <div className={cn(
                  "absolute -left-[2.1rem] top-4 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center transition-all duration-500 z-10",
                  isActive ? "bg-primary scale-125 glow-primary shadow-xl shadow-primary/40" :
                    isCompleted ? "bg-primary/40" : "bg-muted border-border"
                )}>
                  {isCompleted ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : (
                    <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-white" : "bg-muted-foreground")} />
                  )}
                </div>

                <div className={cn(
                  "p-5 rounded-2xl transition-all duration-500",
                  isActive
                    ? "glass-card border-primary/40 bg-primary/5"
                    : "glass border-transparent hover:border-border/50 hover:bg-muted/20"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2.5 rounded-xl transition-all duration-500",
                      isActive ? "bg-primary text-primary-foreground scale-110" : "bg-muted/50 text-muted-foreground"
                    )}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-bold text-sm tracking-tight transition-colors duration-300",
                        isActive ? "text-primary" : "text-foreground/80"
                      )}>
                        {step.label}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={cn(
                          "text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-md",
                          isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground/60"
                        )}>
                          {step.type}
                        </span>
                        {isCompleted && <span className="text-[9px] font-bold text-primary/60 uppercase">Completed</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-7 relative">
        {/* Language Toggle — always visible above the panel */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsHinglish(!isHinglish)}
            className="relative flex items-center gap-1 p-1 rounded-full bg-muted border border-border shadow-sm cursor-pointer"
            title={isHinglish ? "Switch to English" : "Switch to Hinglish"}
          >
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${!isHinglish ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
              }`}>
              🇬🇧 EN
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isHinglish ? "bg-orange-500 text-white shadow" : "text-muted-foreground"
              }`}>
              🇮🇳 HI
            </span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            <div className="h-full glass-card p-10 md:p-12 rounded-[2.5rem] flex flex-col relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors duration-700" />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-5">
                  <div className="p-5 rounded-[1.5rem] bg-primary/10 text-primary glow-primary ring-1 ring-primary/20">
                    {currentStep.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">{currentStep.label}</h2>
                    <div className="flex items-center gap-3 mt-1.5">
                      <p className="text-sm font-medium text-muted-foreground">Step {steps.findIndex(s => s.id === currentStep.id) + 1} of {steps.length}</p>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-xs font-bold text-primary uppercase tracking-tighter">{currentStep.type} Phase</span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <motion.div
                      key={`${currentStep.id}-${isHinglish ? "hi" : "en"}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-lg leading-relaxed text-foreground/90 font-medium"
                    >
                      {displayContent}
                    </motion.div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-between pt-8 border-t border-border/50 gap-4">
                  <button
                    disabled={activeStep === steps[0].id}
                    onClick={() => {
                      const idx = steps.findIndex(s => s.id === activeStep);
                      if (idx > 0) setActiveStep(steps[idx - 1].id);
                    }}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all hover:bg-primary/5 rounded-xl"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Previous Phase
                  </button>

                  <div className="flex flex-wrap gap-3">
                    {currentStep.connections.map((connId) => (
                      <button
                        key={connId}
                        onClick={() => setActiveStep(connId)}
                        className="btn-gradient px-8 py-3.5 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
                      >
                        <div className="flex items-center gap-2">
                          {steps.find(s => s.id === connId)?.label || "Next"}
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                    {currentStep.connections.length === 0 && currentStep.type !== "end" && (
                      <button
                        onClick={() => {
                          const idx = steps.findIndex(s => s.id === activeStep);
                          if (idx < steps.length - 1) setActiveStep(steps[idx + 1].id);
                        }}
                        className="btn-gradient px-8 py-3.5 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
                      >
                        <div className="flex items-center gap-2">
                          Next Phase
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>


      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary), 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary), 0.3);
        }
      `}</style>
    </div>
  );
}
