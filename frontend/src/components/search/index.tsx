import { useState, useEffect } from "react";

import { getAllProducts } from "@/utils/api";

import ProductCard from "../ui/product-card";
import Loader from "../loader";
import Button from "../ui/button";

const Search = ({ q, category }: { q: string; category: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState<productData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoaded(false);

      const response = await getAllProducts(
        pageNumber,
        rowPerPage,
        q,
        "",
        category
      );
      const data = response.data;

      if (pageNumber >= response.totalPages) {
        setHasNextPage(false);
      }

      if (data.length === 0) {
        setHasNextPage(false);
      } else {
        setProducts([...(products as productData[]), ...data]);
        setPageNumber(pageNumber + 1);
      }
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreProducts = () => {
    fetchProducts();
  };

  return (
    <div className="container my-10">
      <h3 className="font-bold text-2xl">Search for {q ? q : category}</h3>

      {isLoaded && products ? (
        <>
          <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 mt-10">
            {products?.map((product: productData, index: number) => (
              <ProductCard
              status={product.status}
                id={product._id}
                name={product.name}
                slug={product.slug}
                image={product.image}
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
          {hasNextPage && (
            <Button onClick={fetchMoreProducts} className="mx-auto mt-5">
              Load More
            </Button>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Search;
