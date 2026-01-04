import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotePreview from "@/components/NotePreview/NotePreview";
import { getQueryClient } from "@/lib/api/getQueryClient";
import { fetchNoteById } from "@/lib/api/notes";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
