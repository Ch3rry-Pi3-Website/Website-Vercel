import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Let&apos;s discuss your AI initiative"
      description="Tell us about your product goals, data readiness, and timeline. We typically reply within two business days."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">
            What to include
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A short description of your goals, your current data stack, and how
            you plan to use AI or ML in production is perfect.
          </p>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p>hello@ch3rrypi3.ai</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Location</p>
              <p>Remote-first, supporting global teams</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Engagements</p>
              <p>Strategy sprints, delivery pods, and enablement workshops</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
