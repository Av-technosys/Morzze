import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MailIcon, MoveLeftIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="bg-black h-screen text-white justify-center items-center flex flex-col gap-4">
      <div>
        <div className="flex gap-2">
          <MoveLeftIcon />
          <p>Back to Login</p>
        </div>
        <div>
          <h1>Forgot Password</h1>
          <p>Enter your registered email to receive reset link</p>
        </div>
        <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
          <InputGroupInput
            className="  "
            id="inline-end-input"
            type="Email"
            placeholder="Enter your email"
          />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
        <button className="w-96 py-4 rounded-xs bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold">
          Send OTP
        </button>
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="text-[#FDB813] underline">
            Create Account
          </a>
        </p>
      </div>
    </section>
  );
};

export default page;
