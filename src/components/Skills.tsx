import { BarChart3, Binary, Cloud, Cpu, Database } from "lucide-react";
import { skills } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

const icons = [Cpu, Database, Binary, Cloud, BarChart3];

export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <dl className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => {
            const Icon = icons[i] ?? Cpu;
            return (
              <div key={g.group} className="border-t border-line pt-5">
                <dt className="flex items-center gap-2.5">
                  <Icon size={15} strokeWidth={1.5} aria-hidden className="text-accent" />
                  <span className="text-body text-ink">{g.group}</span>
                </dt>
                {g.note ? (
                  <p className="mt-1 text-small leading-snug text-muted">{g.note}</p>
                ) : null}
                <dd className="mt-4 flex flex-wrap items-start gap-1.5">
                  {g.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </Section>
  );
}
