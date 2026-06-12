// app/api/career/route.ts

import { NextResponse } from "next/server"
import { renderTemplate, sendEmailWithAttachments } from "@/lib/email"
import { getCurrentUser } from "@/helper/user/action"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jobTitle = formData.get("jobTitle") as string
    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const portfolio = formData.get("portfolio") as string
    const coverLetter = formData.get("coverLetter") as string
    const resume = formData.get("resume") as File | null

    if (!jobTitle || !fullName || !email || !resume) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      )
    }

    const bytes = await resume.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const loggedInUser = await getCurrentUser()
    await sendEmailWithAttachments({
      to: loggedInUser?.email!,
      subject: `New Job Application - ${jobTitle}`,
      html: renderTemplate(
        `
        <h2>New Job Application</h2>
        <p><strong>Applied For:</strong> {{Job Title}}</p>
        <p><strong>Full Name:</strong> {{Full Name}}</p>
        <p><strong>Phone:</strong> {{Phone}}</p>
        <p><strong>Email:</strong> {{Email}}</p>
        <p><strong>LinkedIn / Portfolio:</strong> {{Portfolio}}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>{{Cover Letter}}</p>
      `,
        {
          "Job Title": jobTitle,
          "Full Name": fullName,
          Phone: phone || "Not provided",
          Email: email,
          Portfolio: portfolio || "Not provided",
          "Cover Letter": coverLetter || "Not provided",
        },
      ),
      attachments: [
        {
          filename: resume.name,
          content: buffer,
          contentType: resume.type || "application/octet-stream",
        },
      ],
    })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}
