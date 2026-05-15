"use client";

import React, { useMemo, useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  IconPackage, 
  
  IconMailOpened, 
  IconPhone
} from "@tabler/icons-react";

const notifications = [
  {
    id: "orders",
    title: "Order Updates",
    description: "Get notified about order status changes, shipping updates, and delivery confirmations.",
    icon: <IconPackage size={20} className="text-zinc-500" />,
    defaultChecked: true,
  },
  {
    id: "promotions",
    title: "Promotions & Offers",
    description: "Receive exclusive deals, seasonal sales, and special discount codes.",
    icon: <IconPhone size={20} className="text-zinc-500" />,
    defaultChecked: false,
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Stay updated with new product launches, design tips, and brand stories.",
    icon: <IconMailOpened size={20} className="text-zinc-500" />,
    defaultChecked: true,
  }
];

const NotificationPage = () => {
  const initialPrefs = useMemo(
    () => Object.fromEntries(notifications.map((n) => [n.id, n.defaultChecked])) as Record<string, boolean>,
    []
  );
  const [prefs, setPrefs] = useState<Record<string, boolean>>(initialPrefs);

  return (
    <div className="min-h-screen bg-black text-[#EDEBE9] p-6 md:p-3 font-inter">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Notification</h2>

        <div className="bg-[#141414] border border-[#2E2E2E] rounded-lg overflow-hidden">
          {notifications.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-start justify-between p-6 ${
                index !== notifications.length - 1 ? "border-b border-zinc-800" : ""
              }`}
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center pt-1">
                <Switch 
                  checked={prefs[item.id]}
                  onCheckedChange={(checked) => {
                    setPrefs((prev) => ({ ...prev, [item.id]: checked }));
                    toast.success(
                      checked
                        ? `${item.title} notifications are on`
                        : `${item.title} notifications are off`
                    );
                  }}
                  className="data-checked:bg-[#FFBF3F] data-unchecked:bg-zinc-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;