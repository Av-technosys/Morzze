import ReviewRatingClient, {
  type ReviewByProduct,
} from "@/components/dashboard/ReviewRatingClient";
import {
  getPurchasedProductsForReview,
  getUserAllReviews,
} from "@/helper/review/action";

export default async function ReviewRatingPage() {
  const [purchases, myReviews] = await Promise.all([
    getPurchasedProductsForReview(),
    getUserAllReviews(),
  ]);

  const reviewsByProductId: Record<string, ReviewByProduct> = {};
  for (const r of myReviews) {
    if (!r.productId) continue;
    reviewsByProductId[r.productId] = {
      rating: r.rating,
      message: r.message,
      isAdminApproved: r.isAdminApproved,
    };
  }

  return (
    <ReviewRatingClient
      purchases={purchases}
      reviewsByProductId={reviewsByProductId}
    />
  );
}
