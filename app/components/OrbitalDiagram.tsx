"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Rocket,
  Globe,
  Megaphone,
  Share2,
  BookOpen,
  Users,
} from "lucide-react";

const LIME = "#d9f99d";

// Single source of truth: node positions in viewBox units (0–100). Same values used for SVG lines and card placement.
const CENTER = { cx: 50, cy: 50 };
const NODES: { cx: number; cy: number }[] = [
  { cx: 50, cy: 12 },   // top
  { cx: 83, cy: 31 },   // top-right
  { cx: 83, cy: 69 },   // bottom-right
  { cx: 50, cy: 88 },   // bottom
  { cx: 17, cy: 69 },   // bottom-left
  { cx: 17, cy: 31 },   // top-left
];

const RADIALS = NODES.map((n) => [CENTER.cx, CENTER.cy, n.cx, n.cy] as const);
const PERIMETER: [number, number, number, number][] = [
  [50, 12, 83, 31],
  [83, 31, 83, 69],
  [83, 69, 50, 88],
  [50, 88, 17, 69],
  [17, 69, 17, 31],
  [17, 31, 50, 12],
];

// Card size in viewBox units (0.95 × 30% x 24% of 100)
const CARD_HW = 14.25;
const CARD_HH = 11.4;

/** Get [tEnter, tExit] in [0,1] for the part of segment (x1,y1)->(x2,y2) that lies inside rect [cx±hw, cy±hh]. */
function segmentRectIntersection(
  x1: number, y1: number, x2: number, y2: number,
  cx: number, cy: number, hw: number, hh: number
): [number, number] | null {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const left = cx - hw;
  const right = cx + hw;
  const top = cy - hh;
  const bottom = cy + hh;

  let tLow = 0;
  let tHigh = 1;

  if (Math.abs(dx) >= 1e-9) {
    const tx1 = (left - x1) / dx;
    const tx2 = (right - x1) / dx;
    const tax = Math.min(tx1, tx2);
    const tbx = Math.max(tx1, tx2);
    tLow = Math.max(tLow, tax);
    tHigh = Math.min(tHigh, tbx);
  } else {
    if (x1 < left || x1 > right) return null;
  }

  if (Math.abs(dy) >= 1e-9) {
    const ty1 = (top - y1) / dy;
    const ty2 = (bottom - y1) / dy;
    const tay = Math.min(ty1, ty2);
    const tby = Math.max(ty1, ty2);
    tLow = Math.max(tLow, tay);
    tHigh = Math.min(tHigh, tby);
  } else {
    if (y1 < top || y1 > bottom) return null;
  }

  if (tLow >= tHigh) return null;
  // Clamp to [0,1] for segment
  const tEnter = Math.max(0, Math.min(1, tLow));
  const tExit = Math.max(0, Math.min(1, tHigh));
  if (tEnter >= tExit) return null;
  return [tEnter, tExit];
}

/** Clip line to the segment outside both card rects (so line stops at card edges). */
function clipLineToCardEdges(
  x1: number, y1: number, x2: number, y2: number
): { x1: number; y1: number; x2: number; y2: number } {
  const r1 = segmentRectIntersection(x1, y1, x2, y2, x1, y1, CARD_HW, CARD_HH);
  const r2 = segmentRectIntersection(x1, y1, x2, y2, x2, y2, CARD_HW, CARD_HH);
  let tStart = 0;
  let tEnd = 1;
  if (r1) tStart = r1[1]; // exit from first card
  if (r2) tEnd = r2[0];    // entry to second card
  if (tStart >= tEnd) {
    // line fully inside one card or overlapping
    return { x1: (x1 + x2) / 2, y1: (y1 + y2) / 2, x2: (x1 + x2) / 2, y2: (y1 + y2) / 2 };
  }
  return {
    x1: x1 + tStart * (x2 - x1),
    y1: y1 + tStart * (y2 - y1),
    x2: x1 + tEnd * (x2 - x1),
    y2: y1 + tEnd * (y2 - y1),
  };
}

const CARD_CONTENT = [
  { title: "SPJ Global Engine", desc: "Connecting founders to the global SP Jain network.", Icon2: Globe },
  { title: "Ads Architect", desc: "AI-optimized ad spend and automated creative.", Icon2: Megaphone },
  { title: "Marketing Automator", desc: "Agentic content distribution & full-stack marketing.", Icon2: Share2 },
  { title: "AI Growth Education", desc: "Foundational AI literacy for venture cohorts.", Icon2: BookOpen },
  { title: "Founder CRM", desc: "Agentic onboarding and stakeholder management.", Icon2: Users },
  { title: "GTM Agentic Tools", desc: "Simulating launch scenarios, Churn, and LTV.", Icon2: Rocket },
];

