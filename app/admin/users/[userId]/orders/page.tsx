import { db } from "@/lib/db";
import { order, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactLink } from "@/components/ContactLink";

export default async function UserOrdersPage({
  params,
}: {
  params: { userId: string };
}) {
  // Verify user exists
  const user = await db.select().from(users).where(eq(users.id, params.userId)).limit(1);

  if (user.length === 0) {
    notFound();
  }

  const userData = user[0];

  // Fetch user's orders
  const userOrders = await db
    .select({
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      shippingStatus: order.shippingStatus,
      trackingNumber: order.trackingNumber,
    })
    .from(order)
    .where(eq(order.userId, params.userId))
    .orderBy(desc(order.createdAt));

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Back to Users
        </Link>
        <h1 className="text-2xl font-semibold">Orders for {userData.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Email:</span>{" "}
          <ContactLink type="email" value={userData.email} />
        </div>
        <div>
          <span className="font-medium text-foreground">Phone:</span>{" "}
          <ContactLink type="phone" value={userData.phone} />
        </div>
      </div>

      {userOrders.length === 0 ? (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          No orders found for this user.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Total Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Shipping Status</th>
                <th className="px-4 py-3 font-medium">Tracking</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-4 py-3">
                    <code className="bg-muted px-2 py-1 rounded text-xs">
                      {o.id.slice(0, 8)}...
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    ${(o.totalAmount ? o.totalAmount / 100 : 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        o.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : o.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : o.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        o.shippingStatus === "delivered"
                          ? "bg-green-100 text-green-800"
                          : o.shippingStatus === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : o.shippingStatus === "shipped"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {o.shippingStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {o.trackingNumber ? (
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {o.trackingNumber}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
