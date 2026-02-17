"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Rocket,
  FileCheck,
  X,
  Linkedin,
  Mail,
  ArrowRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import jeetImage from "./jeet.webp";

const METRICS = [
  {
    icon: Calendar,
    value: "15 Months",
    label: "Total Roadmap to Autopilot.",
  },
  {
    icon: Rocket,
    value: "5+ Ventures",
    label: 'Initial "Space Station" Infrastructure.',
  },
  {
    icon: FileCheck,
    value: "12+3 Protocol",
    label: "Months of Performance & Handover.",
  },
];

const TAGS_ROW1 = [
  { label: "Columbia Business School & Columbia Engineering", variant: "blue" as const },
];
const TAGS_ROW2 = [
  { label: "LVMH", variant: "red" as const },
  { label: "Groww", variant: "red" as const },
  { label: "Times of India Group", variant: "red" as const },
];

export default function HireSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      <section
        id="hire"
        className="scroll-mt-24 bg-calmu-black px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <motion.header
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Maximize Your{" "}
              <span className="text-lime">Moonshot</span> Yield.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-base text-white/70 sm:text-lg">
              The Moonshot Venture Lab—the recursive system, roadmap, and
              simulation you&apos;ve seen above—is architected for operational
              safety and exponential growth. It&apos;s designed to be built—and
              delivered.
            </p>
          </motion.header>

          {/* Main card — simulation-style */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 border-gray-700 bg-gray-900 shadow-xl shadow-[0_0_32px_rgba(217,249,157,0.08)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Card header — terminal-style */}
            <div className="flex items-center justify-between border-b border-gray-700 bg-black/50 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-lime/50 text-lime">
                  <Zap className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-white sm:text-base">
                    Venture Yield
                  </p>
                  <p className="font-sans text-xs text-gray-400">
                    Final CTA · Hire Vishwajeet
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-lime/50 bg-lime/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-sans text-xs font-medium text-lime">
                  Ready
                </span>
              </div>
            </div>

            <div className="p-4 text-center sm:p-6">
              <p className="mx-auto max-w-xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
                Vishwajeet knows what to make and how to deliver it. The numbers
                below show the impact when this engine is built and owned.
              </p>

              <motion.button
                type="button"
                onClick={openModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-lime/60 bg-lime/10 px-6 py-3 font-sans text-sm font-semibold text-lime transition hover:bg-lime/20 hover:shadow-[0_0_16px_rgba(217,249,157,0.2)] sm:px-8 sm:py-3.5 sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Vishwajeet to Build This
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
              </motion.button>

              {/* Impact metrics — 3-column grid, simulation card style */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {METRICS.map((m, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl border border-lime/40 bg-gray-800/80 p-4 text-center shadow-[0_0_12px_rgba(217,249,157,0.06)]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-lime/50 bg-lime/10 text-lime">
                      <m.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <p className="mt-3 font-sans text-xl font-bold text-white sm:text-2xl">
                      {m.value}
                    </p>
                    <p className="mt-1 font-sans text-xs leading-snug text-white/70">
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hire Vishwajeet Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <div
              className="absolute inset-0 bg-[var(--navy)]/90 backdrop-blur-sm"
              aria-hidden
            />
            <motion.div
              className="relative max-h-[85vh] w-full max-w-md origin-center overflow-y-auto rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.76, opacity: 0 }}
              animate={{ scale: 0.8, opacity: 1 }}
              exit={{ scale: 0.76, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </button>

              <div className="p-6 pt-12 sm:p-8 sm:pt-14">
                {/* Profile header */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="h-32 w-32 overflow-hidden rounded-lg border-2 border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.8),0_0_12px_rgba(239,68,68,0.25)] sm:h-40 sm:w-40">
                      {!imgError ? (
                        <Image
                          src={jeetImage}
                          alt="Vishwajeet"
                          width={160}
                          height={160}
                          className="h-full w-full object-cover object-top"
                          onError={() => setImgError(true)}
                        />
                      ) : null}
                      {imgError && (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-2xl font-bold text-gray-500">
                          VJ
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-black sm:text-3xl">
                    Vishwajeet Jayanthi Karthikeyan (Jeet)
                  </h3>
                  <p className="mt-1 font-sans text-[10px] font-medium text-red-600 sm:text-xs">
                    Potential: Venture Partner & Product Architect
                    <br />
                    at CalMU Moonshot Labs
                  </p>
                </div>

                {/* Bio */}
                <p className="mt-5 font-sans text-sm leading-relaxed text-gray-700">
                  Former Product Management at Louis Vuitton Moët Hennessy,
                  Software Engineer at Groww (YC 2018), Times of India Group,
                  Gates Foundation, and Columbia University (Business School &
                  Engineering) graduate. Passionate about transforming
                  industries, scaling systems and growth hacking practices
                  through AI and automation.
                </p>

                {/* Experience tags */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {TAGS_ROW1.map((tag, i) => (
                      <span
                        key={i}
                        className={`rounded-full px-3 py-1 font-sans text-xs font-medium ${
                          tag.variant === "red"
                            ? "bg-red-500 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS_ROW2.map((tag, i) => (
                      <span
                        key={i}
                        className={`rounded-full px-3 py-1 font-sans text-xs font-medium ${
                          tag.variant === "red"
                            ? "bg-red-500 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategic Terms */}
                <div className="mt-8 space-y-6 border-t border-gray-200 pt-6">
                  <div>
                    <h4 className="font-serif font-bold text-black">
                      Compensation
                    </h4>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-gray-700">
                      Commensurate with USCIS guidelines for a Product Architect
                      + Founding Equity as a Venture Partner.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-black">
                      Operational Continuity (12+3)
                    </h4>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-gray-700">
                      The 12+3 phase is when we decide whether to continue
                      growing the infrastructure or move it to maintenance mode.
                      Twelve months of KRA-aligned scaling, then a 3-month
                      structured handover to ensure zero operational friction—
                      leaving the lab as a self-sufficient ecosystem.
                    </p>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-8 flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/vishwajeet-jk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:opacity-90"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" strokeWidth={2} />
                  </a>
                  <a
                    href="mailto:vj2287@columbia.edu"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-600 text-white transition hover:bg-gray-700"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
