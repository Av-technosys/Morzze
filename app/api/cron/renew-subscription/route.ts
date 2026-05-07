import { db } from "@/db"
import { subscriptions } from "@/db/schema"
// import { subscriptionPlans } from "@/db/schema"
import { order } from "@/db/schema"
import { eq, lte } from "drizzle-orm"

export async function GET() {

  const today = new Date()

  const activeSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(lte(subscriptions.nextOrderDate, today))

  for (const sub of activeSubscriptions) {

    if (!sub.id) continue

    const plan = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, sub.id)
    })

    if (!plan) continue

    await db.insert(order).values({
      userId: sub.userId,
      subscriptionId: sub.id,
      // totalAmount: plan.price,
      status: "pending",
      createdAt: new Date()
    })

    if (!sub.nextOrderDate || !plan.frequencyInMonths) continue

    const nextBilling = new Date(sub.nextOrderDate)

    nextBilling.setMonth(
      nextBilling.getMonth() + plan.frequencyInMonths
    )

    await db
      .update(subscriptions)
      .set({ nextOrderDate: nextBilling })
      .where(eq(subscriptions.id, sub.id))
  }

  return Response.json({ message: "Renewal completed" })
}