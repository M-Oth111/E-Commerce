import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function CategoryList() {
  async function getCategories() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data.data;
  }

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <p className="text-center text-gray-700 dark:text-white">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching categories</p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className=" text-2xl font-bold text-gray-800 dark:text-white mb-5">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <div key={category._id} className=   "productCard bg-white\0 shadow-md rounded-lg p-4 text-center">
               
               <img src={category.image} alt="" className="h-64 w-full rounded-lg" />
                <h3 className="text-xl m-3 ">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
