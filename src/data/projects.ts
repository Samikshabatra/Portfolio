/**
 * Featured work. Every entry is a real public repository.
 * To add a project: append an object below — nothing else needs to change.
 *
 * cover  → a screenshot of the project's own interface, in /public/projects.
 *          Omit it and the card renders a diagram of `pipeline` instead. Never
 *          substitute stock imagery: a cover either shows the real thing or it
 *          shows the real architecture.
 * metrics → the two numbers worth putting on a card. Long form lives in the
 *          repository; this is what a recruiter reads in four seconds.
 */

export type Project = {
  slug: string;
  title: string;
  /** One sentence. What it does, from the user's side. */
  pitch: string;
  /** Two or three sentences on how it actually works. */
  detail: string;
  year: string;
  domain: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  /** Real stage names from the repository, used when there is no screenshot. */
  pipeline: string[];
  cover?: string;
  coverAlt?: string;
  repo: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "credit-risk",
    title: "Credit Risk Intelligence Platform",
    pitch:
      "Scores a loan applicant, explains the decision, drafts the adverse-action notice, and answers follow-up questions in plain English.",
    detail:
      "A 1,190-tree LightGBM model, isotonically calibrated because the raw scores were badly overconfident, with the approve/decline threshold set at 0.129 by expected cost rather than the reflexive 0.50. A chat agent wraps six tools over the same warehouse, and every generated SQL statement passes an allowlist, a denylist, a table filter and a read-only connection.",
    year: "2026",
    domain: "Applied ML, explainability and LLM tooling",
    stack: ["LightGBM", "scikit-learn", "SHAP", "Claude", "Streamlit", "Docker"],
    metrics: [
      { value: "0.7788", label: "ROC-AUC, 61,503 held out" },
      { value: "100%", label: "refusals on injected SQL" },
    ],
    pipeline: ["warehouse", "features", "model", "calibration", "decision", "explanation"],
    cover: "/projects/creditrisk.webp",
    coverAlt: "The CreditRisk IQ dashboard showing a scored application and its decision path",
    repo: "https://github.com/Samikshabatra/AI-Powered-Credit-Risk-Intelligence-Platform",
    demo: "https://ai-powered-credit-risk-intelligence-platform-8eftb3rvzqybqg2pj.streamlit.app",
  },
  {
    slug: "cybersentinel",
    title: "CyberSentinel",
    pitch:
      "Takes a security alert, log or suspicious URL and returns a structured incident report — stopping for a human before anything with consequences.",
    detail:
      "A LangGraph workflow over a QLoRA-fine-tuned Qwen2.5-3B, where routing, correlation, risk scoring and persistence stay in deterministic Python and the model is only asked to read language. MITRE ATT&CK and CWE mappings are applied only when retrieval supports them, which is what moved the grounded rate from 0.00 to 1.00.",
    year: "2026",
    domain: "Fine-tuning, RAG and agent orchestration",
    stack: ["QLoRA", "Qwen2.5", "LangGraph", "Qdrant", "FastAPI", "PostgreSQL"],
    metrics: [
      { value: "1.00", label: "grounded rate, from 0.00" },
      { value: "227", label: "unit tests" },
    ],
    pipeline: ["classify", "detect", "retrieve", "correlate", "score", "approve"],
    cover: "/projects/cybersentinel.webp",
    coverAlt: "The CyberSentinel threat analysis console showing incident volume and severity mix",
    repo: "https://github.com/Samikshabatra/CyberSentinel",
    demo: "https://cybersentinel-79bcvw2c2uyrlmj9thd2bu.streamlit.app",
  },
  {
    slug: "market-intelligence-agent",
    title: "Market Intelligence Agent",
    pitch:
      "Ask a competitive question, get a cited brief back in under a minute instead of half an hour of tab-juggling.",
    detail:
      "The planner splits a question into sub-questions, the executor runs searches in parallel and dedupes sources, and the evidence store binds every claim to a URL, a passage and a timestamp. Anything still thin after scoring triggers one bounded extra round; whatever survives unverified is flagged in the output rather than quietly asserted.",
    year: "2026",
    domain: "LLM agents, retrieval and evaluation",
    stack: ["LangGraph", "Claude", "Tavily", "FastAPI", "Python"],
    metrics: [
      { value: "< 60s", label: "per competitor brief" },
      { value: "1.00", label: "citation validity" },
    ],
    pipeline: ["plan", "search", "store evidence", "score", "fall back", "synthesise"],
    repo: "https://github.com/Samikshabatra/Market-Intelligence-Agent",
  },
  {
    slug: "statusforge",
    title: "StatusForge",
    pitch:
      "Turns a product roadmap into a daily Slack digest, and escalates to @here only when the numbers say it should.",
    detail:
      "Airtable data is validated, analysed by parallel progress and risk agents, ranked by a supervisor, then checked again before anything reaches Slack. The rule the whole design enforces: counts and the escalation decision are deterministic, and the model only narrates them. Built twice — an n8n workflow in production and a LangGraph agent you can step through.",
    year: "2026",
    domain: "Agent orchestration and workflow automation",
    stack: ["n8n", "LangGraph", "LangChain", "Airtable", "Slack"],
    metrics: [
      { value: "15", label: "stages, Airtable to Slack" },
      { value: "2", label: "implementations, n8n and LangGraph" },
    ],
    pipeline: ["validate", "analyse", "supervise", "rank", "verify", "post"],
    cover: "/projects/statusforge.webp",
    coverAlt:
      "The StatusForge workflow open in the n8n editor, showing the agent graph and a successful run",
    repo: "https://github.com/Samikshabatra/statusforge",
  },
  {
    slug: "invision",
    title: "InVision",
    pitch:
      "Photograph any shopfront in a mall and it works out where you are standing, then routes you to where you want to go.",
    detail:
      "Two independent channels are fused: CLIP embeddings against a storefront gallery, and OCR'd signage fuzzy-matched to brand names, weighted 0.7 visual to 0.3 text. Signage scoring above 0.42 overrides the visual channel outright, because a legible sign beats a good guess. Routing is Dijkstra over a 268-node graph across five floors, and disagreement returns alternatives rather than a confident wrong answer.",
    year: "2026",
    domain: "Computer vision, multimodal fusion and graph routing",
    stack: ["CLIP", "PyTorch", "RapidOCR", "NetworkX", "FastAPI"],
    metrics: [
      { value: "67.3%", label: "top-1 localisation" },
      { value: "3.9s", label: "end to end, OCR-bound" },
    ],
    pipeline: ["photo", "CLIP match", "OCR signage", "fuse", "route", "direct"],
    repo: "https://github.com/Samikshabatra/InVision",
  },
  {
    slug: "clipit",
    title: "ClipIt",
    pitch:
      "Describe the highlight reel you want — “60 seconds, upbeat, captions on” — and it cuts the footage for you.",
    detail:
      "Four deterministic stages: ingest and detect shot boundaries, transcribe and label scenes, plan the cut, render with ffmpeg. The model is called only for narrative sequencing; shortlisting, cut snapping and the duration solve are ordinary code. A content-addressed cache keyed on the video hash, stage and config means re-running the same settings costs nothing.",
    year: "2026",
    domain: "Video understanding and deterministic pipelines",
    stack: ["faster-whisper", "CLIP", "ffmpeg", "PySceneDetect", "FastAPI", "React"],
    metrics: [
      { value: "4", label: "deterministic stages" },
      { value: "0", label: "recompute on an identical run" },
    ],
    pipeline: ["ingest", "analyse", "plan", "render"],
    repo: "https://github.com/Samikshabatra/ClipIt",
  },
  {
    slug: "rag-pipeline-debugger",
    title: "RAG Pipeline Debugger",
    pitch:
      "Tells you which stage of a RAG pipeline broke, instead of only telling you the answer was wrong.",
    detail:
      "Retrieval, reranking and generation are each traced with timings, confidence and artifacts, then graded independently by a separate LLM judge. The analyser walks backwards through the trace to the first stage whose quality drops and names that as the root cause. Runs fully offline against a local model.",
    year: "2026",
    domain: "Evaluation tooling and observability",
    stack: ["ChromaDB", "sentence-transformers", "Ollama", "FastAPI", "Streamlit"],
    metrics: [
      { value: "3", label: "stages graded separately" },
      { value: "25", label: "tests, fully offline" },
    ],
    pipeline: ["retrieve", "rerank", "generate", "judge", "attribute"],
    repo: "https://github.com/Samikshabatra/RAG-Pipeline-Debugger",
  },
  {
    slug: "radar",
    title: "RADAR",
    pitch:
      "Skin-lesion classification from a smartphone photo plus whatever clinical history happens to be on file — usually not much.",
    detail:
      "The hard part is not the images. The metadata is missing non-randomly — complete for cancers, 61–80% absent for non-cancers — so imputing it leaks the label. RADAR treats missingness as an explicit state and gates the metadata branch behind a learned reliability signal, fusing a frozen EfficientNet-B3 with an FT-Transformer over 21 clinical fields.",
    year: "2026",
    domain: "Multimodal ML, medical imaging and missing data",
    stack: ["PyTorch", "EfficientNet", "FT-Transformer", "scikit-learn", "Streamlit"],
    metrics: [
      { value: "0.751", label: "macro-F1, 5-member ensemble" },
      { value: "2,298", label: "smartphone images, 6 classes" },
    ],
    pipeline: ["image branch", "metadata branch", "reliability gate", "fuse", "ensemble"],
    repo: "https://github.com/Samikshabatra/RADAR",
  },
];

