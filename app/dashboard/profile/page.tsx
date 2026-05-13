"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProfile, updateProfile } from "@/helper/user/action"
import { changePassword } from "@/helper"
import { toast } from "sonner"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)

  // Profile fields
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  useEffect(() => {
    getProfile()
      .then((data) => {
        setFullName(data.fullName ?? "")
        setPhone(data.phone ?? "")
        setEmail(data.email ?? "")
      })
      .catch(() => {
        toast.error("Failed to load profile")
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required")
      return
    }
    if (!phone.trim()) {
      toast.error("Mobile number is required")
      return
    }

    setSaving(true)
    const toastId = toast.loading("Saving changes...")

    try {
      const updated = await updateProfile({ fullName: fullName.trim(), phone: phone.trim() })
      setFullName(updated.fullName ?? fullName)
      setPhone(updated.phone ?? phone)
      toast.success("Profile updated successfully", { id: toastId })
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile", { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error("Current password is required")
      return
    }
    if (!newPassword) {
      toast.error("New password is required")
      return
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters")
      return
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match")
      return
    }

    setChangingPassword(true)
    const toastId = toast.loading("Updating password...")

    try {
      await changePassword({
        previousPassword: currentPassword,
        proposedPassword: newPassword,
      })
      toast.success("Password changed successfully", { id: toastId })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (error: any) {
      toast.error(error.message || "Failed to change password", { id: toastId })
    } finally {
      setChangingPassword(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <h1 className="text-3xl font-semibold text-white font-montserrat tracking-tight">
        Profile Settings
      </h1>

      {/* Personal Information Section */}
      <Card className="bg-[#141414] border-zinc-900 rounded-lg overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-4">
          <CardTitle className="text-xl font-medium text-white font-montserrat tracking-tight">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2.5">
                  <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-12 bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2.5">
                  <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                    Full Name
                  </Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                    Mobile Number
                  </Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
                  />
                </div>
                <div className="space-y-2.5 md:col-span-1">
                  <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    disabled
                    className="bg-[#181818] border-zinc-800 h-12 text-zinc-400 font-inter cursor-not-allowed opacity-60"
                  />
                </div>
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={saving}
                className="mt-10 bg-[#FFB800] hover:bg-[#e6a600] font-inter text-black text-[12px] font-bold px-10 h-11 uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="bg-[#141414] border-zinc-900 rounded-lg overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-4">
          <CardTitle className="text-xl font-medium text-white font-montserrat tracking-tight">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <div className="space-y-6 max-w-md">
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Current Password
              </Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                New Password
              </Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-inter font-bold">
                Confirm New Password
              </Label>
              <Input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-[#181818] border-zinc-800 h-12 text-white focus-visible:ring-[#FFB800]/30 font-inter"
              />
            </div>
          </div>
          <Button
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="mt-10 bg-[#FFB800] font-inter hover:bg-[#e6a600] text-black text-[12px] font-bold px-10 h-11 uppercase tracking-widest transition-all disabled:opacity-50"
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card className="bg-[#141414] border-zinc-900 rounded-lg overflow-hidden">
        <CardHeader className="pt-8 px-8 pb-2">
          <CardTitle className="text-xl font-medium text-red-500 font-montserrat tracking-tight">
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <p className="text-sm text-zinc-500 mb-8 font-inter font-medium leading-relaxed">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button 
            variant="outline" 
            className="border-red-900/30 font-inter bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-500 text-[12px] font-bold px-8 h-11 uppercase tracking-widest transition-all"
          >
            Request Account Deletion
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}