import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BASE_AUTH_API_URL } from "@/env";

type CognitoIdTokenPayload = {
  email?: string;
  "custom:userId"?: string;
  "custom:user_id"?: string;
};

function isJwtLike(token: string) {
  return token.split(".").length === 3;
}

export async function GET() {
  const cookieStore = await cookies(); 

  let accessToken = cookieStore.get("accessToken")?.value;
  const idToken = cookieStore.get("idToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !idToken) {
    return NextResponse.json({ authenticated: false });
  }

  let refreshedIdToken: string | undefined;

  if (!isJwtLike(accessToken) && refreshToken) {
    try {
      const refreshRes = await fetch(`${BASE_AUTH_API_URL}/refersh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken, idToken }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const result = refreshData?.response?.AuthenticationResult;

        accessToken = result?.AccessToken ?? accessToken;
        refreshedIdToken = result?.IdToken;
      }
    } catch {
      return NextResponse.json({ authenticated: false });
    }
  }

  if (!accessToken || !isJwtLike(accessToken)) {
    return NextResponse.json({ authenticated: false });
  }

  const activeIdToken = refreshedIdToken ?? idToken;
  const decoded = activeIdToken ? jwt.decode(activeIdToken) as CognitoIdTokenPayload | null : null;
  let userId = decoded?.["custom:userId"] ?? decoded?.["custom:user_id"];

  if (!userId && decoded?.email) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, decoded.email))
      .limit(1);

    userId = user?.id;
  }

  if (!activeIdToken || !userId) {
    return NextResponse.json({ authenticated: false });
  }

  const response = NextResponse.json({
    authenticated: true,
    accessToken,
    idToken: activeIdToken,
    refreshToken,
    user: {
      userId,
      email: decoded?.email,
    },
    userId,
  });

  if (refreshedIdToken && accessToken) {
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("idToken", refreshedIdToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}
