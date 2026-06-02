/* eslint-disable @typescript-eslint/no-explicit-any */
import { cognitoResendConfirmationCode } from "@/helper/cognito";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: "email is required." }, { status: 400 });
  }

  try {
    await cognitoResendConfirmationCode({ email });

    return NextResponse.json(
      { message: "OTP resent successfully.", data: { email } },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Resend OTP error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
