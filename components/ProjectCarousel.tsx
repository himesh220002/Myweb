"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Crosshair, Radio, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

const CLIP_CARD = "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_PANEL = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

function CornerBrackets({ color = "rgba(255,70,85,0.5)" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}` }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none" style={{ borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
    </>
  );
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
    const interval = setInterval(() => nextImage(), 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextImage]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden max-w-5xl mx-auto" style={{ clipPath: CLIP_CARD }}>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-20" />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]/60 z-20" />
        <div className="relative bg-[#0F1923] p-3 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
          <CornerBrackets />
          {/* HUD header */}
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#1e2d3a]">
            <span className="text-[11px] tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <Radio className="w-3 h-3 text-[#FF4655] animate-pulse" /> // MEDIA // 01 / 01
            </span>
            <span className="text-[11px] tracking-widest text-[#768079] hidden sm:flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
              <Crosshair className="w-3.5 h-3.5 text-[#FF4655]/60" /> TACTICAL VIEW
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#1e2d3a] bg-[#0a131c]" style={{ clipPath: CLIP_PANEL }}>
            <Image src={images[0].trim()} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4655]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-[#111A23] border border-[#1e2d3a] p-[1px] overflow-hidden max-w-5xl mx-auto"
      style={{ clipPath: CLIP_CARD }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4655] z-20" />
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4655]/50 z-20" />
      <div className="relative bg-[#0F1923] p-3 overflow-hidden" style={{ clipPath: CLIP_CARD }}>
        <CornerBrackets />
        {/* HUD header */}
        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#1e2d3a]">
          <span className="text-[11px] tracking-[0.16em] text-[#768079] flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" /> // MEDIA // {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            <span className="hidden sm:inline text-[#1e2d3a]">—</span>
            <span className="hidden sm:inline text-[#ECE8E1] font-bold tracking-widest">{title.toUpperCase()}</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-[11px] tracking-widest text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
            <Maximize2 className="w-3 h-3 text-[#FF4655]/70" /> TACTICAL CAROUSEL
          </span>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#1e2d3a] bg-[#0a131c] group" style={{ clipPath: CLIP_PANEL }}>
          <AnimatePresence mode="wait">
            {images.map(
              (img, i) =>
                i === currentIndex && (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src={img.trim()}
                      alt={`${title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/40 via-transparent to-transparent" />
                    {/* scanline subtle */}
                    <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgba(236,232,225,0.6)_2px_3px)] pointer-events-none" />
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Valorant crosshair center (subtle) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity hidden md:flex">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-[#FF4655]" />
              <div className="absolute h-full w-[1px] bg-[#FF4655]" />
              <div className="w-1.5 h-1.5 bg-[#FF4655] rotate-45" />
            </div>
          </div>

          {/* Navigation — valorant clipped_buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-3 pointer-events-none">
            <button
              onClick={prevImage}
              className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 bg-[#0F1923]/80 backdrop-blur border border-[#1e2d3a] text-[#ECE8E1] flex items-center justify-center hover:bg-[#FF4655] hover:text-white hover:border-[#FF4655] transition-colors shadow-lg"
              style={{ clipPath: CLIP_BTN }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 bg-[#0F1923]/80 backdrop-blur border border-[#1e2d3a] text-[#ECE8E1] flex items-center justify-center hover:bg-[#FF4655] hover:text-white hover:border-[#FF4655] transition-colors shadow-lg"
              style={{ clipPath: CLIP_BTN }}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* bottom red rail */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4655]" />

          {/* indicators — valorant segmented bars */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0F1923]/80 backdrop-blur border border-[#1e2d3a]" style={{ clipPath: CLIP_BTN }}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#FF4655]" : "w-3 bg-[#1e2d3a] hover:bg-[#768079]"}`}
                style={{ clipPath: index === currentIndex ? CLIP_BTN : undefined }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <span className="ml-2 text-[10px] tracking-widest text-[#768079] hidden sm:inline" style={{ fontFamily: "var(--font-mono)" }}>
              {String(currentIndex + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}
            </span>
          </div>

          {/* corner HUD ticks */}
          <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-[#FF4655]/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-[#FF4655]/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-[#FF4655]/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-[#FF4655]/60 pointer-events-none" />
        </div>

        {/* dot count + title footer */}
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[10px] tracking-[0.14em] text-[#768079]" style={{ fontFamily: "var(--font-mono)" }}>
            // INTEL // FRAME {(currentIndex + 1).toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#768079] flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="w-1 h-1 bg-[#FF4655] animate-pulse" /> AUTO-ROTATE {isHovered ? "PAUSED" : "LIVE"}
          </span>
        </div>
      </div>
    </div>
  );
}
