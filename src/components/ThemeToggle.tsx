"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/**
 * The <html data-theme> attribute is the source of truth — it is already set by
 * the blocking script in layout.tsx before first paint. This subscribes to it
 * rather than keeping a second copy in React state, which also keeps the server
 * and client renders identical.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, getSnapshot, () => "light");

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }, []);

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {theme === "light" ? (
        <Moon size={15} strokeWidth={1.75} aria-hidden />
      ) : (
        <Sun size={15} strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
