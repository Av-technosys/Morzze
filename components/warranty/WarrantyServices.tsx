"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  IconClipboardCheck,
  IconFileText,
  IconSearch,
  IconUpload,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const WarrantyServices = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    serialNumber: "",
    purchaseDate: "",
    productCategory: "",
    productName: "",
    invoiceNumber: "",
    dealerName: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [claimData, setClaimData] = useState({
    serialNumber: "",
    productCategory: "",
    issueType: "",
    issueDescription: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [statusSerial, setStatusSerial] = useState("");
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [claimFiles, setClaimFiles] = useState<File[]>([]);

  const handleRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleClaimChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setClaimData({ ...claimData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^[0-9+\-\s()]{9,15}$/.test(phone);

  const validateFile = (file: File, allowedTypes: string[]) => {
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return false;
    }

    return true;
  };

  const handleInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!validateFile(file, allowedTypes)) return;

    setInvoiceFile(file);
    setError("");
  };

  const handleClaimUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    for (const file of files) {
      if (!validateFile(file, allowedTypes)) return;
    }

    setClaimFiles(files);
    setError("");
  };

  const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!registerData.serialNumber.trim()) return setError("Product serial number is required");
    if (!registerData.purchaseDate) return setError("Purchase date is required");
    if (!registerData.productCategory.trim()) return setError("Product category is required");
    if (!registerData.productName.trim()) return setError("Product name is required");
    if (!registerData.invoiceNumber.trim()) return setError("Order/Invoice number is required");
    if (!registerData.dealerName.trim()) return setError("Dealer/Store name is required");
    if (!registerData.fullName.trim()) return setError("Full name is required");
    if (!registerData.email.trim()) return setError("Email is required");
    if (!validateEmail(registerData.email)) return setError("Please enter a valid email address");
    if (!registerData.phone.trim()) return setError("Phone number is required");
    if (!validatePhone(registerData.phone)) return setError("Please enter a valid phone number");
    if (!registerData.address.trim()) return setError("Installation address is required");

    try {
      setLoading(true);

      const data = new FormData();
      data.append("type", "register");

      Object.entries(registerData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (invoiceFile) data.append("files", invoiceFile);

      const response = await fetch("/api/warranty", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Product registered successfully!");
        setRegisterData({
          serialNumber: "",
          purchaseDate: "",
          productCategory: "",
          productName: "",
          invoiceNumber: "",
          dealerName: "",
          fullName: "",
          email: "",
          phone: "",
          address: "",
        });
        setInvoiceFile(null);
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const submitClaim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!claimData.serialNumber.trim()) return setError("Product serial number is required");
    if (!claimData.productCategory.trim()) return setError("Product category is required");
    if (!claimData.issueType.trim()) return setError("Issue type is required");
    if (!claimData.issueDescription.trim()) return setError("Issue description is required");
    if (!claimData.fullName.trim()) return setError("Full name is required");
    if (!claimData.email.trim()) return setError("Email is required");
    if (!validateEmail(claimData.email)) return setError("Please enter a valid email address");
    if (!claimData.phone.trim()) return setError("Phone number is required");
    if (!validatePhone(claimData.phone)) return setError("Please enter a valid phone number");
    if (!claimData.address.trim()) return setError("Installation address is required");

    try {
      setLoading(true);

      const data = new FormData();
      data.append("type", "claim");

      Object.entries(claimData).forEach(([key, value]) => {
        data.append(key, value);
      });

      claimFiles.forEach((file) => {
        data.append("files", file);
      });

      const response = await fetch("/api/warranty", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Warranty claim submitted successfully!");
        setClaimData({
          serialNumber: "",
          productCategory: "",
          issueType: "",
          issueDescription: "",
          fullName: "",
          email: "",
          phone: "",
          address: "",
        });
        setClaimFiles([]);
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 const submitStatus = async () => {
  setError("")
  setSuccess("")

  if (!statusSerial.trim()) {
    setError("Product serial number is required")
    return
  }

  try {
    setLoading(true)

    const data = new FormData()
    data.append("type", "status")
    data.append("serialNumber", statusSerial)

    const response = await fetch("/api/warranty", {
      method: "POST",
      body: data,
    })

    const result = await response.json()

    if (result.success) {
      setSuccess("Warranty status request submitted successfully!")
      setStatusSerial("")
    } else {
      setError(result.message || "Something went wrong")
    }
  } catch {
    setError("Something went wrong")
  } finally {
    setLoading(false)
  }
}

  return (
    <section className="bg-[#050505] py-8 md:py-20 font-montserrat min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Warranty Services
          </h2>
          <p className="font-inter text-white/80 text-sm opacity-80">
            Register your product, file a claim, or check warranty status.
          </p>
        </div>

        <Tabs defaultValue="register" className="w-full flex flex-col gap-10">
          <TabsList variant="line" className="w-full overflow-x-auto whitespace-nowrap justify-center gap-4 md:gap-12 border-none bg-transparent">
            <TabsTrigger value="register" className="group py-4 px-2 flex items-center gap-3 !text-white/80 data-active:!text-[#FDB813] after:!bg-[#FDB813] after:bottom-[-2px] transition-all">
              <IconClipboardCheck size={20} />
              <span className="text-[13px] font-medium tracking-wide">Register Product</span>
            </TabsTrigger>

            <TabsTrigger value="claim" className="group py-4 px-2 flex items-center gap-3 !text-white/80 data-active:!text-[#FDB813] after:!bg-[#FDB813] after:bottom-[-2px] transition-all">
              <IconFileText size={20} />
              <span className="text-[13px] font-medium tracking-wide">File a Claim</span>
            </TabsTrigger>

            <TabsTrigger value="status" className="group py-4 px-2 flex items-center gap-3 !text-white/80 data-active:!text-[#FDB813] after:!bg-[#FDB813] after:bottom-[-2px] transition-all">
              <IconSearch size={20} />
              <span className="text-[13px] font-medium tracking-wide">Check Status</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-[#0A0A0A] border border-white/5 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 blur-[120px] bg-[#FDB813]/10"></div>

            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-white font-bold">
                  !
                </div>
                <p className="text-sm text-black">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-md border border-green-500 bg-green-500/10 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500 text-white font-bold">
                  ✓
                </div>
                <p className="text-sm text-green-400">{success}</p>
              </div>
            )}

            <TabsContent value="register">
              <motion.form onSubmit={submitRegister} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Product Serial Number *</Label>
                    <Input name="serialNumber" value={registerData.serialNumber} onChange={handleRegisterChange} placeholder="e.g. MRZ-FC-2024-00XXX" className="bg-[#141414] border-white/10 h-12 focus:border-[#FDB813] rounded-none" />
                    <p className="text-[#666] text-[10px] italic">Found on the product box or warranty card</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Purchase Date *</Label>
                    <Input name="purchaseDate" value={registerData.purchaseDate} onChange={handleRegisterChange} type="date" className="bg-[#141414] border-white/10 h-12 rounded-none text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Product Category *</Label>
                    <Input name="productCategory" value={registerData.productCategory} onChange={handleRegisterChange} placeholder="Select category" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Product Name *</Label>
                    <Input name="productName" value={registerData.productName} onChange={handleRegisterChange} placeholder="e.g. Premium Basin Mixer Chrome" className="bg-[#141414] border-white/10 h-12 rounded-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBlock label="Order/Invoice Number *" name="invoiceNumber" value={registerData.invoiceNumber} onChange={handleRegisterChange} placeholder="e.g. ORD-12345" />
                  <InputBlock label="Dealer/Store Name *" name="dealerName" value={registerData.dealerName} onChange={handleRegisterChange} placeholder="e.g. Morzze Flagship Store Delhi" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBlock label="Full Name *" name="fullName" value={registerData.fullName} onChange={handleRegisterChange} placeholder="Enter your full name" />
                  <InputBlock label="Email *" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="example@mail.com" />
                </div>

                <InputBlock label="Phone Number *" name="phone" value={registerData.phone} onChange={handleRegisterChange} placeholder="Enter your phone number" />

                <div className="space-y-2">
                  <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Installation Address *</Label>
                  <textarea name="address" value={registerData.address} onChange={handleRegisterChange} className="w-full bg-[#141414] border border-white/10 text-white rounded-none p-4 min-h-[100px] outline-none focus:border-[#FDB813] text-sm" placeholder="Where the product is installed" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Upload Invoice (Optional)</Label>
                  <label className="border border-dashed border-white/10 rounded-none p-8 flex flex-col items-center justify-center bg-[#0D0D0D] group cursor-pointer hover:border-[#FDB813]/50 transition-all">
                    <IconUpload className="text-[#FDB813] mb-2 group-hover:scale-110 transition-transform" size={24} />
                    <p className="text-white text-[13px]">{invoiceFile ? invoiceFile.name : "Click to upload or drag and drop"}</p>
                    <p className="text-[#666] text-[10px] mt-1">PDF, JPG, PNG up to 5MB</p>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleInvoiceUpload} className="hidden" />
                  </label>
                </div>

                <Button disabled={loading} type="submit" className="w-full h-14 bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold tracking-[2px] text-xs rounded-none">
                  {loading ? "Registering..." : "Register Product"}
                </Button>
              </motion.form>
            </TabsContent>

            <TabsContent value="claim">
              <motion.form onSubmit={submitClaim} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <InputBlock label="Product Serial Number *" name="serialNumber" value={claimData.serialNumber} onChange={handleClaimChange} placeholder="e.g. MRZ-FC-2024-XXXXX" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBlock label="Product Category *" name="productCategory" value={claimData.productCategory} onChange={handleClaimChange} placeholder="Select category" />
                  <InputBlock label="Issue Type *" name="issueType" value={claimData.issueType} onChange={handleClaimChange} placeholder="e.g. Leaking or Damage" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Describe the Issue *</Label>
                  <textarea name="issueDescription" value={claimData.issueDescription} onChange={handleClaimChange} className="w-full bg-[#141414] border border-white/10 text-white rounded-none p-4 min-h-[120px] outline-none focus:border-[#FDB813]" placeholder="Describe the issue in detail" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Upload Photos/Videos</Label>
                  <label className="border border-dashed border-white/10 p-8 flex flex-col items-center justify-center bg-[#0D0D0D] cursor-pointer">
                    <IconUpload className="text-[#FDB813] mb-2" size={24} />
                    <p className="text-white text-xs">
                      {claimFiles.length > 0 ? `${claimFiles.length} file(s) selected` : "Click to upload or drag and drop"}
                    </p>
                    <input type="file" accept=".jpg,.jpeg,.png,.mp4,.webm,.mov" multiple onChange={handleClaimUpload} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBlock label="Full Name *" name="fullName" value={claimData.fullName} onChange={handleClaimChange} placeholder="Enter full name" />
                  <InputBlock label="Email *" name="email" value={claimData.email} onChange={handleClaimChange} placeholder="example@mail.com" />
                </div>

                <InputBlock label="Phone no.*" name="phone" value={claimData.phone} onChange={handleClaimChange} placeholder="Enter phone number" />

                <div className="space-y-2">
                  <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">Installation Address *</Label>
                  <textarea name="address" value={claimData.address} onChange={handleClaimChange} className="w-full bg-[#141414] border border-white/10 text-white rounded-none p-4 min-h-[100px] outline-none focus:border-[#FDB813]" placeholder="Enter installation address" />
                </div>

                <Button disabled={loading} type="submit" className="w-full h-14 bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold tracking-[2px] text-xs rounded-none">
                  {loading ? "Submitting..." : "Submit Warranty Claim"}
                </Button>
              </motion.form>
            </TabsContent>

            <TabsContent value="status">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 space-y-8">
                <div className="space-y-4">
                  <Label className="text-[13px] font-medium tracking-wide text-[#efefef]">Enter Serial Number *</Label>
                  <Input value={statusSerial} onChange={(e) => setStatusSerial(e.target.value)} placeholder="e.g. MRZ-FC-2024-XXXXX" className="bg-[#141414] border-white/10 h-16 rounded-none text-lg text-white focus:border-[#FDB813]" />
                  <p className="text-[#666] text-xs">Serial number is found on your product or warranty card</p>
                </div>
                <Button disabled={loading} onClick={submitStatus} className="w-full h-14 bg-[#FDB813] hover:bg-[#e6a700] text-black font-bold tracking-[2px] text-xs rounded-none">
                  {loading ? "Checking..." : "Check Warranty Status"}
                </Button>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

function InputBlock({ label, name, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] tracking-[2px] font-semibold text-[#efefef]">
        {label}
      </Label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#141414] border-white/10 h-12 rounded-none"
      />
    </div>
  );
}

export default WarrantyServices;