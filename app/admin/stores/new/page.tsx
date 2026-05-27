import StoreForm from "@/components/admin/StoreForm";

export default function NewStorePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <StoreForm mode="create" />
    </div>
  );
}
