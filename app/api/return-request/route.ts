import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const reason = formData.get("reason") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!reason || !description) {
      return NextResponse.json(
        { success: false, message: "Reason and description are required" },
        { status: 400 }
      );
    }

    let attachments = [];

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "File size should be under 5MB" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "New Return Request",
      html: `
        <h2>New Return Request</h2>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Return request submitted successfully",
    });
  } catch (error) {
    console.error("Return request error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit return request" },
      { status: 500 }
    );
  }
}