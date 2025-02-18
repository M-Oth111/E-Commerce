import axios from "axios";
import React from "react";
import ProductCard from "../productCard/productCard";
import { useQuery } from "react-query";


export default function Home() {
  async function getProducts() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data.data;
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (

<>
 

 
    <div className="container mx-auto">
    <h2 className="text-6xl font-bold text-gray-800 mb-5 text-center my-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {isLoading ? (
          <p className="text-center text-gray-700 ">Loading products...</p>
        ) : (
          products?.map((product) => <ProductCard product={product} key={product._id} />)
        )}
      </div>
    </div>
 </> );
}
