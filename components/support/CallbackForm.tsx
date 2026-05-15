"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const CallbackForm = () => {
  const dates = [
    { day: "Mon", date: 20 }, { day: "Tue", date: 21 }, { day: "Wed", date: 22 },
    { day: "Thu", date: 23 }, { day: "Fri", date: 24 }, { day: "Sat", date: 25 },
    { day: "Sun", date: 26 }
  ];

  const times = ["9:00 AM", "9:10 AM", "9:20 AM", "9:30 AM", "9:40 AM", "9:50 AM"];

  return (
    <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/5 p-8 md:p-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Connect with Us</h2>
        <p className="text-white/80 text-sm mt-2">Reach out for personalised support.</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-widest font-bold">First Name</Label>
            <Input placeholder="Enter First Name" className="bg-[#141414] border-white/10 rounded-none h-12" />
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-widest font-bold">Last Name</Label>
            <Input placeholder="Enter Last Name" className="bg-[#141414] border-white/10 rounded-none h-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-widest font-bold">Phone Number</Label>
            <Input placeholder="e.g., +91 0000000000" className="bg-[#141414] border-white/10 rounded-none h-12" />
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-widest font-bold">Email</Label>
            <Input placeholder="Enter Email" className="bg-[#141414] border-white/10 rounded-none h-12" />
          </div>
        </div>

        {/* Date & Time Picker Area */}
        <div className="space-y-4">
          <Label className="text-[11px] uppercase tracking-widest font-bold">Preferred Date and Time</Label>
          <div className="bg-[#111] border border-white/5 p-6 space-y-6">
            <p className="text-center text-xs text-gray-500">April</p>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-between">
              {dates.map((d) => (
                <div key={d.date} className="min-w-[50px] text-center border border-white/5 p-2 hover:border-[#FDB813] cursor-pointer">
                  <p className="text-[10px] text-gray-500 uppercase">{d.day}</p>
                  <p className="text-white font-bold">{d.date}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {times.map((t) => (
                <button key={t} type="button" className="text-[10px] bg-[#1a1a1a] px-3 py-2 text-white border border-white/5 hover:border-[#FDB813]">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[11px] uppercase tracking-widest font-bold">Message (Optional)</Label>
          <textarea className="w-full bg-[#141414] border border-white/10 p-4 h-28 outline-none focus:border-[#FDB813] text-sm text-white" placeholder="Type Message" />
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox id="consent" className="mt-1 border-white/20 data-[state=checked]:bg-[#FDB813] data-[state=checked]:text-black" />
          <label htmlFor="consent" className="text-[10px] text-gray-400 leading-normal">
            I consent to Morzze storing and processing my data in accordance with their <span className="underline">privacy policy</span>...
          </label>
        </div>

        <Button className="w-full bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold h-14 uppercase tracking-[2px] rounded-none">
          Register Product
        </Button>
      </form>
    </div>
  );
};

export default CallbackForm;