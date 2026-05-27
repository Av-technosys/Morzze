"use client"
import React, { useEffect, useState } from 'react'
import { getAddresses } from '@/helper/user/action'
import { isUserLoggedIn } from '@/helper/auth/action'
import { toast } from 'sonner'

type AddressData = {
  id: number;
  fullName: string | null;
  phone: string | null;
  street: string | null;
  locality: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  country: string | null;
  isDefault: boolean | null;
};

const ShippingDetails = ({ onNext }: { onNext: (data: any) => void }) => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<AddressData[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [loadingAddresses, setLoadingAddresses] = useState(true)

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })

  // Check login and load saved addresses
  useEffect(() => {
    setLoadingAddresses(true)
    isUserLoggedIn()
      .then((status) => {
        setLoggedIn(status)
        if (!status) {
          setUseNewAddress(true)
          return [] as AddressData[]
        }

        return getAddresses()
          .then((data) => data as AddressData[])
          .catch(() => [])
      })
      .catch(() => {
        setLoggedIn(false)
        setUseNewAddress(true)
        return [] as AddressData[]
      })
      .then((addrs) => {
        if (addrs.length > 0) {
          setSavedAddresses(addrs)
          const defaultAddr = addrs.find((a) => a.isDefault)
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id)
            setUseNewAddress(false)
          } else {
            setSelectedAddressId(addrs[0].id)
            setUseNewAddress(false)
          }
        } else {
          setSavedAddresses([])
          setUseNewAddress(true)
        }
      })
      .finally(() => {
        setLoadingAddresses(false)
      })
  }, [])

  const handleChange = (field: string, value: string) => {
    if (field === "pincode") {
      const onlyDigits = value.replace(/\D/g, "")
      setForm((prev) => ({ ...prev, [field]: onlyDigits.slice(0, 6) }))
      return
    }

    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (useNewAddress) {
      // Validate new address form
      if (!form.fullName.trim()) { toast.error("Full name is required"); return }
      if (!form.phone.trim()) { toast.error("Phone number is required"); return }
      if (!form.addressLine1.trim()) { toast.error("Address is required"); return }
      if (!form.city.trim()) { toast.error("City is required"); return }
      if (!form.state.trim()) { toast.error("State is required"); return }
      if (!form.pincode.trim()) { toast.error("Pincode is required"); return }
      if (!/^\d{6}$/.test(form.pincode)) { toast.error("Pincode must be exactly 6 digits"); return }

      onNext({
        fullName: form.fullName,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      })
    } else {
      // Use selected saved address
      const addr = savedAddresses.find((a) => a.id === selectedAddressId)
      if (!addr) { toast.error("Please select an address"); return }

      onNext({
        fullName: addr.fullName || "",
        phone: addr.phone || "",
        addressLine1: [addr.street, addr.locality].filter(Boolean).join(", "),
        addressLine2: "",
        city: addr.city || "",
        state: addr.state || "",
        pincode: addr.pincode || "",
      })
    }
  }

  const formatAddr = (a: AddressData) =>
    [a.street, a.locality, a.city, a.state, a.pincode].filter(Boolean).join(", ")

  const inputClass = "w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FDB813]/50 transition-colors placeholder:text-zinc-600"

  return (
    <div className="w-full text-white">
      <h2 className="text-white text-2xl font-medium mb-8 font-montserrat">Shipping Details</h2>

      {/* Saved Addresses (only for logged-in users) */}
      {loadingAddresses ? (
        <div className="mb-8 rounded-xl border border-dashed border-zinc-700 bg-[#0B0B0B] p-8 text-center text-zinc-400">
          Loading addresses...
        </div>
      ) : (
        loggedIn && savedAddresses.length > 0 && (
          <div className="mb-8 space-y-3">
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-4 font-inter">
            Saved Addresses
          </p>
          {savedAddresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-all ${
                !useNewAddress && selectedAddressId === addr.id
                  ? "border-[#FDB813]/50 bg-[#FDB813]/5"
                  : "border-zinc-800 bg-[#0F0F0F] hover:border-zinc-700"
              }`}
            >
              <input
                type="radio"
                name="address"
                checked={!useNewAddress && selectedAddressId === addr.id}
                onChange={() => { setSelectedAddressId(addr.id); setUseNewAddress(false) }}
                className="mt-1 accent-[#FDB813]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{addr.fullName}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] bg-[#FDB813] text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Default
                    </span>
                  )}
                </div>
                <p className=" text-white text-xs mt-1">{addr.phone}</p>
                <p className="text-white text-xs mt-0.5 truncate">{formatAddr(addr)}</p>
              </div>
            </label>
          ))}

          {/* Option to add new */}
          <label
            className={`flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-all ${
              useNewAddress
                ? "border-[#FDB813]/50 bg-[#FDB813]/5"
                : "border-zinc-800 bg-[#0F0F0F] hover:border-zinc-700"
            }`}
          >
            <input
              type="radio"
              name="address"
              checked={useNewAddress}
              onChange={() => setUseNewAddress(true)}
              className="accent-[#FDB813]"
            />
            <span className="text-sm">Use a different address</span>
          </label>
        </div>
      ))}

      {/* New Address Form */}
      {(!loadingAddresses && (useNewAddress || loggedIn === false || savedAddresses.length === 0)) && (
        <div className="space-y-4 font-montserrat">
          {loggedIn && savedAddresses.length > 0 && (
            <p className="text-[10px] text-white font-bold tracking-[0.2em] uppercase mb-2 font-inter">
              New Address
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Phone no."
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder="Address Lane 1"
            value={form.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Address Lane 2 (Optional)"
            value={form.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
            className={inputClass}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="State"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full font-montserrat bg-[#FDB813] hover:bg-[#E6A600] text-black font-bold py-4 rounded-md mt-8 transition-all uppercase tracking-widest text-xs"
      >
        Review Order
      </button>
    </div>
  )
}

export default ShippingDetails