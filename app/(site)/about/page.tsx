import type { Metadata } from "next";
import Section from "@/components/Section";

const pageTitle = "About";
const fullTitle = "About | Ch3rry Pi3";
const pageDescription =
  "A senior AI consultancy focused on reliability, security, reproducibility, and measurable outcomes.";
const canonicalPath = "/about";
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

const values = [
  {
    title: "Reliability",
    description:
      "We design with production stability in mind, so your AI systems can handle real-world usage.",
  },
  {
    title: "Security",
    description:
      "We align with your security posture, data governance requirements, and privacy expectations.",
  },
  {
    title: "Reproducibility",
    description:
      "Clear documentation, versioned assets, and repeatable workflows keep projects dependable.",
  },
  {
    title: "Measurable outcomes",
    description:
      "Every engagement is anchored to business metrics and transparent evaluation criteria.",
  },
];

export default function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title="A small senior team focused on outcomes"
      description="Ch3rryPi3 AI Consulting partners with product and engineering leaders to deliver AI systems that are trustworthy, secure, and measurable."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
          <h3 className="text-xl font-semibold text-white">Our mission</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Help modern teams build AI capabilities that create durable value,
            without the fragility that often slows down ML initiatives.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
          <h3 className="text-xl font-semibold text-white">Our approach</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            We work shoulder-to-shoulder with your team, combining strategy,
            engineering, and delivery to create reliable AI systems.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
          <h3 className="text-xl font-semibold text-white">Our values</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            {values.map((value) => (
              <li key={value.title}>
                <p className="font-semibold text-white">{value.title}</p>
                <p className="mt-1 leading-6 text-slate-300">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
