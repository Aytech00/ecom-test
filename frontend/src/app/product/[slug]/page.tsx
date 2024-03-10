"use client";
import { useParams } from "next/navigation";

import Product from "@/components/product";

const ProductPage = () => {
  const params = useParams();
  return <Product slug={params.slug as string} />;
};

export default ProductPage;
