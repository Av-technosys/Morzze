"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteVideoButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  const handleDelete = async () => {
    try {
      toast.loading("Deleting video...", {
        id: "delete-video",
      });

      await action();

      toast.success("Video deleted successfully!", {
        id: "delete-video",
      });

      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete video", {
        id: "delete-video",
      });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDelete}
      className="flex items-center gap-1 border-red-200 hover:bg-red-50 text-red-600"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  );
}