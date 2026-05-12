"use client";
import React, { useState } from "react";

import { ChevronRight } from "lucide-react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import OrderReview from "@/components/checkout/OrderReview";
import ShippingDetails from "@/components/checkout/ShippingDetails";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<any>(null);

  const handleShippingNext = (data: any) => {
    setShippingData(data);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-black pt-15 pb-20 px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-2">
            <span
              className={` ${step === 1 ? "bg-[#FDB813] text-black" : "border border-zinc-500 text-[#FEFFF1] "} w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-sm`}
            >
              1
            </span>
            <span
             onClick={() => setStep(1)}
              className={`${step === 1 ? "text-[#FDB813] " : "text-[#FEFFF1]"} text-[10px] font-bold tracking-[0.2em] uppercase font-montserrat cursor-pointer`}
            >
              Address Details
            </span>
          </div>
          <ChevronRight className="text-[#928E87] w-4 h-4" />
          <div className="flex items-center gap-2 ">
            <span
              className={`${step === 1 ? "border border-zinc-500 text-[#FEFFF1]" : "bg-[#FDB813] text-black"}  w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-sm`}
            >
              2
            </span>
            <span
              className={`${step === 1 ? "text-[#FEFFF1]" : "text-[#FDB813]"}  text-[10px] font-bold tracking-[0.2em] uppercase font-montserrat`}
            >
              Review
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          <div className="lg:col-span-7">
            {step === 1 && <ShippingDetails onNext={handleShippingNext} />}
            {step === 2 && <OrderReview shippingData={shippingData} />}
          </div>
          <div className="lg:col-span-5">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
