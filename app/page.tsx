"use client";

import Navbar from "./components/Navbar";
import HeroLanding from "./components/HeroLanding";
import MethodologySection from "./components/MethodologySection";
import CaseStudySection from "./components/CaseStudySection";
import MissionControlSection from "./components/MissionControlSection";
import CampusInfrastructureSection from "./components/CampusInfrastructureSection";
import RoadmapTimeline from "./components/RoadmapTimeline";
import HireSection from "./components/HireSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <HeroLanding />

        <MethodologySection />

        <CaseStudySection />

        <CampusInfrastructureSection />

        <MissionControlSection />

        <RoadmapTimeline />

        <HireSection />
      </main>

      <footer className="border-t border-calmu-black/10 bg-creamy py-6 text-center font-sans text-sm text-calmu-black/80">
        © CalMU X SPJ Global X Vishwajeet | Venture Ecosystem — Orbital Venture Engine
      </footer>
    </>
  );
}
