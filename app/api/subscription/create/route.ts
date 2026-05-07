import { db } from "@/db"
import { order } from "@/db/schema"
import { subscriptions } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {

  const { userId, planId } = await req.json()

  const plan = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.id, planId)
  })

  if (!plan || !plan.frequencyInMonths) {
    return Response.json({ error: "Plan not found or invalid" })
  }

  const startDate = new Date()

  const nextBillingDate = new Date()
  nextBillingDate.setMonth(
    nextBillingDate.getMonth() + plan.frequencyInMonths
  )

  const newSubscription = await db
    .insert(subscriptions)
    .values({
      userId,
      // planId,
      startDate,
      nextOrderDate: nextBillingDate,
      status: "active"
    })
    .returning()

  await db.insert(order).values({
    userId,
    subscriptionId: newSubscription[0].id,
    // totalAmountPaid: plan.price,
    status: "paid",
    createdAt: new Date()
  })

  return Response.json({
    message: "Subscription created"
  })
}