/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { checkUserFirstOrder, createOrder } from "@/helper";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";
import { getProfile } from "@/helper/user/action";
import {
  notifyFirstOrderEmail,
  notifyOrderConfirmationEmail,
} from "@/lib/email-notifications";
import { calculateCheckoutPricing } from "@/helper/checkout/pricing";

export async function POST(req: Request) {
  const body = await req.json();
  const {userId,email,fullName}: any = await getProfile();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    address,
    couponCode,
  } = body;

  // 1️⃣ Verify signature
  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const pricing = await calculateCheckoutPricing({ userId, couponCode });
  const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID!,
    key_secret: RAZORPAY_KEY_SECRET!,
  });
  const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);

  if (Number(razorpayOrder.amount) !== Math.round(pricing.total * 100)) {
    return NextResponse.json(
      { success: false, message: "Payment amount mismatch" },
      { status: 400 },
    );
  }

  const existingOrder = await checkUserFirstOrder(userId);
  if (existingOrder.length === 0) {
    try {
      await notifyFirstOrderEmail({
        email,
        customerName: fullName,
      });
    } catch (emailError) {
      console.error("Unable to send first order email:", emailError);
    }
  }


  const result:any = await createOrder({
    userId,
    address,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    couponCode,
  });

  const currentDate = new Date().toLocaleDateString();

  try {
    await notifyOrderConfirmationEmail({
      email,
      customerName: fullName,
      orderId: result?.orderId,
      orderDate: currentDate,
      productNames: result?.productNames ?? "",
      orderTotal: result?.totalAmount,
    });
  } catch (emailError) {
    console.error("Unable to send order confirmation email:", emailError);
  }

  return NextResponse.json(result);
}
