// app/api/dealer/route.ts

import { NextResponse } from "next/server"
import { renderTemplate, sendEmail } from "@/lib/email"
import { getCurrentUser } from "@/helper/user/action"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      fullName,
      businessName,
      email,
      phone,
      city,
      businessType,
      address,
      yearsInBusiness,
      businessDetails,
    } = body

    if (
      !fullName ||
      !businessName ||
      !email ||
      !phone ||
      !city ||
      !businessType ||
      !businessDetails
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      )
    }

    const loggedInUser = await getCurrentUser()
    await sendEmail({
      to: loggedInUser?.email!,
      subject: `New Dealer Application - ${businessName}`,
      html: renderTemplate(
        `
        <h2>New Dealer Application</h2>
        <p><strong>Full Name:</strong> {{Full Name}}</p>
        <p><strong>Business Name:</strong> {{Business Name}}</p>
        <p><strong>Email:</strong> {{Email}}</p>
        <p><strong>Phone:</strong> {{Phone}}</p>
        <p><strong>City:</strong> {{City}}</p>
        <p><strong>Business Type:</strong> {{Business Type}}</p>
        <p><strong>Address:</strong> {{Address}}</p>
        <p><strong>Years in Business:</strong> {{Years in Business}}</p>
        <p><strong>Business Details:</strong></p>
        <p>{{Business Details}}</p>
      `,
        {
          "Full Name": fullName,
          "Business Name": businessName,
          Email: email,
          Phone: phone,
          City: city,
          "Business Type": businessType,
          Address: address || "Not provided",
          "Years in Business": yearsInBusiness || "Not provided",
          "Business Details": businessDetails,
        },
      ),
    })

    return NextResponse.json({
      success: true,
      message: "Dealer application sent successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}
