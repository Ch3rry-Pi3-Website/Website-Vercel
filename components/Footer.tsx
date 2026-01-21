import Link from "next/link";
import Container from "@/components/Container";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-[var(--font-display)] text-transparent bg-gradient-to-r from-indigo-200 via-sky-200 to-emerald-200 bg-clip-text">
              Ch3rryPi3 Artificial Intelligence (AI) Consulting
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Artificial intelligence (AI) and machine learning (ML) delivery
              for product-focused teams.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Copyright {year} Ch3rryPi3 Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
