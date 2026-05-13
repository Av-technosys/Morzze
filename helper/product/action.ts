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
  size?: string;
  flow?: string;
  cramps?:string;
  allergies?:string;
  min?: any;
  max?: any;
  stock?: any;
  brand?: any;
}

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

function num(fd: FormData, key: string) {
  const v = Number(fd.get(key));
  return isNaN(v) ? 0 : v;
}

function parseMedia(fd: FormData) {
  return fd.getAll("media").filter((v) => typeof v === "string") as string[];
}

interface VariantInput {
  name: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  price: number;
  strikethroughPrice?: number;
  bannerImage?: string;
  media?: string[];
  isInStock: boolean;
  isReturnable: boolean;
  isCancelable: boolean;
  isReplacement: boolean;
  returnDays: number;
  highlights: string[];
  replacementDays: number;
  attributes: { attribute: string; value: string }[];
  subscriptionPlans?: number[];
}

// export async function createProduct(formData: FormData) {
//   try {
//     // const categoryIds = [
//     //   ...new Set(formData.getAll("category[]").filter(Boolean)),
//     // ] as string[];
//     // const variantsData = str(formData, "variants");
//     // if (!variantsData) throw new Error("No variants provided");
//     // const variants: VariantInput[] = JSON.parse(variantsData);
//     // const productId = await db.transaction(async (tx) => {
//     //   // 1. Create the parent product
//     //   const [createdProduct] = await tx
//     //     .insert(product)
//     //     .values({})
//     //     .returning({ id: product.id });
//     //   const pId = createdProduct.id;
//     //   // 2. Attach categories to the parent product
//     //   if (categoryIds.length) {
//     //     await tx.insert(productCategory).values(
//     //       categoryIds.map((catId) => ({
//     //         productId: pId,
//     //         categoryId: catId,
//     //       })),
//     //     );
//     //   }
//     //   const slugs = await Promise.all(
//     //     variants.map((v) =>
//     //       generateUniqueSlug(tx, v.name, product.slug)
//     //     )
//     //   );
//     //   const variantInsertData = variants.map((v, index) => ({
//     //     productId: pId,
//     //     name: v.name,
//     //     slug: slugs[index],
//     //     sku: v.sku,
//     //     description: v.description,
//     //     shortDescription: v.shortDescription,
//     //     basePrice: v.price,
//     //     strikethroughPrice: v.strikethroughPrice,
//     //     bannerImage: v.bannerImage || null,
//     //     isInStock: v.isInStock,
//     //     isReturnable: v.isReturnable,
//     //     isCancelable: v.isCancelable,
//     //     isReplacement: v.isReplacement,
//     //     returnDays: v.returnDays,
//     //     highlights: v.highlights || [],
//     //     replacementDays: v.replacementDays,
//     //     rating: 0,
//     //     reviewCount: 0,
//     //   }));
//     //   const insertedVariants = await tx
//     //     .insert(product)
//     //     .values(variantInsertData)
//     //     .returning({ id: product.id });
//     //   const allMediaRows: {
//     //     productId: string;
//     //     mediaType: string;
//     //     mediaURL: string;
//     //   }[] = [];
//     //   const allAttributeRows: {
//     //     productId: string;
//     //     attribute: string;
//     //     value: string;
//     //   }[] = [];
//     //   const allSubscriptionRows: {
//     //     productId: string;
//     //     subscriptionPlanId: number;
//     //   }[] = [];
//     //   for (let i = 0; i < variants.length; i++) {
//     //     const variantId = insertedVariants[i].id;
//     //     const v = variants[i];
//     //     // Media
//     //     if (v.media?.length) {
//     //       for (const url of v.media) {
//     //         allMediaRows.push({
//     //           productId: variantId,
//     //           mediaType: "image",
//     //           mediaURL: url,
//     //         });
//     //       }
//     //     }
//     //     // Attributes
//     //     if (v.attributes?.length) {
//     //       for (const attr of v.attributes) {
//     //         allAttributeRows.push({
//     //           productId: variantId,
//     //           attribute: attr.attribute,
//     //           value: attr.value,
//     //         });
//     //       }
//     //     }
//     //     // Subscriptions
//     //     if (v.subscriptionPlans?.length) {
//     //       for (const planId of v.subscriptionPlans) {
//     //         allSubscriptionRows.push({
//     //           productId: variantId,
//     //           subscriptionPlanId: planId
//     //         });
//     //       }
//     //     }
//     //   }
//     //   if (allMediaRows.length) {
//     //     await tx.insert(productMedia).values(allMediaRows);
//     //   }
//     //   if (allAttributeRows.length) {
//     //     await tx.insert(productAttribute).values(allAttributeRows);
//     //   }
//     //   // if (allSubscriptionRows.length) {
//     //   //   await tx.insert(productVariantSubscriptionPlan).values(allSubscriptionRows);
//     //   // }
//     //   return pId;
//     // });
//     // return { id: productId };
//   } catch (error) {
//     console.error("createProduct failed:", error);
//     throw new Error("Unable to create product");
//   }
// }

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
      // 1. Create Product
      const [newProduct] = await tx
        .insert(product)
        .values({
          name: variants.name,
          brand: variants.brand,
          slug: slug,
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

      // 2. Insert Categories
      if (categoryIds.length) {
        await tx.insert(productCategory).values(
          categoryIds.map((catId) => ({
            productId,
            categoryId: catId,
          })),
        );
      }

      // 3. Insert Media
      if (variants.gallery?.length) {
        await tx.insert(productMedia).values(
          variants.gallery.map((url: any) => ({
            productId,
            mediaType: "image",
            mediaURL: url.preview,
          })),
        );
      }

      // 4. Insert Attributes
      if (variants.attributes?.length) {
        await tx.insert(productAttribute).values(
          variants.attributes.map((attr: any) => ({
            productId,
            attribute: attr.attribute,
            value: attr.value,
          })),
        );
      }

      // 5. Insert Filters
      if (variants.filters?.length) {
        await tx.insert(productFilter).values(
          variants.filters.map((fltr: any) => ({
            productId,
            filter: fltr.slug,
          })),
        );
      }

      // 6. Insert Variant Boxes
      if (variants.VarientBoxes?.length) {
        await tx.insert(productVarientBox).values(
          variants.VarientBoxes.map((varient: any) => ({
            productId,
            name: varient.name,
            description: varient.description,
            image: varient.image,
          })),
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
      // 1. Update categories for the parent product
      await tx
        .delete(productCategory)
        .where(eq(productCategory.productId, productId));
      if (categoryIds.length) {
        await tx.insert(productCategory).values(
          categoryIds.map((catId) => ({
            productId,
            categoryId: catId,
          })),
        );
      }

      // Update or Insert variants

      let vId = productId;

      if (vId) {
        // Update existing
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
          .where(eq(product.id, vId));
      }

      // Update Media
      await tx.delete(productMedia).where(eq(productMedia.productId, vId!));
      if (variants.gallery?.length) {
        await tx.insert(productMedia).values(
          variants.gallery.map((url: any) => ({
            productId: vId!,
            mediaType: "image",
            mediaURL: url.preview,
          })),
        );
      }

      // Update Attributes
      await tx
        .delete(productAttribute)
        .where(eq(productAttribute.productId, vId!));
      if (variants.attributes?.length) {
        await tx.insert(productAttribute).values(
          variants.attributes.map((attr: any) => ({
            productId: vId!,
            attribute: attr.attribute,
            value: attr.value,
          })),
        );
      }

      // update Filters
      await tx.delete(productFilter).where(eq(productFilter.productId, vId!));
      if (variants.filters?.length) {
        await tx.insert(productFilter).values(
          variants.filters.map((fltr: any) => ({
            productId: vId!,
            filter: fltr.slug,
          })),
        );
      }

      await tx
        .delete(productVarientBox)
        .where(eq(productVarientBox.productId, vId!));
      if (variants.VarientBoxes?.length) {
        await tx.insert(productVarientBox).values(
          variants.VarientBoxes.map((varient: any) => ({
            productId: vId!,
            name: varient.name,
            description: varient.description,
            image: varient.image,
          })),
        );
      }

      // Update Subscriptions
      // await tx
      //   .delete(productVariantSubscriptionPlan)
      //   .where(eq(productVariantSubscriptionPlan.productId, vId!));
      // if (v.subscriptionPlans?.length) {
      //   await tx.insert(productVariantSubscriptionPlan).values(
      //     v.subscriptionPlans.map((planId) => ({
      //       productId: vId!,
      //       subscriptionPlanId: planId
      //     }))
      //   )
      // }
    });

    revalidatePath("/admin/product");
  } catch (error) {
    console.error("updateProduct failed:", error);
    throw new Error("Unable to update product");
  }
}

