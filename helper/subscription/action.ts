"use server";
import { paymentGatewayPlans, paymentGatewaySubscription, subscriptions } from "@/db/schema";
import { db } from "@/lib/db";

export async function createSubscription({ userId, items }: any) {
  try {
    await db.insert(subscriptions).values(
      items.map((item: any) => {
        const startDate = new Date();

        // 1 month = 30 days
        const totalDays = item.frequencyInMonths * 30;

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + totalDays);

        const nextOrderDate = new Date(endDate);
        nextOrderDate.setDate(nextOrderDate.getDate() + 1);

        return {
          userId,
          frequencyInMonths: item.frequencyInMonths,
          startDate,
          endDate,
          nextOrderDate,
        };
      }),
    );

    return {
      success: true,
      message: "Subscription created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create subscription",
    };
  }
}

export async function createPaymentGatewayPlan(planData: any) {
  try {
    await db.insert(paymentGatewayPlans).values(
      planData.map((item: any) => {
        return {
          name: item.item.name,
          price: item.item.amount,
          descirption: item.item.description,
          billingFrequency: item.interval,
          frequencyType: item.period,
          planId: item.id,
        };
      }),
    );

    return {
      success: true,
      message: "Payment gateway plan created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create payment gateway plan",
    };
  }
}


export async function CreatePaymentGatewaySubscription(subscriptions:any){
    try {
        await db.insert(paymentGatewaySubscription).values(
            subscriptions.map((item: any) => {
                return {
                    planId: item.plan_id,
                    totalCount: item.total_count,
                    remainingCount:item.remaining_count,
                    quantity: item.quantity,
                    startAt: item.start_at,
                    customerNotify: item.customer_notify,
                    expireBy: item.expire_by,
                    shourURL: item.short_url,
                    // startDate: item.start_date,
                };
            })
        );
        
    } catch (error) {
        
    }
}
