import StoreForm from "@/components/admin/StoreForm";
import { getStoreById } from "@/helper/stores/action";
import { notFound } from "next/navigation";

export default async function EditStorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getStoreById(id);
  if (!row) notFound();

  const initialData = {
    id: row.id,
    storeName: row.storeName,
    slug: row.slug,
    storeType: row.storeType,
    state: row.state,
    city: row.city,
    latitude: row.latitude,
    longitude: row.longitude,
    address: row.address,
    contactNumber: row.contactNumber,
    email: row.email,
    workingHours: row.workingHours,
    features: row.features,
    badgeBgColor: row.badgeBgColor,
    badgeTextColor: row.badgeTextColor,
    mapEmbedUrl: row.mapEmbedUrl,
    isFeatured: row.isFeatured,
    isActive: row.isActive,
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <StoreForm mode="edit" initialData={initialData} />
    </div>
  );
}
