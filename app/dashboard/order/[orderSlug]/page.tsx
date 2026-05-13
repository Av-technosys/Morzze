import OrderDetails from '@/components/order/OrderDetails'
import { orders } from '@/data/orders'

import React from 'react'

const page = async ({ params }:any) => {

  const { orderSlug } = await params
  console.log("slug-define",orderSlug)

   const order = orders.find( o => o.id === orderSlug)
  console.log(order)
 if (!order) {
    return <div className="text-white">Order not found</div>
  }
  return (
    <div> 
      <OrderDetails order={order} />
    </div>
  )
}

export default page