/** Secondary work — listed compactly, links only. */
export type SmallProject = { name: string; blurb: string; repo: string };

export const alsoBuilt: SmallProject[] = [
  {
    name: "VisionSearch",
    blurb:
      "A vision-language retrieval model trained from scratch on a single 8 GB GPU — 0.5M trainable parameters over frozen backbones.",
    repo: "https://github.com/Samikshabatra/VisionSearch",
  },
  {
    name: "DataPilot AI",
    blurb:
      "Analytics assistant that runs exploratory analysis, writes the Python, executes it and reports back.",
    repo: "https://github.com/Samikshabatra/datapilot-ai",
  },
  {
    name: "Legal Document Analyzer",
    blurb: "RAG over legal PDFs — semantic search and clause-level question answering.",
    repo: "https://github.com/Samikshabatra/Legal-Document-Analyzer-",
  },
  {
    name: "ClearConsult",
    blurb:
      "Clinical documentation assistant: SOAP notes from consultations, risk triage, and RAG over clinical queries.",
    repo: "https://github.com/Samikshabatra/ClearConsult",
  },
  {
    name: "CodeSheriff",
    blurb: "Static review tooling that flags what a linter will not.",
    repo: "https://github.com/Samikshabatra/CodeSheriff",
  },
  {
    name: "100 Days of SQL",
    blurb:
      "Daily SQL from fundamentals through window functions and case studies, with a companion Python and LeetCode repo.",
    repo: "https://github.com/Samikshabatra/100_days_of_SQL",
  },
];
