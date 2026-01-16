import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ch3rryPi3 AI Consulting",
    template: "%s | Ch3rryPi3 AI Consulting",
  },
  description:
    "AI and machine learning consultancy helping teams ship reliable data products, models, and MLOps foundations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-slate-950 font-sans text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
