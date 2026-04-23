import CategoryBanner from '@/components/category/CategoryBanner'
import CategorySection from '@/components/category/CategorySection'
import ScrollingRibbon from '@/components/category/ScrollingRibbon'
import SimpleCategoryBanner from '@/components/category/SimpleCategoryBanner'
import React from 'react'

const page = () => {
  return (
    <div>
      <CategoryBanner/>
      <CategorySection/>
      <SimpleCategoryBanner/>
      <ScrollingRibbon/>
    </div>
  )
}

export default page
