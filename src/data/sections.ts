/**
 * Document structure. Drives the top nav, the hero index and every section
 * header — the number, the title and the line in the gutter all come from here.
 */
export const sections = [
  { id: "top", num: "01", label: "Home", note: "" },
  {
    id: "about",
    num: "02",
    label: "About",
    note: "A blend of mathematics, engineering and curiosity.",
  },
  {
    id: "experience",
    num: "03",
    label: "Experience",
    note: "A timeline of learning, building and shipping.",
  },
  { id: "projects", num: "04", label: "Projects", note: "Real problems. Measured results." },
  { id: "activity", num: "05", label: "Activity", note: "Building in public." },
  { id: "skills", num: "06", label: "Skills", note: "Tools for building what comes next." },
  {
    id: "credentials",
    num: "07",
    label: "Credentials",
    note: "Learning beyond the classroom.",
  },
  { id: "contact", num: "08", label: "Contact", note: "Let's collaborate." },
] as const;

export type Section = (typeof sections)[number];

export function sectionMeta(id: string): Section {
  const found = sections.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown section: ${id}`);
  return found;
}
