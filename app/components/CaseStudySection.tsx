"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, MapPin, Handshake, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import stanfordImage from "./Vishwajeet at Stanford.png";

const ADAPTATION_ITEMS = [
  {
    title: "Terman's Legacy Optimized",
    copy: "Just as Stanford provided the foundational space for the birth of Hewlett-Packard, CalMU will repurpose the Business Partnership Center to serve as the \"Mission Control\" for the Foundational Five agentic AI ventures.",
    Icon: BookOpen,
  },
  {
    title: "Expanding the Valley",
    copy: "While the traditional Silicon Valley core is saturated, our San Jose campus at 505 S Market St sits at the epicenter of a new \"Moonshot\" corridor specifically designed for Agentic AI and Global Founder onboarding.",
    Icon: MapPin,
  },
  {
    title: "Non-Capital Participation",
    copy: "Aligning with the historical Stanford model, CalMU participates economically through the provision of Brand, Space, and Talent (specifically SPJ Interns) rather than direct cash investment—maximizing university upside while de-risking the venture.",
    Icon: Handshake,
  },
  {
    title: "Recursive Growth Engine",
    copy: "This model adoption creates a perpetual feedback loop where homegrown AI ventures power university operations, which in turn attracts the next generation of -1 to 0 founders to the San Jose ecosystem.",
    Icon: RefreshCw,
  },
];

const CASE_STUDY_URL =
  "https://reasonandreflection.wordpress.com/2021/05/04/silicon-valley-origins-and-stanford-university/";

export default function CaseStudySection() {
  return (
    <section
      id="case-study"
      className="scroll-mt-24 border-t border-calmu-black/10 bg-creamy px-4 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 lg:px-8 lg:pt-24 lg:pb-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:items-start">
          {/* Left: Heading + intro + grid — slide in from left */}
          <div className="space-y-6">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-2xl font-bold tracking-tight text-calmu-black sm:text-3xl lg:text-4xl">
                The Stanford Blueprint: Replicating the Valley&apos;s Genesis.
              </h2>
              <p className="font-sans text-base font-medium text-calmu-black/80 sm:text-lg">
                How CalMU adopts the Frederick Terman model for the AI Era.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4 font-sans text-sm leading-relaxed text-calmu-black/85 sm:text-base"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <p>
                Silicon Valley&apos;s dominance was not a product of chance,
                but of deliberate architectural synergy between Stanford
                University and emerging industry leaders. By leveraging
                university land and faculty expertise to foster a
                &quot;Venture-as-a-Service&quot; ecosystem, Stanford&apos;s
                Frederick Terman created a self-sustaining engine of
                innovation. Today, California Miramar University (CalMU) is
                uniquely positioned to replicate this legacy by anchoring the
                next great expansion—the San Jose Moonshot Corridor.
              </p>
            </motion.div>

            {/* CalMU Adaptation — 2-column list */}
            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              {ADAPTATION_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl border-2 border-calmu-black bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_12px_rgba(217,249,157,0.12)] transition hover:shadow-[0_0_24px_rgba(217,249,157,0.28)]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-calmu-black text-calmu-black">
                    <item.Icon
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-calmu-black sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-xs leading-relaxed text-calmu-black/75 sm:text-sm">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive link card — slide in from right */}
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href={CASE_STUDY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border-2 border-calmu-black bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,249,157,0.2)]"
            >
              {/* Case study image — Vishwajeet at Stanford */}
              <div className="relative min-h-[320px] w-full overflow-hidden sm:min-h-[380px] lg:min-h-[420px]">
                <Image
                  src={stanfordImage}
                  alt="Vishwajeet at Stanford"
                  className="h-full w-full object-cover object-center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-amber-900/20 mix-blend-multiply"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-creamy/80 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              {/* Premium document-tab style bar */}
              <div className="border-t-2 border-calmu-black bg-white/90 px-4 py-4 sm:px-5 sm:py-4">
                <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-calmu-black transition group-hover:text-lime group-hover:underline sm:text-base">
                  Read Case Study: Silicon Valley Origins and Stanford University
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
