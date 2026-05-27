"use client"
import React, { useEffect, useState } from 'react'
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EditAddressPage from '@/components/address/EditAddressPage'
import {
  getAddresses,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setDefaultAddress,
} from "@/helper"
import { toast } from "sonner"

type AddressItem = {
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

const AddressPage = () => {
  const [addresses, setAddresses] = useState<AddressItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [settingDefaultId, setSettingDefaultId] = useState<number | null>(null)

  // Edit/Add mode
  const [isEditing, setIsEditing] = useState(false)
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null)

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses()
      setAddresses(data as AddressItem[])
    } catch {
      toast.error("Failed to load addresses")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleAddNew = () => {
    setEditingAddress(null)
    setIsEditing(true)
  }

  const handleEdit = (addr: AddressItem) => {
    setEditingAddress(addr)
    setIsEditing(true)
  }

  const handleSave = async (data: any) => {
    setSaving(true)
    const toastId = toast.loading(data.id ? "Updating address..." : "Saving address...")

    try {
      if (data.id) {
        // Update existing
        await updateUserAddress(data)
        toast.success("Address updated", { id: toastId })
      } else {
        // Create new
        const result = await createUserAddress({
          fullName: data.fullName,
          phone: data.phone,
          street: data.street,
          locality: data.locality,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
          isDefault: data.isDefault,
        })
        if (!result.success) throw new Error("Failed to create address")
        toast.success("Address added", { id: toastId })
      }
      await fetchAddresses()
      setIsEditing(false)
      setEditingAddress(null)
    } catch (error: any) {
      toast.error(error.message || "Failed to save address", { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    const toastId = toast.loading("Deleting address...")

    try {
      await deleteUserAddress(id)
      toast.success("Address deleted", { id: toastId })
      await fetchAddresses()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete", { id: toastId })
    } finally {
      setDeletingId(null)
    }
  }

  const handleSetDefault = async (id: number) => {
    setSettingDefaultId(id)
    const toastId = toast.loading("Setting default...")

    try {
      await setDefaultAddress(id)
      toast.success("Default address updated", { id: toastId })
      await fetchAddresses()
    } catch (error: any) {
      toast.error(error.message || "Failed to set default", { id: toastId })
    } finally {
      setSettingDefaultId(null)
    }
  }

  const formatAddress = (addr: AddressItem) => {
    return [addr.street, addr.locality, addr.city, addr.state, addr.pincode]
      .filter(Boolean)
      .join(", ")
  }

  // Edit/Add view
  if (isEditing) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => { setIsEditing(false); setEditingAddress(null) }}
          className="text-[#FDB813] hover:text-[#FDB813]/80 hover:bg-transparent gap-2 px-0 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Address Book
        </Button>

        <EditAddressPage
          address={editingAddress ? {
            id: editingAddress.id,
            fullName: editingAddress.fullName ?? "",
            phone: editingAddress.phone ?? "",
            street: editingAddress.street ?? "",
            locality: editingAddress.locality ?? "",
            city: editingAddress.city ?? "",
            state: editingAddress.state ?? "",
            pincode: editingAddress.pincode ?? "",
            country: editingAddress.country ?? "India",
            isDefault: editingAddress.isDefault ?? false,
          } : null}
          onSave={handleSave}
          onCancel={() => { setIsEditing(false); setEditingAddress(null) }}
          saving={saving}
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden px-4 md:px-0 space-y-8 pb-20">
      <h1 className="text-2xl md:text-3xl font-semibold font-montserrat tracking-tight text-white pt-4">
        Address Book
      </h1>

      {/* Header Section */}
      <Card className="bg-[#141414] border-zinc-900 overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-montserrat text-white">Address Book</h2>
            <p className="text-sm text-zinc-500 font-inter">Manage your delivery addresses</p>
          </div>
          <Button
            onClick={handleAddNew}
            className="w-full font-inter md:w-auto bg-[#FDB813] hover:bg-[#e6a700] text-black h-12 px-8 text-[11px] font-bold uppercase tracking-widest gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add New Address
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-[#141414] border-zinc-900 rounded-xl overflow-hidden">
              <CardContent className="p-6 md:p-8 min-h-[300px] space-y-4">
                <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse" />
                <div className="h-5 w-48 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <Card className="bg-[#141414] border-zinc-900 rounded-xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <p className="text-zinc-500 font-inter text-sm">No addresses found. Add your first delivery address.</p>
          </CardContent>
        </Card>
      ) : (
        /* Address Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {addresses.map((item) => (
            <Card key={item.id} className="bg-[#141414] border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
              <CardContent className="p-6 md:p-8 flex flex-col justify-between min-h-[300px]">

                <div className="space-y-4">
                  {item.isDefault && (
                    <Badge className="bg-[#FDB813] text-black hover:bg-[#FDB813] px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border-none">
                      Default Address
                    </Badge>
                  )}

                  <div className="space-y-2 min-w-0">
                    <h3 className="text-xl font-bold font-montserrat text-white tracking-wide truncate">
                      {item.fullName || "—"}
                    </h3>
                    <p className="text-sm text-zinc-400 font-inter font-medium">{item.phone || "—"}</p>
                    <p className="text-sm text-zinc-500 font-inter leading-relaxed max-w-sm">
                      {formatAddress(item) || "—"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center font-inter gap-3 pt-8 mt-auto">
                  {!item.isDefault && (
                    <Button
                      variant="outline"
                      onClick={() => handleSetDefault(item.id)}
                      disabled={settingDefaultId === item.id}
                      className="flex-1 border-[#FDB813] text-[#FDB813] hover:text-[#FDB813] hover:bg-[#FDB813]/5 bg-transparent h-11 text-[11px] font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                      {settingDefaultId === item.id ? "Setting..." : "Set Default"}
                    </Button>
                  )}

                  <Button
                    onClick={() => handleEdit(item)}
                    className={`${item.isDefault ? 'w-full' : 'flex-1'} bg-[#FDB813] hover:bg-[#e6a700] text-black h-11 text-[11px] font-bold font-inter uppercase tracking-widest transition-all`}
                  >
                    Edit
                  </Button>

                  {!item.isDefault && (
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="w-11 h-11 p-0 border-zinc-800 bg-transparent text-[#FF0000] hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddressPage