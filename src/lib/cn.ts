/** Joins class names, dropping falsy values. Small on purpose — no clsx dependency. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
