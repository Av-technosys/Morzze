/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";

import slugify from "slugify";
//import path from "path";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { revalidatePath, unstable_cache } from "next/cache";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";
import { and, asc, ilike, sql } from "drizzle-orm";
import { paginate } from "@/lib/pagination";
import { category, productCategory, product } from "@/db/schema";
import {
  CACHE_TAGS,
  revalidateCategoryCache,
  revalidateProductCache,
} from "@/lib/cache-tags";


interface GetCategoriesOptions {
  page?: number;
  pageSize?: any;
  search?: string;
  category: any;
}
export async function createCategory(categoryData: any) {
  try {
    const { name, description, parentId, bannerImage, type } = categoryData;
    const slug = await generateUniqueSlug(db, name, category.slug);
    await db.insert(category).values({
      name,
      slug,
      description,
      bannerImage: bannerImage || null,
      type
    });

    revalidateCategoryCache(slug);
    revalidateProductCache();
    revalidatePath("/admin/category");
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    console.error("Create category failed:", error);
    return { success: false, message: "Failed to create category" };
  }
  redirect("/admin/category");
}

export async function updateCategory(categoryData: any) {
  try {
    const { id, name, description, parentId, bannerImage, type } =
      categoryData;

    await db
      .update(category)
      .set({
        name,
        slug: slugify(name, { lower: true }),
        description,
        bannerImage: bannerImage || null,
        type
      })
      .where(eq(category.id, id));

    revalidateCategoryCache(slugify(name, { lower: true }));
    revalidateProductCache();
    revalidatePath("/admin/category");
    revalidatePath(`/admin/category/${id}`);
    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    console.error("Update category failed:", error);
    return { success: false, message: "Failed to update category" };
  }
  redirect("/admin/category");
}

export const attachProductCategory = async (
  productId: string,
  categoryId: string,
) => {
  try {
    if (!categoryId) return;

    await db.insert(productCategory).values({
      productId,
      categoryId,
    });

    revalidateProductCache(productId);
    revalidateCategoryCache(categoryId);
  } catch (error) {
    console.error("attach Product Category failed:", error);
    throw new Error("attach Product Category failed");
  }
};

export async function getProductCategory(productId: string) {
  try {
    const result = await db
      .select({
        categoryId: productCategory.categoryId,
        name: category.name,
      })
      .from(productCategory)
      .leftJoin(category, eq(category.id, productCategory.categoryId))
      .where(eq(productCategory.productId, productId));

    return result;
  } catch (error) {
    console.error("fetch product category failed:", error);
    throw new Error("fetch product category failed");
  }
}
export async function updateProductCategory(
  productId: string,
  categoryId: string,
) {
  try {
    await db
      .delete(productCategory)
      .where(eq(productCategory.productId, productId));

    await db.insert(productCategory).values({
      productId,
      categoryId,
    });

    revalidateProductCache(productId);
    revalidateCategoryCache(categoryId);
  } catch (error) {
    console.error("Update product category failed:", error);
    throw new Error("Failed to update category");
  }
}

export async function getCategoriesPagination({
  page = 1,
  pageSize = 10,
  search = "",
  category: categorySlug,
}: GetCategoriesOptions) {
  const filters = [];

  if (search.trim() !== "") {
    filters.push(ilike(category.name, `%${search}%`));
  }

  if (categorySlug) {
    filters.push(eq(category.slug, categorySlug));
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  const result = await paginate({
    table: category,
    page,
    pageSize,
    where: whereClause,
    // orderBy: desc(category.createdAt),
  });

  return {
    items: result.data,
    totalPages: result.meta.totalPages,
    page: result.meta.page,
  };
}
export async function deleteCategory(id: string) {
  try {
    const usage = await db
      .select({ count: sql<number>`count(*)` })
      .from(productCategory)
      .where(eq(productCategory.categoryId, id));

    if (usage[0].count > 0) {
      return {
        success: false,
        message: "Cannot delete: this category is assigned to products",
      };
    }

    await db.delete(category).where(eq(category.id, id));

    revalidateCategoryCache(id);
    revalidateProductCache();
    revalidatePath("/admin/category");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong while deleting category",
    };
  }
}
export async function getCategories() {
  return unstable_cache(
    async () => {
      try {
        return await db
          .select()
          .from(category)
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    [CACHE_TAGS.categories],
    { revalidate: 3600, tags: [CACHE_TAGS.categories] }
  )();
}

export async function getAllProductsByCategorySlug(slug: string) {
  return unstable_cache(
    async () => {
      try {
        const products = await db
          .select({
            id: product.id,
            name: product.name,
            basePrice: product.basePrice,
            strikethroughPrice: product.strikethroughPrice,
            slug: product.slug,
            bannerImage: product.bannerImage,
            rateing1Star: product.rateing1Star,
            rateing2Star: product.rateing2Star,
            rateing3Star: product.rateing3Star,
            rateing4Star: product.rateing4Star,
            rateing5Star: product.rateing5Star,
            sku: product.sku,
          })
          .from(product)
          .innerJoin(
            productCategory,
            eq(product.id, productCategory.productId),
          )
          .innerJoin(
            category,
            eq(category.id, productCategory.categoryId),
          )
          .where(eq(category.slug, slug));

        return products;
      } catch (error) {
        console.error("fetch products by category failed:", error);
        return [];
      }
    },
    [CACHE_TAGS.products, CACHE_TAGS.category(slug), "category-products", slug],
    {
      revalidate: 3600,
      tags: [CACHE_TAGS.products, CACHE_TAGS.categories, CACHE_TAGS.category(slug)],
    },
  )();
}

export async function getCategoryBySlug(slug: string) {
  return unstable_cache(
    async () => {
      try {
        const result = await db
          .select()
          .from(category)
          .where(eq(category.slug, slug))
          .limit(1);

        return result[0] || null;
      } catch (error) {
        console.error("fetch category by slug failed:", error);
        return null;
      }
    },
    [CACHE_TAGS.category(slug), slug],
    {
      revalidate: 3600,
      tags: [CACHE_TAGS.categories, CACHE_TAGS.category(slug)],
    },
  )();
}

export async function getCategoriesWithProducts(limit = 4) {
  return unstable_cache(
    async () => {
      try {
        const categories = await db.select().from(category);

        const result = await Promise.all(
          categories.map(async (cat) => {
            const products = await db
              .select({
                id: product.id,
                name: product.name,
                slug: product.slug,
                bannerImage: product.bannerImage,
                basePrice: product.basePrice,
                strikethroughPrice: product.strikethroughPrice,
              })
              .from(product)
              .innerJoin(productCategory, eq(product.id, productCategory.productId))
              .where(eq(productCategory.categoryId, cat.id))
              .limit(limit);

            return {
              ...cat,
              products,
            };
          })
        );

        // Only return categories that have at least 1 product
        return result.filter((cat) => cat.products.length > 0);
      } catch (error) {
        console.error("getCategoriesWithProducts failed:", error);
        return [];
      }
    },
    ["categories-with-products", String(limit)],
    { revalidate: 3600, tags: [CACHE_TAGS.categories, CACHE_TAGS.products] }
  )();
}

export async function getAllCategoriesMeta() {
  return unstable_cache(
    async () => {
      try {
        return await db
          .select({
            id: category.id,
            name: category.name,
          })
          .from(category);
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    ["categories-meta"],
    { revalidate: 3600, tags: [CACHE_TAGS.categories] },
  )();
}
