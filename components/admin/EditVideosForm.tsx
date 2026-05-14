/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateVideo } from "@/helper/videos/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  IconDeviceFloppy,
  IconX,
  IconPhoto,
  IconRefresh,
  IconVideo,
} from "@tabler/icons-react";
import { useFileUpload } from "@/helper";
import { toast } from "sonner";

export default function EditVideosForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { upload, uploading } = useFileUpload();

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    link: initialData.link || "",
    thumbnail: initialData.thumbnail || "",
    videoDescription: initialData.videoDescription || "",
    videoCategory: initialData.videoCategory || "",
    isVisible: initialData.isVisible ?? true,
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Uploading thumbnail...", {
        id: "thumbnail-upload",
      });

      const { fileUrl } = await upload(file, "videos");

      setFormData((prev) => ({
        ...prev,
        [field]: fileUrl,
      }));

      toast.success("Thumbnail uploaded successfully!", {
        id: "thumbnail-upload",
      });
    } catch (error) {
      console.error("Upload failed", error);

      toast.error("Thumbnail upload failed", {
        id: "thumbnail-upload",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("title", formData.title);
    data.append("link", formData.link);
    data.append("thumbnail", formData.thumbnail);
    data.append("videoDescription", formData.videoDescription);
    data.append("videoCategory", formData.videoCategory);
    data.append("isVisible", formData.isVisible ? "on" : "off");

    const res = await updateVideo(initialData.id, data);

    if (res.success) {
      toast.success("Video updated successfully!");

      setTimeout(() => {
        window.location.href = "/admin/videos";
      }, 700);
    } else {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <IconVideo className="w-5 h-5 text-teal-600" />
            Video Details
          </h3>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Video Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter video title"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Video Link
            </label>
            <Input
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              placeholder="Paste YouTube / video link"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              value={formData.videoCategory}
              onChange={(e) =>
                setFormData({ ...formData, videoCategory: e.target.value })
              }
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select category</option>
              <option value="Product Demos">Product Demos</option>
              <option value="Brand Films">Brand Films</option>
              <option value="Installation Guides">Installation Guides</option>
              <option value="Customer Testimonials">
                Customer Testimonials
              </option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <input
              type="checkbox"
              checked={formData.isVisible}
              onChange={(e) =>
                setFormData({ ...formData, isVisible: e.target.checked })
              }
              className="h-4 w-4"
            />

            <label className="text-sm font-semibold text-gray-700">
              Show this video on website
            </label>
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <IconPhoto className="w-5 h-5 text-teal-600" />
            Thumbnail & Description
          </h3>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Video Thumbnail
            </label>

            <div className="relative border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e, "thumbnail")}
              />

              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                {uploading ? (
                  "Uploading..."
                ) : formData.thumbnail ? (
                  <>
                    <IconRefresh className="w-4 h-4" />
                    Change Thumbnail
                  </>
                ) : (
                  "Upload Thumbnail"
                )}
              </p>
            </div>

            {formData.thumbnail && (
              <div className="mt-3 relative h-40 w-full rounded-lg overflow-hidden border">
                <Image
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Video Description
            </label>
            <Textarea
              value={formData.videoDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  videoDescription: e.target.value,
                })
              }
              rows={5}
              placeholder="Write a short description about this video"
            />
          </div>
        </div>
      </div>

      <div className="bottom-0 left-0 right-0 p-4 flex justify-center gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-100">
        <Button
          type="submit"
          disabled={loading || uploading}
          className="bg-[#168BA0] hover:bg-[#137688] text-white px-10 py-4 text-lg font-bold shadow-md"
        >
          {loading ? (
            "Saving Changes..."
          ) : (
            <>
              <IconDeviceFloppy className="w-5 h-5 mr-2" />
              Update Video
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="px-10 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <IconX className="w-5 h-5 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}