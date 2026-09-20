import { sectionMeta } from "@/data/sections";
import { cn } from "@/lib/cn";

/**
 * Every band of the page shares one anatomy: a left gutter holding the section
 * number, its name and a single line saying what it is for, then the content.
 * The gutter is what makes the page read as a document rather than a stack of
 * cards — and it all comes from `data/sections.ts`, so numbering can never
 * drift out of step with the nav.
 */
export function Section({
  id,
  aside,
  children,
  className,
}: {
  id: string;
  /** Optional right-aligned counterweight on the content side. */
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const { num, label, note } = sectionMeta(id);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 border-t border-line pt-8 lg:pt-12", className)}
    >
      <div className="grid gap-7 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
        <header>
          <p className="label text-muted">{num}</p>
          <h2 id={`${id}-heading`} className="display mt-1 text-h2">
            {label}
          </h2>
          <span aria-hidden className="mt-4 block h-px w-9 bg-ember" />
          {note ? <p className="mt-4 text-small text-muted">{note}</p> : null}
        </header>

        <div>
          {aside ? (
            <div className="mb-6 flex justify-end text-small text-muted">{aside}</div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
