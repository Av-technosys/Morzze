import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  TicketIcon,
  TicketPercentIcon,
  User2,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section>
      <div className="w-full flex h-screen bg-black text-white ">
        <div className="w-1/2 z-10">
          <Image
            src="/register.png"
            alt="Register Image"
            width={1300}
            height={800}
          />
        </div>
        <div className=" space-y-4  max-w-2xl mx-auto  justify-center text-left items-center my-auto">
          <div className="absolute  -top-20 right-0 w-40 h-40 blur-[110px] bg-[#FFDD00]"></div>
          <div className="absolute bottom-0 middle-0 w-40 h-40 blur-[110px] bg-[#FFDD00]"></div>
          <h1 className="text-4xl font-bold p-0">Welcome Back</h1>
          <p className="text-sm -mt-5  ">Sign In To Your Account</p>
          <div className="w-full grid grid-cols-1 gap-4 text-center z-10">
            <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
              <InputGroupInput
                className="  "
                id="inline-end-input"
                type="text"
                placeholder="Full Name"
              />
              <InputGroupAddon>
                <User2 />
              </InputGroupAddon>
            </InputGroup>

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

            <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
              <InputGroupInput
                className="  "
                id="inline-end-input"
                type="text"
                placeholder="Mobile Number"
              />
              <InputGroupAddon>
                <PhoneIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
              <InputGroupInput
                className="  "
                id="inline-end-input"
                type="text"
                placeholder="Referal Code"
              />
              <InputGroupAddon>
                <TicketPercentIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
              <InputGroupInput
                id="inline-end-input"
                type="password"
                placeholder="password"
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <EyeIcon />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
              <InputGroupInput
                id="inline-end-input"
                type="confirmPassword"
                placeholder="Confirm password"
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <EyeIcon />
              </InputGroupAddon>
            </InputGroup>

            <Button className="w-96 py-5 rounded-xs bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold">
              Create Account
            </Button>
            <p className="">
              Already have an account?{" "}
              <a href="/login" className="text-[#FDB813] underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
