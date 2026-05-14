import { NextResponse } from "next/server"
import { getOrderById } from "@/helper/order/action"
import { getProfile } from "@/helper/user/action"

function escapeHtml(s: string | null | undefined): string {
  if (s == null || s === "") return ""
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPaymentMethod(method: string | null | undefined): string {
  if (!method) return "—"
  const m = method.toLowerCase()
  if (m === "razorpay") return "Paid online (Razorpay)"
  if (m === "cod") return "Cash on Delivery (COD)"
  return method
}

function formatAddress(order: {
  addressLine1: string | null
  addressLine2: string | null
  city: string | null
  state: string | null
  pincode: string | null
}): string {
  const parts = [
    order.addressLine1,
    order.addressLine2,
    order.city,
    order.state,
    order.pincode,
  ].filter((p): p is string => Boolean(p && String(p).trim()))
  return parts.join(", ") || "—"
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  try {
    const { orderId } = await context.params
    const profile = await getProfile()
    const dbOrder = await getOrderById(orderId)

    if (!dbOrder || dbOrder.userId !== profile.userId) {
      return new NextResponse("Not found", { status: 404 })
    }

    const items = dbOrder.items ?? []
    const linesSubtotal = items.reduce(
      (s, i) => s + (i.productPrice ?? 0) * (i.quantity ?? 0),
      0,
    )
    const total = dbOrder.totalAmount ?? 0
    const tax = Math.max(0, total - linesSubtotal)

    const orderDate = dbOrder.createdAt
      ? new Date(dbOrder.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—"

    const addr = formatAddress(dbOrder)
    const pay = formatPaymentMethod(dbOrder.payment?.paymentMethod ?? undefined)
    const payId = dbOrder.payment?.paymentId

    const rowsHtml = items
      .map((i) => {
        const qty = i.quantity ?? 0
        const unit = i.productPrice ?? 0
        const line = unit * qty
        return `<tr>
          <td style="padding:8px;border:1px solid #333;">${escapeHtml(i.productName)}</td>
          <td style="padding:8px;border:1px solid #333;">${escapeHtml(i.productVarientBox)}</td>
          <td style="padding:8px;border:1px solid #333;text-align:right;">${qty}</td>
          <td style="padding:8px;border:1px solid #333;text-align:right;">${formatINR(unit)}</td>
          <td style="padding:8px;border:1px solid #333;text-align:right;">${formatINR(line)}</td>
        </tr>`
      })
      .join("")

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Invoice ${escapeHtml(dbOrder.id)}</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #fff; color: #111; padding: 24px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 22px; margin-bottom: 4px; }
    .muted { color: #555; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
    th { text-align: left; padding: 8px; border: 1px solid #333; background: #f3f3f3; }
    .totals { margin-top: 16px; width: 100%; max-width: 320px; margin-left: auto; font-size: 14px; }
    .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
    .totals .grand { font-weight: 700; border-top: 2px solid #111; margin-top: 8px; padding-top: 8px; }
  </style>
</head>
<body>
  <h1>Tax Invoice</h1>
  <p class="muted">Morzze &mdash; Order ${escapeHtml(dbOrder.id)}</p>
  <p class="muted">Date: ${escapeHtml(orderDate)}</p>

  <h2 style="font-size:16px;margin-top:24px;">Bill to</h2>
  <p style="margin:4px 0;"><strong>${escapeHtml(profile.fullName)}</strong></p>
  <p class="muted" style="margin:4px 0;">${escapeHtml(profile.email)}</p>
  <p class="muted" style="margin:4px 0;">${escapeHtml(profile.phone || "")}</p>
  <p style="margin-top:8px;">${escapeHtml(addr)}</p>

  <h2 style="font-size:16px;margin-top:24px;">Payment</h2>
  <p class="muted">${escapeHtml(pay)}${payId ? ` &mdash; Ref: ${escapeHtml(payId)}` : ""}</p>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Variant</th>
        <th style="text-align:right;">Qty</th>
        <th style="text-align:right;">Unit</th>
        <th style="text-align:right;">Amount</th>
      </tr>
    </thead>
    <tbody>${rowsHtml || `<tr><td colspan="5" style="padding:8px;border:1px solid #333;">No line items</td></tr>`}</tbody>
  </table>

  <div class="totals">
    <div><span>Subtotal</span><span>${linesSubtotal > 0 ? formatINR(linesSubtotal) : formatINR(total)}</span></div>
    <div><span>GST / taxes</span><span>${linesSubtotal > 0 ? formatINR(tax) : "—"}</span></div>
    <div class="grand"><span>Total</span><span>${formatINR(total)}</span></div>
  </div>
</body>
</html>`

    const safeName = orderId.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 12) || "order"

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="invoice-${safeName}.html"`,
      },
    })
  } catch {
    return new NextResponse("Unauthorized", { status: 401 })
  }
}
