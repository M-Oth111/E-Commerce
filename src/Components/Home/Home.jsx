import axios from "axios";
import React, { useContext } from "react";
import ProductCard from "../productCard/productCard";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules"; 

import sora1 from '../../assets/images/slider-2.jpeg';
import sora2 from '../../assets/images/slider-image-1.jpeg';
import sora3 from '../../assets/images/slider-image-2.jpeg';
import sora4 from '../../assets/images/slider-image-3.jpeg';
import { CartContext } from "../Context/cartContext";

export default function Home() {
  const {addToCart}= useContext(CartContext)
  async function getProducts() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data.data;
  }
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  async function getCategories() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data.data; 
  }
  const { data: categories, isLoading: catLoad, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <>
      <div className="grid grid-cols-6 gap-4 p-5 container mx-auto">
        <div className="col-span-4">
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop={true} className="rounded-lg shadow-lg">
            <SwiperSlide><img src={sora4} alt="Slide 1" className="w-full h-96 object-cover rounded-lg" /></SwiperSlide>
            <SwiperSlide><img src={sora2} alt="Slide 2" className="w-full h-96 object-cover rounded-lg" /></SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-2">
          <img src={sora3} alt="Slide 3" className="w-full h-48 object-cover rounded-lg" />
          <img src={sora1} alt="Slide 4" className="w-full h-48 object-cover rounded-lg mt-2" />
        </div>
      </div>

      <div className="container mx-auto my-5">   {catLoad ? (
          <p className="text-center text-green-600 text-2xl">Loading categories...</p>
        ) : (
          <Swiper modules={[Navigation, Pagination]} slidesPerView={6} navigation pagination={{ clickable: true }} loop={true} className="rounded-lg shadow-lg">
            {categories?.map((category) => (
              <SwiperSlide key={category._id} className="text-center">
               
 <img src={category.image} alt="" className="h-60 w-full rounded-lg" />
                <h3 className="text-xl m-3 ">{category.name}</h3>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="container mx-auto">
        <h2 className="text-6xl font-bold text-gray-800 mb-5 text-center">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {isLoading ? (
            <p className="text-center text-green-700 text-4xl">Loading products...</p>
          ) : (
            products?.map((product) => <ProductCard product={product} key={product._id} />)
          )}
        </div>
      </div>
    </>
  );
}
