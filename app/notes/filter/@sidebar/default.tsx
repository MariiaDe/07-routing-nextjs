import Link from "next/link";

const TAGS = ["all", "todo", "work", "personal", "meeting", "shopping"] as const;

const TAG_LABELS: Record<(typeof TAGS)[number], string> = {
  all: "All notes",
  todo: "Todo",
  work: "Work",
  personal: "Personal",
  meeting: "Meeting",
  shopping: "Shopping",
};

export default function DefaultSidebar() {
  return (
    <aside aria-label="Notes filters">
      <nav>
        <ul>
          {TAGS.map(tag => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`}>{TAG_LABELS[tag]}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
