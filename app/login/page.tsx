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
} from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section>
      <div className="w-full flex h-screen bg-black text-white ">
        <div className="w-1/2 z-10">
          <Image src="/login.png" alt="Login Image" width={1300} height={800} />
        </div>
        <div className=" space-y-4  max-w-2xl mx-auto  justify-center text-left items-center my-auto">
          <div className="absolute  -top-20 right-0 w-40 h-40 blur-[110px] bg-[#FFDD00]"></div>
          <div className="absolute bottom-0 middle-0 w-40 h-40 blur-[110px] bg-[#FFDD00]"></div>
          <h1 className="text-4xl font-bold p-0">Welcome Back</h1>
          <p className="text-sm -mt-5  ">Sign In To Your Account</p>
          <div className="w-full text-center z-10">
            <Tabs
              defaultValue="email"
              className="w-full   border-none  text-center justify-center items-center my-auto"
            >
              <TabsList variant="line" className="w-full mb-4 justify-between">
                <TabsTrigger
                  className=" !text-white data-[state=active]:!text-white border  data-[state=active]:!border-[#FDB813] after:absolute after:bg-[#FDB813] after:opacity-0 after:transition-opacity"
                  value="email"
                >
                  Login by Email
                </TabsTrigger>
                <TabsTrigger
                  className="!text-white data-[state=active]:!text-white border  data-[state=active]:!border-[#FDB813] after:absolute after:bg-[#FDB813] after:opacity-0 after:transition-opacity"
                  value="phone"
                >
                  Login by OTP
                </TabsTrigger>
              </TabsList>
              <TabsContent className="grid grid-cols-1 gap-4" value="email">
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
                    id="inline-end-input"
                    type="password"
                    placeholder="Enter password"
                  />
                  <InputGroupAddon>
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <EyeIcon />
                  </InputGroupAddon>
                </InputGroup>
                <div className="w-96 mb-2">
                  <p className="float-right text-[#FDB813]">
                    {" "}
                    Forgot Password?
                  </p>
                </div>
                <Button className="w-96 py-5 rounded-xs bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold">
                  Sign in
                </Button>
                <p className="">
                  Don't have account?{" "}
                  <a href="/signup" className="text-[#FDB813] underline">
                    Create Account
                  </a>
                </p>
              </TabsContent>
              <TabsContent value="phone" className="grid grid-cols-1 gap-4">
                <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
                  <InputGroupInput
                    id="inline-end-input"
                    type="password"
                    placeholder="Mobile Number"
                    className=" placeholder:text-[#8C8C8C]"
                  />
                  <InputGroupAddon>
                    <PhoneIcon />
                  </InputGroupAddon>
                </InputGroup>

                <Button className="w-96 py-5 rounded-xs bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold">
                  Sent OTP
                </Button>
                <p className="">
                  Don't have account?{" "}
                  <a href="/signup" className="text-[#FDB813] underline">
                    Create Account
                  </a>
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
