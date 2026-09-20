/** Flat, squared, hairline. Deliberately not a filled pill. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-line bg-raised px-2 py-1 text-micro whitespace-nowrap text-muted">
      {children}
    </span>
  );
}
