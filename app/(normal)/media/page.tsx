import MediaHero from "@/components/media-center/banner";
import BrandFilmsProductDemos from "@/components/media-center/brandFilm";
import PressCoverageSection from "@/components/media-center/coverage";
import ExhibitionHighlightsSection from "@/components/media-center/highlight";
import PressKitRequestSection from "@/components/media-center/pressKit";
import ProductPhotographyGallery from "@/components/media-center/visualgrid";
import React from "react";

const page = () => {
  return (
    <div>
      <MediaHero />
      <ExhibitionHighlightsSection />
      {/* <PressCoverageSection /> */}
      <BrandFilmsProductDemos />
      <ProductPhotographyGallery />
      {/* <PressKitRequestSection /> */}
    </div>
  );
}; ``

export default page;
