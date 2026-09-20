/**
 * Single source of truth for identity, contact and bio copy.
 * Edit here — no component hardcodes any of this.
 */

export const profile = {
  name: "Samiksha Batra",
  firstName: "Samiksha",
  title: "AI/ML Engineer",
  tagline: "GenAI, Agents & Applied ML",
  location: "Bengaluru, Karnataka, India",
  status: "Open to AI/ML Engineer roles",

  /** The hero sentence. What she builds, and what it is for. */
  valueProp:
    "I build end-to-end AI systems that turn messy data, documents and workflows into decisions people can act on — and measure every one of them against a real baseline.",

  /** Hero counters. Kept to things that are checkable. */
  stats: [
    { value: "3+", label: "internships" },
    { value: "20+", label: "projects" },
    { value: "∞", label: "curiosity" },
  ],

  /** About section. Three claims, each one demonstrable elsewhere on the page. */
  pillars: [
    { title: "Build", note: "end-to-end systems, not notebooks" },
    { title: "Measure", note: "against a baseline, every time" },
    { title: "Ship", note: "with the failure modes written down" },
  ],

  /** About section. Three sentences, no filler. */
  bio: [
    "I am an MSc AI & ML student at CHRIST University, Bengaluru, with a BSc in Mathematical Sciences from Delhi University — which is where the habit of checking the number twice comes from.",
    "Three applied-AI and software internships so far: agentic LangGraph workflows at Alliedworks, a production RAG assistant and text-classification router at Atomic North, and Django REST APIs on a live market-data app at Bluestock.",
    "The part I care about is what comes after the demo — calibration, evaluation sets, failure modes, and knowing which number is the one that actually moves.",
  ],

  /** Pull quote, used once in the hero gutter. */
  quote: "Curiosity builds better systems.",

  email: "samikshabatra18@gmail.com",
  phone: "+91 85700 33198",
  phoneHref: "tel:+918570033198",
  github: "https://github.com/Samikshabatra",
  githubHandle: "Samikshabatra",
  linkedin: "https://www.linkedin.com/in/samiksha-batra-877875280/",
  linkedinHandle: "samiksha-batra",
  resume: "/resume.pdf",

  /**
   * Square, 800x800. Set hasPhoto to false to fall back to the typographic
   * monogram — the slot is the same size either way, so nothing shifts.
   */
  photo: "/headshot.jpg",
  photoAlt: "Samiksha Batra",
  hasPhoto: true,

  siteUrl: "https://samikshabatra.vercel.app",
} as const;

export const education = [
  {
    school: "CHRIST (Deemed to be University), Bengaluru",
    degree: "MSc, Artificial Intelligence & Machine Learning",
    period: "Jun 2025 — May 2027 (expected)",
    result: "SGPA 3.6 / 4.0",
  },
  {
    school: "Maharaja Agrasen College, University of Delhi",
    degree: "BSc, Mathematical Sciences",
    period: "Nov 2022 — May 2025",
    result: "CGPA 7.7 / 10",
  },
] as const;
