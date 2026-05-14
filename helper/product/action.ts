/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { and, desc, eq, gte, ilike, inArray, lte, ne, sql } from "drizzle-orm";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";

import {
  category,
  product,
  productCategory,
  productAttribute,
  productMedia,
  productVarientBox,
  productFilter,
} from "@/db/schema";

import { bestSellingSlug, isUUID } from "@/const/globalconst";

interface GetProductsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  type?: string;
  material?: string;
  finish?: string;
  size?: string;
  flow?: string;
  cramps?: string;
  allergies?: string;
  min?: any;
  max?: any;
  stock?: any;
  brand?: any;
}

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

export async function createProduct(formData: FormData): Promise<void> {
  try {
    const categoryIds = [
      ...new Set(formData.getAll("category[]").filter(Boolean)),
    ] as string[];

    const variantsData = str(formData, "variants");
    if (!variantsData) throw new Error("No variants provided");

    const variants: any = JSON.parse(variantsData);

    await db.transaction(async (tx) => {
      const slug = await generateUniqueSlug(tx, variants.name, product.slug);

      const [newProduct] = await tx
        .insert(product)
        .values({
          name: variants.name,
          brand: variants.brand,
          slug,
          sku: variants.sku,
          description: variants.description,
          basePrice: variants.price,
          strikethroughPrice: variants.strikethroughPrice,
          bannerImage: variants.bannerImage || null,
          isInStock: variants.isInStock,
          hasVarientBox: variants.hasVarientBox,
          highlights: variants.highlights || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({ id: product.id });

      const productId = newProduct.id;

      if (categoryIds.length) {
        await tx.insert(productCategory).values(
          categoryIds.map((catId) => ({
            productId,
            categoryId: catId,
          }))
        );
      }

      if (variants.media?.length) {
        await tx.insert(productMedia).values(
          variants.media.map((url: string) => ({
            productId,
            mediaType: "image",
            mediaURL: url,
          }))
        );
      }

      if (variants.attributes?.length) {
        await tx.insert(productAttribute).values(
          variants.attributes.map((attr: any) => ({
            productId,
            attribute: attr.attribute,
            value: attr.value,
          }))
        );
      }

      if (variants.filters?.length) {
        await tx.insert(productFilter).values(
          variants.filters.map((fltr: any) => ({
            productId,
            filter: fltr.slug,
          }))
        );
      }

      if (variants.VarientBoxes?.length) {
        await tx.insert(productVarientBox).values(
          variants.VarientBoxes.map((varient: any) => ({
            productId,
            name: varient.name,
            description: varient.description,
            image: varient.image,
          }))
        );
      }
    });

    revalidatePath("/admin/product");
  } catch (error) {
    console.error("createProduct failed:", error);
    throw new Error("Unable to create product");
  }
}

export async function updateProduct(formData: FormData): Promise<void> {
  try {
    const productId = formData.get("id") as string;
    if (!productId) throw new Error("Product ID missing");

    const categoryIds = [
      ...new Set(formData.getAll("category[]").filter(Boolean)),
    ] as string[];

    const variantsData = str(formData, "variants");
    if (!variantsData) throw new Error("No variants provided");

    const variants: any = JSON.parse(variantsData);

    await db.transaction(async (tx) => {
      await tx
        .delete(productCategory)
        .where(eq(productCategory.productId, productId));

      if (categoryIds.length) {
        await tx.insert(productCategory).values(
          categoryIds.map((catId) => ({
            productId,
            categoryId: catId,
          }))
        );
      }

      await tx
        .update(product)
        .set({
          name: variants.name,
          brand: variants.brand,
          sku: variants.sku,
          description: variants.description,
          basePrice: variants.price,
          strikethroughPrice: variants.strikethroughPrice,
          bannerImage: variants.bannerImage || null,
          isInStock: variants.isInStock,
          hasVarientBox: variants.hasVarientBox,
          highlights: variants.highlights || [],
          updatedAt: new Date(),
        })
        .where(eq(product.id, productId));

      await tx.delete(productMedia).where(eq(productMedia.productId, productId));

      if (variants.gallery?.length) {
        await tx.insert(productMedia).values(
          variants.gallery.map((url: any) => ({
            productId,
            mediaType: "image",
            mediaURL: url.preview,
          }))
        );
      }

      await tx
        .delete(productAttribute)
        .where(eq(productAttribute.productId, productId));

      if (variants.attributes?.length) {
        await tx.insert(productAttribute).values(
          variants.attributes.map((attr: any) => ({
            productId,
            attribute: attr.attribute,
            value: attr.value,
          }))
        );
      }

      await tx
        .delete(productFilter)
        .where(eq(productFilter.productId, productId));

      if (variants.filters?.length) {
        const uniqueFilters = Array.from(
          new Set(
            variants.filters
              .map((fltr: any) => fltr.slug)
              .filter(Boolean)
          )
        ) as string[];

        if (uniqueFilters.length) {
          await tx.insert(productFilter).values(
            uniqueFilters.map((slug: string) => ({
              productId,
              filter: slug,
            }))
          );
        }
      }

      await tx
        .delete(productVarientBox)
        .where(eq(productVarientBox.productId, productId));

      if (variants.VarientBoxes?.length) {
        await tx.insert(productVarientBox).values(
          variants.VarientBoxes.map((varient: any) => ({
            productId,
            name: varient.name,
            description: varient.description,
            image: varient.image,
          }))
        );
      }
    });

    revalidatePath("/admin/product");
  } catch (error) {
    console.error("updateProduct failed:", error);
    throw new Error("Unable to update product");
  }
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  search = "",
  category: categorySlug,
  type = "",
  material = "",
  finish = "",
  size = "",
  flow = "",
  cramps = "",
  allergies = "",
  min = "",
  max = "",
  stock = "",
  brand = "",
}: GetProductsOptions) {
  const filters = [];

  if (search.trim() !== "") {
    filters.push(ilike(product.name, `%${search}%`));
  }

  const offset = (page - 1) * pageSize;

  const filterValues = [
    type,
    material,
    finish,
    size,
    flow,
    cramps,
    allergies,
  ].filter(Boolean);

  if (filterValues.length > 0) {
    filters.push(
      sql`exists (
        select 1 from ${productFilter}
        where ${productFilter.productId} = ${product.id}
        and ${productFilter.filter} in (${sql.join(
          filterValues.map((f) => sql`${f}`),
          sql`,`
        )})
        group by ${productFilter.productId}
        having count(distinct ${productFilter.filter}) = ${filterValues.length}
      )`
    );
  }

  if (min && max) {
    filters.push(
      and(
        gte(product.basePrice, Number(min)),
        lte(product.basePrice, Number(max))
      )
    );
  } else if (min) {
    filters.push(gte(product.basePrice, Number(min)));
  } else if (max) {
    filters.push(lte(product.basePrice, Number(max)));
  }

  if (stock === "true") {
    filters.push(eq(product.isInStock, true));
  }

  if (brand) {
    filters.push(eq(product.brand, brand));
  }

  if (categorySlug) {
    const [categoryData] = await db
      .select({ id: category.id })
      .from(category)
      .where(eq(category.slug, categorySlug));

    if (categoryData?.id) {
      filters.push(
        sql`exists (
          select 1 from ${productCategory}
          where ${productCategory.productId} = ${product.id}
          and ${productCategory.categoryId} = ${categoryData.id}
        )`
      );
    }
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  const items = await db
    .select({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      description: product.description,
      isInStock: product.isInStock,
      hasVarientBox: product.hasVarientBox,
      basePrice: product.basePrice,
      strikethroughPrice: product.strikethroughPrice,
      bannerImage: product.bannerImage,
      createdAt: product.createdAt,
    })
    .from(product)
    .where(whereClause)
    .orderBy(desc(product.createdAt))
    .limit(pageSize)
    .offset(offset);

  const total = await db
    .select({
      count: sql<number>`count(distinct ${product.id})`,
    })
    .from(product)
    .where(whereClause);

  const totalItems = Number(total[0]?.count || 0);
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    items,
    totalItems,
    totalPages,
    page,
  };
}

export async function getFullProductDetails(identifier: string) {
  try {
    if (!identifier) throw new Error("Missing product identifier");

    const [productDeails] = await db
      .select()
      .from(product)
      .where(eq(product.slug, identifier))
      .limit(1);

    if (!productDeails) throw new Error("Product not found");

    const [
      prodcutVarientBoxRes,
      categoryRes,
      productAttributeRes,
      productMediaRes,
      filters,
    ] = await Promise.all([
      db
        .select()
        .from(productVarientBox)
        .where(eq(productVarientBox.productId, productDeails.id)),
      db
        .select()
        .from(category)
        .leftJoin(productCategory, eq(category.id, productCategory.categoryId))
        .where(eq(productCategory.productId, productDeails.id)),
      db
        .select()
        .from(productAttribute)
        .where(eq(productAttribute.productId, productDeails.id)),
      db
        .select()
        .from(productMedia)
        .where(eq(productMedia.productId, productDeails.id)),
      db
        .select()
        .from(productFilter)
        .where(eq(productFilter.productId, productDeails.id)),
    ]);

    return {
      ...productDeails,
      prodcutVarientBoxRes,
      categoryRes,
      productAttributeRes,
      productMediaRes,
      filters,
    };
  } catch (error) {
    console.error("getFullProduct failed:", error);
    throw new Error("Unable to fetch product");
  }
}

export async function getFullProduct(identifier: string) {
  try {
    if (!identifier) throw new Error("Missing product identifier");

    const isThroughId = isUUID(identifier);
    if (!isThroughId) throw new Error("Invalid product identifier");

    const [productDeails] = await db
      .select()
      .from(product)
      .where(eq(product.id, identifier))
      .limit(1);

    if (!productDeails) throw new Error("Product not found");

    const [
      prodcutVarientBoxRes,
      categoryRes,
      productAttributeRes,
      productMediaRes,
      filters,
    ] = await Promise.all([
      db
        .select()
        .from(productVarientBox)
        .where(eq(productVarientBox.productId, productDeails.id)),
      db
        .select()
        .from(category)
        .leftJoin(productCategory, eq(category.id, productCategory.categoryId))
        .where(eq(productCategory.productId, productDeails.id)),
      db
        .select()
        .from(productAttribute)
        .where(eq(productAttribute.productId, productDeails.id)),
      db
        .select()
        .from(productMedia)
        .where(eq(productMedia.productId, productDeails.id)),
      db
        .select()
        .from(productFilter)
        .where(eq(productFilter.productId, identifier)),
    ]);

    return {
      ...productDeails,
      prodcutVarientBoxRes,
      categoryRes,
      productAttributeRes,
      productMediaRes,
      filters,
    };
  } catch (error) {
    console.error("getFullProduct failed:", error);
    throw new Error("Unable to fetch product");
  }
}

export async function getCategoryName(categoryId: any) {
  try {
    const categoryName = await db
      .select({ name: category.name })
      .from(category)
      .where(eq(category.id, categoryId))
      .limit(1);

    return categoryName[0].name;
  } catch (error) {
    console.error("getCategoryName failed:", error);
    throw new Error("Unable to fetch category name");
  }
}

export async function getProductSimilarProducts(slug: string | any) {
  try {
    const [v] = await db
      .select()
      .from(product)
      .where(eq(product.slug, slug))
      .limit(1);

    if (!v || !v.id) return [];

    const productWithCategory = await db
      .select({ categoryId: productCategory.categoryId })
      .from(productCategory)
      .where(eq(productCategory.productId, v.id));

    if (!productWithCategory.length) return [];

    const categoryId = productWithCategory[0].categoryId;

    const similarVariants = await db
      .select({
        id: product.id,
        name: product.name,
        slug: product.slug,
        basePrice: product.basePrice,
        bannerImage: product.bannerImage,
        rateing1Star: product.rateing1Star,
        rateing2Star: product.rateing2Star,
        rateing3Star: product.rateing3Star,
        rateing4Star: product.rateing4Star,
        rateing5Star: product.rateing5Star,
        hasVarientBox: product.hasVarientBox,
        strikethroughPrice: product.strikethroughPrice,
        category: category.name,
      })
      .from(product)
      .innerJoin(productCategory, eq(productCategory.productId, product.id))
      .innerJoin(category, eq(category.id, productCategory.categoryId))
      .where(
        and(eq(productCategory.categoryId, categoryId), ne(product.id, v.id))
      )
      .limit(10);

    return similarVariants;
  } catch (error) {
    console.error("getProductSimilarProducts failed:", error);
    return [];
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(productMedia).where(eq(productMedia.productId, id));
      await tx
        .delete(productAttribute)
        .where(eq(productAttribute.productId, id));
      await tx.delete(productFilter).where(eq(productFilter.productId, id));
      await tx
        .delete(productVarientBox)
        .where(eq(productVarientBox.productId, id));
      await tx.delete(productCategory).where(eq(productCategory.productId, id));
      await tx.delete(product).where(eq(product.id, id));
    });

    revalidatePath("/admin/product");

    return {
      success: true,
      message: "Product and all variants deleted successfully",
    };
  } catch (error: any) {
    console.error("delete product failed:", error);
    throw new Error("Failed to delete product");
  }
}

