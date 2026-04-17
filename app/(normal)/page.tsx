import Footer from '@/components/commom/footer'
import Header from '@/components/commom/header'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import HeroSection from '@/components/home/HeroSection'
import ShopCategory from '@/components/home/ShopCategory'
import SignaturePieces from '@/components/home/SignaturePieces'
import TheARTSection from '@/components/home/TheARTSection'
import TheStory from '@/components/home/TheStory'
import TrendingNow from '@/components/home/TrendingNow'
import TrustSection from '@/components/home/TrustSection'
import WhereWaterMeet from '@/components/home/WhereWaterMeet'
import React from 'react'

const page = () => {
  return (
    <main>
      <Header/>
      <HeroSection/>
      <TheStory/>
      <SignaturePieces/>
      <ShopCategory/>
      <TheARTSection/>
      <TrustSection/>
      <WhereWaterMeet/>
      <CategoryShowcase/>
      <TrendingNow/>
    </main>
  )
}

export default page
