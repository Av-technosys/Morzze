"use server";
import { db } from "@/db";
import { review, reviewMedia, users, product } from "@/db/schema";
import { and, eq, is, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireUserWithRefresh } from "../user/action";

export async function createReview(reviewData: any) {
  try {
    const { userId, productVarientId, rating, message, media } = reviewData;


    if (!productVarientId) {
      throw new Error("Product  ID is required for review submission");
    }
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
          productId: productVarientId,
          name: userInfo?.name || "Guest User",
          email: userInfo?.email || "",
          rating: Number(rating),
          message,
        })
        .returning({ id: review.id });

      if (media && media.length > 0) {
        await tx.insert(reviewMedia).values(
          media.map((img: any) => ({
            reviewId: reviewId[0].id,
            mediaType: "image",
            mediaURL: img,
          })),
        );
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false };
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
        and(
          eq(review.productId, v.id),
          eq(review.isAdminApproved, true),
        ),
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
    const { userId } = await requireUserWithRefresh();

    //if (!userId) return [];
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
  } catch (error) { }
}
