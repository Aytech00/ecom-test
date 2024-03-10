"use client";
import { useParams } from "next/navigation";
import Order from "@/components/order";

const OrderPage = () => {
  const params = useParams();
  return <Order orderId={params.order_id as string} />;
};

export default OrderPage;
