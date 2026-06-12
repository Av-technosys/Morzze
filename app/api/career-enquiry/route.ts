import { NextResponse } from "next/server";
import { db } from "@/db";
import { careerEnquiries } from "@/db/schema";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { renderTemplate, sendEmail, sendEmailWithAttachments } from "@/lib/email";
import { getCurrentUser } from "@/helper/user/action";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const mobileNumber = formData.get("mobileNumber") as string;
    const resume = formData.get("resume") as File;

    if (
      !name ||
      !email ||
      !subject ||
      !description ||
      !mobileNumber ||
      !resume
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (resume.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, message: "Resume must be a PDF file" },
        { status: 400 }
      );
    }

    if (
      !process.env.AWS_REGION ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_BUCKET
    ) {
      return NextResponse.json(
        { success: false, message: "AWS env variables are missing" },
        { status: 500 }
      );
    }

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `career-resumes/${Date.now()}-${resume.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        Body: buffer,
        ContentType: "application/pdf",
      })
    );

    const resumeUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    await db.insert(careerEnquiries).values({
      name,
      email,
      subject,
      description,
      mobileNumber,
      resumeUrl,
    });

    const loggedInUser = await getCurrentUser();
    const receiverEmail = loggedInUser?.email!;

    try {
      await sendEmailWithAttachments({
        to: receiverEmail,
        subject: `New Career Enquiry - ${subject}`,
        html: renderTemplate(
          `
        <h2>New General Application Enquiry</h2>
        <p><b>Name:</b> {{Name}}</p>
        <p><b>Email:</b> {{Email}}</p>
        <p><b>Mobile Number:</b> {{Mobile Number}}</p>
        <p><b>Subject:</b> {{Subject}}</p>
        <p><b>Description:</b> {{Description}}</p>
        <p>
          <b>Resume:</b>
          <a href="{{Resume URL}}" target="_blank">
            Open Resume
          </a>
        </p>
      `,
          {
            Name: name,
            Email: email,
            "Mobile Number": mobileNumber,
            Subject: subject,
            Description: description,
            "Resume URL": resumeUrl,
          },
        ),
        attachments: [
          {
            filename: resume.name,
            content: buffer,
            contentType: "application/pdf",
          },
        ],
      });
    } catch (emailError) {
      console.error("Unable to send career enquiry admin email:", emailError);
    }

    try {
      await sendEmail({
        to: email,
        subject: "Application Received",
        html: renderTemplate(
          `
        <h2>Hello {{Name}},</h2>
        <p>Thank you for submitting your application.</p>
        <p>
          We have received your details successfully.
          Our team will contact you if your profile matches our requirements.
        </p>

        <br />

        <p>Regards,</p>
        <p>HR Team</p>
      `,
          {
            Name: name,
          },
        ),
      });
    } catch (emailError) {
      console.error("Unable to send career enquiry confirmation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Career enquiry error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
