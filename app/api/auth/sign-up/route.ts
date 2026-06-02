/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  cognitoAdminGetUser,
  cognitoResendConfirmationCode,
  cognitoSignUp,
} from "@/helper/cognito";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

async function ensureDbUser({
  email,
  name,
  phone,
  ref,
}: {
  email: string;
  name?: string;
  phone?: string;
  ref?: string;
}) {
  const [existingDbUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingDbUser) return existingDbUser;

  const [userRes] = await db
    .insert(users)
    .values({
      name: name || "New User",
      email,
      phone: phone || "0000000000",
      password: "COGNITO_AUTH",
      referralCoins: ref ? 200 : 0,
    })
    .returning();

  return userRes;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, phone, ref } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const existingUser = await cognitoAdminGetUser({ email });

    if (existingUser?.UserStatus === "CONFIRMED") {
      return NextResponse.json(
        { message: "User already exists. Please login." },
        { status: 409 },
      );
    }

    await cognitoResendConfirmationCode({ email });
    const userRes = await ensureDbUser({ email, name, phone, ref });

    return NextResponse.json(
      {
        message: "Account already exists but is not verified. OTP resent to your email.",
        data: {
          userId: userRes.id,
          email,
          verificationRequired: true,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.name === "UserNotFoundException" || error.__type === "UserNotFoundException") {
      try {
        await cognitoSignUp({
          email,
          password,
          userAttribute: [{ Name: "email", Value: email }],
        });

        const userRes = await ensureDbUser({ email, name, phone, ref });

        return NextResponse.json(
          {
            message: "Signup successful. OTP sent to email.",
            data: {
              userId: userRes.id,
              email,
            },
          },
          { status: 201 },
        );
      } catch (signupError: any) {
        console.error("Signup error:", signupError);

        return NextResponse.json(
          { message: signupError.message },
          { status: 500 },
        );
      }
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
