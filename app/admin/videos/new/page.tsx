"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Video, LinkIcon, Upload } from "lucide-react";
import { createVideo } from "@/helper/videos/action";
import { useRouter } from "next/navigation";
import { useFileUpload } from "@/helper";

export default function VideoForm() {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    thumbnail: "",
    videoDescription: "",
    videoCategory: "",
    isVisible: true,
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { fileUrl } = await upload(file, "videos");

      setFormData((prev) => ({
        ...prev,
        [field]: fileUrl,
      }));
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  const data = new FormData();

  data.append("title", formData.title);
  data.append("link", formData.link);
  data.append("thumbnail", formData.thumbnail);
  data.append("videoDescription", formData.videoDescription);
  data.append("videoCategory", formData.videoCategory);
  data.append("isVisible", formData.isVisible ? "on" : "off");

  const res = await createVideo(data);

  if (res.success) {
    alert("Video Added Successfully!");
    window.location.href = "/admin/videos";
  } else {
    alert("Error: Video could not be added.");
  }

  setLoading(false);
}

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-none my-10">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-[#2D5A5D] flex items-center gap-2">
          <Video className="w-5 h-5" />
          Add New Video
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-medium">Video Title</Label>
              <Input
                placeholder="Enter video title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Video Category</Label>
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
                <option value="Customer Testimonials">Customer Testimonials</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium flex items-center gap-2">
              <LinkIcon size={14} />
              Video Link
            </Label>
            <Input
              placeholder="Paste YouTube / video link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Video Thumbnail</Label>
            <div className="relative border-2 border-dashed rounded-xl p-8 text-center hover:bg-slate-50 transition-all border-slate-200">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e, "thumbnail")}
              />

              <Upload className="mx-auto h-10 w-10 text-slate-300" />

              <p className="text-sm text-slate-500 mt-2">
                {uploading
                  ? "Uploading..."
                  : formData.thumbnail
                  ? "Thumbnail Uploaded ✅"
                  : "Click or drag to upload thumbnail"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Video Description</Label>
            <Textarea
              placeholder="Write a short description about this video"
              value={formData.videoDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  videoDescription: e.target.value,
                })
              }
              required
            />
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

            <Label className="font-medium">Show this video on website</Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2D5A5D] hover:bg-[#234749] h-14 text-lg font-medium shadow-lg"
            disabled={loading || uploading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Add Video"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}