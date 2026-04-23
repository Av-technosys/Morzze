import React from "react";
import { IconArrowLeft } from "@tabler/icons-react"; // Tabler Icons
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const ForgotPasswordOTP = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login">
        {/* Back Link - Match exactly with your code */}
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <IconArrowLeft size={18} />
          <span>Back to Login</span>
        </button></Link>

        {/* Header - Same spacing as your code */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-gray-400 text-sm">
            Verify OTP to Reset Password
          </p>
        </div>

        {/* OTP Form Group */}
        <div className="space-y-6">
          <InputOTP maxLength={6} containerClassName="w-full">
            <InputOTPGroup className="w-full flex justify-between gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  // Styling matched with your input: bg-[#1A1A1A], border-gray-800
                  className="flex-1 h-14 bg-[#1A1A1A] border border-gray-800 rounded-md text-lg font-semibold focus:ring-1 focus:ring-[#FFB800] outline-none"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
 <a href="/new-password"> 
          {/* Button - Exact styling as your Send OTP button */}
          <button className="w-full bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold py-3.5 rounded-md transition-colors">
          Verify OTP
          </button></a>
        </div>

      </div>
    </section>
  );
};

export default ForgotPasswordOTP;