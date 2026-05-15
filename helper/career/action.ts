"use server";

import { db } from "@/db";
import { careerEnquiries } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getCareerApplications() {
  try {
    const applications = await db
      .select()
      .from(careerEnquiries)
      .orderBy(desc(careerEnquiries.createdAt));

    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    console.error("Get career applications error:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch applications",
    };
  }
}