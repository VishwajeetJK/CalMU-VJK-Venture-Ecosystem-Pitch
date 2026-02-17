"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, FileText, MapPin, X } from "lucide-react";
import ParticleBackground, { type MouseState } from "./ParticleBackground";

const HYBRID_CARDS = [
  {
    id: 1,
    title: "Moonshot Venture Lab",
    copy: "Dedicated zone for the initial 5 Agentic AI tools and venture engineering.",
  },
  {
    id: 2,
    title: "Modular Event Lounge",
    copy: "Rapidly converts for Podcasts, Hackathons, and community networking.",
  },
  {
    id: 3,
    title: "Exhibition Zone",
    copy: "Common student areas used for real-world product pilots and founder exhibitions.",
  },
  {
    id: 4,
    title: "The Bridge",
    copy: "Proximity to Faculty/Staff offices (Offices 1-5) ensures constant mentorship flow.",
  },
];

export default function CampusInfrastructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouse, setMouse] = useState<MouseState>(null);
  const [playing, setPlaying] = useState(false);
  const [floorPlanModalOpen, setFloorPlanModalOpen] = useState(false);

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

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  useEffect(() => {
    if (floorPlanModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [floorPlanModalOpen]);

  return (
    <section
      ref={sectionRef}
      id="campus-infrastructure"
      className="relative scroll-mt-24 overflow-hidden bg-creamy px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleBackground mouse={mouse} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:items-start">
          {/* Left: Video + Floor Plan */}
          <div className="space-y-6">
            {/* Video with custom Play skin */}
            <motion.div
              className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-calmu-black bg-calmu-black shadow-[0_0_24px_rgba(217,249,157,0.2)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/calmu-campus-walk.mp4"
                controls={playing}
                onClick={handlePlay}
                playsInline
              />
              {!playing && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-calmu-black/40 transition hover:bg-calmu-black/30"
                  aria-label="Play video"
                >
                  <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-calmu-black bg-white shadow-[0_0_24px_rgba(217,249,157,0.35)] hover:shadow-[0_0_32px_rgba(217,249,157,0.5)]"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="h-10 w-10 text-calmu-black" fill="currentColor" strokeWidth={0} />
                  </motion.div>
                </button>
              )}
            </motion.div>

            {/* Floor Plan glass card */}
            <motion.div
              className="rounded-xl border-2 border-calmu-black bg-white/50 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_0_20px_rgba(217,249,157,0.15)] backdrop-blur-md sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 rounded-lg border-2 border-calmu-black bg-creamy/80 p-4 shadow-[0_0_16px_rgba(217,249,157,0.2)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-calmu-black text-calmu-black shadow-[0_0_12px_rgba(217,249,157,0.25)]">
                  <MapPin className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-sm font-semibold text-calmu-black">CalMU Full Campus Floor Plan</p>
                  <p className="font-sans text-xs text-calmu-black/70">Business Partnership Center highlighted</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFloorPlanModalOpen(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-calmu-black bg-white/80 px-4 py-3 font-sans text-sm font-semibold text-calmu-black transition hover:shadow-[0_0_20px_rgba(217,249,157,0.35)]"
              >
                View CalMU Full Campus Floor Plan (PDF)
                <FileText className="h-4 w-4 text-calmu-black" strokeWidth={2} />
              </button>
            </motion.div>

            {/* Floor Plan PDF Modal - same UI */}
            <AnimatePresence>
              {floorPlanModalOpen && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 pb-24 sm:pt-28 sm:pb-28"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="absolute inset-0 bg-calmu-black/60 backdrop-blur-sm"
                    onClick={() => setFloorPlanModalOpen(false)}
                    aria-hidden
                  />
                  <motion.div
                    className="relative flex h-[76.5vh] w-full max-w-[50.4rem] flex-col overflow-hidden rounded-xl border-2 border-calmu-black bg-creamy shadow-[0_0_32px_rgba(217,249,157,0.25)]"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex shrink-0 items-center justify-between border-b-2 border-calmu-black bg-white/80 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 shrink-0 text-calmu-black" strokeWidth={1.5} />
                        <span className="font-sans text-sm font-semibold text-calmu-black">CalMU Full Campus Floor Plan</span>
                        <a
                          href="/calmu-floor-plan.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 font-sans text-xs font-medium text-calmu-black/70 underline hover:text-calmu-black"
                        >
                          Open in new tab
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFloorPlanModalOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-calmu-black text-calmu-black transition hover:shadow-[0_0_12px_rgba(217,249,157,0.35)]"
                        aria-label="Close"
                      >
                        <X className="h-5 w-5" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="relative min-h-0 flex-1 bg-calmu-black/10">
                      <iframe
                        src="/calmu-floor-plan.pdf"
                        title="CalMU Full Campus Floor Plan"
                        className="h-full w-full border-0"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Living Lab copy + Hybrid grid */}
          <div className="space-y-8">
            <motion.header
              className="text-left"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl font-bold tracking-tight text-calmu-black sm:text-4xl">
                The San Jose Living Lab
              </h2>
              <p className="mt-2 font-sans text-base font-semibold text-calmu-black sm:text-lg">
                Strategic repurposing of the Business Partnership Center into a Hybrid Venture Hub.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-calmu-black/85 sm:text-base">
                Transforming the existing campus into an intersection of AI/Biz education and high-velocity venture building. The Lab is designed to be highly interchangeable—functioning as a deep-focus Venture Lab by day and a high-impact Event Lounge by night.
              </p>
            </motion.header>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, staggerChildren: 0.08 }}
            >
              {HYBRID_CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  className="rounded-xl border-2 border-calmu-black bg-white/70 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_12px_rgba(217,249,157,0.12)] transition hover:shadow-[0_0_24px_rgba(217,249,157,0.28)]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <h3 className="font-serif text-base font-semibold text-calmu-black sm:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs leading-relaxed text-calmu-black/75 sm:text-sm">
                    {card.copy}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
