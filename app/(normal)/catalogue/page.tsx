import ProductCatalogueHero from "@/components/catalogue/banner";
import CatalogueGridDownloads from "@/components/catalogue/cataloguegrid";
import CatalogueInfoRequestSection from "@/components/catalogue/ourcatalogues";
import { getActiveCatalogues } from "@/helper/catalogue/action";
import React from "react";

const page = async () => {
  const rows = await getActiveCatalogues();
  const items = rows.map((r:any) => ({
    id: r.id,
    title: r.title,
    shortDescription: r.shortDescription,
    image: r.image,
    pdfFile: r.pdfFile,
    totalPages: r.totalPages,
    fileSize: r.fileSize,
    publishYear: r.publishYear,
    category: r.category,
    isFeatured: Boolean(r.isFeatured),
  }));

  return (
    <div>
      <ProductCatalogueHero />
      <CatalogueGridDownloads items={items} />
      {/* <CatalogueInfoRequestSection /> */}
    </div>
  );
};

export default page;
