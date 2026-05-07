import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";

export async function POST(req: Request) {
  const body = await req.json();
  const { items } = body;

  const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID!,
    key_secret: RAZORPAY_KEY_SECRET!,
  });

  const plans = await Promise.all(
    items.map(async (item: any) => {
      if (!item.isTypeSubscription) return null;

      const plan = await razorpay.plans.create({
        period: "monthly",
        interval: item.frequencyInMonths, 
        item: {
          name: item.title,
          amount: item.price * 100, 
          currency: "INR",
        },
      });

      return {
        ...plan,
        productId: item.productId,
        quantity: item.quantity,
      };
    })
  );

  // null values hata do (non-subscription items)
  const filteredPlans = plans.filter(Boolean);

  return NextResponse.json(filteredPlans);
}