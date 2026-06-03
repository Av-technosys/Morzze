import { revalidateTag } from "next/cache";

export const CACHE_TAGS = {
  products: "products",
  product: (slugOrId: string) => `product:${slugOrId}`,
  categories: "categories",
  category: (slugOrId: string) => `category:${slugOrId}`,
};

export function revalidateProductCache(slugOrId?: string | null) {
  revalidateTag(CACHE_TAGS.products, "max");

  if (slugOrId) {
    revalidateTag(CACHE_TAGS.product(slugOrId), "max");
  }
}

export function revalidateCategoryCache(slugOrId?: string | null) {
  revalidateTag(CACHE_TAGS.categories, "max");

  if (slugOrId) {
    revalidateTag(CACHE_TAGS.category(slugOrId), "max");
  }
}
