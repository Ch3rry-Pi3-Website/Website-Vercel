import type { ReactNode } from "react";
import Container from "@/components/Container";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  introClassName?: string;
};

export default function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  introClassName = "max-w-2xl",
}: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>
        <div className={introClassName}>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-[var(--font-display)] text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-slate-300">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