export async function getProductsForCart(productIds: string[]) {
  try {
    if (!productIds || !productIds.length) return [];

    const safeIds = productIds.filter(Boolean);
    if (!safeIds.length) return [];

    const products = await db
      .select()
      .from(product)
      .where(inArray(product.id, safeIds));

    if (!products.length) return [];

    const media = await db
      .select()
      .from(productMedia)
      .where(inArray(productMedia.productId, safeIds));

    const mediaMap = new Map<string, typeof media>();

    for (const m of media) {
      if (!m.productId) continue;
      if (!mediaMap.has(m.productId)) mediaMap.set(m.productId, []);
      mediaMap.get(m.productId)!.push(m);
    }

    return products.map((p) => ({
      ...p,
      media: mediaMap.get(p.id) ?? [],
    }));
  } catch (error) {
    console.error("getProductsForCart failed:", error);
    return [];
  }
}

export async function saveProductAttributes(productId: string, payload: any) {
  return { success: true };
}

export async function getProductsCount() {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(product);

    return result[0].count || 0;
  } catch (error) {
    console.error("getProductsCount failed:", error);
    return 0;
  }
}

export async function getBestSellingProducts() {
  try {
    const products = await db
      .select({
        id: product.id,
        name: product.name,
        price: product.basePrice,
        oldPrice: product.strikethroughPrice,
        image: product.bannerImage,
        slug: product.slug,
      })
      .from(product)
      .innerJoin(productCategory, eq(productCategory.productId, product.id))
      .innerJoin(category, eq(category.id, productCategory.categoryId))
      .where(eq(category.slug, bestSellingSlug))
      .limit(4);

    if (products.length === 0) {
      return await db
        .select({
          id: product.id,
          name: product.name,
          price: product.basePrice,
          oldPrice: product.strikethroughPrice,
          image: product.bannerImage,
          slug: product.slug,
        })
        .from(product)
        .limit(4);
    }

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBrandBestSellingProducts(slug: any) {
  try {
    return await db
      .select({
        id: product.id,
        name: product.name,
        price: product.basePrice,
        image: product.bannerImage,
        slug: product.slug,
        brand: product.brand,
        oldPrice: product.strikethroughPrice,
      })
      .from(product)
      .where(eq(product.brand, slug))
      .limit(4);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBrandNewArrivalProducts(slug: any) {
  try {
    return await db
      .select({
        id: product.id,
        name: product.name,
        price: product.basePrice,
        image: product.bannerImage,
        slug: product.slug,
        brand: product.brand,
        oldPrice: product.strikethroughPrice,
      })
      .from(product)
      .where(eq(product.brand, slug))
      .orderBy(desc(product.createdAt))
      .limit(4);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getQuizSuggestedProducts(userAnswers: any) {
  try {
    const filters: string[] = userAnswers.map((a: any) => a.answer);

    const matchedFilters = await db
      .select({ productId: productFilter.productId })
      .from(productFilter)
      .where(inArray(productFilter.filter, filters));

    const productIds: any = [
      ...new Set(matchedFilters.map((f) => f.productId)),
    ];

    if (productIds.length === 0) return [];

    return await db.select().from(product).where(inArray(product.id, productIds));
  } catch (error) {
    console.log(error);
    return [];
  }
}