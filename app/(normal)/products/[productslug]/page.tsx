import React from "react";
import ProductClient from "./productClient";
import { notFound } from "next/navigation";
// Direct wahi helper use kar rahe hain jo aapne sample code mein dikhaya
import { getFullProductDetails } from "@/helper/product/action";

export const dynamic = "force-dynamic";

const page = async ({
  params,
}: {
  params: Promise<{ productslug: string }>;
}) => {
  // 1. Slug ko await karein
  const { productslug } = await params;

  console.log("Fetching data for:", productslug);

  try {
    const product = await getFullProductDetails(productslug);

    console.log("API Se Aaya Hua Product:", product);

    // 3. Agar data nahi mila toh direct 404
    if (!product || Object.keys(product).length === 0) {
      return notFound();
    }

    // 4. Client component ko data pass karein
    return <ProductClient product={product} slug={productslug} />;

  } catch (error) {
    console.error("Fetch Error:", error);
    return notFound();
  }
};

export default page;