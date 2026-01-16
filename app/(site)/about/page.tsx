import Section from "@/components/Section";

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
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Our mission</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Help modern teams build AI capabilities that create durable value,
            without the fragility that often slows down ML initiatives.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Our approach</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We work shoulder-to-shoulder with your team, combining strategy,
            engineering, and delivery to create reliable AI systems.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Our values</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            {values.map((value) => (
              <li key={value.title}>
                <p className="font-semibold text-slate-900">{value.title}</p>
                <p className="mt-1 leading-6 text-slate-600">
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