export async function getFullProductDetails(identifier: string) {
  try {
    if (!identifier) throw new Error("Missing product identifier");

    // const isThroughId = isUUID(identifier);
    // if (!isThroughId) throw new Error("Invalid product identifier");

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
        and(eq(productCategory.categoryId, categoryId), ne(product.id, v.id)),
      )
      .limit(10);

    return similarVariants;
  } catch (error) {
    console.error("getProductSimilarProducts failed:", error);
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.transaction(async (tx) => {
      const variants = await tx
        .select({ id: product.id })
        .from(product)
        .where(eq(product.id, id));

      for (const v of variants) {
        // await tx
        //   .delete(productSubscriptionPlan)
        //   .where(eq(productSubscriptionPlan.productId, v.id));
        await tx.delete(productMedia).where(eq(productMedia.productId, v.id));
        await tx
          .delete(productAttribute)
          .where(eq(productAttribute.productId, v.id));
      }

      await tx.delete(product).where(eq(product.id, id));
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

export async function getProducts({
  page = 1,
  pageSize = 10,
  search = "",
  category: categorySlug,
  type = "",
  material = "",
  size = "",
  flow = "",
  cramps = "",
  allergies = "",
  min = "",
  max = "",
  stock = "",
  brand="",
}: GetProductsOptions) {
  const filters = [];

  if (search.trim() !== "") {
    filters.push(ilike(product.name, `%${search}%`));
  }

  const offset = (page - 1) * pageSize;

  const filterValues = [type, material, size, flow, cramps, allergies].filter(Boolean);

  if (filterValues.length > 0) {
    filters.push(
      sql`exists (
      select 1 from ${productFilter}
      where ${productFilter.productId} = ${product.id}
      and ${productFilter.filter} in (${sql.join(
        filterValues.map((f) => sql`${f}`),
        sql`,`,
      )})
      group by ${productFilter.productId}
      having count(distinct ${productFilter.filter}) = ${filterValues.length}
    )`,
    );
  }

  if (min && max) {
    filters.push(
      and(
        gte(product.basePrice, Number(min)),
        lte(product.basePrice, Number(max)),
      ),
    );
  } else if (min) {
    filters.push(gte(product.basePrice, Number(min)));
  } else if (max) {
    filters.push(lte(product.basePrice, Number(max)));
  }

  if (stock) {
    filters.push(eq(product.isInStock, true));
  }

  if(brand){
    filters.push(eq(product.brand, brand))
  }

  let categoryId;
  if (categorySlug) {
    [categoryId] = await db
      .select({ id: category.id })
      .from(category)
      .where(eq(category.slug, categorySlug));
    // categoryId?.id &&
    //   filters.push(eq(productCategory.categoryId, categoryId.id));

    if (categoryId?.id) {
      filters.push(
        sql`exists (
      select 1 from ${productCategory}
      where ${productCategory.productId} = ${product.id}
      and ${productCategory.categoryId} = ${categoryId.id}
    )`,
      );
    }
  }
  const whereClause = filters.length ? and(...filters) : undefined;

  const [items, total] = await Promise.all([
    db
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
      // .leftJoin(productCategory, eq(productCategory.productId, product.id))
      .where(whereClause)
      .orderBy(desc(product.createdAt))
      .limit(pageSize)
      .offset(offset),

    db
      .select({ count: sql<number>`count(distinct ${product.id})` })
      .from(product)
      .leftJoin(productCategory, eq(productCategory.productId, product.id))
      .leftJoin(category, eq(category.id, productCategory.categoryId))
      .where(whereClause),
  ]);

  const totalPages = Math.ceil(total[0].count / pageSize);

  return {
    items,
    totalPages,
    page,
  };
}

// export async function getProductSimilarProducts(slug: string | any) {
//   try {
//     const v = await db.query.product.findFirst({
//       where: eq(product.slug, slug),
//     });
//     if (!v || !v.productId) return [];

//     const productWithCategory = await db
//       .select({ categoryId: productCategory.categoryId })
//       .from(productCategory)
//       .where(eq(productCategory.productId, v.productId));

//     if (!productWithCategory.length) return [];

//     const categoryId = productWithCategory[0].categoryId;

//     const similars = await db
//       .select({
//         id: product.id,
//         name: product.name,
//         slug: product.slug,
//         basePrice: product.basePrice,
//         bannerImage: product.bannerImage,
//         rating: product.rating,
//       })
//       .from(product)
//       .innerJoin(
//         productCategory,
//         eq(productCategory.productId, product.productId),
//       )
//       .where(
//         and(
//           eq(productCategory.categoryId, categoryId),
//           ne(product.productId, v.productId),
//         ),
//       )
//       .limit(10);

//     return similars;
//   } catch (error) {
//     console.error("getProductSimilarProducts failed:", error);
//   }
// }

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
  // Deprecated in favor of nested  handling in updateProduct
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

    // fallback
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

export async function getBrandBestSellingProducts(slug:any){
  try {
    const brandProducts = await db.select({
      id: product.id,
      name: product.name,
      price: product.basePrice,
      image: product.bannerImage,
      slug: product.slug,
      brand: product.brand,
      oldPrice: product.strikethroughPrice
    }).from(product).where(eq(product.brand, slug)).limit(4);
    return brandProducts
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBrandNewArrivalProducts(slug:any){
  try {
    const brandProducts = await db.select({
      id: product.id,
      name: product.name,
      price: product.basePrice,
      image: product.bannerImage,
      slug: product.slug,
      brand: product.brand,
      oldPrice: product.strikethroughPrice
    }).from(product).where(eq(product.brand, slug)).orderBy(desc(product.createdAt)).limit(4);
    return brandProducts
  } catch (error) {
    console.error(error);
    return [];
  }
}



export async function getQuizSuggestedProducts(userAnswers:any){
 try {
  const filters:string[] = userAnswers.map((a: any) => a.answer);

  // Step 1: find matching filters
  const matchedFilters = await db
    .select({ productId: productFilter.productId })
    .from(productFilter)
    .where(inArray(productFilter.filter, filters));

  // Step 2: unique productIds
  const productIds:any = [
    ...new Set(matchedFilters.map((f) => f.productId)),
  ];

  if (productIds.length === 0) return [];

  // Step 3: fetch products
  const products = await db
    .select()
    .from(product)
    .where(inArray(product.id, productIds));

  return products;
} catch (error) {
  console.log(error);
  return [];
}
}

// export async function getBrandBestSellingProducts(slug:any){
//   try {
//     const brandProducts = await db.select({
//       id: product.id,
//       name: product.name,
//       price: product.basePrice,
//       image: product.bannerImage,
//       slug: product.slug,
//       brand: product.brand,
//       oldPrice: product.strikethroughPrice
//     }).from(product).where(eq(product.brand, slug)).limit(4);
//     return brandProducts
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// export async function getBrandNewArrivalProducts(slug:any){
//   try {
//     const brandProducts = await db.select({
//       id: product.id,
//       name: product.name,
//       price: product.basePrice,
//       image: product.bannerImage,
//       slug: product.slug,
//       brand: product.brand,
//       oldPrice: product.strikethroughPrice
//     }).from(product).where(eq(product.brand, slug)).orderBy(desc(product.createdAt)).limit(4);
//     return brandProducts
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }



// export async function getQuizSuggestedProducts(userAnswers:any){
//  try {
//   const filters:string[] = userAnswers.map((a: any) => a.answer);

//   // Step 1: find matching filters
//   const matchedFilters = await db
//     .select({ productId: productFilter.productId })
//     .from(productFilter)
//     .where(inArray(productFilter.filter, filters));

//   // Step 2: unique productIds
//   const productIds:any = [
//     ...new Set(matchedFilters.map((f) => f.productId)),
//   ];

//   if (productIds.length === 0) return [];

//   // Step 3: fetch products
//   const products = await db
//     .select()
//     .from(product)
//     .where(inArray(product.id, productIds));

//   return products;
// } catch (error) {
//   console.log(error);
//   return [];
// }
// }
