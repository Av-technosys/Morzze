"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

type GeneralApplicationPopupProps = {
  open: boolean;
  onClose: () => void;
};

export default function GeneralApplicationPopup({
  open,
  onClose,
}: GeneralApplicationPopupProps) {
  const [loading, setLoading] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const resume = formData.get("resume") as File;

    if (!resume || resume.type !== "application/pdf") {
      toast.error("Please upload PDF resume");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/career-enquiry", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Application submitted successfully");

      form.reset();

      setDescriptionLength(0);

      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/20 bg-black p-6 md:p-10">
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-white transition-all hover:text-[#FFC400]"
        >
          <X size={26} />
        </button>

        {/* HEADING */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#FFC400]">
          SEND A MESSAGE
        </p>

        <h2 className="mb-10 text-4xl font-bold text-white">
          General Application
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-7">
          
          {/* ROW 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            <div>
              <label className="mb-3 block text-lg text-white">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full border border-white/30 bg-[#1B1B1B] px-4 py-4 text-white placeholder:text-gray-500 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-white">
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full border border-white/30 bg-[#1B1B1B] px-4 py-4 text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            <div>
              <label className="mb-3 block text-lg text-white">
                Phone Number *
              </label>

              <input
                type="tel"
                name="mobileNumber"
                placeholder="+91 98765 43210"
                required
                className="w-full border border-white/30 bg-[#1B1B1B] px-4 py-4 text-white placeholder:text-gray-500 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg text-white">
                Resume PDF *
              </label>

              <input
                type="file"
                name="resume"
                accept="application/pdf"
                required
                className="w-full border border-white/30 bg-[#1B1B1B] px-4 py-[14px] text-white file:mr-4 file:border-0 file:bg-[#FFC400] file:px-4 file:py-2 file:font-semibold file:text-black"
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div>
            <label className="mb-3 block text-lg text-white">
              Subject *
            </label>

            <input
              type="text"
              name="subject"
              placeholder="How can we help you"
              required
              className="w-full border border-white/30 bg-[#1B1B1B] px-4 py-4 text-white placeholder:text-gray-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-3 block text-lg text-white">
              Description *
            </label>

            <div className="relative">
              <textarea
                name="description"
                placeholder="Tell us more about your inquiry..."
                rows={6}
                maxLength={500}
                required
                onChange={(e) =>
                  setDescriptionLength(e.target.value.length)
                }
                className="w-full resize-none border border-white/30 bg-[#1B1B1B] px-4 py-4 text-white placeholder:text-gray-500 outline-none"
              />

              <span className="absolute bottom-4 right-4 text-sm text-gray-500">
                {descriptionLength}/500
              </span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFC400] py-4 text-lg font-semibold text-black transition-all disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}