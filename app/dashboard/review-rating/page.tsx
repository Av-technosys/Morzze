"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import ReviewModal from '@/components/reviews/ReviewModal';

const ReviewRatingPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Submitted", "Pending"];

  // Mock Data: Shuruat mein ek dummy review dikhane ke liye
  const [myReviews, setMyReviews] = useState([
    {
      id: "MOR-24-012202",
      date: "12 Feb, 2024",
      total: "₹10,030",
      productName: "Robe Wash Basin",
      variant: "Brushed Gold",
      qty: 2,
      image: "/basin.jpg"
    }
  ]);

  // Ye function modal se naya data receive karega
  const handleUpdateReview = (newReviewData: any) => {
    console.log("New Review Received:", newReviewData);
    // Yahan tu API call karke data database mein bhej sakta hai
    // Filhal hum state update kar rahe hain
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-inter">
      <h2 className="text-2xl font-semibold mb-6 tracking-tight text-zinc-100">Review & Rating</h2>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-10 overflow-hidden overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-8 py-1.5 rounded-full text-sm font-medium transition-all border",
              activeFilter === filter
                ? "bg-[#FFBF3F] text-black border-[#FFBF3F]"
                : "bg-transparent text-[#FFBF3F] border-[#FFBF3F] hover:bg-[#FFBF3F]/10"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Review Cards List */}
      <div className="space-y-6">
        {myReviews.map((item) => (
          <div key={item.id} className="max-w-5xl bg-[#0A0A0A] border border-zinc-800 rounded-sm overflow-hidden transition-all hover:border-zinc-700">
            
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5 border-b border-zinc-800/60 bg-[#0D0D0D]">
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Order ID</p>
                <p className="text-[14px] font-medium text-zinc-300">{item.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Date</p>
                <p className="text-[14px] font-medium text-zinc-300">{item.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Total</p>
                <p className="text-[14px] font-medium text-zinc-300">{item.total}</p>
              </div>
            </div>

            {/* Body Section */}
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex gap-5 items-center w-full">
                <div className="w-24 h-24 bg-[#111] rounded-sm overflow-hidden border border-zinc-800 shrink-0">
                  <img src={item.image} alt={item.productName} className="w-full h-full object-cover grayscale-[10%]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium text-zinc-100 leading-tight">{item.productName}</h3>
                  <p className="text-xs text-zinc-500 font-medium">{item.variant}</p>
                  <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-tighter">Qty: {item.qty}</p>
                </div>
              </div>

              
              <ReviewModal
               
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRatingPage;