import { useEffect, useState } from "react";

// next components
import Image from "next/image";
import Link from "next/link";

// components
import Button from "../button";

// Utils
import { characterLimit } from "@/utils/character-limit";

// Toast
import { toast } from "react-toastify";
import { GrFavorite } from "react-icons/gr";


import { saveProduct } from "@/utils/api";

interface Props {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  mrpPrice: string;
  quantity: number;
  unit: string;
  status: string;
  weight: number;
  userId: string;
}

const ProductCard = ({
  id,
  name,
  slug,
  image,
  status,
  price,
  mrpPrice,
  quantity,
  unit,
  weight,
  userId,
}: Props) => {


	const [isLoading, setIsLoading] = useState<boolean>(false)


	// 
  useEffect(() => {
    let arr: cartData[] = JSON.parse(localStorage.getItem("cart") as string);
    let res: any = arr?.filter((item) => {
      return item.id == id;
    });

    if (res?.length >= 1) {
      const buttons = document.querySelectorAll(
        '[data-productid="' + res[0]["id"] + '"]'
      );
      buttons.forEach(function (button) {
        button.setAttribute("disabled", "true");
        button.innerHTML = "Added to cart";
      });
    }
  }, []);

  const handleAddToCart = async () => {
    let arr: cartData[] = [];

    if (localStorage.getItem("cart")) {
      arr = JSON.parse(localStorage.getItem("cart") as string);
    }

    let res: any = arr.filter((item) => {
      return item.id == id;
    });
    if (res.length >= 1) return;

    let Qantity: number = 1;
    arr = [
      ...arr,
      {
        id,
        name,
		status,
        image,
        price,
        mrpPrice,
        quantity: Qantity,
        maximumQuantity: quantity,
        unit: unit,
        weight: weight,
        userId: userId as string,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(arr));

    const buttons = document.querySelectorAll('[data-productid="' + id + '"]');
    buttons.forEach(function (button) {
      button.setAttribute("disabled", "true");
      button.innerHTML = "Added to cart";
    });

    const cartCountElement = document.querySelectorAll(".cartCount");
    cartCountElement.forEach(function (element) {
      element.innerHTML = JSON.parse(
        localStorage.getItem("cart") as string
      )?.length;
    });

    toast.success("Product added to cart");
  };


//   Save product
  const handSaveProduct = async ()=> {

	setIsLoading(true)
try{
		const res = await saveProduct("/bookmarks", {
		productId:id
	})

	setIsLoading(false)

	console.log(res);

	toast.success("Item saved!")
}catch(error){
setIsLoading(false)
	console.log(error);
		toast.error((error as any).response.data.error);
	

}

setIsLoading(false)
	

  }
  return (
    <div className="bg-white p-4 rounded-lg">
      <span
        className={`mb-3 flex text-sm hover:text-prim cursor-pointer justify-end  ${
          isLoading ? "text-primary animate-bounce " : ""
        }`}
        onClick={handSaveProduct}
      >
        <GrFavorite />
      </span>

      <Link href={`/product/${slug}`}>
        <Image
          src={`${image}`}
          alt={name}
          width={200}
          height={200}
          className="w-[300px]  h-[200px] object-contain mx-auto"
        />
      </Link>

      <Link
        href={`/product/${slug}`}
        className="font-medium mt-7 text-gray-600 h-[48px] block"
      >
        {characterLimit(name, 45)}
      </Link>

      <div className="mt-5">
        <div className="flex items-center gap-1">
          <span className="font-bold block">
            $
            {parseFloat(price).toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}
          </span>

          {mrpPrice && (
            <>
              ~{" "}
              <s className="text-sm block text-gray-500">
                $
                {parseFloat(mrpPrice).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}
              </s>
            </>
          )}
        </div>

        <span
          className={`${
            quantity <= 5
              ? "text-yellow-500"
              : quantity <= 3
              ? "text-red-500"
              : "text-green-500"
          } mt-2 block font-medium`}
        >
          {quantity <= 0 ? "Out of Stock" : `${quantity} ${unit} Left`}
        </span>

        {quantity >= 1 && (
          <Button
            type="button"
            onClick={handleAddToCart}
            className="text-sm mt-4 w-full addToCartBtn"
            disabled={quantity <= 0 && true}
            data-productid={id}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
