"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-[var(--font-display)] text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-200 bg-clip-text">
              Ch3rryPi3 AI
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              Get in touch
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/30 hover:text-white md:hidden"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {isOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 md:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
              >
                Get in touch
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
