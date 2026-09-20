import Image from "next/image";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { sections } from "@/data/sections";

const index = sections;

/**
 * The first screen. Identity, one sentence, two actions, and her face — in that
 * order of prominence. The numbered index in the gutter doubles as the table of
 * contents for a page that is deliberately one long document.
 */
export function Hero() {
  return (
    <header id="top" className="scroll-mt-24 pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
        {/* -------------------------------------------------- numbered index */}
        <div className="hidden lg:flex lg:flex-col lg:justify-between">
          <ol className="animate-settle space-y-2.5" style={{ animationDelay: "560ms" }}>
            {index.map((s) => (
              <li key={s.id} className="flex items-baseline gap-3">
                <span className="readout text-micro text-line-strong">{s.num}</span>
                <a
                  href={`#${s.id}`}
                  className="text-small text-muted transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>

          <p
            className="animate-settle readout mt-10 border-t border-line pt-4 text-micro leading-relaxed text-muted"
            style={{ animationDelay: "640ms" }}
          >
            &ldquo;{profile.quote}&rdquo;
          </p>
        </div>

        {/* -------------------------------------------------------- statement */}
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-12">
          <div>
            <p
              className="animate-settle label flex items-center gap-2.5 text-muted"
              style={{ animationDelay: "80ms" }}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember" />
              {profile.status}
            </p>

            <p
              className="animate-settle label mt-7 text-muted"
              style={{ animationDelay: "140ms" }}
            >
              {profile.title} &nbsp;&bull;&nbsp; GenAI &nbsp;&bull;&nbsp; Agents
              &nbsp;&bull;&nbsp; Applied ML
            </p>

            <h1
              className="animate-settle display mt-4 text-display"
              style={{ animationDelay: "200ms" }}
            >
              Samiksha
              <br />
              Batra
            </h1>

            <span
              aria-hidden
              className="animate-rule mt-7 block h-px w-16 bg-line-strong"
              style={{ animationDelay: "320ms" }}
            />

            <p
              className="animate-settle display prose-measure mt-7 text-lead leading-snug"
              style={{ animationDelay: "360ms" }}
            >
              {profile.valueProp}
            </p>

            <div
              className="animate-settle mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "430ms" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 bg-ink px-5 py-3 text-small font-medium text-paper transition-opacity hover:opacity-85"
              >
                View my work
                <ArrowRight size={15} strokeWidth={2} aria-hidden />
              </a>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2.5 border border-line-strong px-5 py-3 text-small transition-colors hover:border-accent hover:text-accent"
              >
                <FileText size={15} strokeWidth={1.75} aria-hidden />
                Download r&eacute;sum&eacute;
              </a>
            </div>

            <div
              className="animate-settle mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-small text-muted"
              style={{ animationDelay: "490ms" }}
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={13} strokeWidth={1.75} aria-hidden />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember" />
                Available for opportunities
              </span>
            </div>
          </div>

          {/* ------------------------------------------------ portrait + tally */}
          <div
            className="animate-settle flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 xl:gap-8"
            style={{ animationDelay: "280ms" }}
          >
            <div className="relative aspect-[4/5] w-full max-w-[18rem] shrink-0 overflow-hidden border border-line bg-sunk sm:w-[17rem] xl:w-[18rem]">
              <Image
                src="/portrait.webp"
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 18rem"
                className="object-cover"
              />
            </div>

            <dl className="flex gap-10 sm:flex-col sm:gap-7 xl:gap-8">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <dd className="display text-h2 leading-none">{s.value}</dd>
                  <dt className="label mt-2 text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </header>
  );
}