const cardClass =
  "flex flex-col justify-center rounded-xl border-2 border-lime/40 bg-calmu-black p-2 shadow-[0_0_20px_rgba(217,249,157,0.2)] h-full w-full box-border text-left overflow-hidden";

export default function OrbitalDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[min(90vw,480px)] aspect-square overflow-hidden">
      {/* SVG behind cards so lines don’t show through */}
      <svg
        className="absolute inset-0 h-full w-full block z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Lines clipped to card edges so they meet the boxes cleanly */}
        {RADIALS.map(([x1, y1, x2, y2], i) => {
          const c = clipLineToCardEdges(x1, y1, x2, y2);
          return (
            <g key={`r-${i}`}>
              <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} className="hex-connector-bg" strokeLinecap="butt" />
              <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} className="hex-connector" strokeLinecap="butt" />
            </g>
          );
        })}
        {PERIMETER.map(([x1, y1, x2, y2], i) => {
          const c = clipLineToCardEdges(x1, y1, x2, y2);
          return (
            <g key={`p-${i}`}>
              <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} className="hex-connector-bg" strokeLinecap="butt" />
              <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} className="hex-connector" strokeLinecap="butt" />
            </g>
          );
        })}
      </svg>

      {/* Cards on top of lines, same coordinate system as viewBox (cx% = viewBox cx) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute w-[28.5%] h-[22.8%] min-w-0 min-h-0 pointer-events-auto" style={{ left: `${CENTER.cx}%`, top: `${CENTER.cy}%`, transform: "translate(-50%, -50%)" }}>
          <motion.div
            className={cardClass + " border-lime/50"}
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${LIME}20` }}>
                <Settings className="h-3 w-3 animate-[spin_8s_linear_infinite]" style={{ color: LIME }} strokeWidth={1.5} />
              </div>
              <p className="font-serif text-[10px] font-semibold text-lime leading-tight">New Venture Engine</p>
            </div>
            <motion.p className="font-sans text-[9px] text-white/70" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>Orchestrating agents...</motion.p>
            <p className="font-sans text-[9px] text-white/80 mt-0.5">Matching ventures • Routing scenarios</p>
          </motion.div>
        </div>
      </div>

      {NODES.map((node, i) => (
        <div
          key={i}
          className="absolute w-[28.5%] h-[22.8%] min-w-0 min-h-0 pointer-events-auto z-10"
          style={{ left: `${node.cx}%`, top: `${node.cy}%`, transform: "translate(-50%, -50%)" }}
        >
          <NodeCard content={CARD_CONTENT[i]} index={i} />
        </div>
      ))}
    </div>
  );
}

function NodeCard({
  content,
  index,
}: {
  content: { title: string; desc: string; Icon2: typeof Globe };
  index: number;
}) {
  const floats = [
    { y: [-8, 2, -8], d: 7, delay: 0.3 },
    { y: [-4, 6, -4], d: 9, delay: 0.6 },
    { y: [4, -6, 4], d: 10, delay: 0.9 },
    { y: [6, -4, 6], d: 8, delay: 0.5 },
    { y: [0, 6, 0], d: 7.5, delay: 0.4 },
    { y: [0, -5, 0], d: 8.5, delay: 0.7 },
  ];
  const f = floats[index];
  const Icon2 = content.Icon2;
  return (
    <motion.div
      className={cardClass}
      animate={{ y: f.y }}
      transition={{ duration: f.d, repeat: Infinity, repeatType: "loop", delay: f.delay }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${LIME}20` }}>
          <Settings className="h-3 w-3 animate-spin" style={{ color: LIME }} strokeWidth={1.5} />
        </div>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${LIME}20` }}>
          <Icon2 className="h-3 w-3" style={{ color: LIME }} strokeWidth={1.5} />
        </div>
      </div>
      <p className="font-serif text-[10px] font-semibold text-lime leading-tight">{content.title}</p>
      <p className="font-sans text-[9px] text-white/80 leading-snug mt-0.5">{content.desc}</p>
    </motion.div>
  );
}
