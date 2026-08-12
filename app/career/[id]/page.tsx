"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Briefcase, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { roles } from "@/lib/data/roles";

export default function ApplyPage() {
    const { id } = useParams();
    const role = roles.find(r => r.id.toString() === id);

    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [cv, setCv] = useState<File | null>(null);
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "",
        phone: "",
        portfolio: "",
        coverLetter: ""
    });

    if (!role) return notFound();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCv(e.target.files[0]);
        }
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.coverLetter) {
            setError("Please fill in all required fields (Name, Email, Cover Letter).");
            return;
        }

        setPending(true);
        setError("");
        
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("company", formData.portfolio ? `Portfolio: ${formData.portfolio}` : "");
            data.append("message", `[Role Applied: ${role.title}]\n\nCover Letter:\n${formData.coverLetter}`);
            
            if (cv) {
                data.append("cv", cv);
            }

            const res = await fetch("/api/contact", {
                method: "POST",
                body: data,
            });
            
            if (res.ok) {
                setSuccess(true);
                setFormData({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
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

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30 relative">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-32 relative z-10 space-y-12">
                <Link
                    href="/career"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Careers
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${role.color}`}>
                            {role.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                            <MapPin className="w-4 h-4" /> {role.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                            <Calendar className="w-4 h-4" /> {role.type}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">
                        Apply for {role.title}
                    </h1>
                    <p className="text-slate-600 font-medium text-lg max-w-2xl">
                        {role.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm"
                >
                    {success ? (
                        <div className="text-center py-12 space-y-6">
                            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8 border-4 border-emerald-50">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-slate-900">Application Submitted!</h3>
                            <p className="text-slate-600 font-medium text-lg max-w-md mx-auto">
                                Thank you for applying. Our talent team will review your application and get back to you shortly.
                            </p>
                            <div className="pt-8">
                                <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline">Submit another application</button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Your Details</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name *</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Jane Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email *</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone (Optional)</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Portfolio / LinkedIn</label>
                                    <input name="portfolio" value={formData.portfolio} onChange={handleChange} type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="https://..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Upload CV / Resume (PDF, DOCX)</label>
                                <input name="cv" onChange={handleFileChange} type="file" accept=".pdf,.doc,.docx" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Cover Letter *</label>
                                <textarea required name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={6} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Tell us why you're a great fit for this role..." />
                            </div>
                            
                            {error && (
                                <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                                    {error}
                                </p>
                            )}

                            <div className="pt-4">
                                <button type="submit" disabled={pending} className="w-full md:w-auto justify-center bg-slate-900 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                                    {pending ? (
                                        <>Submitting...</>
                                    ) : (
                                        <>Submit Application <CheckCircle2 className="w-5 h-5" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
