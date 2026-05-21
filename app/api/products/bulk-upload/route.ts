import { NextResponse } from "next/server";
import Papa from "papaparse";

import { db } from "@/db";
import {
    product,
    productAttribute,
    productCategory,
    productFilter,
    productMedia,
    productVarientBox,
} from "@/db/schema";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({
                success: false,
                message: "CSV file is required",
            });
        }

        const text = await file.text();

        const parsed = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
        });

        const rows = parsed.data as any[];

        let successCount = 0;
        let failedRows: any[] = [];

        for (const row of rows) {
            try {
                // ================= PRODUCT =================

                const insertedProduct = await db
                    .insert(product)
                    .values({
                        sku: row.sku,
                        slug: row.slug,

                        name: row.name,
                        description: row.description,

                        basePrice: row.basePrice
                        ? Number(row.basePrice)
                        : null,

                        strikethroughPrice: row.strikethroughPrice
                        ? Number(row.strikethroughPrice)
                        : null,

                        minBoxQuintity: row.minBoxQuintity
                        ? Number(row.minBoxQuintity)
                        : null,

                        bannerImage: row.bannerImage,

                        highlights: row.highlights
                            ? row.highlights.split("|")
                            : [],

                        brand: row.brand || "ovy",

                        hasVarientBox:
                            row.hasVarientBox === "true",

                        

                        custimizeBoxInfo:
                            row.custimizeBoxInfo,

                        isInStock:
                            row.isInStock === "true",

                        rateing5Star: Number(
                            row.rateing5Star || 0
                        ),

                        rateing4Star: Number(
                            row.rateing4Star || 0
                        ),

                        rateing3Star: Number(
                            row.rateing3Star || 0
                        ),

                        rateing2Star: Number(
                            row.rateing2Star || 0
                        ),

                        rateing1Star: Number(
                            row.rateing1Star || 0
                        ),

                        size: row.size,

                        flowType: row.flowType,
                    })
                    .returning();

                const productId = insertedProduct[0].id;

                // ================= PRODUCT MEDIA =================

                if (row.mediaURLs) {
                    const mediaArray =
                        row.mediaURLs.split("|");

                    for (const media of mediaArray) {
                        await db.insert(productMedia).values({
                            productId,
                            mediaType: "image",
                            mediaURL: media,
                        });
                    }
                }

                // ================= PRODUCT FILTER =================

                if (row.filters) {
                    const filters =
                        row.filters.split("|");

                    for (const filter of filters) {
                        await db.insert(productFilter).values({
                            productId,
                            filter,
                        });
                    }
                }

                // ================= PRODUCT ATTRIBUTE =================

                /*
                  CSV FORMAT:
                  color:red|weight:1kg|flavour:chocolate
                */

                if (row.attributes) {
                    const attributes =
                        row.attributes.split("|");

                    for (const item of attributes) {
                        const [attribute, ...rest] = item.split(":");
                        const value = rest.join(":").trim();

                        await db
                            .insert(productAttribute)
                            .values({
                                productId,
                                attribute,
                                value,
                            });
                    }
                }

                // ================= PRODUCT VARIANT BOX =================

                /*
                  CSV FORMAT:
                  Small Box:Description:https://img.jpg
                */

                if (row.variantBoxes) {
                    const variantBoxes =
                        row.variantBoxes.split("|");

                    for (const box of variantBoxes) {
                        const [name, description, image] =
                            box.split(":");

                        await db
                            .insert(productVarientBox)
                            .values({
                                productId,
                                name,
                                description,
                                image,
                            });
                    }
                }

                // ================= PRODUCT CATEGORY =================

                /*
                  CSV FORMAT:
                  categoryId1|categoryId2
                */

                if (row.categoryIds) {
                    const categories =
                        row.categoryIds.split("|");

                    for (const categoryId of categories) {
                        await db
                            .insert(productCategory)
                            .values({
                                productId,
                                categoryId,
                            });
                    }
                }

                successCount++;
            } catch (error: any) {
                console.error("FULL ERROR:", error);

                failedRows.push({
                    sku: row.sku,
                    error:
                        error?.cause?.message ||
                        error?.message ||
                        JSON.stringify(error),
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: "Bulk upload completed",

            total: rows.length,

            successCount,

            failedCount: failedRows.length,

            failedRows,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}