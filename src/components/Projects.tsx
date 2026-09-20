import { ArrowUpRight } from "lucide-react";
import { projects, alsoBuilt } from "@/data/projects";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";
import { ProjectCover } from "./ProjectCover";
import { GithubIcon } from "./BrandIcons";

/**
 * Eight builds, every one a public repository. The card carries the two numbers
 * worth four seconds of a recruiter's attention; the detail underneath is for
 * whoever keeps reading.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      aside={
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          View all 20+ repositories
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
        </a>
      }
    >
      <ol className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal className="flex h-full flex-col">
              <a
                href={p.demo ?? p.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
                aria-label={`${p.title} — open ${p.demo ? "the live app" : "the repository"}`}
              >
                <ProjectCover project={p} index={i} />
              </a>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="display text-h3">{p.title}</h3>
                <span className="readout shrink-0 text-micro text-muted">{p.year}</span>
              </div>

              <p className="mt-2.5 text-body leading-relaxed text-ink">{p.pitch}</p>
              <p className="mt-2.5 text-small leading-relaxed text-muted">{p.detail}</p>

              <div className="mb-7 mt-5 flex flex-wrap items-start gap-1.5">
                {p.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              {/* Pushed to the bottom so metrics line up across a row. */}
              <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-5">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="readout text-h3 text-accent">{m.value}</dd>
                    <dt className="mt-1 text-micro leading-snug text-muted">{m.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 border border-line px-3 py-2 text-small transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon size={14} />
                  Source
                  <span className="sr-only">for {p.title}</span>
                </a>
                {p.demo ? (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 bg-accent px-3 py-2 text-small font-medium text-accent-ink transition-opacity hover:opacity-85"
                  >
                    Open the live app
                    <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
                    <span className="sr-only">for {p.title}</span>
                  </a>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* ---------------------------------------------------------- the rest */}
      <div className="mt-16 border-t border-line pt-8">
        <h3 className="display text-h3">Also built</h3>
        <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {alsoBuilt.map((s) => (
            <li key={s.name}>
              <a
                href={s.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                <span className="text-body text-ink transition-colors group-hover:text-accent">
                  {s.name}
                </span>
                <span className="mt-1 block text-small leading-snug text-muted">
                  {s.blurb}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
