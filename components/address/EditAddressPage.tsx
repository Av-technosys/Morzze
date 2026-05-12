"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type AddressData = {
  id?: number;
  fullName: string;
  phone: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
};

interface EditAddressPageProps {
  address?: AddressData | null;
  onSave: (data: AddressData) => void;
  onCancel: () => void;
  saving?: boolean;
}

const EditAddressPage = ({ address, onSave, onCancel, saving }: EditAddressPageProps) => {
  const isEdit = !!address?.id;

  const [form, setForm] = useState<AddressData>({
    id: address?.id,
    fullName: address?.fullName ?? "",
    phone: address?.phone ?? "",
    street: address?.street ?? "",
    locality: address?.locality ?? "",
    city: address?.city ?? "",
    state: address?.state ?? "",
    pincode: address?.pincode ?? "",
    country: address?.country ?? "India",
    isDefault: address?.isDefault ?? false,
  });

  const handleChange = (field: keyof AddressData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.fullName.trim()) return;
    if (!form.phone.trim()) return;
    if (!form.street.trim()) return;
    if (!form.city.trim()) return;
    if (!form.state.trim()) return;
    if (!form.pincode.trim()) return;
    onSave(form);
  };

  return (
    <div className="bg-black text-white font-inter">
      <h2 className="text-xl font-semibold mb-6 tracking-tight">Address Book</h2>

      <div className="max-w-4xl bg-[#141414] border border-zinc-900 rounded-sm p-8 space-y-8">
        <h3 className="text-base font-medium text-zinc-100">
          {isEdit ? "Edit Address" : "Add New Address"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Full Name</label>
            <Input
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter full name"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Phone no.</label>
            <Input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* Address / Street - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Address / Street</label>
            <Input
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Enter street address"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* Locality - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Locality</label>
            <Input
              value={form.locality}
              onChange={(e) => handleChange("locality", e.target.value)}
              placeholder="Enter locality"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>

          {/* City, State, Pincode - 3 Column Grid */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-500 uppercase font-medium">City</label>
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Enter city"
                className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-500 uppercase font-medium">State</label>
              <Input
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="Enter state"
                className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-500 uppercase font-medium">Pincode</label>
              <Input
                value={form.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                placeholder="Enter pincode"
                className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
              />
            </div>
          </div>

          {/* Country - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] text-zinc-500 uppercase font-medium">Country</label>
            <Input
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Enter country"
              className="bg-[#454545] border-zinc-800 focus:border-zinc-700 h-11 text-sm rounded-sm"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="default-address"
            checked={form.isDefault}
            onCheckedChange={(checked) => handleChange("isDefault", !!checked)}
            className="border-zinc-700 data-[state=checked]:bg-[#FFBF3F] data-[state=checked]:text-black"
          />
          <label
            htmlFor="default-address"
            className="text-xs text-zinc-500 font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default shipping address
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 bg-[#FFBF3F] hover:bg-[#e5ac37] text-black font-bold py-4 rounded-sm text-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update" : "Save Address"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={saving}
            className="flex-1 border-[#FFBF3F] text-[#FFBF3F] hover:bg-[#FFBF3F]/10 font-bold py-4 rounded-sm text-sm transition-all active:scale-95 bg-[#454545]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressPage;