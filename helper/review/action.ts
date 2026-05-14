"use server";

import { db } from "@/db";
import {
  order,
  orderItem,
  product,
  review,
  reviewMedia,
  users,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getProfile } from "../user/action";
import { getOrdersByUserId } from "../order/action";

export type PurchaseForReview = {
  productId: string;
  productName: string;
  variant: string;
  image: string | null;
  qty: number;
  orderId: string;
  orderDate: string;
  orderTotal: number | null;
};

export async function getPurchasedProductsForReview(): Promise<PurchaseForReview[]> {
  try {
    const orders = (await getOrdersByUserId()) ?? [];
    type Acc = PurchaseForReview & { _ts: number };

    const byProduct = new Map<string, Acc>();

    for (const o of orders) {
      const created = o.createdAt ? new Date(o.createdAt) : null;
      const ts = created?.getTime() ?? 0;
      const orderDateIso = created?.toISOString() ?? "";

      for (const it of o.order_items ?? []) {
        const pid = it.productId;
        if (!pid) continue;

        const row: Acc = {
          productId: pid,
          productName: (it.productName ?? "Product").trim() || "Product",
          variant: it.productVarientBox?.trim() || "—",
          image: it.productImage ?? null,
          qty: it.quantity ?? 0,
          orderId: o.id,
          orderDate: orderDateIso,
          orderTotal: o.totalAmount ?? null,
          _ts: ts,
        };

        const prev = byProduct.get(pid);
        if (!prev || row._ts > prev._ts) {
          byProduct.set(pid, row);
        }
      }
    }

    return Array.from(byProduct.values()).map(({ _ts: _t, ...rest }) => rest);
  } catch (error) {
    console.error("getPurchasedProductsForReview:", error);
    return [];
  }
}

export async function createReview(reviewData: {
  productId: string;
  rating: number;
  message: string;
  title?: string;
  media?: string[];
}) {
  try {
    const { userId } = await getProfile();
    const { productId, rating, message, title, media } = reviewData;

    if (!productId?.trim()) {
      return { success: false, message: "Product is required." };
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return { success: false, message: "Please choose a rating from 1 to 5." };
    }
    const body = message?.trim() ?? "";
    if (!body) {
      return { success: false, message: "Please write a review." };
    }

    const purchased = await db
      .select({ id: orderItem.id })
      .from(orderItem)
      .innerJoin(order, eq(orderItem.orderId, order.id))
      .where(and(eq(order.userId, userId), eq(orderItem.productId, productId)))
      .limit(1);

    if (!purchased.length) {
      return {
        success: false,
        message: "You can only review products you have purchased.",
      };
    }

    const existing = await db
      .select({ id: review.id })
      .from(review)
      .where(and(eq(review.userId, userId), eq(review.productId, productId)))
      .limit(1);

    if (existing.length) {
      return {
        success: false,
        message: "You have already submitted a review for this product.",
      };
    }

    const fullMessage = title?.trim()
      ? `${title.trim()}\n\n${body}`
      : body;

    const safeMessage =
      fullMessage.length > 5000 ? fullMessage.slice(0, 5000) : fullMessage;

    await db.transaction(async (tx) => {
      const userInfo = await tx.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
          name: true,
          email: true,
        },
      });

      const reviewId = await tx
        .insert(review)
        .values({
          userId,
          productId,
          name: userInfo?.name || "User",
          email: userInfo?.email || "",
          rating: Math.round(Number(rating)),
          message: safeMessage,
          isAdminApproved: false,
        })
        .returning({ id: review.id });

      if (media && media.length > 0) {
        await tx.insert(reviewMedia).values(
          media.map((img: string) => ({
            reviewId: reviewId[0].id,
            mediaType: "image",
            mediaURL: img,
          })),
        );
      }
    });

    revalidatePath("/dashboard/review-rating");
    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false, message: "Failed to submit review." };
  }
}

export async function getProductReviews(slug: string | any) {
  try {
    const v = await db.query.product.findFirst({
      where: eq(product.slug, slug),
    });
    if (!v || !v.id) return [];
    const reviews = await db
      .select({
        id: review.id,
        rating: review.rating,
        userId: review.userId,
        name: review.name,
        email: review.email,
        message: review.message,
        productId: review.productId,
        createdAt: review.createdAt,
      })
      .from(review)
      .innerJoin(users, eq(review.userId, users.id))
      .where(
        and(eq(review.productId, v.id), eq(review.isAdminApproved, true)),
      );

    const reviewsWithMedia = await Promise.all(
      reviews.map(async (r) => ({
        ...r,
        media: await db
          .select()
          .from(reviewMedia)
          .where(eq(reviewMedia.reviewId, r.id)),
      })),
    );

    return reviewsWithMedia;
  } catch (error) {
    return [];
  }
}

export async function toggleApproveReview(id: string) {
  try {
    if (!id) throw new Error("Review id missing");

    await db
      .update(review)
      .set({ isAdminApproved: true })
      .where(eq(review.id, id));

    revalidatePath("/admin/reviews");
    revalidatePath("/dashboard/review-rating");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Toggle approve failed:", error);
    return { success: false, message: "Failed to update review status" };
  }
}

export async function deleteReview(id: string) {
  try {
    if (!id) throw new Error("Review id missing");

    await db.delete(review).where(eq(review.id, id));

    revalidatePath("/admin/reviews");
    revalidatePath("/dashboard/review-rating");

    return { success: true };
  } catch (error) {
    console.error("Delete review failed:", error);
    return { success: false, message: "Failed to delete review" };
  }
}

export async function getReviewStats() {
  try {
    const [data] = await db
      .select({
        total: sql<number>`count(*)::int`,
        pending: sql<number>`count(*) filter (where ${review.isAdminApproved} = false)::int`,
      })
      .from(review);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch review stats:", error);
    return { success: false };
  }
}

export async function getUserAllReviews() {
  try {
    const { userId } = await getProfile();

    const reviews = await db
      .select({
        id: review.id,
        rating: review.rating,
        userId: review.userId,
        name: review.name,
        email: review.email,
        message: review.message,
        productId: review.productId,
        isAdminApproved: review.isAdminApproved,
        createdAt: review.createdAt,
      })
      .from(review)
      .where(eq(review.userId, userId));

    const reviewsWithMedia = await Promise.all(
      reviews.map(async (r) => ({
        ...r,
        media: await db
          .select()
          .from(reviewMedia)
          .where(eq(reviewMedia.reviewId, r.id)),
      })),
    );

    return reviewsWithMedia;
  } catch (error) {
    console.error("getUserAllReviews:", error);
    return [];
  }
}
