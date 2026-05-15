"use server";

import { db } from "@/db";
import { careerEnquiries } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getApplications() {
  try {
    const data = await db
      .select()
      .from(careerEnquiries)
      .orderBy(desc(careerEnquiries.createdAt));

    return data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function getApplicationById(id: string) {
  try {
    const data = await db
      .select()
      .from(careerEnquiries)
      .where(eq(careerEnquiries.id, id));

    return data[0] || null;
  } catch (error) {
    console.error("Error fetching application:", error);
    return null;
  }
}

export async function deleteApplication(id: string) {
  try {
    await db.delete(careerEnquiries).where(eq(careerEnquiries.id, id));

    return {
      success: true,
      message: "Application deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting application:", error);

    return {
      success: false,
      message: "Failed to delete application",
    };
  }
}