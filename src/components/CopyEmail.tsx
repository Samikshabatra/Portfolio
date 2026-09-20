"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* clipboard blocked — the mailto link next to this still works */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-small transition-colors hover:border-accent-line hover:text-accent"
    >
      {copied ? (
        <Check size={15} strokeWidth={2} aria-hidden />
      ) : (
        <Copy size={15} strokeWidth={1.75} aria-hidden />
      )}
      {copied ? "Address copied" : "Copy address"}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
