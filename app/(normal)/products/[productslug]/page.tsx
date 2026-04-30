import React from 'react'
import ProductClient from './productClient'

import { notFound } from 'next/navigation';
import { products } from '@/data/products';

const page = async ({ params }: { params: Promise<{ productslug: string }> }) => {

  const { productslug } = await params;

  const product = products.find(
    (p) => p.slug === productslug
  );

  // console.log("product:", product);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductClient product={product} />
    </>
  );
};

export default page;