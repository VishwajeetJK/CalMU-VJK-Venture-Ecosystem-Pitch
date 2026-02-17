"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#hero", label: "Orbital Engine" },
  { href: "#methodology", label: "Methodology" },
  { href: "#campus-infrastructure", label: "Campus & Space" },
  { href: "#simulator", label: "Simulator" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#hire", label: "Hire Vishwajeet" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const MotionDiv = motion.div;

  const pillContent = React.createElement(
    "div",
    { className: "flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-3 py-0 sm:gap-6 sm:px-5" },
    React.createElement(
      Link,
      { href: "#", className: "flex shrink-0 items-center gap-3 sm:gap-4" },
      React.createElement(
        "div",
        { className: "flex items-center gap-2 sm:gap-2.5" },
        React.createElement("div", { className: "relative h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]" },
          React.createElement(Image, {
            src: "/calmu-logo.webp",
            alt: "CalMU",
            fill: true,
            className: "object-contain",
            sizes: "72px",
            unoptimized: true,
          })
        ),
        React.createElement("span", { className: "font-sans text-sm font-semibold text-calmu-black sm:text-base" }, "×"),
        React.createElement("div", { className: "relative h-8 w-8 shrink-0 sm:h-9 sm:w-9" },
          React.createElement(Image, {
            src: "/spj-logo.jpg",
            alt: "SP Jain",
            fill: true,
            className: "object-contain",
            sizes: "36px",
            unoptimized: true,
          })
        )
      ),
      React.createElement("div", { className: "h-8 w-px shrink-0 bg-gray-300" }),
      React.createElement("span", { className: "font-sans text-xs font-medium text-gray-700 sm:text-sm" }, "A Venture Ecosystem Pitch from Vishwajeet J K")
    ),
    React.createElement(
      "div",
      { className: "flex items-center gap-2 sm:gap-3" },
      React.createElement(
        Link,
        {
          href: "#hire",
          className: "flex min-h-[3.5rem] items-center gap-2 rounded-full bg-calmu-black px-5 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90 sm:min-h-[4rem] sm:px-6 sm:py-4 sm:text-base",
        },
        "Hire Vishwajeet",
        React.createElement(ArrowRight, { className: "h-5 w-5 shrink-0", size: 20 })
      ),
      React.createElement(
        "button",
        {
          type: "button",
          "aria-label": "Toggle menu",
          "aria-expanded": mobileOpen,
          className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-calmu-black sm:h-14 sm:w-14",
          onClick: () => setMobileOpen((o) => !o),
        },
        mobileOpen ? React.createElement(X, { size: 24 }) : React.createElement(Menu, { size: 24 })
      )
    )
  );

  return React.createElement(
    "div",
    { role: "banner", className: "sticky top-0 z-50 w-full bg-calmu-black px-3 py-1 sm:px-4 sm:py-1" },
    React.createElement(
      "nav",
      { className: "relative mx-auto flex max-w-6xl justify-center" },
      React.createElement(
        "div",
        {
          className:
            "w-full rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]",
        },
        pillContent
      ),
      mobileOpen &&
        React.createElement(
          MotionDiv,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "absolute right-0 top-full z-50 mt-2 w-full min-w-[14rem] max-w-sm overflow-hidden rounded-2xl bg-white py-2 shadow-xl",
          },
        React.createElement(
          "nav",
          { className: "flex flex-col", "aria-label": "Section navigation" },
          ...navLinks.map((link) =>
            React.createElement(
              Link,
              {
                key: link.href,
                href: link.href,
                className: "block px-5 py-3 font-sans text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-calmu-black",
                onClick: () => setMobileOpen(false),
              },
              link.label
            )
          )
        )
        )
    )
  );
}
