import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { RouteTransition } from "@/components/motion/route-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
import { businessInfo } from "@/data/business";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AUTO SPOT | Premium Auto Care",
    template: "%s | AUTO SPOT",
  },
  description: "Premium auto diagnostics, maintenance, repairs, and detailing with transparent booking and instant quote flow.",
  metadataBase: new URL("https://autospotgarage.com"),
  openGraph: {
    title: "AUTO SPOT | Premium Auto Care",
    description: "Diagnostics, maintenance, and detailing - done right.",
    url: "https://autospotgarage.com",
    siteName: "AUTO SPOT",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/auto-spot-mark.svg", type: "image/svg+xml" }],
    shortcut: "/auto-spot-mark.svg",
    apple: "/auto-spot-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const automotiveSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: businessInfo.name,
    description: "Premium diagnostics, maintenance, repair and detailing services.",
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address,
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90017",
      addressCountry: "US",
    },
    url: "https://autospotgarage.com",
  };

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable} bg-slate-950 text-slate-100 antialiased`}>
        <SiteHeader />
        <main className="pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-0">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <SiteFooter />
        <StickyMobileCTA />
        <Providers />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(automotiveSchema) }} />
      </body>
    </html>
  );
}
