import { profile, education } from "@/data/profile";
import { experience } from "@/data/experience";

/** JSON-LD Person, emitted once in <head>. Reads from the same data files. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description: profile.valueProp,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.school,
  })),
  worksFor: experience
    .filter((r) => r.current)
    .map((r) => ({ "@type": "Organization", name: r.company })),
  knowsAbout: [
    "Large language models",
    "Retrieval-augmented generation",
    "LLM agents",
    "Machine learning",
    "Model evaluation",
    "Computer vision",
  ],
};
