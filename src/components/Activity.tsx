"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { GithubIcon } from "./BrandIcons";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Payload = { total: number; days: Day[]; ok: boolean };

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Longest run of consecutive days with at least one contribution. */
function longestStreak(days: Day[]) {
  let best = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

/**
 * Live contribution graph.
 *
 * Technical hiring managers open the GitHub profile anyway, so the graph is on
 * the page rather than one click away. It is fetched at view time from an
 * hourly-revalidated route, so it is never more than a day stale, and it never
 * shows stale numbers baked in at build.
 */
export function Activity() {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState<Day | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contributions", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((p: Payload) => (p.ok ? setData(p) : setFailed(true)))
      .catch((e) => {
        if ((e as Error).name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;
    const active = data.days.filter((d) => d.count > 0);
    const busiest = data.days.reduce(
      (best, d) => (d.count > best.count ? d : best),
      { date: "", count: 0, level: 0 } as Day,
    );
    return {
      total: data.total,
      activeDays: active.length,
      streak: longestStreak(data.days),
      busiest,
    };
  }, [data]);

  /** Columns of 7, Sunday-first, padded so week boundaries line up. */
  const weeks = useMemo(() => {
    if (!data) return [];
    const padded: (Day | null)[] = [...data.days];
    const firstWeekday = new Date(data.days[0].date + "T00:00:00Z").getUTCDay();
    for (let i = 0; i < firstWeekday; i++) padded.unshift(null);
    const out: (Day | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) out.push(padded.slice(i, i + 7));
    return out;
  }, [data]);

  /**
   * Month label above the first column of each month.
   *
   * A month narrower than three columns goes unlabelled: the text spills past
   * its 11px column, so a short month — always the partial one at either end of
   * the window — would collide with its neighbour.
   */
  const monthLabels = useMemo(() => {
    // Keyed by year AND month: the window spans twelve months, so the month at
    // each end shares its index and keying on the index alone merges them.
    const keyOf = (w: (Day | null)[]) => {
      const first = w.find(Boolean);
      if (!first) return null;
      const d = new Date(first.date + "T00:00:00Z");
      return `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    };
    const keys = weeks.map(keyOf);
    const width = new Map<string, number>();
    keys.forEach((k) => k && width.set(k, (width.get(k) ?? 0) + 1));

    return keys.map((k, i) =>
      k && k !== keys[i - 1] && (width.get(k) ?? 0) >= 3
        ? MONTHS[Number(k.split("-")[1])]
        : "",
    );
  }, [weeks]);

  const readout = hovered
    ? `${hovered.count} contribution${hovered.count === 1 ? "" : "s"} on ${formatDate(hovered.date)}`
    : stats
      ? `${stats.total} contributions in the last year`
      : "Loading the last year from GitHub…";

  return (
    <Section
      id="activity"
      aside={
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          <GithubIcon size={13} />
          {profile.githubHandle}
          <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden />
        </a>
      }
    >
      <div className="border border-line bg-raised">
        <p className="border-b border-line px-4 py-3 text-small text-ink sm:px-5">
          <span className="readout">{readout}</span>
        </p>

        {/* Reserved height so the graph loading never shifts the page. */}
        <div className="min-h-[9.5rem] overflow-x-auto px-4 py-4 sm:px-5">
          {failed ? (
            <p className="text-small text-muted">
              Could not reach GitHub just now.{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent underline decoration-accent-line underline-offset-4"
              >
                See the graph on the profile
              </a>
              .
            </p>
          ) : !data ? (
            <div className="h-[7.5rem] w-full animate-pulse bg-line/40" aria-hidden />
          ) : (
            <figure
              onMouseLeave={() => setHovered(null)}
              className="inline-block min-w-max"
            >
              <figcaption className="sr-only">
                GitHub contribution graph for the last year: {stats?.total}{" "}
                contributions across {stats?.activeDays} active days.
              </figcaption>

              <div className="mb-1.5 flex gap-[3px] pl-7">
                {monthLabels.map((m, i) => (
                  <span
                    key={i}
                    className="readout w-[11px] shrink-0 overflow-visible whitespace-nowrap text-[10px] leading-none text-muted"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="flex gap-[3px]">
                <div className="mr-1 flex w-6 shrink-0 flex-col gap-[3px]">
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                    <span
                      key={i}
                      className="readout h-[11px] text-[10px] leading-[11px] text-muted"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) =>
                      day ? (
                        <span
                          key={day.date}
                          title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                          onMouseEnter={() => setHovered(day)}
                          className="h-[11px] w-[11px] shrink-0"
                          style={{ backgroundColor: `var(--heat-${day.level})` }}
                        />
                      ) : (
                        <span key={di} className="h-[11px] w-[11px] shrink-0" />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </figure>
          )}
        </div>

        {stats ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line px-4 py-5 sm:grid-cols-4 sm:px-5">
            {[
              { k: "Contributions", v: String(stats.total), note: "last 12 months" },
              { k: "Active days", v: String(stats.activeDays), note: "with commits" },
              { k: "Longest streak", v: String(stats.streak), note: "consecutive days" },
              {
                k: "Busiest day",
                v: String(stats.busiest.count),
                note: stats.busiest.date ? formatDate(stats.busiest.date) : "",
              },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-micro text-muted">{s.k}</dt>
                <dd className="readout mt-1.5 text-h3 text-accent">{s.v}</dd>
                <dd className="mt-0.5 text-micro text-muted">{s.note}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2.5 text-micro text-muted sm:px-5">
          <span>Pulled from GitHub, refreshed hourly.</span>
          <span className="flex items-center gap-1.5">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                aria-hidden
                className="h-[10px] w-[10px]"
                style={{ backgroundColor: `var(--heat-${l})` }}
              />
            ))}
            More
          </span>
        </div>
      </div>
    </Section>
  );
}
