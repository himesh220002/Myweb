"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
    images: string[];
    title: string;
}

export default function ProjectCarousel({ images, title }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered, nextImage]);

    if (!images || images.length === 0) {
        return null;
    }

    if (images.length === 1) {
        return (
            <div className="relative aspect-2/1 w-full max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-200 shadow-2xl group">
                <img
                    src={images[0]}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-[2s]"
                />
            </div>
        );
    }

    return (
        <div
            className="relative aspect-2/1 mx-auto max-w-5xl w-full rounded-[1rem] overflow-hidden bg-slate-50 border border-slate-200 shadow-2xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${title} screenshot ${currentIndex + 1}`}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={prevImage}
                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-800 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextImage}
                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-800 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
