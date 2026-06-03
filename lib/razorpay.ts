/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createPaymentGatewayPlan,
  CreatePaymentGatewaySubscription,
  createSubscription,
} from "@/helper";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    // prevent loading twice
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

/**
 * Opens Razorpay Checkout
 */ export const initiateRazorpayPayment = async ({
  name,
  description,
  items,
  // userId,
  address,
  coupon,
  callback
}: {
  name: string;
  description: string;
  items: any[];
  // userId: string;
  address: any;
  coupon?: { code: string; discountAmount: number; subtotal: number };
  callback?: (response: any) => void;
}) => {
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded) {
    throw new Error("Razorpay SDK failed to load");
  }

  const subscriptionItems = items.filter(
    (item: any) => item.isTypeSubscription === true,
  );

  if (subscriptionItems.length > 0) {
    const plan = await fetch("/api/razorpay/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const planData = await plan.json();

    if (!Array.isArray(planData) || planData.length === 0) {
      throw new Error("Plan creation failed");
    }

    await createPaymentGatewayPlan(planData);

    const subscriptions = await Promise.all(
      planData.map(async (p: any) => {
        const res = await fetch("/api/razorpay/subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId: p.id }),
        });

        const data = await res.json();

        if (!data?.id) {
          throw new Error("Subscription creation failed");
        }

        return {
          ...data,
          productId: p.productId,
        };
      }),
    );

    await CreatePaymentGatewaySubscription(subscriptions);
    await createSubscription({ items });

  }

  // 1. Create Razorpay Order from server-calculated cart amount.
  const res = await fetch("/api/razorpay/order", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ couponCode: coupon?.code }),
  });

  const order = await res.json();
  if (!order?.id) {
    throw new Error("Order creation failed");
  }

  // 2️⃣ Open Razorpay Checkout
  return new Promise((resolve, reject) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name,
      description,
      order_id: order.id,

      modal: {
        ondismiss: () => {
          if (callback) {
            callback({ reason: "dismissed" });
          }

        },
      },

      handler: async function (response: any) {
        try {
          // 3️⃣ Verify + Create DB Order
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              items,
              // userId,
              address,
              couponCode: coupon?.code,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            resolve(verifyData);
          } else {
            reject("Payment verification failed");
          }
        } catch (err) {
          reject(err);
        }
      },

      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", function (response: any) {
      if (callback) {
        callback(response.error);
      }
      reject(response.error);
    });

    razor.open();
  });
};
