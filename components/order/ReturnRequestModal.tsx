"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

const ReturnRequestModal = () => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return toast.error("Please select a reason");
    if (!description.trim()) return toast.error("Please explain your reason");

    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("/api/return-request", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Return request submitted successfully");
      setReason("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit return request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex-1 border border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/5 px-12 py-2 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all">
        Request Return
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] w-[90vw] bg-[#111] border-zinc-800 text-white p-0 overflow-hidden py-1">
        <DialogHeader className="p-5 border-b border-zinc-800">
          <DialogTitle className="text-lg font-medium tracking-tight text-white">
            Recent Orders
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-zinc-100">
              Please tell us reason for return
            </p>

            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full bg-transparent border-zinc-800 focus:ring-0 text-xs h-11 rounded-sm text-zinc-400">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>

              <SelectContent className="bg-[#111] border-zinc-800 text-white">
                <SelectItem value="Damage Item">Damage Item</SelectItem>
                <SelectItem value="Ordered product and delivered product is different">
                  Ordered product and delivered product is different
                </SelectItem>
                <SelectItem value="Not as Expected">Not as Expected</SelectItem>
                <SelectItem value="Quality Issue">Quality Issue</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium text-zinc-100">
              Please Explain your Reason (60 Words)
            </p>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain....."
              className="bg-transparent border-zinc-800 focus:border-[#FFB800] focus:ring-0 text-xs min-h-[100px] resize-none rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium text-zinc-100">
              Upload Image* (Optional)
            </p>

            <label className="border-2 border-dashed border-zinc-800 rounded-sm p-8 flex flex-col items-center justify-center gap-2 hover:bg-zinc-900/50 transition-colors cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-zinc-500 group-hover:text-[#FFB800]" />

              <div className="text-center">
                <p className="text-[11px] text-zinc-400">
                  {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-[10px] text-zinc-600 uppercase mt-1">
                  PDF, JPG, PNG up to 5MB
                </p>
              </div>

              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#FFB800] hover:bg-[#e6a600] text-black font-bold h-12 rounded-sm text-xs uppercase tracking-wider mt-2"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestModal;