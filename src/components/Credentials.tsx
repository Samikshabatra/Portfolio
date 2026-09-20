import { Award, FileBadge } from "lucide-react";
import { awards, certifications } from "@/data/experience";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type Item = { label: string; issuer: string; year: string; highlight?: boolean };

function List({
  heading,
  icon: Icon,
  items,
}: {
  heading: string;
  icon: typeof Award;
  items: readonly Item[];
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 border-b border-line pb-4">
        <Icon size={15} strokeWidth={1.5} aria-hidden className="text-accent" />
        <span className="text-body text-ink">{heading}</span>
      </h3>
      <ul className="mt-5 space-y-5">
        {items.map((c) => (
          <li key={c.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4">
            <div>
              <p
                className="text-small leading-snug"
                style={{ color: c.highlight ? "var(--accent)" : "var(--ink)" }}
              >
                {c.label}
              </p>
              <p className="mt-1 text-micro leading-snug text-muted">{c.issuer}</p>
            </div>
            <span className="readout text-micro text-muted">{c.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Credentials() {
  return (
    <Section id="credentials">
      <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <List heading="Competitions & community" icon={Award} items={awards} />
        <List heading="Certifications" icon={FileBadge} items={certifications} />
      </Reveal>
    </Section>
  );
}
