"use client";
import { useState, useEffect } from "react";

// Next imports
import Image from "next/image";
import Link from "next/link";

// Components
import Loader from "../loader";
import Button from "../ui/button";

const Cart = () => {
  const [products, setProducts] = useState<cartData[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    if (!products) getCartProducts();
  }, []);

  const getCartProducts = () => {
    if (localStorage.getItem("cart")) {
      const cartProducts = JSON.parse(localStorage.getItem("cart") as string);
      setProducts(cartProducts);

      let totalPrice: number = 0;

      cartProducts.map((item: cartData) => {
        totalPrice += parseFloat(item.price);
      });

      setTotalPrice(totalPrice);
    } else {
      setProducts([]);
    }
  };

  const handleProductRemove = (id: string, variation: string) => {
    const newProducts =
      products &&
      products.filter((obj) => obj.id !== id || obj.variation !== variation);

    localStorage.setItem("cart", JSON.stringify(newProducts));

    getCartProducts();
  };

  return products ? (
    <div className="container py-8">
      {products.length >= 1 ? (
        <div>
          <h1 className="font-bold text-2xl mb-8">Your Cart</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div className="space-y-3">
              {products.map((product: cartData, index: number) => (
                <div className="bg-white rounded-lg" key={index}>
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {/* <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_UPLOAD_FOLDER}/${product.image}`}
                        alt=""
                        width={120}
                        height={120}
                        className="w-16 h-16 object-cover rounded"
                      /> */}
                      <div>
                        <p>{product.name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        $
                        {parseFloat(product.price).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                        })}
                      </p>
                      <button
                        onClick={() => {
                          handleProductRemove(
                            product.id,
                            product.variation as string
                          );
                        }}
                        className="text-red-500 hover:text-red-600 focus:outline-none"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div>
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-600">Subtotal</p>
                  <p>
                    $
                    {totalPrice &&
                      totalPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                      })}
                  </p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-600">Total</p>
                  <p>${totalPrice && totalPrice}</p>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-5">Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Image
            src="/empty-cart.webp"
            alt=""
            width={300}
            height={300}
            className="mx-auto"
          />
          <p className="text-center text-2xl font-bold">Your Cart is Empty</p>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Cart;
