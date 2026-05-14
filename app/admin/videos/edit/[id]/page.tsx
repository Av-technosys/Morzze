import EditVideosForm from "@/components/admin/EditVideosForm";
import { getVideoById } from "@/helper/videos/action";
import { notFound } from "next/navigation";

export default async function EditVideosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const videoData = await getVideoById(id);

  if (!videoData) return notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Video</h1>
      <EditVideosForm initialData={videoData} />
    </div>
  );
}