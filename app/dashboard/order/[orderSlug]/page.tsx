import OrderDetails, {
  type OrderDetailViewModel,
} from "@/components/order/OrderDetails"
import { getOrderById } from "@/helper/order/action"
import { getProfile } from "@/helper/user/action"

function formatINR(amount: number | null | undefined) {
  if (amount == null) return "—"
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatStatus(status: string | null | undefined) {
  if (!status) return "—"
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

function formatPaymentMethod(method: string | null | undefined): string {
  if (!method) return "—"
  const m = method.toLowerCase()
  if (m === "razorpay") return "Paid online (Razorpay)"
  if (m === "cod") return "Cash on Delivery (COD)"
  return method
}

function formatShippingAddress(order: {
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

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderSlug: string }>
}) {
  const { orderSlug } = await params
  const dbOrder = await getOrderById(orderSlug)

  if (!dbOrder) {
    return <div className="text-white">Order not found</div>
  }

  const profile = await getProfile()
  if (dbOrder.userId !== profile.userId) {
    return <div className="text-white">Order not found</div>
  }

  const items = dbOrder.items ?? []
  const linesSubtotal = items.reduce(
    (s, i) => s + (i.productPrice ?? 0) * (i.quantity ?? 0),
    0,
  )
  const total = dbOrder.totalAmount ?? 0
  const tax = Math.max(0, total - linesSubtotal)

  const lineItems = items.map((i, idx) => ({
    id: i.id ?? `${dbOrder.id}-line-${idx}`,
    name: (i.productName ?? "Item").trim() || "Item",
    variant: i.productVarientBox?.trim() || "—",
    quantity: i.quantity ?? 0,
    unitPriceFormatted: formatINR(i.productPrice ?? 0),
    lineTotalFormatted: formatINR((i.productPrice ?? 0) * (i.quantity ?? 0)),
    image: i.productImage ?? null,
  }))

  const subtotalFormatted =
    linesSubtotal > 0 ? formatINR(linesSubtotal) : formatINR(total)
  const taxFormatted = linesSubtotal > 0 ? formatINR(tax) : "Included"

  const viewModel: OrderDetailViewModel = {
    id: dbOrder.id,
    date: dbOrder.createdAt
      ? new Date(dbOrder.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—",
    price: formatINR(total),
    status: formatStatus(dbOrder.status ?? undefined),
    customerName: profile.fullName?.trim() || "—",
    customerPhone: profile.phone?.trim() || "",
    customerEmail: profile.email?.trim() || "",
    shippingAddress: formatShippingAddress(dbOrder),
    paymentMethodLabel: formatPaymentMethod(dbOrder.payment?.paymentMethod ?? undefined),
    paymentRef: dbOrder.payment?.paymentId ?? null,
    lineItems,
    subtotalFormatted,
    taxFormatted,
  }

  return (
    <div>
      <OrderDetails order={viewModel} />
    </div>
  )
}
