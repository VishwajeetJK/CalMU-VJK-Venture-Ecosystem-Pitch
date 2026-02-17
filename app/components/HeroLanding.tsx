"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import OrbitalDiagram from "./OrbitalDiagram";
import ParticleBackground, { type MouseState } from "./ParticleBackground";

export default function HeroLanding() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState<MouseState>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        w: rect.width,
        h: rect.height,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => setMouse(null), []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[85vh] overflow-hidden bg-creamy px-4 pt-24 pb-16 sm:min-h-[90vh] sm:px-6 sm:pt-28 sm:pb-20 lg:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleBackground mouse={mouse} />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
        {/* Left: Copy — heavy-left block, ref format: serif kicker, italic heading, generous spacing */}
        <div className="flex flex-1 flex-col justify-center text-center lg:max-w-[480px] lg:text-left">
          {/* Kicker: serif, title-style, ample space below */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-serif text-base font-bold tracking-wide text-calmu-black sm:text-lg"
          >
            CalMU x SPJ Moonshot Labs & Venture Engine
          </motion.p>
          {/* Primary heading: large bold italic serif, dominant */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-serif text-4xl font-bold italic tracking-tight text-calmu-black sm:mt-6 sm:text-5xl md:text-6xl"
          >
            The Venture Engine for Global Founders.
          </motion.h1>
          {/* Body: sans, off-white/light gray, constrained width */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 font-sans text-sm leading-relaxed text-calmu-black/70 sm:mt-8 sm:text-base"
          >
            Launch a global AI tech business within the SP Jain ecosystem through CalMU Moonshot Labs. Our infrastructure is designed to build, pilot, and scale agentic tools that power both internal ventures and global clients. The system is architected to deliver—not just incubate.
          </motion.p>
          {/* CTA: white capsule, black arrow, significant space above */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 sm:mt-12"
          >
            <Link
              href="#simulator"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-calmu-black bg-white px-6 py-3.5 font-sans text-sm font-semibold text-calmu-black shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition hover:shadow-[0_0_20px_rgba(217,249,157,0.4)] hover:bg-lime/30 focus:outline-none focus:ring-2 focus:ring-lime sm:px-8 sm:py-4"
            >
              Initialize Pilot
              <ArrowRight className="h-5 w-5 text-calmu-black" />
            </Link>
          </motion.div>
        </div>

        {/* Right: Interactive Orbital Engine — follows site creamy + black/lime */}
        <motion.div
          id="orbital"
          className="scroll-mt-24 relative w-full max-w-md flex-shrink-0 sm:max-w-lg lg:max-w-xl"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <OrbitalDiagram />
        </motion.div>
      </div>
    </section>
  );
}
