import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesByTagClient from "./NotesByTag.client";
import type { Note } from "@/types/note";

const PER_PAGE = 12;

const TAGS: Array<Note["tag"]> = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

function isNoteTag(value: string): value is Note["tag"] {
  return (TAGS as string[]).includes(value);
}

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { tag } = await params;

  const raw = tag?.[0] ?? "all";


  const selectedTag: Note["tag"] | undefined = isNoteTag(raw) ? raw : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", raw], 
    queryFn: () => fetchNotes(1, PER_PAGE, "", raw === "all" ? "all" : selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByTagClient initialTag={raw} />
    </HydrationBoundary>
  );
}
