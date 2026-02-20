"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Settings, TrendingUp, BarChart3, RotateCcw } from "lucide-react";

import calmuAdImage from "./CalMU Ad.png";

type SubSystem = {
  id: string;
  venture: string;
  name: string;
  prompts: { title: string; description: string }[];
  workflow: string[];
  integrationData: { label: string; value: string }[];
  performance: { label: string; value: string }[];
};

const SUB_SYSTEMS: SubSystem[] = [
  {
    id: "alumni-matrix",
    venture: "SPJ Global Engine",
    name: "Alumni Matrix",
    prompts: [
      { title: "Map founder pipeline Mumbai → San Jose", description: "Map a founder pipeline from Mumbai SPJ campus to San Jose 2nd Level Business Center." },
      { title: "Identify AI-ready talent pool", description: "Filter top 5% AI-Ready engineering talent across SP Jain global campuses." },
      { title: "Schedule hybrid interview slots", description: "Reserve ELO 2 and Meeting Room 1 for hybrid interviews with matched mentors." },
    ],
    workflow: [
      "Ingest: Accessing SP Jain global student database.",
      "Filter: Identifying top 5% AI-Ready engineering talent.",
      "Logistics: Reserving ELO 2 and Meeting Room 1 for hybrid interviews.",
    ],
    integrationData: [
      { label: "Target Campus", value: "Mumbai SPJ → San Jose BPC" },
      { label: "Pipeline Size", value: "47 founders (top 5%)" },
    ],
    performance: [
      { label: "Flight Path Matches", value: "12 mentor pairs" },
      { label: "Ready Status", value: "ELO 2 reserved" },
    ],
  },
  {
    id: "talent-bridge",
    venture: "SPJ Global Engine",
    name: "Talent Bridge",
    prompts: [
      { title: "Talent migration visualization", description: "Generate a visual Flight Path showing talent migration and mentor matching." },
      { title: "Cross-campus cohort sync", description: "Sync cohort profiles between Dubai, Mumbai, and San Jose for hybrid programs." },
      { title: "Mentor availability matrix", description: "Map EIR availability to founder slots for the next 30 days." },
    ],
    workflow: [
      "Map: Building talent migration paths.",
      "Match: Pairing founders to mentor thesis.",
      "Output: Flight Path visualization and calendar blocks.",
    ],
    integrationData: [
      { label: "Active Mentors", value: "8 EIRs (San Jose)" },
      { label: "Slots Reserved", value: "24 sessions" },
    ],
    performance: [
      { label: "Match Rate", value: "94%" },
      { label: "Ready", value: "Demo Day aligned" },
    ],
  },
  {
    id: "market-entry",
    venture: "GTM Agentic Tools",
    name: "Market Entry",
    prompts: [
      { title: "Simulate 12-month Churn/LTV", description: "Simulate 12-month Churn/LTV for an AI-SaaS pilot launching in the US." },
      { title: "CAC sensitivity analysis", description: "Run Monte Carlo scenarios for customer acquisition cost (CAC) across segments." },
      { title: "GTM channel prioritization", description: "Rank channels by intent and CAC for US enterprise launch." },
    ],
    workflow: [
      "Simulate: Running Monte Carlo scenarios for CAC.",
      "Optimize: Adjusting GTM agents to high-intent LinkedIn segments.",
      "Risk Check: Identifying Red Flags in churn probability.",
    ],
    integrationData: [
      { label: "Scenario Runs", value: "1,200 iterations" },
      { label: "Segment Focus", value: "B2B SaaS (US)" },
    ],
    performance: [
      { label: "Valuation Uplift", value: "2.4x" },
      { label: "Churn Risk", value: "Low (flagged)" },
    ],
  },
  {
    id: "revenue-stress",
    venture: "GTM Agentic Tools",
    name: "Revenue Stress-Test",
    prompts: [
      { title: "Stress-test LTV assumptions", description: "Stress-test LTV under 3 recession scenarios." },
      { title: "Unit economics at scale", description: "Model unit economics at 10x and 100x scale." },
      { title: "Red flag dashboard", description: "Generate Red Flags report for cap table and burn." },
    ],
    workflow: [
      "Model: LTV under stress scenarios.",
      "Flag: Red Flags in churn and burn.",
      "Output: Performance report with risk bands.",
    ],
    integrationData: [
      { label: "Scenarios", value: "Base / -20% / -40%" },
      { label: "Runway Impact", value: "18 months (base)" },
    ],
    performance: [
      { label: "Valuation Range", value: "1.8x – 2.4x" },
      { label: "Red Flags", value: "2 (reviewed)" },
    ],
  },
  {
    id: "creative-synthesis",
    venture: "Ads Architect",
    name: "Creative Synthesis",
    prompts: [
      { title: "AI-optimized ad creatives", description: "Generate AI-optimized ad creatives for the Moonshot Lab's first cohort." },
      { title: "Scan Silicon Valley ad trends", description: "Scan current Silicon Valley ad trends and format benchmarks." },
      { title: "A/B copy workflows", description: "Design agentic workflows for A/B testing copy and creative." },
    ],
    workflow: [
      "Scan: Reviewing current Silicon Valley ad trends.",
      "Synthesize: Designing agentic workflows for A/B testing copy.",
      "Output: Yield Gap and potential volume metrics.",
    ],
    integrationData: [
      { label: "Creative Variants", value: "12 (4 formats × 3)" },
      { label: "Target", value: "Cohort launch (30 days)" },
    ],
    performance: [
      { label: "Yield Gap", value: "+34% (est.)" },
      { label: "Volume", value: "$45K potential" },
    ],
  },
  {
    id: "spend-optimizer",
    venture: "Ads Architect",
    name: "Spend Optimizer",
    prompts: [
      { title: "Allocate spend by channel", description: "Allocate spend across Meta, LinkedIn, and Google by intent tier." },
      { title: "CPM and CPA targets", description: "Set CPM and CPA targets per cohort segment." },
      { title: "Creative fatigue alerts", description: "Trigger creative refresh when CTR drops below threshold." },
    ],
    workflow: [
      "Ingest: Pulling spend and performance by channel.",
      "Optimize: Rebalancing to high-yield segments.",
      "Output: Daily spend plan and alerts.",
    ],
    integrationData: [
      { label: "Channels", value: "Meta, LinkedIn, Google" },
      { label: "Budget", value: "Cohort $15K/mo" },
    ],
    performance: [
      { label: "CPA Improvement", value: "-22%" },
      { label: "Fill Rate", value: "98%" },
    ],
  },
  {
    id: "content-distribution",
    venture: "Marketing Automator",
    name: "Content Distribution",
    prompts: [
      { title: "30-day PR blitz automation", description: "Automate a 30-day PR blitz for the Lab's Podcast launch." },
      { title: "Map AI/Biz tech journalists", description: "Map top 50 AI/Biz tech journalists and outlets." },
      { title: "Multi-agent social outreach", description: "Schedule multi-agent social outreach and follow-ups." },
    ],
    workflow: [
      "Map: Identifying top 50 AI/Biz tech journalists.",
      "Distribute: Scheduling multi-agent social outreach.",
      "Output: Real-time Integration Data (fill rates, target reach).",
    ],
    integrationData: [
      { label: "Journalists Mapped", value: "50 (tiered)" },
      { label: "Outreach Slots", value: "30 days" },
    ],
    performance: [
      { label: "Target Reach", value: "2.1M (est.)" },
      { label: "Fill Rate", value: "84%" },
    ],
  },
  {
    id: "pr-agent",
    venture: "Marketing Automator",
    name: "PR Agent",
    prompts: [
      { title: "Press release pipeline", description: "Generate and schedule press releases for Podcast and Demo Day." },
      { title: "Quote and soundbite bank", description: "Build quote and soundbite bank from EIRs and founders." },
      { title: "Coverage tracker", description: "Track coverage and sentiment across outlets." },
    ],
    workflow: [
      "Draft: PR and soundbites from EIR/founder inputs.",
      "Schedule: Pipeline for launch and Demo Day.",
      "Output: Coverage dashboard and sentiment.",
    ],
    integrationData: [
      { label: "Releases Queued", value: "6" },
      { label: "Soundbites", value: "12" },
    ],
    performance: [
      { label: "Coverage", value: "Live post-launch" },
      { label: "Sentiment", value: "Positive" },
    ],
  },
  {
    id: "curriculum-tailoring",
    venture: "AI Growth Education",
    name: "Curriculum Tailoring",
    prompts: [
      { title: "AI-literacy bootcamp for -1 to 0", description: "Customize an AI-literacy bootcamp for non-technical founders in the -1 to 0 stage." },
      { title: "Assess founder technical baseline", description: "Assess founder technical baseline and learning pace." },
      { title: "Select 5 core AI EdTech modules", description: "Select 5 core AI EdTech modules for the cohort." },
    ],
    workflow: [
      "Assess: Evaluating founder technical baseline.",
      "Module Build: Selecting 5 core AI EdTech modules.",
      "Output: Syllabus and Ready status for ELO classrooms.",
    ],
    integrationData: [
      { label: "Cohort Size", value: "24 founders" },
      { label: "Modules", value: "5 (AI literacy)" },
    ],
    performance: [
      { label: "Ready Status", value: "ELO classrooms" },
      { label: "Duration", value: "6 weeks" },
    ],
  },
  {
    id: "skill-assessment",
    venture: "AI Growth Education",
    name: "Skill Assessment",
    prompts: [
      { title: "Pre-program assessment", description: "Run pre-program assessment and place founders in tracks." },
      { title: "Progress checks", description: "Schedule progress checks and certification gates." },
      { title: "Post-program readiness", description: "Output post-program readiness score for venture building." },
    ],
    workflow: [
      "Assess: Pre-program diagnostic.",
      "Track: Progress and certification gates.",
      "Output: Readiness score and recommendations.",
    ],
    integrationData: [
      { label: "Tracks", value: "3 (Technical / Hybrid / Biz)" },
      { label: "Gates", value: "Weekly" },
    ],
    performance: [
      { label: "Readiness Score", value: "Ready (85%+)" },
      { label: "Certification", value: "6 modules" },
    ],
  },
  {
    id: "stakeholder-matching",
    venture: "Founder CRM",
    name: "Stakeholder Matching",
    prompts: [
      { title: "Match ventures to Silicon Valley VCs", description: "Match the current cohort's top 3 ventures to active Silicon Valley VCs." },
      { title: "Scan Red Flags in cap table", description: "Diligence: Scanning Red Flags in cap table structures." },
      { title: "Pair venture sector to VC thesis", description: "Match: Pairing venture sector to VC investment thesis." },
    ],
    workflow: [
      "Diligence: Scanning Red Flags in cap table structures.",
      "Match: Pairing venture sector to VC investment thesis.",
      "Output: Shark Tank style opportunities for San Jose Event Lounge.",
    ],
    integrationData: [
      { label: "Ventures", value: "Top 3 (cohort)" },
      { label: "VCs Matched", value: "12" },
    ],
    performance: [
      { label: "Shark Tank Slots", value: "3" },
      { label: "Event Lounge", value: "Scheduled" },
    ],
  },
  {
    id: "investor-pipeline",
    venture: "Founder CRM",
    name: "Investor Pipeline",
    prompts: [
      { title: "VC outreach sequence", description: "Build VC outreach sequence for Demo Day follow-ups." },
      { title: "Data room readiness", description: "Check data room readiness and Red Flags before share." },
      { title: "Term sheet tracker", description: "Track term sheet and meeting requests post-Demo Day." },
    ],
    workflow: [
      "Sequence: VC outreach and data room checks.",
      "Flag: Red Flags before data room share.",
      "Output: Pipeline and term sheet tracker.",
    ],
    integrationData: [
      { label: "Outreach", value: "24 VCs" },
      { label: "Data Room", value: "Ready" },
    ],
    performance: [
      { label: "Meetings Booked", value: "8" },
      { label: "Term Sheets", value: "Pending" },
    ],
  },
];

