import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Section from "@/components/Section";

const pageTitle = "Ch3rry Pi3 | AI & Machine Learning Consultancy";
const pageDescription =
  "Senior-led AI and machine learning delivery for startups, SMEs, and enterprise product teams.";
const canonicalPath = "/";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const canonicalUrl = siteUrl
  ? new URL(canonicalPath, siteUrl).toString()
  : canonicalPath;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteUrl ? new URL(canonicalPath, siteUrl) : undefined,
    type: "website",
    siteName: "Ch3rry Pi3",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

const capabilityCards = [
  {
    title: "Strategy and product alignment",
    description:
      "Clarify the highest-impact use cases, define ROI, and build a delivery roadmap that your team can execute.",
  },
  {
    title: "Data engineering foundations",
    description:
      "Design resilient pipelines, quality checks, and governance that keep models reliable in production.",
  },
  {
    title: "Model development to deployment",
    description:
      "Build, evaluate, and ship ML and LLM systems that are measurable, secure, and easy to maintain.",
  },
];

const processSteps = [
  {
    title: "Discover",
    description:
      "Align on goals, constraints, and success metrics with your product and engineering leaders.",
  },
  {
    title: "Design",
    description:
      "Architect data flows, model strategies, and safety checks that fit your stack and risk profile.",
  },
  {
    title: "Build",
    description:
      "Implement fast, senior-led delivery sprints with clear demos and checkpoint reviews.",
  },
  {
    title: "Operationalize",
    description:
      "Launch with monitoring, documentation, and a handoff plan for long-term reliability.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-5 text-sm text-slate-300 shadow-lg shadow-slate-950/40">
            <span className="font-semibold text-white">Security-first</span>
            <span>Reproducible pipelines</span>
            <span>Measurable outcomes</span>
            <span>Senior-led delivery</span>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="What we do"
        title="Hands-on AI delivery for modern product teams"
        description="From strategy to production, we build AI systems that earn trust and drive measurable business value."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {capabilityCards.map((capability) => (
            <div
              key={capability.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-white/20"
            >
              <h3 className="text-lg font-semibold text-white">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How we work"
        title="A clear, senior-led delivery process"
        description="We pair strategic guidance with implementation so your team ships confidently and quickly."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-slate-900/80 px-8 py-10 text-white shadow-2xl shadow-slate-950/50 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                Ready to build
              </p>
              <h2 className="mt-3 text-3xl font-[var(--font-display)]">
                Launch your next AI initiative with confidence.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-300">
                We help teams move from ideas to production with a focused scope,
                clear success metrics, and pragmatic delivery.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              Book a discovery call
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
