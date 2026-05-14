"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ReviewModal, {
  type ExistingReviewSummary,
} from "@/components/reviews/ReviewModal";
import type { PurchaseForReview } from "@/helper/review/action";

export type ReviewByProduct = {
  rating: number | null;
  message: string | null;
  isAdminApproved: boolean | null;
};

type Props = {
  purchases: PurchaseForReview[];
  reviewsByProductId: Record<string, ReviewByProduct>;
};

function formatINR(amount: number | null | undefined) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatOrderDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ReviewRatingClient = ({ purchases, reviewsByProductId }: Props) => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Submitted", "Pending"];

  const rows = useMemo(() => {
    return purchases.map((p) => {
      const rev = reviewsByProductId[p.productId];
      const hasReview = Boolean(rev);
      return { purchase: p, hasReview, review: rev };
    });
  }, [purchases, reviewsByProductId]);

  const filtered = useMemo(() => {
    if (activeFilter === "Submitted") return rows.filter((r) => r.hasReview);
    if (activeFilter === "Pending") return rows.filter((r) => !r.hasReview);
    return rows;
  }, [rows, activeFilter]);

  const onSubmitted = () => {
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-inter">
      <h2 className="text-2xl font-semibold mb-6 tracking-tight text-zinc-100">
        Review & rating
      </h2>

      <div className="flex gap-4 mb-10 overflow-hidden overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-8 py-1.5 rounded-full text-sm font-medium transition-all border",
              activeFilter === filter
                ? "bg-[#FFBF3F] text-black border-[#FFBF3F]"
                : "bg-transparent text-[#FFBF3F] border-[#FFBF3F] hover:bg-[#FFBF3F]/10",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <p className="text-zinc-500 text-sm max-w-5xl">
            {purchases.length === 0
              ? "No purchased products yet. After you place an order, your products will appear here for review."
              : "No products match this filter."}
          </p>
        ) : (
          filtered.map(({ purchase: item, hasReview, review: rev }) => {
            const existing: ExistingReviewSummary | null = hasReview
              ? {
                  rating: rev?.rating ?? null,
                  message: rev?.message ?? null,
                  isAdminApproved: rev?.isAdminApproved ?? null,
                }
              : null;

            return (
              <div
                key={item.productId}
                className="max-w-5xl bg-[#0A0A0A] border border-zinc-800 rounded-sm overflow-hidden transition-all hover:border-zinc-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5 border-b border-zinc-800/60 bg-[#0D0D0D]">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      Order ID
                    </p>
                    <p className="text-[14px] font-medium text-zinc-300 break-all">
                      {item.orderId}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      Date
                    </p>
                    <p className="text-[14px] font-medium text-zinc-300">
                      {formatOrderDate(item.orderDate)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      Order total
                    </p>
                    <p className="text-[14px] font-medium text-zinc-300">
                      {formatINR(item.orderTotal)}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex gap-5 items-center w-full">
                    <div className="w-24 h-24 bg-[#111] rounded-sm overflow-hidden border border-zinc-800 shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover grayscale-[10%]"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900" />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-medium text-zinc-100 leading-tight">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-zinc-500 font-medium">
                        {item.variant}
                      </p>
                      <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-tighter">
                        Qty: {item.qty}
                      </p>
                      {hasReview ? (
                        <p className="text-[11px] text-[#FFBF3F]">
                          {rev?.isAdminApproved
                            ? "Review approved"
                            : "Review pending approval"}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <ReviewModal
                    productId={item.productId}
                    productName={item.productName}
                    variant={item.variant}
                    image={item.image}
                    existingReview={existing}
                    onSubmitted={onSubmitted}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewRatingClient;
