"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePagination = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1; // Current page ke aage peeche kitne numbers dikhane hain

    // Case 1: Agar total pages kam hain toh saare dikhao
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    // First Page
    pages.push(1);

    if (showLeftDots) {
      pages.push("...");
    } else {
      // Agar dots nahi hain toh 2nd page dikhao (agar gap 1 ka hai)
      for (let i = 2; i < leftSiblingIndex; i++) {
          pages.push(i);
      }
    }

    // Middle sibling pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (showRightDots) {
      pages.push("...");
    } else {
       // Gap fill karne ke liye last page se pehle ke numbers
       for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
           pages.push(i);
       }
    }

    // Last Page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center md:gap-2 gap-0.5 flex-wrap font-sans">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-white/30 text-white hover:text-white hover:border-white/70 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Numbers */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {generatePagination().map((item, index) => {
          if (item === "...") {
            return (
              <span key={`dots-${index}`} className="px-1 text-white select-none">
                ...
              </span>
            );
          }

          const isActive = currentPage === item;

          return (
            <button
              key={`page-${item}`}
              onClick={() => handlePageChange(Number(item))}
              className={cn(
                "w-8 h-8 md:w-10 md:h-10 text-[13px] font-medium flex items-center justify-center border transition-all duration-200",
                isActive
                  ? "border-[#FFBF3F] text-[#FFBF3F] bg-[#FFBF3F]/10 shadow-[0_0_10px_rgba(255,191,63,0.1)]"
                  : "border-white/10 text-white hover:text-white hover:border-white/30"
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-white/30 text-white hover:text-white hover:border-white/70 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;