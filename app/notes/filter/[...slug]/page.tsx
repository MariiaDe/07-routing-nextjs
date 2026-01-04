import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesByTagClient from "./NotesByTag.client";
import type { Note } from "@/types/note";

const PER_PAGE = 12;

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const raw = slug?.[0] ?? "all";

  
  const selectedTag: Note["tag"] | undefined =
    raw === "all" ? undefined : (raw as Note["tag"]);

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
