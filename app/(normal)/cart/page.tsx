import CartItemList from '@/components/cart/CartItemList'
import OrderSummary from '@/components/cart/OrderSummary'
import React from 'react'


const CartPage = () => {
  return (
    <div className=" bg-black text-white px-6 md:px-24 md:py-12 py-8">
      <div className="max-w-7xl mx-auto">
        
     

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Cart Items (8 columns) */}
          <div className="lg:col-span-8">
            <CartItemList />
          </div>

          {/* Right: Summary (4 columns) */}
          <div className="lg:col-span-4">
            <OrderSummary />
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartPage