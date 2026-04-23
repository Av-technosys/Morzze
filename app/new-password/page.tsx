"use client"
import React, { useState } from "react";
import { IconArrowLeft, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";

const SetNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <IconArrowLeft size={18} />
          <span>Back to Login</span>
        </button>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Set New Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your registered email to receive reset link
          </p>
        </div>

        {/* Form Group */}
        <div className="space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              <IconLock size={18} stroke={1.5} />
            </div>
            <div className="flex justify-end">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password (Min 8 chars)"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFB800] transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 pr-2 flex items-center text-gray-500 hover:text-gray-300"
            > 
              {showPassword ? <IconEyeOff size={20} stroke={1.5} /> : <IconEye size={20} stroke={1.5} />}
              
            </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              <IconLock size={18} stroke={1.5} />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFB800] transition-all"
            />
          </div>

          {/* Action Button */}
          <button className="w-full bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold py-3.5 rounded-md transition-colors mt-2">
            Update Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default SetNewPassword;