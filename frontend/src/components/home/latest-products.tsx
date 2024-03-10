"use client";
import { useState, useEffect } from "react";

// API
import { getAllProducts } from "@/utils/api";

// Components
import ProductCard from "../ui/product-card";
import Loader from "../loader";


const LatestProducts = () => {
	const [products, setProducts] = useState<productData[] | null>(null);

	useEffect(() => {
		getProductsData();
	}, []);

	const getProductsData = async () => {
		try {
			const response = await getAllProducts(1, 5);
			
			setProducts(response.data);
		} catch (error) {
			setProducts([]);
		}
	};

	return (
    <section className="py-20 bg-gray-100">
      <div className="container">
        <div className="mb-14">
          <h3 className="font-bold text-2xl md:text-3xl ">Explore Latest products</h3>
        </div>

        {products ? (
          <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 ">
            {products?.map((product: productData, index: number) => (
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
        ) : (
          <div className="p-5 flex items-center justify-center">
            <Loader
              style={{ position: "unset", top: "unset", left: "unset" }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;
