import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";
import { calculateCheckoutPricing } from "@/helper/checkout/pricing";
import { getProfile } from "@/helper/user/action";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { couponCode } = body;
    const { userId } = (await getProfile()) as { userId?: string };

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const pricing = await calculateCheckoutPricing({ userId, couponCode });

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID!,
      key_secret: RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(pricing.total * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
        subtotal: String(pricing.subtotal),
        discountAmount: String(pricing.discountAmount),
        couponCode: pricing.couponCode ?? "",
      },
    });

    return NextResponse.json({
      ...order,
      pricing: {
        subtotal: pricing.subtotal,
        discountAmount: pricing.discountAmount,
        gstAmount: pricing.gstAmount,
        total: pricing.total,
        couponCode: pricing.couponCode,
      },
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to create payment order" },
      { status: 400 },
    );
  }
}
