import React from "react";
import { MailIcon, MoveLeftIcon } from "lucide-react";

const ForgotPassword = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <MoveLeftIcon size={18} />
          <span>Back to Login</span>
        </button>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your registered email to receive reset link
          </p>
        </div>

        {/* Form Group */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MailIcon size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFB800] transition-all"
            />
          </div>

          <button className="w-full bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold py-3.5 rounded-md transition-colors">
            Send OTP
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Don't Have An Account?{" "}
          <a href="#" className="text-[#FFB800] font-medium hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;