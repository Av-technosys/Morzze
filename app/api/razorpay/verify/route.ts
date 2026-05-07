/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import { NextResponse } from "next/server";
import { checkUserFirstOrder, createOrder, createSubscription, sendFirstPurchaseEmail, sendOrderConfirmationEmail } from "@/helper";
import { RAZORPAY_KEY_SECRET } from "@/env";
import { getCurrentUser, getProfile, requireUserWithRefresh } from "@/helper/user/action";

export async function POST(req: Request) {
  const body = await req.json();
  const {userId,email,fullName}: any = await getProfile();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    address,
    amount,

  } = body;

  // 1️⃣ Verify signature
  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const existingOrder = await checkUserFirstOrder(userId);
  if (existingOrder.length === 0) {
    // This is the user's first order
     await sendFirstPurchaseEmail(email, fullName);
  }


  const result:any = await createOrder({
    userId,
    items,
    fixedAmount: amount,
    address,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
  });

  const currentDate = new Date().toLocaleDateString();

   await sendOrderConfirmationEmail(email,fullName,result?.orderId,currentDate,amount)

  return NextResponse.json(result);
}