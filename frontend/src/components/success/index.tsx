"use client";

import { useEffect, useState } from "react";
import { createOrder, validateLogin } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

const Success = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [user, setUser] = useState<userData | null>(null);

  useEffect(() => {
    getUserData();
    order();
  }, [user]);

  async function order() {
    try {
      if (!user) return;

      const data = JSON.parse(
        decodeURIComponent(searchParams.get("data") as string)
      );

      const products = data.products.map((item: cartData) => {
        return {
          _id: item.id,
          status: "Processing",
          price: item.price,
          quantity: item.quantity,
         
        };
      });

      const response = await createOrder({
        orderId: data.orderId,
        deliveryAddress: data.deliveryAddress,
        paymentMethod: data.paymentMethod,
        paymentId: searchParams.get("session_id"),
        total: data.total,
        products: products,
        sellerId: data.products[0].userId,
        customerId: user._id,
        paymentStatus: "paid",
      });

      
      

      localStorage.removeItem("cart");

      router.push("/order/" + data.orderId);
    } catch (error) {

      	toast.error((error as any).response.data.error);
    }
  }

  const getUserData = async () => {
    try {
      const response = await validateLogin();
      setUser(response);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <div className="py-8 container">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-[400px] mx-auto">
        <BsFillCheckCircleFill className="text-3xl mb-4" />
        <h1 className="text-xl font-bold">Payment Successful</h1>
        <p className="mt-2">
          Thank you for your payment. Your transaction has been completed
        </p>
      </div>
    </div>
  );
};

export default Success;
