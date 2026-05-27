"use server";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getStores() {
  try {
    const data = await db
      .select()
      .from(stores)
      .orderBy(desc(stores.createdAt));
    return data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}

export async function getActiveStores() {
  try {
    return await db
      .select()
      .from(stores)
      .where(eq(stores.isActive, true))
      .orderBy(desc(stores.isFeatured), desc(stores.createdAt));
  } catch (error) {
    console.error("Error fetching active stores:", error);
    return [];
  }
}

export async function getStoreById(id: string) {
  try {
    const data = await db.select().from(stores).where(eq(stores.id, id));
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching store:", error);
    return null;
  }
}

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createStore(formData: FormData) {
  try {
    const storeName = (formData.get("storeName") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim() || slugFromName(storeName || "");
    const storeType = (formData.get("storeType") as string)?.trim();
    const state = (formData.get("state") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const latitude = (formData.get("latitude") as string)?.trim();
    const longitude = (formData.get("longitude") as string)?.trim();
    const address = (formData.get("address") as string)?.trim();
    const contactNumber = (formData.get("contactNumber") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const workingHours = (formData.get("workingHours") as string)?.trim();
    const featuresRaw = (formData.get("features") as string)?.trim();
    const badgeBgColor = (formData.get("badgeBgColor") as string)?.trim() || null;
    const badgeTextColor = (formData.get("badgeTextColor") as string)?.trim() || null;
    const mapEmbedUrl = (formData.get("mapEmbedUrl") as string)?.trim() || null;
    const isFeatured = formData.get("isFeatured") === "on";
    const isActive = formData.get("isActive") === "on";

    if (
      !storeName ||
      !storeType ||
      !state ||
      !city ||
      !latitude ||
      !longitude ||
      !address ||
      !contactNumber ||
      !email ||
      !workingHours
    ) {
      return { success: false, message: "Missing required fields" };
    }

    const features = featuresRaw
      ? featuresRaw.split(",").map((f) => f.trim()).filter(Boolean)
      : [];

    await db.insert(stores).values({
      storeName,
      slug,
      storeType,
      state,
      city,
      latitude,
      longitude,
      address,
      contactNumber,
      email,
      workingHours,
      features,
      badgeBgColor,
      badgeTextColor,
      mapEmbedUrl,
      isFeatured,
      isActive,
    });

    revalidatePath("/admin/stores");
    revalidatePath("/stores");

    return { success: true, message: "Store added successfully" };
  } catch (error) {
    console.error("Error creating store:", error);
    return { success: false, message: "Failed to create store" };
  }
}

export async function updateStore(id: string, formData: FormData) {
  try {
    const storeName = (formData.get("storeName") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim();
    const storeType = (formData.get("storeType") as string)?.trim();
    const state = (formData.get("state") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const latitude = (formData.get("latitude") as string)?.trim();
    const longitude = (formData.get("longitude") as string)?.trim();
    const address = (formData.get("address") as string)?.trim();
    const contactNumber = (formData.get("contactNumber") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const workingHours = (formData.get("workingHours") as string)?.trim();
    const featuresRaw = (formData.get("features") as string)?.trim();
    const badgeBgColor = (formData.get("badgeBgColor") as string)?.trim() || null;
    const badgeTextColor = (formData.get("badgeTextColor") as string)?.trim() || null;
    const mapEmbedUrl = (formData.get("mapEmbedUrl") as string)?.trim() || null;
    const isFeatured = formData.get("isFeatured") === "on";
    const isActive = formData.get("isActive") === "on";

    if (
      !storeName ||
      !slug ||
      !storeType ||
      !state ||
      !city ||
      !latitude ||
      !longitude ||
      !address ||
      !contactNumber ||
      !email ||
      !workingHours
    ) {
      return { success: false, message: "Missing required fields" };
    }

    const features = featuresRaw
      ? featuresRaw.split(",").map((f) => f.trim()).filter(Boolean)
      : [];

    await db
      .update(stores)
      .set({
        storeName,
        slug,
        storeType,
        state,
        city,
        latitude,
        longitude,
        address,
        contactNumber,
        email,
        workingHours,
        features,
        badgeBgColor,
        badgeTextColor,
        mapEmbedUrl,
        isFeatured,
        isActive,
        updatedAt: new Date(),
      })
      .where(eq(stores.id, id));

    revalidatePath("/admin/stores");
    revalidatePath("/stores");

    return { success: true, message: "Store updated successfully" };
  } catch (error) {
    console.error("Error updating store:", error);
    return { success: false, message: "Failed to update store" };
  }
}

export async function deleteStore(id: string) {
  try {
    await db.delete(stores).where(eq(stores.id, id));

    revalidatePath("/admin/stores");
    revalidatePath("/stores");

    return { success: true, message: "Store deleted successfully" };
  } catch (error) {
    console.error("Error deleting store:", error);
    return { success: false, message: "Failed to delete store" };
  }
}
