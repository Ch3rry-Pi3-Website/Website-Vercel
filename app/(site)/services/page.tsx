import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

const pageTitle = "Services";
const fullTitle = "Services | Ch3rry Pi3";
const pageDescription =
  "Strategy, data engineering, model development, machine learning operations (MLOps), and workshops designed for production-ready artificial intelligence (AI) delivery.";
const canonicalPath = "/services";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const canonicalUrl = siteUrl
  ? new URL(canonicalPath, siteUrl).toString()
  : canonicalPath;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: fullTitle,
    description: pageDescription,
    url: siteUrl ? new URL(canonicalPath, siteUrl) : undefined,
    type: "website",
    siteName: "Ch3rry Pi3",
  },
  twitter: {
    title: fullTitle,
    description: pageDescription,
  },
};

const services = [
  {
    title: "Artificial intelligence (AI) strategy and roadmap",
    description:
      "Define the right use cases, build a delivery plan, and align stakeholders around measurable impact.",
    outcomes: [
      "Prioritized use-case backlog",
      "In-house versus partner decision guide",
      "Risk and compliance checklist",
    ],
  },
  {
    title: "Data engineering and foundations",
    description:
      "Design trustworthy data pipelines, quality gates, and feature foundations that scale with growth.",
    outcomes: [
      "Reliable data pipelines",
      "Automated validation and alerts",
      "Documented data ownership",
    ],
  },
  {
    title: "Model development and evaluation",
    description:
      "Build custom machine learning (ML) and large language model (LLM) solutions with transparent evaluation and repeatable experiments.",
    outcomes: [
      "Offline and online evaluation plans",
      "Model performance benchmarks",
      "Deployment-ready artifacts",
    ],
  },
  {
    title: "Machine learning operations (MLOps) and large language model operations (LLMOps)",
    description:
      "Deploy models safely with continuous integration / continuous delivery (CI/CD), monitoring, and governance that hold up in production.",
    outcomes: [
      "Release automation",
      "Drift and quality monitoring",
      "Incident response playbooks",
    ],
  },
  {
    title: "Workshops and enablement",
    description:
      "Upskill teams with targeted workshops and co-building sessions tailored to your stack.",
    outcomes: [
      "Practical team playbooks",
      "Shared tooling standards",
      "Accelerated internal adoption",
    ],
  },
];

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Services"
      title="Everything you need to move from prototype to production"
      introClassName="max-w-none"
      description={
        <>
          We partner with startups, small- and medium-sized enterprises (SMEs),
          and enterprise teams to deliver the{" "}
          <span className="term-emphasis">
            artificial intelligence (AI) capabilities
          </span>{" "}
          that matter most.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40"
          >
            <h3 className="text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {service.description}
            </p>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Typical outcomes
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-slate-900/80 px-8 py-10 text-white shadow-2xl shadow-slate-950/50 md:flex-row md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
            Next step
          </p>
          <h2 className="mt-3 text-2xl font-[var(--font-display)]">
            Let&apos;s map your artificial intelligence (AI) roadmap together.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            We&apos;ll review your goals, data readiness, and delivery constraints
            to recommend the right engagement.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
        >
          Talk with us
        </Link>
      </div>
    </Section>
  );
}
