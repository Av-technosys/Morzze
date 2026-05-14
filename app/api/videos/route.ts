import { db } from "@/db";
import { videos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allVideos = await db
      .select()
      .from(videos)
      .orderBy(desc(videos.createdAt))

    return NextResponse.json(
      {
        success: true,
        data: allVideos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET VIDEOS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch videos",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      link,
      thumbnail,
      videoDescription,
      videoCategory,
      isVisible,
    } = body;

    if (!title || !link) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and video link are required",
        },
        { status: 400 }
      );
    }

    const newVideo = await db
      .insert(videos)
      .values({
        title,
        link,
        thumbnail,
        videoDescription,
        videoCategory,
        isVisible: isVisible ?? true,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Video created successfully",
        data: newVideo[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE VIDEO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create video",
      },
      { status: 500 }
    );
  }
}