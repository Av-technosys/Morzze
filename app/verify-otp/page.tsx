"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resendOtp, signIn, verifyOtp } from "@/helper";

const VerifyOtpContent = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Email login state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [emailLoading, setEmailLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  React.useEffect(() => {
    if (!email) {
      router.push("/login");  //should change later
    }
  }, [email, router]);

  React.useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP ❌");
      return;
    }

    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Verifying OTP...");

    try {
      await verifyOtp({
        email: email!,
        code: otp,
      });

      toast.success("Email verified successfully 🎉", {
        id: toastId,
      });

      setIsVerified(true);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("OTP verification error:", error);

      toast.error(error.message || "Verification failed ❌", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (!canResend || loading) return;
    setLoading(true);

    const toastId = toast.loading("Resending OTP...");

    try {
      await resendOtp(email!);

      toast.success("OTP resent successfully 📩", {
        id: toastId,
      });

      setTimer(30);
      setCanResend(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP ❌", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  // Email login handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const validateEmail = () => {
    let valid = true;
    const newErrors = { email: "", password: "", general: "" };
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail()) return;
    setEmailLoading(true);
    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });
      toast.success("Login successful 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed ❌");
      setErrors((prev) => ({ ...prev, general: err.message || "Login failed" }));
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <section>
      <div className="w-full px-4 lg:px-0 flex h-screen bg-black text-white ">
        <div className=" hidden lg:block w-1/2 z-10">
          <Link href="/">
          <Image
            className="h-full"
            src="/verify.png"
            alt="Login Image"
            width={1300}
            height={800}
          />
          </Link>
        </div>
        <div className=" space-y-4  max-w-2xl mx-auto  justify-center text-left items-center my-auto">
          <div className="absolute  -top-20 right-0 w-40 h-40 blur-[110px] bg-[#FFDD00]"></div>
          <div className="absolute bottom-0 middle-0 w-40 h-40 blur-[110px] bg-[#FFDD00]"></div>
          <h1 className="text-4xl font-bold p-0">Welcome Back</h1>
          <p className="text-sm -mt-5  ">Sign In To Your Account</p>
          <div className="w-full text-center z-10">
            <Tabs
              defaultValue="phone"
              className="w-full   border-none  text-center justify-center items-center my-auto"
            >
              <TabsList variant="line" className="w-full mb-4 justify-between">
                <TabsTrigger disabled
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
                    className=""
                    id="email-login-input"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleEmailChange}
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </InputGroup>

                <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
                  <InputGroupInput
                    id="password-login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleEmailChange}
                  />
                  <InputGroupAddon>
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <EyeIcon />
                  </InputGroupAddon>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </InputGroup>
                {errors.general && (
                  <p className="text-red-500 text-xs mt-1">{errors.general}</p>
                )}
                <div className="lg:w-96 mb-2">
                  <Link
                    href="/forgot-password"
                    className="float-right text-[#FDB813] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  onClick={handleEmailSubmit}
                  disabled={emailLoading}
                  className="lg:w-96 py-5 rounded-xs bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold"
                >
                  {emailLoading ? "Logging in..." : "Sign in"}
                </Button>
                {/* <p className="">
                  Don't have account?{" "}
                  <Link href="/register" className="text-[#FDB813] underline">
                    Create Account
                  </Link>
                </p> */}
              </TabsContent>
              <TabsContent
                value="phone"
                className=" w-full  grid grid-cols-1 gap-4 justify-center items-center mx-auto"
              >
                {/* <InputGroup className="max-w-96 py-5 bg-[#141414] rounded-xs px-3 border border-[#454545]">
                </InputGroup> */}

                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="lg:w-96 py-5 rounded-xs bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold"
                >
                  {loading ? "Verifying..." : "Confirm"}
                </Button>

                <div className="flex items-center justify-between text-xs mt-4 w-full">
                  {!canResend ? (
                    <span className="text-white font-semibold">
                      Resend OTP in 00:{timer.toString().padStart(2, "0")}
                    </span>
                  ) : (
                    <span className="text-white font-semibold">
                      You can resend OTP
                    </span>
                  )}

                  <button
                    onClick={handleResend}
                    disabled={!canResend}
                    className={`font-medium ${canResend ? "text-yellow-500" : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Resend
                  </button>
                </div>
             
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <section>
        <div className="w-full flex h-screen bg-black text-white items-center justify-center">
          <p>Loading...</p>
        </div>
      </section>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
