import { experience } from "@/data/experience";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

/**
 * Three roles side by side, newest first, each hanging from a marker on a
 * shared rule. Filled marker is the current role; hollow ones are past. The
 * rule is the only place on the page where a line means time.
 */
export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {experience.map((role) => (
            <li key={role.company} className="relative border-t border-line pt-6">
              <span
                aria-hidden
                className="absolute -top-[4px] left-0 block h-[7px] w-[7px] rounded-full"
                style={{
                  backgroundColor: role.current ? "var(--ember)" : "var(--paper)",
                  boxShadow: role.current ? "none" : "inset 0 0 0 1px var(--line-strong)",
                }}
              />

              <p className="readout text-micro text-muted">
                {role.start} &ndash; {role.end}
              </p>
              <h3 className="display mt-2.5 text-h3">{role.company}</h3>
              <p className="mt-1 text-small text-accent">{role.role}</p>

              <ul className="mt-4 space-y-2.5">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 text-small leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.62em] block h-1 w-1 rounded-full bg-line-strong"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-start gap-1.5">
                {role.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
