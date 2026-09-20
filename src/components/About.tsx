import { Hammer, Ruler, Send } from "lucide-react";
import { profile, education } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const pillarIcons = [Hammer, Ruler, Send];

export function About() {
  return (
    <Section id="about">
      <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div>
          <div className="prose-measure space-y-4">
            {profile.bio.map((para) => (
              <p key={para} className="text-body text-muted">
                {para}
              </p>
            ))}
          </div>

          <ul className="mt-10 grid gap-6 border-t border-line pt-7 sm:grid-cols-3">
            {profile.pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? Hammer;
              return (
                <li key={p.title}>
                  <Icon
                    size={17}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-accent"
                  />
                  <p className="mt-3 text-body text-ink">{p.title}</p>
                  <p className="mt-1 text-small leading-snug text-muted">{p.note}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="border border-line bg-raised p-6">
          <h3 className="display text-h3">Education</h3>
          <ul className="mt-5 space-y-6">
            {education.map((e) => (
              <li key={e.school} className="border-t border-line pt-4 first:border-0 first:pt-0">
                <p className="text-body leading-snug text-ink">{e.degree}</p>
                <p className="mt-1.5 text-small leading-snug text-muted">{e.school}</p>
                <p className="readout mt-2.5 text-micro text-muted">{e.period}</p>
                <p className="readout mt-1 text-micro text-accent">{e.result}</p>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </Section>
  );
}
