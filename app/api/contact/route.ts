import { NextResponse } from "next/server"
import { renderTemplate, sendEmail } from "@/lib/email"
import { getCurrentUser } from "@/helper/user/action"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      fullName,
      email,
      phone,
      category,
      subject,
      message,
    } = body

    // Validation
    if (
      !fullName ||
      !email ||
      !category ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be filled",
        },
        { status: 400 }
      )
    }

    const loggedInUser = await getCurrentUser()
    await sendEmail({
      to: loggedInUser?.email!,
      subject: `New Contact Form Submission - ${subject}`,
      html: renderTemplate(
        `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Full Name:</strong> {{Full Name}}</p>
          <p><strong>Email:</strong> {{Email}}</p>
          <p><strong>Phone:</strong> {{Phone}}</p>
          <p><strong>Category:</strong> {{Category}}</p>
          <p><strong>Subject:</strong> {{Subject}}</p>

          <div style="margin-top:20px;">
            <strong>Message:</strong>
            <p>{{Message}}</p>
          </div>
        </div>
      `,
        {
          "Full Name": fullName,
          Email: email,
          Phone: phone || "Not provided",
          Category: category,
          Subject: subject,
          Message: message,
        },
      ),
    })

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    )
  }
}
