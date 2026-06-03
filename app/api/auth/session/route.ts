import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type CognitoIdTokenPayload = {
  email?: string;
  "custom:userId"?: string;
  "custom:user_id"?: string;
};

export async function GET() {
  const cookieStore = await cookies(); 

  const accessToken = cookieStore.get("accessToken")?.value;
  const idToken = cookieStore.get("idToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ authenticated: false });
  }

  const decoded = idToken ? jwt.decode(idToken) as CognitoIdTokenPayload | null : null;
  let userId = decoded?.["custom:userId"] ?? decoded?.["custom:user_id"];

  if (!userId && decoded?.email) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, decoded.email))
      .limit(1);

    userId = user?.id;
  }

  if (!idToken || !userId) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    accessToken,
    idToken,
    refreshToken,
    user: {
      userId,
      email: decoded?.email,
    },
    userId,
  });
}
