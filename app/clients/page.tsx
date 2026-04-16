"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const clients = [
    { name: "Yamaha", industry: "Automotive", solution: "Digital Showroom & CRM", logo: "Y" },
    { name: "SmileSync", industry: "Healthcare", solution: "Patient Management", logo: "S" },
    { name: "EcoDrive", industry: "Marketplace", solution: "E-commerce Engine", logo: "E" },
    { name: "TechNitro", industry: "Digital Agency", solution: "Custom Internal Tools", logo: "T" },
];

const testimonials = [
    {
        author: "Client A",
        role: "CEO, Tech Corp",
        content: "CypherTech transformed our project delivery timeline. Their continuous update cycle is a game changer.",
    },
    {
        author: "Client B",
        role: "Marketing Director",
        content: "The attention to detail and professional tone of the solution provided was exactly what we needed.",
    }
];

export default function ClientsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Clients & <span className="text-gradient">Partners</span></h1>
                <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
                    Trusted by innovative companies to deliver high-performance digital solutions across various industries.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                {clients.map((client, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-xl group-hover:scale-110 transition-transform">
                            {client.logo}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{client.name}</h3>
                        <p className="text-xs text-foreground/40 uppercase tracking-widest">{client.industry}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {testimonials.map((t, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-primary/5 border border-primary/10 relative"
                    >
                        <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10" />
                        <p className="text-xl leading-relaxed italic mb-8 relative z-10 text-foreground/80">
                            &quot;{t.content}&quot;
                        </p>
                        <div>
                            <h4 className="font-bold text-lg">{t.author}</h4>
                            <p className="text-sm text-foreground/40">{t.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
