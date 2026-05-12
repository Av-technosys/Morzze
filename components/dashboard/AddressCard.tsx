"use client"
import React, { useEffect, useState } from 'react'
import { getAddresses } from '@/helper/user/action'
import Link from 'next/link'

type AddressData = {
  fullName: string | null;
  phone: string | null;
  street: string | null;
  locality: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  isDefault: boolean | null;
};

export const AddressCard = () => {
  const [address, setAddress] = useState<AddressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAddresses()
      .then((data: any[]) => {
        const defaultAddr = data.find((a) => a.isDefault) || data[0] || null
        setAddress(defaultAddr)
      })
      .catch(() => setAddress(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-[#0F0F0F] rounded-2xl border border-zinc-900 p-8 h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-14 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="h-5 w-28 bg-zinc-800 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="bg-[#0F0F0F] rounded-2xl border border-zinc-900 p-8 h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-sm font-medium uppercase tracking-wider">Default Address</h2>
          <Link href="/dashboard/address" className="text-[10px] text-[#FFB800] underline">Add</Link>
        </div>
        <p className="text-zinc-500 text-sm">No address saved yet.</p>
      </div>
    )
  }

  const addressParts = [address.street, address.locality].filter(Boolean).join(", ")
  const cityLine = [address.city, address.state, address.pincode].filter(Boolean).join(", ")

  return (
    <div className="bg-[#0F0F0F] rounded-2xl border border-zinc-900 p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider">Default Address</h2>
        <Link href="/dashboard/address" className="text-[10px] text-[#FFB800] underline">Manage</Link>
      </div>
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded uppercase">Home</span>
        {address.isDefault && (
          <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded uppercase font-bold">Default</span>
        )}
      </div>
      <h3 className="text-white font-medium text-lg">{address.fullName || "—"}</h3>
      <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
        {addressParts && <>{addressParts}<br /></>}
        {cityLine}
      </p>
    </div>
  )
}