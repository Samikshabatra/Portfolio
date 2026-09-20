import { profile } from "@/data/profile";

/**
 * Live GitHub contribution data for the activity heatmap.
 *
 * Two sources, in order of preference:
 *
 * 1. GitHub's own GraphQL API, when GITHUB_TOKEN is set. This is the same data
 *    that draws the graph on the profile page, so it is authoritative and
 *    current within minutes. It needs a token because the GraphQL endpoint
 *    rejects unauthenticated requests outright — even for public profiles.
 *
 * 2. A public, unauthenticated mirror. No token needed, but it scrapes the
 *    profile page on its own schedule and can run a day or more behind.
 *
 * The REST API has no contributions endpoint and the HTML graph sends no CORS
 * headers, so neither is an option from the browser. Hence this route.
 */

export const revalidate = 600;

const MIRROR = `https://github-contributions-api.jogruber.de/v4/${profile.githubHandle}?y=last`;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type ContributionsPayload = {
  total: number;
  days: Day[];
  /** False when every source failed — the UI shows a link instead. */
  ok: boolean;
  /** Which source answered, so the page can say how fresh the data is. */
  source: "github" | "mirror" | "none";
};

const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login:String!){
  user(login:$login){
    contributionsCollection{
      contributionCalendar{
        totalContributions
        weeks{ contributionDays{ date contributionCount contributionLevel } }
      }
    }
  }
}`;

async function fromGitHub(token: string): Promise<ContributionsPayload | null> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: profile.githubHandle } }),
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  const days: Day[] = (calendar.weeks ?? []).flatMap(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
  );
  if (days.length === 0) return null;

  return {
    total: calendar.totalContributions ?? days.reduce((n, d) => n + d.count, 0),
    days,
    ok: true,
    source: "github",
  };
}

async function fromMirror(): Promise<ContributionsPayload | null> {
  const res = await fetch(MIRROR, {
    next: { revalidate: 600 },
    headers: { accept: "application/json" },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    total?: Record<string, number>;
    contributions?: Day[];
  };
  const days = Array.isArray(data.contributions) ? data.contributions : [];
  if (days.length === 0) return null;

  return {
    total: data.total?.lastYear ?? days.reduce((n, d) => n + d.count, 0),
    days,
    ok: true,
    source: "mirror",
  };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  for (const attempt of [
    token ? () => fromGitHub(token) : null,
    () => fromMirror(),
  ]) {
    if (!attempt) continue;
    try {
      const payload = await attempt();
      if (payload) {
        return Response.json(payload, {
          headers: {
            "cache-control": "public, s-maxage=600, stale-while-revalidate=86400",
          },
        });
      }
    } catch {
      // Try the next source rather than failing the request.
    }
  }

  // Never throw: a build must not depend on a third party being reachable.
  return Response.json(
    { total: 0, days: [], ok: false, source: "none" } satisfies ContributionsPayload,
    { headers: { "cache-control": "public, s-maxage=120" } },
  );
}
