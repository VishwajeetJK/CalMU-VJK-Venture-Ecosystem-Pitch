"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Radio,
  Trophy,
  Building2,
  Globe,
  Video,
} from "lucide-react";

const LIME = "#d9f99d";

const CARDS = [
  {
    id: 1,
    title: "Recursive Infrastructure",
    copy: "Developing the 'Foundational Five' agentic tools as internal ventures to power the Lab's OS from Day 1.",
    Icon: Layers,
  },
  {
    id: 2,
    title: "Ecosystem GTM",
    copy: "Launching AI EdTech modules and the Moonshot Podcast to build brand authority and founder trust.",
    Icon: Radio,
  },
  {
    id: 3,
    title: "Talent Acquisition",
    copy: "Organizing and sponsoring premier hackathons to identify and onboard '-1 to 0' technical founders.",
    Icon: Trophy,
  },
  {
    id: 4,
    title: "Foundational Support",
    copy: "Providing physical San Jose real estate, legal EIN setup, and direct mentorship from industry EIRs.",
    Icon: Building2,
  },
  {
    id: 5,
    title: "Global Bridge",
    copy: "Linking founders to the SP Jain global network and securing high-value industry connections.",
    Icon: Globe,
  },
  {
    id: 6,
    title: "The Demo Circuit",
    copy: "A 'Shark Tank' style YouTube series and Demo Day for capital raising and market debut.",
    Icon: Video,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function MethodologySection() {
  return (
    <section
      id="methodology"
      className="scroll-mt-24 bg-calmu-black px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Operational Methodology
          </h2>
          <p className="mt-3 font-sans text-base text-white/80 sm:text-lg">
            Building the infrastructure of tomorrow by launching it today.
          </p>
        </motion.header>

        <motion.div
          className="mt-12 grid gap-6 sm:mt-14 sm:gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {CARDS.map((card) => (
            <motion.article
              key={card.id}
              variants={item}
              className="group relative rounded-xl border-2 border-lime/50 bg-calmu-black/80 p-6 transition-shadow duration-300 hover:border-lime/70 hover:shadow-[0_0_24px_rgba(217,249,157,0.25)] sm:p-7"
            >
              <div
                className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-lime/60 transition-colors group-hover:border-lime group-hover:bg-lime/10"
                style={{ color: LIME }}
              >
                <card.Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">
                {card.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/75 sm:text-base">
                {card.copy}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
