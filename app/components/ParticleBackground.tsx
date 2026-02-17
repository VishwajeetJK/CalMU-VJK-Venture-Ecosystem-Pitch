"use client";

import { useMemo } from "react";

const LIME_COUNT = 120;
const BROWN_COUNT = 30;
const LIME = "#d9f99d";
const LIME_GLOW = "0 0 6px rgba(217, 249, 157, 0.6), 0 0 14px rgba(217, 249, 157, 0.25)";
const BROWN = "#8B6914";
const BROWN_GLOW = "0 0 6px rgba(139, 105, 20, 0.5), 0 0 14px rgba(139, 105, 20, 0.2)";
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 24;

export type MouseState = { x: number; y: number; w: number; h: number } | null;

type ParticleType = "lime" | "brown";

function useParticles() {
  return useMemo(() => {
    const lime = Array.from({ length: LIME_COUNT }, (_, i) => ({
      id: `lime-${i}`,
      type: "lime" as ParticleType,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2.5 + Math.random() * 3.5,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * 6,
    }));
    const brown = Array.from({ length: BROWN_COUNT }, (_, i) => ({
      id: `brown-${i}`,
      type: "brown" as ParticleType,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2.5 + Math.random() * 3.5,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * 6,
    }));
    return [...lime, ...brown];
  }, []);
}

function repel(mouse: { x: number; y: number; w: number; h: number }, leftPct: number, topPct: number) {
  const centerX = (leftPct / 100) * mouse.w;
  const centerY = (topPct / 100) * mouse.h;
  const dx = mouse.x - centerX;
  const dy = mouse.y - centerY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist >= REPEL_RADIUS || dist < 2) return { dx: 0, dy: 0 };
  const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
  const nx = dx / dist;
  const ny = dy / dist;
  return { dx: nx * force, dy: ny * force };
}

export default function ParticleBackground({ mouse }: { mouse: MouseState }) {
  const particles = useParticles();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes particle-float {
          0%, 100% {
            transform: translate(calc(0px + var(--mx, 0px)), calc(0px + var(--my, 0px))) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(calc(8px + var(--mx, 0px)), calc(-10px + var(--my, 0px))) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translate(calc(-6px + var(--mx, 0px)), calc(-16px + var(--my, 0px))) scale(0.95);
            opacity: 0.7;
          }
          75% {
            transform: translate(calc(8px + var(--mx, 0px)), calc(-8px + var(--my, 0px))) scale(1.05);
            opacity: 0.75;
          }
        }
      `}</style>
      {particles.map((p) => {
        const offset = mouse ? repel(mouse, p.left, p.top) : { dx: 0, dy: 0 };
        const isBrown = p.type === "brown";
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: isBrown ? BROWN : LIME,
              boxShadow: isBrown ? BROWN_GLOW : LIME_GLOW,
              opacity: isBrown ? 0.65 : 0.7,
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              "--mx": `${offset.dx}px`,
              "--my": `${offset.dy}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
