"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, ChevronRight, MessageSquare, Briefcase, Zap, Building2, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [step, setStep] = useState(1);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ 
        type: "", 
        budget: "", 
        details: "", 
        name: "", 
        email: "",
        phone: "",
        company: ""
    });

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => {
        setError("");
        setStep(step - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.details) {
            setError("Please fill in all required fields (Name, Email, Project Details).");
            return;
        }

        setPending(true);
        setError("");
        
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    message: `[Project Type: ${formData.type}] [Budget: ${formData.budget}]\n\n${formData.details}`,
                }),
            });
            
            if (res.ok) {
                setStep(4); // Success step
                setFormData({ type: "", budget: "", details: "", name: "", email: "", phone: "", company: "" });
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setPending(false);
        }
    };

    const projectTypes = [
        { id: "Web Application", title: "Web Application", icon: Zap },
        { id: "E-Commerce", title: "E-Commerce", icon: Briefcase },
        { id: "Technical Consulting", title: "Technical Consulting", icon: MessageSquare }
    ];

    const budgets = ["Under $10k", "$10k - $25k", "$25k - $50k", "$50k+"];

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 space-y-16 md:space-y-24 relative z-10">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6 shadow-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-700">Get in touch</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] text-slate-900 tracking-tight">
                        Let's Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Something Great.</span>
                    </h1>
                    <p className="text-slate-600 text-xl leading-relaxed font-medium">
                        Tell us about your project, your timeline, and your goals. We'll get back to you within 24 hours with a strategic plan.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Direct Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] shadow-sm space-y-8">
                            <h3 className="text-2xl font-display font-bold text-slate-900">Direct Contact</h3>
                            
                            <div className="space-y-6">
                                <a href="mailto:hello@cyphertech.com" className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                                        <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">satyamhimesh@gmail.com</p>
                                    </div>
                                </a>
                                
                                <a href="tel:+918105542318" className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-md transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                                        <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">+91-8105542318</p>
                                    </div>
                                </a>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                                        <p className="font-bold text-slate-900">Remote Worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
                            <h3 className="text-xl font-bold mb-3 relative z-10">Schedule a Call</h3>
                            <p className="text-white/70 text-sm mb-6 relative z-10 leading-relaxed">
                                Prefer to speak directly? Book a 30-minute discovery call with our technical director.
                            </p>
                            <Link href="#" className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors relative z-10">
                                Open Calendly <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Interactive Multi-Step Form */}
                    <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                        <div className="flex gap-2 mb-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-primary' : 'bg-slate-100'}`} />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h3 className="text-3xl font-display font-bold text-slate-900">What do you need help with?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {projectTypes.map(type => (
                                            <button 
                                                key={type.id} 
                                                onClick={() => setFormData({...formData, type: type.id})}
                                                className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.type === type.id ? 'border-primary bg-primary/5 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                                            >
                                                <type.icon className={`w-8 h-8 mb-4 ${formData.type === type.id ? 'text-primary' : 'text-slate-400'}`} />
                                                <p className="font-bold text-slate-900">{type.title}</p>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="pt-6 flex justify-end">
                                        <button 
                                            onClick={handleNext} 
                                            disabled={!formData.type}
                                            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next Step <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h3 className="text-3xl font-display font-bold text-slate-900">What is your estimated budget?</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {budgets.map(budget => (
                                            <button 
                                                key={budget} 
                                                onClick={() => setFormData({...formData, budget})}
                                                className={`p-6 rounded-2xl border-2 text-center transition-all ${formData.budget === budget ? 'border-primary bg-primary/5 shadow-md' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                                            >
                                                <p className="font-bold text-slate-900">{budget}</p>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="pt-6 flex justify-between">
                                        <button onClick={handlePrev} className="px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200">Back</button>
                                        <button 
                                            onClick={handleNext} 
                                            disabled={!formData.budget}
                                            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Final Step <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.form key="step3" onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h3 className="text-3xl font-display font-bold text-slate-900">Project Details</h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name *</label>
                                                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email *</label>
                                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="john@example.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone (Optional)</label>
                                                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="+1 (555) 000-0000" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company (Optional)</label>
                                                <input name="company" value={formData.company} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Your Company" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Details *</label>
                                            <textarea required name="details" value={formData.details} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Tell us about the features you need..." />
                                        </div>
                                    </div>
                                    
                                    {error && (
                                        <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                                            {error}
                                        </p>
                                    )}

                                    <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <button type="button" onClick={handlePrev} className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200">Back</button>
                                        <button type="submit" disabled={pending} className="w-full sm:w-auto justify-center bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed">
                                            {pending ? (
                                                <>Sending...</>
                                            ) : (
                                                <>Submit Inquiry <CheckCircle2 className="w-5 h-5" /></>
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-6">
                                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8 border-4 border-emerald-50">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h3 className="text-4xl font-display font-bold text-slate-900">Inquiry Received!</h3>
                                    <p className="text-slate-600 font-medium text-lg max-w-md mx-auto">
                                        Thank you for reaching out. Our engineering team will review your requirements and get back to you within 24 hours.
                                    </p>
                                    <div className="pt-8">
                                        <button onClick={() => setStep(1)} className="text-primary font-bold hover:underline">Submit another inquiry</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}
