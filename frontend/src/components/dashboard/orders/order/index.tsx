import { useState, useEffect } from "react";
import { getOrder, updateOrder, validateLogin, updateOrderStatus } from "@/utils/api";

// Components
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import Loader from "@/components/loader";

// Next components
import Link from "next/link";
import Image from "next/image";

// Toast
import { toast } from "react-toastify";

// const orderStatusList = [
//   { label: "Pending", value: "Pending" },
//   { label: "Processing", value: "Processing" },
//   { label: "Shipped", value: "Shipped" },
//   { label: "Delivered", value: "Delivered" },
//   { label: "Returned", value: "Returned" },
//   { label: "Refunded", value: "Refunded" },
// ];

// const paymentStatusList = [
//   { label: "Paid", value: "paid" },
//   { label: "Unpaid", value: "unpaid" },
// ];

const Order = ({ orderId }: { orderId: string }) => {
  // const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>();
  // const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>();

  const [user, setUser] = useState<userData | null>(null);

  const [order, setOrder] = useState<orderData | null>(null);

  useEffect(() => {
    if (!order) getOrderData();

    async function getUserData() {
      try {
        const response = await validateLogin();

      
        
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    }
    if (!user) getUserData();
  }, []);

  const getOrderData = async () => {
    try {
      const response = await getOrder(orderId);
   
      
      setOrder(response);

      // setSelectedOrderStatus(response.orderStatus);
      // setSelectedPaymentStatus(response.paymentStatus);
    } catch (error) {
      setOrder(null);
    }
  };

 

  // const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await updateOrder(
  //       order?._id as string,
  //       {
  //         orderStatus: selectedOrderStatus,
  //         paymentStatus: selectedPaymentStatus,
  //       } as any
  //     );

  //     toast.success("Action applied successfully");
  //   } catch (error) {
  //     toast.error((error as any).response.data.error); // Handle error response
  //   }
  // };

  return order ? (
    <div>
      <h1 className="text-2xl font-bold mb-8">Order: #{orderId}</h1>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[70%] space-y-5">
          <div className=" rounded-lg p-5">
            <table className="w-full text-left">
              <thead className="">
                <tr className="border-b  bg-white p-3 rounded-md">
                  <th className="py-2 text-lg p-5 my-4">Item In this Order</th>
                  {/* <th className="py-2">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {order.products.map(
                  (item: orderedProductData, index: number) => (
                    <tr
                      className="flex bg-white p-4 rounded-md flex-col mb-5"
                      key={index}
                    >
                      <td className="py-2 flex  gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={45}
                          height={45}
                        />
                        {item.name}
                      </td>
                      <td className="py-2">
                        <b>Quantity: </b>
                        {item.quantity}
                      </td>
                      <td className="py-2">
                        <b>Price:</b> ${item.price}
                      </td>
                      <td className="py-2 mb-3">
                        <b>Status:</b> {item.status}
                      </td>
                      <td className="py-2 mb-3">
                        <b>Seller Email Address :</b> {item.seller.email}
                      </td>
                    
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:w-[30%] space-y-5">
         
        
          <div className="bg-white rounded-lg p-5">
            <h4 className="text-lg font-bold mb-5 pb-5 border-b">Summary</h4>

            <ul className="space-y-3 break-all">
              <li>
                <span className="font-medium">Order ID:</span> #{orderId}
              </li>

              <li>
                <span className="font-medium">Payment Method:</span>{" "}
                <span className="uppercase">{order.paymentMethod}</span>
              </li>

              <li>
                <span className="font-medium">Payment ID:</span>{" "}
                <span className="text-blue-600">{order.paymentId}</span>
              </li>

              <li>
                <span className="font-medium">Total Amount:</span> $
                {parseInt(order.total).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}
              </li>

              <li>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString("en-US")}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-5">
            <h4 className="text-lg font-bold mb-5 pb-5 border-b">
              Delivery Address
            </h4>

            <ul className="space-y-3 break-all">
              <li>
                <span className="font-medium">Name:</span>{" "}
                {order.deliveryAddress.name}
              </li>
              <li>
                <span className="font-medium">Email:</span>{" "}
                {order.deliveryAddress.email}
              </li>
              <li>
                <span className="font-medium">Phone:</span>{" "}
                {order.deliveryAddress.phone}
              </li>
              <li>
                <span className="font-medium">Address:</span>{" "}
                {order.deliveryAddress.address}
              </li>
              <li>
                <span className="font-medium">Postal Code:</span>{" "}
                {order.deliveryAddress.postalCode}
              </li>
              <li>
                <span className="font-medium">City:</span>{" "}
                {order.deliveryAddress.city}
              </li>
              <li>
                <span className="font-medium">State:</span>{" "}
                {order.deliveryAddress.state}
              </li>
              <li>
                <span className="font-medium">Country:</span>{" "}
                {order.deliveryAddress.country}
              </li>

              {/* <Link href={`/dashboard/messages/${order.customerId._id}`}>
                <Button className="w-full mt-5">Chat with customer</Button>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Order;
