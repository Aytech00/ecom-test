"use client";
import { useState, useEffect } from "react";

// Next imports
import Image from "next/image";
import { useRouter } from "next/navigation";

// API
import { createCheckoutSession } from "@/utils/api";

// Toast
import { toast } from "react-toastify";

// Country list
import { countryList } from "@/utils/country-list";
// validate email
import { validateEmail } from "@/utils/validate-email";

// Components
import Loader from "../loader";
import Input from "../ui/input";
import Select from "../ui/select";
import Radio from "../ui/radio";
import Button from "../ui/button";

const paymentMethods = [{ label: "Stripe", value: "stripe" }];

const Checkout = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [products, setProducts] = useState<cartData[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

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

  // Place order
  const handlePlaceOrder = async () => {
    setIsLoading(true);

    if (!name) {
      toast.error("Name is required");
      setIsLoading(false);
      return;
    } // checking name is empty or not
    if (!email) {
      toast.error("Email is required");
      setIsLoading(false);
      return;
    } // checking email is empty or not
    if (!validateEmail(email)) {
      toast.error("Your email is invalid");
      setIsLoading(false);
      return;
    } // checking email is correct or not
    if (!phone) {
      toast.error("Phone is required");
      setIsLoading(false);
      return;
    } // checking phone is empty or not
    if (!address) {
      toast.error("Address is required");
      setIsLoading(false);
      return;
    } // checking address is empty or not
    if (!postalCode) {
      toast.error("Postal Code is required");
      setIsLoading(false);
      return;
    } // checking postalCode is empty or not
    if (!city) {
      toast.error("City is required");
      setIsLoading(false);
      return;
    } // checking city is empty or not
    if (!state) {
      toast.error("State is required");
      setIsLoading(false);
      return;
    } // checking state is empty or not
    if (!selectedCountry) {
      toast.error("Country is required");
      setIsLoading(false);
      return;
    } // checking country is empty or not
    if (!selectedPaymentMethod) {
      toast.error("Payment Method is required");
      setIsLoading(false);
      return;
    } // checking payment method is empty or not

    try {
      const data = {
        products,
        deliveryAddress: {
          name,
          email,
          phone,
          address,
          postalCode,
          city,
          state,
          country: selectedCountry,
        },
        paymentMethod: selectedPaymentMethod,
        total: totalPrice,
      };

      const response = await createCheckoutSession(data);
      console.log(response.url);
      
      setIsLoading(false);

      router.push(response.url);
    } catch (error) {
      console.log(error); // Handle error response
    }
  };

  return !isLoading && products ? (
    <div className="container py-8">
      {products && products.length >= 1 ? (
        <div>
          <h1 className="font-bold text-2xl mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left */}
            <div className="md:col-span-7 space-y-5">
              {/* delivery address */}
              <div className="bg-white rounded-lg p-6 space-y-5">
                <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

                <div>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    label="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Enter your phone"
                    label="Phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    label="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter your postal code"
                      label="Postal Code"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="Enter your city"
                      label="City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter your state"
                      label="State"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <Select
                      label="Country"
                      options={countryList}
                      value={selectedCountry}
                      onChange={(value) => {
                        setSelectedCountry(value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-lg p-6 space-y-5">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                <div>
                  <Radio
                    options={paymentMethods}
                    name="payment-method"
                    value={selectedPaymentMethod}
                    onChange={(value) =>
                      setSelectedPaymentMethod(value as string)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5 md:col-span-5">
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
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                  {products.map((product: cartData, index: number) => (
                    <div className="bg-white rounded-lg" key={index}>
                      <div className="flex items-center justify-between py-4">
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
              </div>

              {/* Pay button */}
              <Button
                className="w-full"
                type="button"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
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

export default Checkout;
