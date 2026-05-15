import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/db";
import { careerEnquiries } from "@/db/schema";

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
      !process.env.CAREER_EMAIL_USER ||
      !process.env.CAREER_EMAIL_PASS ||
      !process.env.CAREER_RECEIVER_EMAIL
    ) {
      return NextResponse.json(
        { success: false, message: "Career email env variables are missing" },
        { status: 500 }
      );
    }

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await db.insert(careerEnquiries).values({
      name,
      email,
      subject,
      description,
      mobileNumber,
      resumeUrl: resume.name,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CAREER_EMAIL_USER,
        pass: process.env.CAREER_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.CAREER_EMAIL_USER,
      to: process.env.CAREER_RECEIVER_EMAIL,
      subject: `New Career Enquiry - ${subject}`,
      html: `
        <h2>New General Application Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile Number:</b> ${mobileNumber}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Description:</b> ${description}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
          contentType: "application/pdf",
        },
      ],
    });

    await transporter.sendMail({
      from: process.env.CAREER_EMAIL_USER,
      to: email,
      subject: "Application Received",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for submitting your application.</p>
        <p>We have received your details successfully. Our team will contact you if your profile matches our requirements.</p>
        <br />
        <p>Regards,</p>
        <p>HR Team</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Career enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}