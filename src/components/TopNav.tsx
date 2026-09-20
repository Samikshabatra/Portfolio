"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { sections } from "@/data/sections";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const jumpTo = sections;

/**
 * The only persistent chrome: the section links and the one action that matters.
 * It reports which section you are in, because the hero's numbered index scrolls
 * away and nothing else on the page holds orientation after that.
 */
export function TopNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Sections"
        className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-12"
      >
        <ul className="hidden items-center gap-6 lg:flex xl:gap-7">
          {jumpTo.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="text-small transition-colors"
                  style={{ color: isActive ? "var(--accent)" : "var(--ink-muted)" }}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2.5">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 bg-ink px-3.5 py-2 text-small font-medium text-paper transition-opacity hover:opacity-85"
          >
            Let&rsquo;s connect
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
