import CatalogueForm from "@/components/admin/CatalogueForm";
import { getCatalogueById } from "@/helper/catalogue/action";
import { notFound } from "next/navigation";

export default async function EditCataloguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = (await getCatalogueById(id)) as
    | ({ pdfFile?: string } & Record<string, any>)
    | null;
  if (!row) notFound();

  const initialData = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.shortDescription,
    image: row.image,
    pdfFile: row.pdfFile ?? "",
    totalPages: row.totalPages,
    fileSize: row.fileSize,
    publishYear: row.publishYear,
    category: row.category,
    isFeatured: row.isFeatured,
    isActive: row.isActive,
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <CatalogueForm mode="edit" initialData={initialData} />
    </div>
  );
}
