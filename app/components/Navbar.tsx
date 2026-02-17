"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
    { className: "flex w-full max-w-6xl flex-nowrap items-center justify-between gap-2 px-2 py-1.5 sm:flex-wrap sm:gap-6 sm:px-5 sm:py-0" },
    React.createElement(
      Link,
      { href: "#", className: "flex min-w-0 shrink items-center gap-2 sm:gap-4" },
      React.createElement(
        "div",
        { className: "flex shrink-0 items-center gap-1.5 sm:gap-2.5" },
        React.createElement("div", { className: "relative h-11 w-11 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]" },
          React.createElement(Image, {
            src: `${basePath}/calmu-logo.webp`,
            alt: "CalMU",
            fill: true,
            className: "object-contain",
            sizes: "(max-width: 640px) 44px, 72px",
            unoptimized: true,
          })
        ),
        React.createElement("span", { className: "shrink-0 font-sans text-xs font-semibold text-calmu-black sm:text-base" }, "×"),
        React.createElement("div", { className: "relative h-7 w-7 shrink-0 sm:h-9 sm:w-9" },
          React.createElement(Image, {
            src: `${basePath}/spj-logo.jpg`,
            alt: "SP Jain",
            fill: true,
            className: "object-contain",
            sizes: "(max-width: 640px) 28px, 36px",
            unoptimized: true,
          })
        )
      ),
      React.createElement("div", { className: "h-5 w-px shrink-0 bg-gray-300 sm:h-8" }),
      React.createElement("span", { className: "min-w-0 truncate font-sans text-[10px] font-medium text-gray-700 sm:text-sm" }, "A Venture Ecosystem Pitch from Vishwajeet J K")
    ),
    React.createElement(
      "div",
      { className: "flex shrink-0 items-center gap-1 sm:gap-3" },
      React.createElement(
        Link,
        {
          href: "#hire",
          className: "hidden min-h-[3.5rem] items-center gap-2 rounded-full bg-calmu-black px-5 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90 sm:flex sm:min-h-[4rem] sm:px-6 sm:py-4 sm:text-base",
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
          className: "flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-calmu-black active:bg-gray-200 sm:h-14 sm:w-14",
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
            className: "absolute right-0 left-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white py-2 shadow-xl sm:left-auto sm:w-full sm:min-w-[14rem] sm:max-w-sm",
          },
        React.createElement(
          "nav",
          { className: "flex flex-col", "aria-label": "Section navigation" },
          React.createElement(
            Link,
            {
              href: "#hire",
              className: "flex min-h-[48px] items-center justify-center gap-2 px-5 py-3 font-sans text-sm font-semibold text-white transition bg-calmu-black hover:opacity-90 sm:hidden",
              onClick: () => setMobileOpen(false),
            },
            "Hire Vishwajeet",
            React.createElement(ArrowRight, { className: "h-5 w-5 shrink-0", size: 20 })
          ),
          ...navLinks.filter((link) => link.href !== "#hire").map((link) =>
            React.createElement(
              Link,
              {
                key: link.href,
                href: link.href,
                className: "flex min-h-[48px] items-center px-5 py-3 font-sans text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-calmu-black active:bg-gray-100",
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
