/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { db } from "@/db";
import { address, subscriptionPayment, users } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import jwt from "jsonwebtoken";
import { emailRegex } from "@/const/globalconst";

type NewAddressInput = {
  fullName: string;
  phone: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
};

type DecodedAuthToken = {
  email?: string;
  "custom:userId"?: string;
  "custom:user_id"?: string;
};

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID!,
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID!,
});

async function getUserFromDecodedToken(decoded: DecodedAuthToken | null) {
  const tokenUserId = decoded?.["custom:userId"] ?? decoded?.["custom:user_id"];
  const email = decoded?.email;

  if (tokenUserId) {
    return {
      userId: tokenUserId,
      email,
    };
  }

  if (!email) {
    return null;
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user?.id) {
    return null;
  }

  return {
    userId: user.id,
    email: user.email ?? email,
  };
}

async function refreshUserTokens() {

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const idToken = cookieStore.get("idToken")?.value;

  if (!refreshToken || !idToken) return null;
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_AUTH_API_URL}/refersh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken, idToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data; // { accessToken, idToken }

  } catch {
    return null;
  }
}


export async function requireUserWithRefresh() {


  const user = await getCurrentUser();

  if (user?.userId) {
    return user;
  }

  const refreshed = await refreshUserTokens();

  if (!refreshed) {
    throw new Error("UNAUTHORIZED");
  }

  const idToken =
    refreshed?.response?.AuthenticationResult?.IdToken;

  const decoded = idToken ? jwt.decode(idToken) as DecodedAuthToken | null : null;
  const refreshedUser = await getUserFromDecodedToken(decoded);

  if (!refreshedUser?.userId) {
    throw new Error("USER_ID_MISSING");
  }

  return refreshedUser;
}
export async function getCurrentUser() {

  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const idToken = cookieStore.get("idToken")?.value;

    if (!accessToken || !idToken) return null;


    await verifier.verify(accessToken);

    const decoded = jwt.decode(idToken) as DecodedAuthToken | null;
    return await getUserFromDecodedToken(decoded);
  } catch (error) {
    if ((error as Error)?.message !== "USER_ID_MISSING") {
      console.error(error)
    }
    return null;
  }
}

export async function getProfile() {
  const { userId }: any = await requireUserWithRefresh();

  if (!userId) throw new Error("Unauthorized");

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!result.length) throw new Error("User not found");

  const user = result[0];

  return {
    userId: user.id,
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}

export async function updateProfile(data: {
  fullName: string;
  phone: string;
}) {
  const { userId }: any = await requireUserWithRefresh();

  if (!userId) throw new Error("Unauthorized");

  const updated = await db
    .update(users)
    .set({
      name: data.fullName,
      phone: data.phone,
    })
    .where(eq(users.id, userId))
    .returning();

  if (!updated.length) throw new Error("User not found");

  const user = updated[0];

  return {
    fullName: user.name,
    email: user.email,
    phone: user.phone,
  };
}


async function getDbUserId(): Promise<string> {
  const { userId }: any = await requireUserWithRefresh();
  if (!userId) throw new Error("UNAUTHORIZED");
  return userId;
}

export async function getUsersCount() {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users);

    return Number(result[0]?.count ?? 0);
  } catch (error) {
    console.error("getUsersCount failed:", error);
    return 0;
  }
}

export async function getAddresses() {
  const userId = await getDbUserId();

  return await db
    .select()
    .from(address)
    .where(eq(address.userId, userId));
}

export async function getUserAddressById(addressId: number) {
  const userId = await getDbUserId();

  const data = await db
    .select()
    .from(address)
    .where(
      and(
        eq(address.id, addressId),
        eq(address.userId, userId)
      )
    );

  return data[0] || null;
}

export async function updateUserAddress(data: any) {
  const userId = await getDbUserId();

  if (data.isDefault) {
    await db
      .update(address)
      .set({ isDefault: false })
      .where(eq(address.userId, userId));
  }

  await db
    .update(address)
    .set({
      fullName: data.fullName,
      phone: data.phone,
      street: data.street,
      locality: data.locality,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      isDefault: data.isDefault,
    })
    .where(
      and(
        eq(address.id, Number(data.id)),
        eq(address.userId, userId)
      )
    );

  return { success: true };
}

export async function deleteUserAddress(id: number) {
  const userId = await getDbUserId();

  await db
    .delete(address)
    .where(
      and(
        eq(address.id, id),
        eq(address.userId, userId)
      )
    );

  return { success: true };
}

export async function setDefaultAddress(id: number) {
  const userId = await getDbUserId();

  await db
    .update(address)
    .set({ isDefault: false })
    .where(eq(address.userId, userId));

  await db
    .update(address)
    .set({ isDefault: true })
    .where(
      and(
        eq(address.id, id),
        eq(address.userId, userId)
      )
    );

  return { success: true };
}

export async function createUserAddress(data: NewAddressInput) {
  const userId = await getDbUserId();

  try {
    if (data.isDefault) {
      await db
        .update(address)
        .set({ isDefault: false })
        .where(eq(address.userId, userId));
    }

    const [newAddress] = await db
      .insert(address)
      .values({
        ...data,
        userId,
        isDefault: data.isDefault ?? false,
      })
      .returning();

    return { success: true, data: newAddress };
  } catch (error) {
    return { success: false, error };
  }
}

export async function subscribeEmail(email: string) {

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  if (!emailRegex.test(email.trim())) {
    return { success: false, message: "Please enter a valid email" };
  }

  await db.insert(subscriptionPayment).values({
    email,
  });

  return { success: true, message: "Subscribed successfully 🎉" };
}
