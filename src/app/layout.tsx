import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import { personSchema } from "@/lib/schema";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// The display voice. One weight, one italic — it is meant to be set large.
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description = `${profile.title} in ${profile.location.split(",")[0]}. ${profile.valueProp}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "GenAI",
    "LLM agents",
    "RAG",
    "LangGraph",
    "Bengaluru",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.title}`,
    description,
    url: profile.siteUrl,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * Runs before first paint, so a returning visitor's choice applies without a
 * flash of the wrong theme.
 *
 * The OS `prefers-color-scheme` is deliberately ignored. Light is the intended
 * first impression for everyone, whatever their machine is set to; dark is an
 * option you opt into with the toggle, and only then does it persist.
 */
const themeBootstrap = `(function(){try{var s=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",s==="dark"?"dark":"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Scroll-reveal starts hidden. Without JS it must not stay that way. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${archivo.variable} ${instrument.variable} ${plexMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink focus:text-small"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