const GTM_SUB_SYSTEMS: SubSystem[] = [
  {
    id: "gtm-inbound",
    venture: "GTM Agentic Tools",
    name: "Inbound (Community & Authority)",
    prompts: [
      {
        title: "Founder Community Architect",
        description: "Design a community funnel for 'extraordinary ability' builders focusing on Research, Project Collaborations, and high-impact Job Openings.",
      },
      {
        title: "Multichannel Content Blitz",
        description: "Synthesize a 90-day content calendar for the Moonshot Podcast and Social Media Educational pages to drive inbound applications.",
      },
      {
        title: "Talent Matching Logic",
        description: "Simulate a collaboration bridge between SPJ offshore interns and San Jose-based Product Architects.",
      },
    ],
    workflow: [
      "Step 1: Scanning San Jose/Silicon Valley talent density.",
      "Step 2: Mapping academic synergies within the Business Partnership Center.",
      "Step 3: Generating \"Inbound Yield\" and \"Community Growth\" metrics.",
    ],
    integrationData: [
      { label: "Talent Density Scan", value: "San Jose / Silicon Valley" },
      { label: "Academic Synergies", value: "Business Partnership Center" },
    ],
    performance: [
      { label: "Inbound Yield", value: "Elite builder funnel" },
      { label: "Community Growth", value: "90-day pipeline" },
    ],
  },
  {
    id: "gtm-outbound",
    venture: "GTM Agentic Tools",
    name: "Outbound (Paid & Physical)",
    prompts: [
      {
        title: "Strategic Media Buy",
        description: "Simulate a media collaboration with tech publishers to announce the Moonshot Lab's $0-equity infrastructure offer.",
      },
      {
        title: "Physical Awareness",
        description: "Optimize a Billboard Ad campaign surrounding the 505 S Market St campus to capture San Jose tech commuter traffic.",
      },
      {
        title: "Social Ad Performance",
        description: "Stress-test Social Media Ad sets targeting international founders seeking to build global AI businesses.",
      },
    ],
    workflow: [
      "Step 1: Ingesting CPM/CPC data for San Jose DMA.",
      "Step 2: Allocating virtual budget across \"Billboard\" vs \"Digital\" channels.",
      "Step 3: Generating \"Task Performance Reports\" showing Potential Reach and Acquisition Cost.",
    ],
    integrationData: [
      { label: "San Jose DMA", value: "CPM/CPC ingested" },
      { label: "Channel Mix", value: "Billboard vs Digital" },
    ],
    performance: [
      { label: "Potential Reach", value: "Tech commuter traffic" },
      { label: "Acquisition Cost", value: "Task performance" },
    ],
  },
];

