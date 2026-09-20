export type SkillGroup = { group: string; note: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    group: "GenAI & agents",
    note: "Where most of my work sits",
    items: [
      "LLMs",
      "Prompt engineering",
      "RAG",
      "Embeddings",
      "Vector DBs (FAISS, Qdrant)",
      "LangChain",
      "LangGraph",
      "AI agents",
      "QLoRA fine-tuning",
      "n8n",
    ],
  },
  {
    group: "ML & data",
    note: "Modelling through evaluation",
    items: [
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "PyTorch",
      "Feature engineering",
      "Model evaluation",
      "Calibration",
      "SHAP",
      "EDA",
      "Pandas",
      "NumPy",
      "ETL pipelines",
    ],
  },
  {
    group: "Languages",
    note: "",
    items: ["Python", "SQL", "C"],
  },
  {
    group: "Cloud & MLOps",
    note: "Getting it off my machine",
    items: ["AWS", "Microsoft Azure", "FastAPI", "Streamlit", "Docker", "Git & GitHub", "Jupyter"],
  },
  {
    group: "Analysis & visualisation",
    note: "",
    items: ["Tableau", "Statistical analysis", "Altair", "Matplotlib"],
  },
];
