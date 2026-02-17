"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Rocket, GitBranch } from "lucide-react";
import ParticleBackground, { type MouseState } from "./ParticleBackground";

const phases = [
  {
    id: "phase1",
    label: "PHASE 1: THE INFRASTRUCTURE BUILD",
    title: "The Infrastructure Build (Months 1–6)",
    objective:
      "Developing the 'Foundational Five' agentic tools as a 'Venture-as-a-Service' model to power Lab operations.",
    role: "Lead: Product Architect (Jeet).",
    stack:
      "Multi-Model Agentic Frameworks + CalMU San Jose Server Infrastructure.",
    icon: FlaskConical,
  },
  {
    id: "phase2",
    label: "PHASE 2: ECOSYSTEM GROWTH",
    title: "Ecosystem Growth (Months 7–12)",
    objective:
      "Incubating the initial cohort and scaling the internal tools to external global clients for non-capital revenue.",
    focus:
      "Branding across top universities + Onboarding offshore SPJ intern teams.",
    icon: Rocket,
  },
  {
    id: "phase3",
    label: "PHASE 3: THE KPI DECISION BRIDGE",
    title: "The KPI Decision Bridge (Months 13–15)",
    objective:
      "The Scaling Fork — Decisions driven by key performance indicators (KPIs).",
    scenarioA:
      "Scenario A (Ideal): International Student integration & exponential ecosystem expansion.",
    scenarioB:
      "Scenario B (Maintenance): Transition to Autopilot Maintenance and structured handover of self-sufficient operations.",
    icon: GitBranch,
  },
];

export default function RoadmapTimeline() {
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
      id="roadmap"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden bg-creamy py-16 sm:py-24 scrollbar-hide"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleBackground mouse={mouse} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 scrollbar-hide">
        {/* Heading & Context */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-calmu-black sm:text-4xl lg:text-[2.5rem]">
            Strategic Roadmap{" "}
            <span className="text-gray-700">&</span> Evolution
          </h2>
          <p className="mt-3 font-sans text-base font-medium text-calmu-black/90 sm:text-lg">
            From Infrastructure Build to a Sovereign Venture Ecosystem.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-calmu-black/70 sm:text-base">
            While traditional education scales gradually, our AI-integrated
            model is architected for exponential growth through three distinct
            strategic leaps.
          </p>
        </motion.div>

        {/* Phase cards */}
        <div className="mt-14 sm:mt-16 space-y-6 sm:space-y-8">
          {phases.map((phase, index) => (
            <PhaseCard key={phase.id} phase={phase} index={index} />
          ))}
        </div>

        {/* Strategic Continuity callout */}
        <motion.div
          className="mt-12 rounded-xl border border-calmu-black/15 bg-calmu-black/5 px-4 py-3 sm:px-5 sm:py-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-sans text-xs leading-relaxed text-calmu-black/80 sm:text-sm">
            <span className="font-semibold text-gray-700">Strategic Continuity:</span>{" "}
            This roadmap includes a built-in 3-month transition protocol to
            ensure zero operational friction. Phase 3 is where the decision is
            made on whether the university continues its pursuits on growing
            the infrastructure or switches to maintenance mode until the
            further roadmap is clear.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof phases)[0];
  index: number;
}) {
  const Icon = phase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="group rounded-2xl border-2 border-lime/50 bg-calmu-black p-5 shadow-xl transition-shadow duration-300 hover:border-lime/70 hover:shadow-[0_0_24px_rgba(217,249,157,0.25)] sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-lime/60 bg-lime/10 text-lime transition-colors group-hover:border-lime group-hover:bg-lime/20 sm:h-11 sm:w-11">
            <Icon className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-lime sm:text-xs">
              {phase.label}
            </p>
            <h3 className="mt-1 font-serif text-xl font-bold text-white sm:text-2xl">
              {phase.title}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/90">
              {phase.objective}
            </p>

            {"role" in phase && phase.role && (
              <p className="mt-3 font-sans text-xs text-white/80">
                <span className="font-medium text-white">Role:</span>{" "}
                {phase.role}
              </p>
            )}
            {"stack" in phase && phase.stack && (
              <p className="mt-1.5 font-sans text-xs text-white/80">
                <span className="font-medium text-white">Stack:</span>{" "}
                {phase.stack}
              </p>
            )}
            {"focus" in phase && phase.focus && (
              <p className="mt-3 font-sans text-xs text-white/80">
                <span className="font-medium text-white">Focus:</span>{" "}
                {phase.focus}
              </p>
            )}
            {"scenarioA" in phase && phase.scenarioA && (
              <div className="mt-3 space-y-1.5">
                <p className="font-sans text-xs text-white/80">
                  <span className="font-bold text-white">Scenario A (Ideal):</span>{" "}
                  {phase.scenarioA}
                </p>
                {"scenarioB" in phase && phase.scenarioB && (
                  <p className="font-sans text-xs text-white/60">
                    <span className="font-medium text-white/70">
                      Scenario B (Maintenance):
                    </span>{" "}
                    {phase.scenarioB}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
