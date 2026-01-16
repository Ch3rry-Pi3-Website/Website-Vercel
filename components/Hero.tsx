import Link from "next/link";
import Container from "@/components/Container";

const focusAreas = [
  "Product strategy and ROI modeling",
  "Data pipelines and feature foundations",
  "Custom model development and evaluation",
  "MLOps and LLMOps for production reliability",
];

export default function Hero() {
  return (
    <section className="pt-14 sm:pt-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              AI and ML consulting
            </p>
            <h1 className="mt-4 text-4xl font-[var(--font-display)] text-slate-900 sm:text-5xl">
              Deliver AI systems that your team can trust and scale.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              We partner with startups, SMEs, and enterprise teams to turn data
              into production-ready AI products, from strategy through
              deployment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:text-slate-800"
              >
                Explore services
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Engagement snapshot
            </p>
            <h2 className="mt-3 text-2xl font-[var(--font-display)] text-slate-900">
              Senior delivery pods for critical AI initiatives.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We embed with your team to ship reliable models, workflows, and
              infrastructure that hold up in production.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
