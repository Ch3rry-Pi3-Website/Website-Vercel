import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";

const pageTitle = "Get in touch";
const fullTitle = "Get in touch | Ch3rry Pi3";
const pageDescription =
  "Start a project with our artificial intelligence (AI) and machine learning consultancy. Tell us about your goals and timeline.";
const canonicalPath = "/contact";
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

export default function ContactPage() {
  return (
    <Section
      eyebrow="Get in touch"
      title="Let&apos;s discuss your artificial intelligence (AI) initiative"
      introClassName="max-w-none"
      description={
        <>
          Tell us about your{" "}
          <span className="term-emphasis">product goals</span>, your{" "}
          <span className="term-emphasis">data readiness</span>, and{" "}
          <span className="term-emphasis">timeline</span>. We typically reply
          within two business days.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
          <h3 className="text-xl font-semibold text-white">
            What to include
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            A short description of your goals, your current{" "}
            <span className="term-emphasis">data stack</span>, and how you plan
            to use artificial intelligence (AI) or machine learning (ML) in
            production is perfect.
          </p>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-white">Email</p>
              <p>hello@example.com</p>
            </div>
            <div>
              <p className="font-semibold text-white">Delivery style</p>
              <p>Remote delivery with optional on-site sessions</p>
            </div>
            <div>
              <p className="font-semibold text-white">
                Ways to work together
              </p>
              <p>
                Rapid planning workshops, build-and-deliver projects, and team
                training sessions
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
