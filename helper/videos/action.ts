"use server";

import { db } from "@/db";
import { videos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getVideos() {
  try {
    const data = await db.select().from(videos);
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function getVideoById(id: string) {
  try {
    const data = await db
      .select()
      .from(videos)
      .where(eq(videos.id, id));

    return data[0] || null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

export async function createVideo(formData: FormData) {
  try {
    const link = formData.get("link") as string;
    const title = formData.get("title") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const videoDescription = formData.get("videoDescription") as string;
    const videoCategory = formData.get("videoCategory") as string;

    await db.insert(videos).values({
      link,
      title,
      thumbnail,
      videoDescription,
      videoCategory,
      isVisible: true,
    });

    return {
      success: true,
      message: "Video created successfully",
    };
  } catch (error) {
    console.error("Error creating video:", error);

    return {
      success: false,
      message: "Failed to create video",
    };
  }
}

export async function updateVideo(id: string, formData: FormData) {
  try {
    const link = formData.get("link") as string;
    const title = formData.get("title") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const videoDescription = formData.get("videoDescription") as string;
    const videoCategory = formData.get("videoCategory") as string;
    const isVisible = formData.get("isVisible") === "on";

    await db
      .update(videos)
      .set({
        link,
        title,
        thumbnail,
        videoDescription,
        videoCategory,
        isVisible,
      })
      .where(eq(videos.id, id));

    return {
      success: true,
      message: "Video updated successfully",
    };
  } catch (error) {
    console.error("Error updating video:", error);

    return {
      success: false,
      message: "Failed to update video",
    };
  }
}

export async function deleteVideo(id: string) {
  try {
    await db.delete(videos).where(eq(videos.id, id));

    return {
      success: true,
  
    };
  } catch (error) {
    console.error("Error deleting video:", error);

    return {
      success: false,
      message: "Failed to delete video",
    };
  }
}