import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time. Same petrol-and-mint palette as the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f1",
          color: "#17171a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, background: "#c2570e" }} />
          <div style={{ fontSize: 24, color: "#6b6760" }}>{profile.status}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 36, color: "#17171a" }}>
            {profile.title} — {profile.tagline}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 25,
              color: "#6b6760",
              maxWidth: 940,
              lineHeight: 1.45,
            }}
          >
            End-to-end AI systems — RAG pipelines, LLM agents and supervised models,
            measured against real baselines.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            borderTop: "1px solid #e2ddd4",
            paddingTop: 26,
            fontSize: 23,
            color: "#6b6760",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#1b5e9c" }}>0.7788</span>
            <span>ROC-AUC</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#1b5e9c" }}>1.00</span>
            <span>citation validity</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#1b5e9c" }}>67.3%</span>
            <span>top-1 accuracy</span>
          </div>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            github.com/{profile.githubHandle}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
