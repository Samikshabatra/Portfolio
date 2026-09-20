import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * A project's cover is either a screenshot of its own interface or a diagram of
 * its own pipeline. Never a stock photograph: an abstract image of a building
 * tells a recruiter nothing, and a picture that is not the thing is a small lie
 * at the top of every card.
 *
 * The diagram is deliberately flat and typographic so nobody mistakes it for a
 * running application.
 */
export function ProjectCover({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative aspect-[1.92] w-full overflow-hidden border border-line bg-sunk">
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt ?? `${project.title} interface`}
          fill
          sizes="(max-width: 1024px) 100vw, 42rem"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-5 sm:p-6">
          <p className="label text-line-strong">{project.domain}</p>

          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {project.pipeline.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                {i > 0 ? (
                  <span aria-hidden className="h-px w-4 bg-line-strong sm:w-6" />
                ) : null}
                <span className="readout border border-line-strong px-2 py-1 text-micro text-muted">
                  {stage}
                </span>
              </li>
            ))}
          </ol>

          <p className="readout text-micro text-line-strong">
            {project.stack.slice(0, 4).join("  ·  ")}
          </p>
        </div>
      )}

      <span className="readout absolute left-0 top-0 bg-ink px-2.5 py-1 text-micro text-paper">
        {num}
      </span>
    </div>
  );
}
