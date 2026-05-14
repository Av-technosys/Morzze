"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { createReview } from "@/helper/review/action";
import { toast } from "sonner";

export type ExistingReviewSummary = {
  rating: number | null;
  message: string | null;
  isAdminApproved: boolean | null;
};

type ReviewModalProps = {
  productId: string;
  productName: string;
  variant: string;
  image: string | null;
  existingReview?: ExistingReviewSummary | null;
  onSubmitted?: () => void;
};

const ReviewModal = ({
  productId,
  productName,
  variant,
  image,
  existingReview,
  onSubmitted,
}: ReviewModalProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [pending, startTransition] = useTransition();

  const readonly = Boolean(existingReview);
  const displayRating = readonly
    ? Math.min(5, Math.max(0, existingReview?.rating ?? 0))
    : rating;

  const resetForm = () => {
    setRating(0);
    setHover(0);
    setTitle("");
    setReview("");
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) resetForm();
  };

  const handleSubmit = () => {
    if (readonly) return;
    if (rating < 1) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!title.trim()) {
      toast.error("Please add a review title.");
      return;
    }
    if (!review.trim()) {
      toast.error("Please write your review.");
      return;
    }

    startTransition(async () => {
      const res = await createReview({
        productId,
        rating,
        message: review.trim(),
        title: title.trim(),
        media: [],
      });
      if (res.success) {
        toast.success("Review submitted. It will appear on the site after admin approval.");
        setOpen(false);
        resetForm();
        onSubmitted?.();
      } else {
        toast.error("message" in res ? res.message : "Could not submit review.");
      }
    });
  };

  const triggerLabel = readonly
    ? existingReview?.isAdminApproved
      ? "View review"
      : "View review (pending)"
    : "Write review";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        type="button"
        className={
          readonly
            ? "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-10 py-5"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#FFBF3F] hover:bg-[#e5ac37] text-black px-10 py-5 active:scale-95"
        }
      >
        {triggerLabel}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] w-[95vw] bg-[#111] border-zinc-800 text-white p-0 overflow-hidden my-4 h-fit">
        <DialogHeader className="p-5 border-b border-zinc-800">
          <DialogTitle className="text-lg font-medium tracking-tight">
            {readonly ? "Your review" : "Write a review"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-4">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-[#0A0A0A] border border-zinc-800 rounded-sm overflow-hidden shrink-0">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900" />
              )}
            </div>
            <div className="space-y-0">
              <h3 className="text-sm font-medium text-zinc-100">{productName}</h3>
              <p className="text-[10px] text-zinc-500 uppercase">{variant}</p>
            </div>
          </div>

          {readonly && existingReview ? (
            <p className="text-[11px] text-zinc-500">
              {existingReview.isAdminApproved
                ? "This review is approved and may be shown on the product page."
                : "Awaiting admin approval — you will see it on the product page once approved."}
            </p>
          ) : null}

          <div className="space-y-2">
            <p className="text-[11px] text-zinc-400">Overall rating *</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={readonly}
                  onClick={() => !readonly && setRating(star)}
                  onMouseEnter={() => !readonly && setHover(star)}
                  onMouseLeave={() => !readonly && setHover(0)}
                  className="transition-transform active:scale-90 disabled:cursor-default"
                >
                  {star <= (readonly ? displayRating : hover || rating) ? (
                    <IconStarFilled size={24} className="text-[#FFBF3F]" />
                  ) : (
                    <IconStar size={24} className="text-zinc-800" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {readonly && existingReview?.message ? (
            <div className="space-y-1.5">
              <p className="text-[11px] text-zinc-400">Your review</p>
              <Textarea
                readOnly
                className="bg-transparent border-zinc-800 text-xs min-h-[120px] max-h-[200px] resize-none rounded-sm text-zinc-300"
                value={existingReview.message}
              />
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <p className="text-[11px] text-zinc-400">Review title *</p>
                <Input
                  placeholder="Summarize your experience"
                  className="bg-transparent border-zinc-800 focus:border-[#FFBF3F] focus:ring-0 text-xs h-10 rounded-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] text-zinc-400">Your review *</p>
                <Textarea
                  placeholder="Tell us what you liked or disliked"
                  className="bg-transparent border-zinc-800 focus:border-[#FFBF3F] focus:ring-0 text-xs min-h-[100px] max-h-[120px] resize-none rounded-sm"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

              <Button
                type="button"
                disabled={pending}
                onClick={handleSubmit}
                className="w-full bg-[#FFBF3F] hover:bg-[#e5ac37] text-black font-bold h-11 rounded-sm text-xs uppercase tracking-wider mt-2"
              >
                {pending ? "Submitting…" : "Submit"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