const LOG_LINES = [
  "Allocating campus compute resources...",
  "San Jose Server Room online.",
  "CalMU Moonshot AI initializing.",
  "Sub-system agents ready.",
];

const GTM_THINKING_LINES = [
  "CalMU Moonshot AI is simulating GTM flows...",
  "Ingesting San Jose traffic data...",
  "Mapping Global Founder interest...",
];

export default function MissionControlSection() {
  const [selectedId, setSelectedId] = useState<string>(SUB_SYSTEMS[0].id);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "thinking" | "result">("idle");
  const [logIndex, setLogIndex] = useState(0);
  const [resultStep, setResultStep] = useState(1);

  const selected = SUB_SYSTEMS.find((s) => s.id === selectedId)!;

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = setInterval(() => setLogIndex((i) => (i + 1) % LOG_LINES.length), 1200);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "result") return;
    setResultStep(1);
    const t2 = setTimeout(() => setResultStep(2), 2200);
    const t3 = setTimeout(() => setResultStep(3), 4400);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  const handlePromptClick = (index: number) => {
    setSelectedPromptIndex(index);
    setPhase("thinking");
    setTimeout(() => setPhase("result"), 3200);
  };

  const handleReset = () => {
    setPhase("idle");
    setSelectedPromptIndex(null);
    setResultStep(1);
  };

  // GTM Simulation (separate area) state
  const [gtmSelectedId, setGtmSelectedId] = useState<string>(GTM_SUB_SYSTEMS[0].id);
  const [gtmPromptIndex, setGtmPromptIndex] = useState<number | null>(null);
  const [gtmPhase, setGtmPhase] = useState<"idle" | "thinking" | "result">("idle");
  const [gtmLogIndex, setGtmLogIndex] = useState(0);
  const [gtmResultStep, setGtmResultStep] = useState(1);
  const gtmSelected = GTM_SUB_SYSTEMS.find((s) => s.id === gtmSelectedId)!;

  useEffect(() => {
    if (gtmPhase !== "thinking") return;
    const t = setInterval(() => setGtmLogIndex((i) => (i + 1) % GTM_THINKING_LINES.length), 1100);
    return () => clearInterval(t);
  }, [gtmPhase]);

  useEffect(() => {
    if (gtmPhase !== "result") return;
    setGtmResultStep(1);
    const t2 = setTimeout(() => setGtmResultStep(2), 2200);
    const t3 = setTimeout(() => setGtmResultStep(3), 4400);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [gtmPhase]);

  const handleGtmPromptClick = (index: number) => {
    setGtmPromptIndex(index);
    setGtmPhase("thinking");
    setTimeout(() => setGtmPhase("result"), 3200);
  };

  const handleGtmReset = () => {
    setGtmPhase("idle");
    setGtmPromptIndex(null);
    setGtmResultStep(1);
  };

  return (
    <section
      id="simulator"
      className="scroll-mt-24 bg-calmu-black px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Title + description (before System Status) */}
        <motion.header
          className="mb-8 text-left"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Simulate Moonshot Venture Lab{" "}
            <span className="text-lime">AI.</span>
          </h2>
          <p className="mt-3 font-sans text-base text-white/70 sm:text-lg">
            Run sample prompts per sub-system and see how the Moonshot AI generates workflows and outputs.
          </p>
        </motion.header>

        {/* AI Terminal Header */}
        <motion.div
          className="mb-8 flex flex-col gap-2 rounded-xl border-2 border-lime/40 bg-calmu-black/90 py-3 pl-4 pr-4 shadow-[0_0_24px_rgba(217,249,157,0.15)] sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="inline-flex h-2 w-2 rounded-full bg-lime"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-white/90 sm:text-sm">
              System status: Operational
            </span>
          </div>
          <div className="min-h-[1.25rem] overflow-hidden font-mono text-xs text-lime/90 sm:text-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={logIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="inline-flex items-end truncate"
              >
                {LOG_LINES[logIndex].endsWith("...")
                  ? (
                      <>
                        {LOG_LINES[logIndex].slice(0, -3)}
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="inline-block"
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.12,
                              ease: "easeInOut",
                            }}
                          >
                            .
                          </motion.span>
                        ))}
                      </>
                    )
                  : LOG_LINES[logIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Sub-system selector */}
        <motion.div
          className="mb-6 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {SUB_SYSTEMS.map((sys) => (
            <button
              key={sys.id}
              type="button"
              onClick={() => { setSelectedId(sys.id); handleReset(); }}
              className={`rounded-lg border-2 px-3 py-2 font-sans text-xs font-medium transition sm:px-4 sm:py-2.5 sm:text-sm ${
                selectedId === sys.id
                  ? "border-lime bg-lime/20 text-lime shadow-[0_0_12px_rgba(217,249,157,0.25)]"
                  : "border-white/20 bg-white/5 text-white/80 hover:border-lime/40 hover:text-lime/90"
              }`}
            >
              {sys.name}
            </button>
          ))}
        </motion.div>

        {/* Main card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-gray-700 bg-gray-900 shadow-xl shadow-[0_0_32px_rgba(217,249,157,0.08)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-gray-700 bg-black/50 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-lime/50 text-lime">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="h-4 w-4" strokeWidth={1.5} />
                </motion.div>
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-white sm:text-base">{selected.name}</p>
                <p className="font-sans text-xs text-gray-400">{selected.venture} · Mission Control</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-lime/50 bg-lime/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span className="font-sans text-xs font-medium text-lime">Ready</span>
            </div>
          </div>

          <div className="relative min-h-[320px] p-4 sm:p-6">
            {/* Idle: Choose prompt */}
            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Zap className="h-10 w-10 text-lime" strokeWidth={1.5} />
                    <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">Choose a Sample Prompt</h3>
                    <p className="max-w-md font-sans text-sm text-gray-400">
                      Select one of the prompts below to see how the Moonshot AI generates workflows and outputs.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {selected.prompts.map((prompt, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => handlePromptClick(i)}
                        className="rounded-xl border border-gray-600 bg-gray-800 p-4 text-left transition hover:border-lime/50 hover:shadow-[0_0_16px_rgba(217,249,157,0.15)]"
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <p className="font-sans text-sm font-semibold text-white">{prompt.title}</p>
                        <p className="mt-1.5 font-sans text-xs leading-relaxed text-gray-400">{prompt.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "thinking" && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-4 flex flex-col gap-4 rounded-xl border border-lime/40 bg-gray-800/95 p-6 sm:inset-6"
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="h-2 w-2 rounded-full bg-lime"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    <span className="font-sans text-sm font-semibold text-white">
                      CalMU Moonshot AI is processing via San Jose Server Room...
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-gray-400">
                    {selectedPromptIndex !== null && selected.prompts[selectedPromptIndex]?.description}
                  </p>
                  <motion.div
                    className="flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-lime"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {phase === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* 1. Generated Workflow — appears first */}
                  {resultStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-lime/40 bg-gray-800 p-4 shadow-[0_0_12px_rgba(217,249,157,0.08)]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-lime" strokeWidth={1.5} />
                          <span className="font-sans text-sm font-semibold text-white">Generated Workflow</span>
                        </div>
                        <span className="font-sans text-xs text-gray-500">AI-generated steps</span>
                      </div>
                      <ul className="space-y-2">
                        {selected.workflow.map((step, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2 rounded-lg bg-gray-700/80 px-3 py-2 font-sans text-xs text-gray-300"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + i * 0.1 }}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime/50 bg-lime/10 text-xs font-semibold text-lime">
                              {i + 1}
                            </span>
                            {step}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Computing indicator before card 2 */}
                  {resultStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/5 px-4 py-3"
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-lime"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <span className="font-sans text-xs font-medium text-lime">
                        Retrieving integration data...
                      </span>
                    </motion.div>
                  )}

                  {/* 2. Integration Data — appears after first “computation” */}
                  {resultStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-lime/40 bg-gray-800 p-4 shadow-[0_0_12px_rgba(217,249,157,0.08)]"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-lime" strokeWidth={1.5} />
                        <span className="font-sans text-sm font-semibold text-white">Integration Data Retrieved</span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {selected.integrationData.map((item, i) => (
                          <motion.div
                            key={i}
                            className="rounded-lg border border-lime/30 bg-lime/5 px-3 py-2"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.08 }}
                          >
                            <p className="font-sans text-xs font-medium text-gray-500">{item.label}</p>
                            <p className="font-sans text-sm font-semibold text-lime">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Computing indicator before card 3 */}
                  {resultStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/5 px-4 py-3"
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-lime"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <span className="font-sans text-xs font-medium text-lime">
                        Generating performance report...
                      </span>
                    </motion.div>
                  )}

                  {/* 3. Task Performance Report — appears last */}
                  {resultStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-lime/40 bg-gray-800 p-4 shadow-[0_0_12px_rgba(217,249,157,0.08)]"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-lime" strokeWidth={1.5} />
                        <span className="font-sans text-sm font-semibold text-white">Task Performance Report</span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {selected.performance.map((item, i) => (
                          <motion.div
                            key={i}
                            className="rounded-lg bg-gray-700/60 px-3 py-2"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.08 }}
                          >
                            <p className="font-sans text-xs font-medium text-gray-500">{item.label}</p>
                            <p className="font-sans text-sm font-semibold text-lime">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          type="button"
                          onClick={handleReset}
                          className="flex items-center gap-2 rounded-lg border border-lime/60 bg-gray-700 px-4 py-2 font-sans text-xs font-semibold text-lime transition hover:bg-lime/10"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Reset Simulation
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ——— Moonshot Lab GTM Simulation (separate area, same format) ——— */}
        <motion.header
          className="mb-6 mt-16 text-left sm:mt-20"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Moonshot Lab <span className="text-lime">GTM Simulation</span>
          </h3>
          <p className="mt-2 font-sans text-sm text-white/70 sm:text-base">
            Inbound (Community & Authority) and Outbound (Paid & Physical) — run sample prompts and see workflows and outputs.
          </p>
        </motion.header>

        {/* GTM Simulation: Scaling the Ecosystem — two-column */}
        <h4 className="mb-4 font-serif text-lg font-bold tracking-tight text-white sm:text-xl">
          GTM Simulation: Scaling the Ecosystem.
        </h4>
        <motion.div
          className="mb-8 grid gap-6 rounded-2xl border-2 border-lime/30 bg-gray-900/80 p-6 shadow-[0_0_24px_rgba(217,249,157,0.08)] sm:grid-cols-2 sm:gap-8 sm:p-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-lime sm:text-sm">
              Inbound & Outbound Synergy
            </p>
            <h4 className="mt-2 font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
              Run sample prompts and see workflows and outputs.
            </h4>
            <div className="mt-4 space-y-4 font-sans text-sm leading-relaxed text-white/80 sm:text-base">
              <p>
                <strong className="text-white/95">Inbound (Community & Authority)</strong> builds a magnet for elite talent and founders: design community funnels for extraordinary-ability builders (Research, Project Collaborations, Job Openings), synthesize 90-day content calendars for the Moonshot Podcast and social education, and simulate collaboration bridges between SPJ offshore interns and San Jose Product Architects.
              </p>
              <p>
                <strong className="text-white/95">Outbound (Paid & Physical)</strong> drives high-velocity penetration and brand awareness: simulate media collaborations to announce the Lab&apos;s $0-equity infrastructure offer, optimize billboard campaigns around 505 S Market St for San Jose tech commuters, and stress-test social ad sets targeting international founders building global AI businesses.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/5 px-4 py-3">
              <motion.span
                className="h-2 w-2 shrink-0 rounded-full bg-lime"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="font-mono text-xs font-medium text-lime sm:text-sm">
                CalMU AI is simulating GTM flows...
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border-2 border-lime/30 bg-gray-800">
            <Image
              src={calmuAdImage}
              alt="CalMU Golden Gate Bridge billboard ad"
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
              <motion.span
                className="inline-flex items-center gap-1.5 rounded-full border border-lime/60 bg-calmu-black/80 px-3 py-1.5 font-mono text-xs font-medium text-lime shadow-[0_0_12px_rgba(217,249,157,0.3)]"
                animate={{ boxShadow: ["0 0 12px rgba(217,249,157,0.3)", "0 0 20px rgba(217,249,157,0.5)", "0 0 12px rgba(217,249,157,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-lime"
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                Simulation Active
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-6 flex flex-col gap-2 rounded-xl border-2 border-lime/40 bg-calmu-black/90 py-3 pl-4 pr-4 shadow-[0_0_24px_rgba(217,249,157,0.15)] sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="inline-flex h-2 w-2 rounded-full bg-lime"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-white/90 sm:text-sm">
              GTM status: Operational
            </span>
          </div>
          <div className="min-h-[1.25rem] overflow-hidden font-mono text-xs text-lime/90 sm:text-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={gtmLogIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="inline-flex items-end truncate"
              >
                {(gtmPhase === "thinking" ? GTM_THINKING_LINES[gtmLogIndex] : "GTM Agentic Tools · Inbound / Outbound").endsWith("...")
                  ? (
                      <>
                        {(gtmPhase === "thinking" ? GTM_THINKING_LINES[gtmLogIndex] : "GTM Agentic Tools · Inbound / Outbound").slice(0, -3)}
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="inline-block"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                          >
                            .
                          </motion.span>
                        ))}
                      </>
                    )
                  : gtmPhase === "thinking" ? GTM_THINKING_LINES[gtmLogIndex] : "GTM Agentic Tools · Inbound / Outbound"}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="mb-6 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {GTM_SUB_SYSTEMS.map((sys) => (
            <button
              key={sys.id}
              type="button"
              onClick={() => { setGtmSelectedId(sys.id); handleGtmReset(); }}
              className={`rounded-lg border-2 px-3 py-2 font-sans text-xs font-medium transition sm:px-4 sm:py-2.5 sm:text-sm ${
                gtmSelectedId === sys.id
                  ? "border-lime bg-lime/20 text-lime shadow-[0_0_12px_rgba(217,249,157,0.25)]"
                  : "border-white/20 bg-white/5 text-white/80 hover:border-lime/40 hover:text-lime/90"
              }`}
            >
              {sys.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-gray-700 bg-gray-900 shadow-xl shadow-[0_0_32px_rgba(217,249,157,0.08)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between border-b border-gray-700 bg-black/50 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-lime/50 text-lime">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="h-4 w-4" strokeWidth={1.5} />
                </motion.div>
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-white sm:text-base">{gtmSelected.name}</p>
                <p className="font-sans text-xs text-gray-400">{gtmSelected.venture} · GTM Simulation</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-lime/50 bg-lime/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span className="font-sans text-xs font-medium text-lime">Ready</span>
            </div>
          </div>

          <div className="relative min-h-[320px] p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {gtmPhase === "idle" && (
                <motion.div
                  key="gtm-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Zap className="h-10 w-10 text-lime" strokeWidth={1.5} />
                    <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">Choose a GTM Sample Prompt</h3>
                    <p className="max-w-md font-sans text-sm text-gray-400">
                      Select a prompt to see how the Moonshot AI simulates GTM flows and generates workflows and outputs.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {gtmSelected.prompts.map((prompt, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => handleGtmPromptClick(i)}
                        className="rounded-xl border border-gray-600 bg-gray-800 p-4 text-left transition hover:border-lime/50 hover:shadow-[0_0_16px_rgba(217,249,157,0.15)]"
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <p className="font-sans text-sm font-semibold text-white">{prompt.title}</p>
                        <p className="mt-1.5 font-sans text-xs leading-relaxed text-gray-400">{prompt.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {gtmPhase === "thinking" && (
                <motion.div
                  key="gtm-thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-4 flex flex-col gap-4 rounded-xl border border-lime/40 bg-gray-800/95 p-6 sm:inset-6"
                >
                  {GTM_THINKING_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.35, duration: 0.3 }}
                    >
                      <motion.span
                        className="h-2 w-2 shrink-0 rounded-full bg-lime"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span className="font-sans text-sm font-semibold text-white">
                        {line.endsWith("...") ? (
                          <>
                            {line.slice(0, -3)}
                            <motion.span className="inline-flex gap-0.5" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity }}>...</motion.span>
                          </>
                        ) : line}
                      </span>
                    </motion.div>
                  ))}
                  <p className="font-sans text-sm leading-relaxed text-gray-400">
                    {gtmPromptIndex !== null && gtmSelected.prompts[gtmPromptIndex]?.description}
                  </p>
                  <motion.div className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-lime"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {gtmPhase === "result" && (
                <motion.div
                  key="gtm-result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {gtmResultStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-lime/40 bg-gray-800 p-4 shadow-[0_0_12px_rgba(217,249,157,0.08)]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-lime" strokeWidth={1.5} />
                          <span className="font-sans text-sm font-semibold text-white">Generated Workflow</span>
                        </div>
                        <span className="font-sans text-xs text-gray-500">AI-generated steps</span>
                      </div>
                      <ul className="space-y-2">
                        {gtmSelected.workflow.map((step, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2 rounded-lg bg-gray-700/80 px-3 py-2 font-sans text-xs text-gray-300"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + i * 0.1 }}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-lime/50 bg-lime/10 text-xs font-semibold text-lime">{i + 1}</span>
                            {step}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  {gtmResultStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/5 px-4 py-3"
                    >
                      <motion.span className="h-1.5 w-1.5 rounded-full bg-lime" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }} />
                      <span className="font-sans text-xs font-medium text-lime">Retrieving integration data...</span>
                    </motion.div>
                  )}
                  {gtmResultStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-lime/40 bg-gray-800 p-4 shadow-[0_0_12px_rgba(217,249,157,0.08)]"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-lime" strokeWidth={1.5} />
                        <span className="font-sans text-sm font-semibold text-white">Integration Data Retrieved</span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {gtmSelected.integrationData.map((item, i) => (
                          <motion.div
                            key={i}
                            className="rounded-lg border border-lime/30 bg-lime/5 px-3 py-2"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.08 }}
                          >
                            <p className="font-sans text-xs font-medium text-gray-500">{item.label}</p>
                            <p className="font-sans text-sm font-semibold text-lime">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {gtmResultStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/5 px-4 py-3"
                    >
                      <motion.span className="h-1.5 w-1.5 rounded-full bg-lime" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }} />
                      <span className="font-sans text-xs font-medium text-lime">Generating performance report...</span>
                    </motion.div>
                  )}
                  {gtmResultStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-lime/40 bg-gray-800 p-4 shadow-[0_0_12px_rgba(217,249,157,0.08)]"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-lime" strokeWidth={1.5} />
                        <span className="font-sans text-sm font-semibold text-white">Task Performance Report</span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {gtmSelected.performance.map((item, i) => (
                          <motion.div
                            key={i}
                            className="rounded-lg bg-gray-700/60 px-3 py-2"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.08 }}
                          >
                            <p className="font-sans text-xs font-medium text-gray-500">{item.label}</p>
                            <p className="font-sans text-sm font-semibold text-lime">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          type="button"
                          onClick={handleGtmReset}
                          className="flex items-center gap-2 rounded-lg border border-lime/60 bg-gray-700 px-4 py-2 font-sans text-xs font-semibold text-lime transition hover:bg-lime/10"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Reset Simulation
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
