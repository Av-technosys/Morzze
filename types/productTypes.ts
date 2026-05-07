import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users, address, product, productAttribute, productMedia, productVarientBox } from "@/db/schema";
import { z } from "zod";


export const insertProductSechma = createInsertSchema(product, {
    name: z.string("Name is required").min(3),
    description: z.string("Description is required").min(10),
    basePrice: z.number("Base price is required").min(0),
    strikethroughPrice: z.number("Strikethrough price is required").min(0),
    sku: z.string("SKU is required").min(3),
});
export const insertProductAttributeSchema = createInsertSchema(productAttribute);
export const insertProductMediaSchema = createInsertSchema(productMedia);
export const insertProductVarientSchema = createInsertSchema(productVarientBox);



export type productType = z.infer<typeof insertProductSechma>;
export type productAttributeType = z.infer<typeof insertProductAttributeSchema>;
export type productMediaType = z.infer<typeof insertProductMediaSchema>;
export type productVarientType = z.infer<typeof insertProductVarientSchema>;