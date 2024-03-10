"use client";
import { useParams } from "next/navigation";

import EditProduct from "@/components/dashboard/products/edit";

const EditProductPage = () => {
  const params = useParams();
  return <EditProduct id={params.id as string} />;
};

export default EditProductPage;
