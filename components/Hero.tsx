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
    <section className="pt-16 sm:pt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              AI and ML consulting
            </p>
            <h1 className="mt-4 text-4xl font-[var(--font-display)] text-white sm:text-5xl">
              Deliver AI systems that your team can trust and scale.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              We partner with startups, SMEs, and enterprise teams to turn data
              into production-ready AI products, from strategy through
              deployment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:text-white"
              >
                Explore services
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Senior-led delivery pods
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Secure, compliant workflows
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Measurable product impact
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-sky-500/10" />
            <div className="relative space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Engagement snapshot
                </p>
                <h2 className="mt-3 text-2xl font-[var(--font-display)] text-white">
                  Senior delivery pods for critical AI initiatives.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  We embed with your team to ship reliable models, workflows,
                  and infrastructure that hold up in production.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Delivery path
                </div>
                <div className="mt-4 flex flex-col items-center gap-3 text-xs font-semibold text-slate-200">
                  <span className="rounded-full border border-indigo-400/40 bg-indigo-500/20 px-4 py-2">
                    Strategy and alignment
                  </span>
                  <span className="h-6 w-px bg-white/20" />
                  <div className="grid w-full grid-cols-2 gap-3">
                    <span className="rounded-xl border border-sky-400/40 bg-sky-500/15 px-3 py-2 text-center">
                      Data engineering
                    </span>
                    <span className="rounded-xl border border-violet-400/40 bg-violet-500/15 px-3 py-2 text-center">
                      Model development
                    </span>
                  </div>
                  <span className="h-6 w-px bg-white/20" />
                  <div className="grid w-full grid-cols-3 gap-3">
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                      Evaluation
                    </span>
                    <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-center">
                      MLOps
                    </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                      Enablement
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-300">
                {focusAreas.map((area) => (
                  <li key={area} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
