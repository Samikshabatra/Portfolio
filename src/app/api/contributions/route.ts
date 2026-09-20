import { profile } from "@/data/profile";

/**
 * Live GitHub contribution data for the activity heatmap.
 *
 * GitHub's own contribution graph is not reachable from the browser (no CORS,
 * and the GraphQL API needs a token — this site has no secrets), so this proxies
 * a public, unauthenticated mirror and normalises the shape.
 *
 * Revalidated hourly, which keeps the graph a day fresh at worst while shielding
 * the upstream from every page view. A failure here returns an empty set with a
 * short cache rather than throwing, so a build never depends on a third party
 * being up and the page degrades to a link instead of an error.
 */

export const revalidate = 3600;

const UPSTREAM = `https://github-contributions-api.jogruber.de/v4/${profile.githubHandle}?y=last`;

type UpstreamDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type ContributionsPayload = {
  total: number;
  days: UpstreamDay[];
  /** False when upstream was unreachable — the UI shows a link instead. */
  ok: boolean;
};

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      next: { revalidate: 3600 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: UpstreamDay[];
    };

    const days = Array.isArray(data.contributions) ? data.contributions : [];
    const payload: ContributionsPayload = {
      total: data.total?.lastYear ?? days.reduce((n, d) => n + d.count, 0),
      days,
      ok: days.length > 0,
    };

    return Response.json(payload, {
      headers: {
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return Response.json(
      { total: 0, days: [], ok: false } satisfies ContributionsPayload,
      { headers: { "cache-control": "public, s-maxage=300" } },
    );
  }
}
