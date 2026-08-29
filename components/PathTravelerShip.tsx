"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export default function PathTravelerShip() {
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate flame intensity based on absolute velocity
  // When scrolling fast (vel > 0.1 or vel < -0.1), scale up the flame
  const flameScale = useTransform(smoothVelocity, [-0.5, 0, 0.5], [2.5, 0.8, 2.5]);
  const flameOpacity = useTransform(smoothVelocity, [-0.5, 0, 0.5], [1, 0.4, 1]);

  // Flight Path Mapping
  const xPos = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["90vw", "10vw", "90vw", "10vw", "90vw", "60vw"]
  );

  const yPos = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["10vh", "35vh", "45vh", "65vh", "85vh", "90vh"]
  );

  // Smoothly turn the ship at the corners
  // Use positive angles for left-down (254, 251) so that interpolation to right-down (99, 106)
  // passes through 180 (DOWN) instead of 0 (UP). This prevents the ship from doing a backflip!
  const baseAngle = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1],
    [245, 245, 120, 120, 235, 235, 125, 125, 210, 220]
  );

  // Flip the ship 180 degrees when scrolling backwards
  const flipSpring = useSpring(0, { damping: 25, stiffness: 200 });

  useEffect(() => {
    return scrollVelocity.on("change", (vel) => {
      // Small threshold to prevent jittering when stopping
      if (vel < -0.01) {
        flipSpring.set(180);
      } else if (vel > 0.01) {
        flipSpring.set(0);
      }
    });
  }, [scrollVelocity, flipSpring]);

  // Combine base path angle with the reverse flip U-turn
  const rotateZ = useMotionTemplate`calc(${baseAngle}deg + ${flipSpring}deg)`;

  // 3D Rotation Mapping (Banking & Pitching during turns)
  // rotateY = banking (roll).
  const tiltY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.25, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.75, 0.8, 0.85, 1],
    [0, 5, 10, 5, -5, -10, -5, 5, 10, 5, -5, -10, 0, 0]
  );

  // rotateX = pitch. When flying straight, it pitches down slightly (-10). 
  // During corners, it pulls up (35) to carve the turn.
  const tiltX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.25, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.75, 0.8, 0.85, 1],
    [-10, -10, 5, -10, -10, 5, -10, -10, 5, -10, -10, 5, -10, -10]
  );

  return (
    <motion.div
      style={{
        perspective: "1000px",
        position: "fixed",
        top: "-1.5rem", // offset half height
        left: "-1.5rem", // offset half width
        x: xPos,
        y: yPos,
        zIndex: 50,
        pointerEvents: "none",
      }}
      className="hidden 2xl:flex w-16 h-16 items-center justify-center"
    >
      <motion.div style={{ rotateZ, rotateY: tiltY, rotateX: tiltX }} className="relative w-full h-full flex items-center justify-center">

        {/* Engine Fire (Base Glow) */}
        <motion.div
          style={{
            scale: flameScale,
            opacity: flameOpacity,
            transformOrigin: "top center",
          }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-10 bg-gradient-to-t from-transparent via-red-600 to-yellow-400 blur-md rounded-full mix-blend-screen"
        />

        {/* Engine Fire (Core Brightness) */}
        <motion.div
          style={{
            scale: flameScale,
            opacity: flameOpacity,
            transformOrigin: "top center",
          }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3 h-10 bg-white blur-[8px] rounded-full mix-blend-screen"
        />

        {/* Ship Image */}
        <img
          src="/assets/mid-ship.png"
          alt="Traveler Ship"
          className="w-[120%] h-[120%] object-contain drop-shadow-[0_15px_25px_rgba(255,50,0,0.4)] relative z-10"
        />
      </motion.div>
    </motion.div>
  );
}
