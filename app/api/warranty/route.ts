import { NextResponse } from "next/server"
import { renderTemplate, sendEmail, sendEmailWithAttachments } from "@/lib/email"
import { getCurrentUser } from "@/helper/user/action"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const type = formData.get("type") as string
    const serialNumber = formData.get("serialNumber") as string

    if (!type || !serialNumber) {
      return NextResponse.json(
        { success: false, message: "Product serial number is required" },
        { status: 400 }
      )
    }

    const files = formData.getAll("files") as File[]

    const attachments = await Promise.all(
      files
        .filter((file) => file && file.size > 0)
        .map(async (file) => {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)

          return {
            filename: file.name,
            content: buffer,
          }
        })
    )

    let subject = ""
    let html = ""

    if (type === "register") {
      const purchaseDate = formData.get("purchaseDate") as string
      const productCategory = formData.get("productCategory") as string
      const productName = formData.get("productName") as string
      const invoiceNumber = formData.get("invoiceNumber") as string
      const dealerName = formData.get("dealerName") as string
      const fullName = formData.get("fullName") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string
      const address = formData.get("address") as string

      subject = `New Warranty Registration - ${serialNumber}`

      html = `
        <h2>Warranty Registration</h2>
        <p><strong>Serial Number:</strong> {{Serial Number}}</p>
        <p><strong>Purchase Date:</strong> {{Purchase Date}}</p>
        <p><strong>Product Category:</strong> {{Product Category}}</p>
        <p><strong>Product Name:</strong> {{Product Name}}</p>
        <p><strong>Invoice Number:</strong> {{Invoice Number}}</p>
        <p><strong>Dealer Name:</strong> {{Dealer Name}}</p>
        <p><strong>Full Name:</strong> {{Full Name}}</p>
        <p><strong>Email:</strong> {{Email}}</p>
        <p><strong>Phone:</strong> {{Phone}}</p>
        <p><strong>Installation Address:</strong> {{Address}}</p>
      `
      html = renderTemplate(html, {
        "Serial Number": serialNumber,
        "Purchase Date": purchaseDate,
        "Product Category": productCategory,
        "Product Name": productName,
        "Invoice Number": invoiceNumber,
        "Dealer Name": dealerName,
        "Full Name": fullName,
        Email: email,
        Phone: phone,
        Address: address,
      })
    }

    if (type === "claim") {
      const productCategory = formData.get("productCategory") as string
      const issueType = formData.get("issueType") as string
      const issueDescription = formData.get("issueDescription") as string
      const fullName = formData.get("fullName") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string
      const address = formData.get("address") as string

      subject = `New Warranty Claim - ${serialNumber}`

      html = `
        <h2>Warranty Claim</h2>
        <p><strong>Serial Number:</strong> {{Serial Number}}</p>
        <p><strong>Product Category:</strong> {{Product Category}}</p>
        <p><strong>Issue Type:</strong> {{Issue Type}}</p>
        <p><strong>Issue Description:</strong></p>
        <p>{{Issue Description}}</p>
        <p><strong>Full Name:</strong> {{Full Name}}</p>
        <p><strong>Email:</strong> {{Email}}</p>
        <p><strong>Phone:</strong> {{Phone}}</p>
        <p><strong>Installation Address:</strong> {{Address}}</p>
      `
      html = renderTemplate(html, {
        "Serial Number": serialNumber,
        "Product Category": productCategory,
        "Issue Type": issueType,
        "Issue Description": issueDescription,
        "Full Name": fullName,
        Email: email,
        Phone: phone,
        Address: address,
      })
    }

    if (type === "status") {
      subject = `Warranty Status Check - ${serialNumber}`

      html = `
        <h2>Warranty Status Check</h2>
        <p><strong>Serial Number:</strong> {{Serial Number}}</p>
      `
      html = renderTemplate(html, {
        "Serial Number": serialNumber,
      })
    }

    const loggedInUser = await getCurrentUser()
    const emailPayload = {
      to: loggedInUser?.email!,
      subject,
      html,
    }

    if (attachments.length > 0) {
      await sendEmailWithAttachments({ ...emailPayload, attachments })
    } else {
      await sendEmail(emailPayload)
    }

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}
