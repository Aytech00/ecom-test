"use client"

import { saveProduct } from "@/utils/api";
import React from "react";
import { getSavedProducts } from "@/utils/api";
import { get } from "@/utils/apiClient";
import { useQuery } from "react-query";
import ProductCard from "../ui/product-card";
import Loader from "../loader";

const Saved = () => {
  const getSavedItems = async () => {
    const res = await get("/bookmarks");

    return res;
  };

  const { data, isLoading } = useQuery("getsavedproduct", getSavedItems);

  console.log(data);


  if(isLoading){
    return (
      <div className="p-5 flex items-center justify-center">
        <Loader style={{ position: "unset", top: "unset", left: "unset" }} />
      </div>
    );
  }
  return (
    <div>
      <section className="py-20 bg-gray-100">
        <div className="container">
          <div className="mb-14">
            <h3 className="font-bold text-3xl ">
             Your Saved Items
            </h3>
          </div>

        
            <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 ">
              {data && data?.map((product: productData, index: number) => (
                <ProductCard
                  id={product._id}
                  name={product.name}
                  slug={product.slug}
                  image={product.image}
                  status={product.status}
                  price={product.price}
                  mrpPrice={product.mrpPrice}
                  quantity={product.quantity}
                  unit={product.unit}
                  weight={product.weight}
                  userId={product.userId}
                  key={index}
                />
              ))}
            </div>

            {
                data && data.length === 0 && <div>
                    <p className="text-black italic flex justify-center items-center h-[50vh]">No saved item found!</p>
                </div>
            }
          
        </div>
      </section>
    </div>
  );
};

export default Saved;
