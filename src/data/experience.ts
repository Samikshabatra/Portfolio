export type Role = {
  company: string;
  role: string;
  start: string;
  end: string;
  current?: boolean;
  /** Two or three lines. Each one is a thing that shipped, not a responsibility. */
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Alliedworks",
    role: "AI Developer Intern",
    start: "Jul 2026",
    end: "Present",
    current: true,
    points: [
      "Building LangChain and LangGraph agentic workflows that orchestrate multi-step LLM reasoning and tool calls across internal business processes.",
      "Designing n8n automations that put LLM decisions inside real backend and third-party service flows, cutting manual intervention on recurring operational tasks.",
      "Working across vector and relational stores to structure, retrieve and ground LLM output, so downstream agent steps get consistent input.",
    ],
    stack: ["LangChain", "LangGraph", "n8n", "Vector DBs", "Python"],
  },
  {
    company: "Atomic North",
    role: "AI Engineer Intern",
    start: "Jan 2026",
    end: "Mar 2026",
    points: [
      "Built a RAG question-answering assistant over 300+ internal documents with LangChain and FAISS, replacing manual search for the team.",
      "Trained and evaluated a document-routing classifier (logistic regression vs random forest) to ~85% accuracy on an imbalanced set, judged on precision, recall and F1 rather than accuracy alone.",
      "Owned the whole workflow: cleaning, feature engineering, modelling, evaluation.",
    ],
    stack: ["LangChain", "FAISS", "scikit-learn", "Pandas", "Python"],
  },
  {
    company: "Bluestock",
    role: "Software Development Engineer Intern",
    start: "Oct 2025",
    end: "Nov 2025",
    points: [
      "Built and tested 6–8 REST endpoints with Django REST Framework serving IPO pricing, dates and financials to the live market-data app.",
      "Added filtering and pagination across 100+ IPO records to keep list loads small and predictable.",
    ],
    stack: ["Django REST Framework", "Python", "REST APIs"],
  },
];

export type Credential = {
  label: string;
  issuer: string;
  year: string;
  highlight?: boolean;
};

export const awards: Credential[] = [
  {
    label: "1st place, TechFest AI/ML Hackathon",
    issuer: "Delhi University — ~20 teams",
    year: "2024",
    highlight: true,
  },
  {
    label: "Core technical contributor, AI/ML",
    issuer: "IISc Bengaluru Hackathon — 36-hour build, NLP query understanding",
    year: "2026",
    highlight: true,
  },
  {
    label: "Volunteer coding educator",
    issuer: "Spread Smile Foundation, Bengaluru",
    year: "2025",
  },
];

export const certifications: Credential[] = [
  {
    label: "LLM Engineering: RAG, QLoRA & Agents",
    issuer: "Udemy — Ed Donner",
    year: "2025",
  },
  { label: "AWS Academy Cloud Foundations", issuer: "AWS Academy", year: "2025" },
  { label: "Introduction to Microsoft Azure", issuer: "Microsoft", year: "2025" },
  {
    label: "Introduction to Large Language Models",
    issuer: "Google Cloud / Coursera",
    year: "2024",
  },
  { label: "Python for Data Science", issuer: "Infosys Springboard", year: "2024" },
];
