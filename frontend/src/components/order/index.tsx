import { useState, useEffect } from "react";

import { getOrder, updateOrderStatus } from "@/utils/api";
import Loader from "../loader";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";
import { toast } from "react-toastify";

const Order = ({ orderId }: { orderId: string }) => {
  const [order, setOrder] = useState<orderData | null>(null);
  const [isLoading, setIsLoading]=useState<boolean>(false)

  useEffect(() => {
    if (!order) getOrderData();
  }, []);

  const getOrderData = async () => {
    try {
      const response = await getOrder(orderId);
  

      setOrder(response);
    } catch (error) {
      setOrder(null);
    }
  };

  return order ? (
    <section>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold mb-2">Order #{orderId}</h2>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              Placed on {new Date(order.date).toLocaleDateString("en-US")}
            </p>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full">
                <h3 className="text-md font-bold mb-2">Delivery Address</h3>
                <p className="text-gray-700 mb-2">
                  {order.deliveryAddress.name}
                </p>
                <p className="text-gray-700 mb-2">
                  {order.deliveryAddress.address}
                </p>
                <p className="text-gray-700 mb-2">
                  {order.deliveryAddress.state}, {order.deliveryAddress.country}{" "}
                  {order.deliveryAddress.postalCode}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <h3 className="text-lg font-bold mb-2">Order Summary</h3>
            <table className="w-full text-left">
              <thead className="">
                <tr className="border-b  border-gray-300">
                  <th className="py-2">Product</th>
                </tr>
              </thead>
              <tbody className="">
                {order.products.map(
                  (item: orderedProductData, index: number) => (
                    <div className="py-3" key={index}>
                      <tr className="flex mb-2 flex-col item-center">
                        <td className="flex gap-2 mb-3 items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={55}
                            height={45}
                          />
                          {item.name}
                        </td>
                        <td className="py-1 text-slate-400">Id: {item._id}</td>
                        <td className="py-2">Qualtity: {item.quantity}</td>

                        <td className="py-2">${item.price}</td>
                      </tr>
                      <tr className="flex gap-2 items-center">
                        <td className="">
                          <span className={`rounded-md italic text-lg px-5 py-3  ${item.status === "received" ? "bg-green-300" : "bg-primary/50"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.status === "shipped" && (
                            <Button
disabled={isLoading}
                            isLoading={isLoading}
                              onClick={async () => {

                                
                                try {
                                  setIsLoading(true);
                                  const res = await updateOrderStatus(orderId, {
                                    status: "received",
                                    productId: item._id
                                  });
                                  
                                  setIsLoading(false)

                                  if(res.success === true){
                                    toast.success("Order sucessfully updated!")
                                  }
                                } catch (error) {
                                  setIsLoading(false)
                                  toast.error(
                                    (error as any).response.data.error
                                  );

                                 
                                }
                              }}
                              className="w-full"
                            >
                              Order Recieved
                            </Button>
                          )}
                        </td>

                        <td>
                          <Link href={`/profile/messages/${item.seller._id}`}>
                            <Button className="p-1 ">Contact Seller</Button>
                          </Link>
                        </td>
                      </tr>
                    </div>
                  )
                )}
              </tbody>
            </table>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-end">
              <p className="text-gray-700 font-bold">Total: ${order.total}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default Order;
