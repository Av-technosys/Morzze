import { NextResponse } from "next/server";
import { renderTemplate, sendEmail, sendEmailWithAttachments } from "@/lib/email";
import { getCurrentUser } from "@/helper/user/action";

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

    const attachments = [];

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

    const loggedInUser = await getCurrentUser();
    const emailPayload = {
      to: loggedInUser?.email!,
      subject: "New Return Request",
      html: renderTemplate(
        `
        <h2>New Return Request</h2>
        <p><strong>Reason:</strong> {{Reason}}</p>
        <p><strong>Description:</strong></p>
        <p>{{Description}}</p>
      `,
        {
          Reason: reason,
          Description: description,
        },
      ),
    };

    if (attachments.length > 0) {
      await sendEmailWithAttachments({ ...emailPayload, attachments });
    } else {
      await sendEmail(emailPayload);
    }

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
