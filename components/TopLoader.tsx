"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Direct top loader — time-based route transition bar (not scroll-linked).
 * Shows instantly on pathname change, sweeps 0 → ~85%, then completes to 100%.
 * Also forces a direct (instant) scroll-to-top on every route change.
 */
export default function TopLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timers = useRef<NodeJS.Timeout[]>([]);
  const firstMount = useRef(true);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    // Instant snap to top on every route change — no scroll animation.
    // (Root cause of the sweep was `scroll-behavior: smooth` on <html>,
    // which made Next's automatic scroll-to-top animate. That's now `auto`
    // in globals.css; this is a belt-and-braces instant snap.)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    // Skip loader animation on very first mount — just do a quick direct sweep
    // so initial page load also gets the top-loader feel.
    clearTimers();
    setActive(true);
    setProgress(0);

    // Direct sweep: jump straight across the top (no scroll dependency)
    timers.current.push(setTimeout(() => setProgress(45), 30));
    timers.current.push(setTimeout(() => setProgress(75), 180));
    timers.current.push(setTimeout(() => setProgress(90), 380));
    timers.current.push(
      setTimeout(() => {
        setProgress(100);
        timers.current.push(
          setTimeout(() => {
            setActive(false);
            setProgress(0);
          }, 220)
        );
      }, firstMount.current ? 550 : 450)
    );
    firstMount.current = false;

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="top-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
        >
          {/* track */}
          <div className="relative h-[3px] w-full bg-transparent">
            {/* direct fill — width driven by time, not scroll */}
            <div
              className="absolute left-0 top-0 h-full bg-[#FF4655] shadow-[0_0_12px_rgba(255,70,85,0.8)]"
              style={{
                width: `${progress}%`,
                transition: "width 0.25s ease-out",
              }}
            />
            {/* leading tip */}
            <div
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-[#ECE8E1]/90 to-[#ECE8E1]"
              style={{
                left: `calc(${progress}% - 2rem)`,
                transition: "left 0.25s ease-out",
                opacity: progress > 2 && progress < 100 ? 0.9 : 0,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
