import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { WishlistContext } from '../Context/WishListContext'; // ✅ استيراد الكونتكست
import Slider from "react-slick";

export default function ProductDetails() {
  const { Wishlist, addWishlist, removeWishlist } = useContext(WishlistContext); // ✅ استخدام الكونتكست

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductDetails(res.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      const existsInWishlist = Wishlist.some((item) => item._id === productDetails._id);
      setIsInWishlist(existsInWishlist);
    }
  }, [Wishlist, productDetails]); // ✅ استخدام `productDetails`

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeWishlist(productDetails._id);
    } else {
      addWishlist(productDetails._id);
    }
    setIsInWishlist(!isInWishlist);
  };

  if (!productDetails) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-5 flex flex-nowrap gap-4 h-100vh pt-96">
<img classname="w-full h-full object-contain" src={productDetails.imageCover} alt="{productDetails.title}" />

      <div className="w-full md:w-3/4">
        <h1 className="text-4xl font-semibold mb-2">{productDetails.title}</h1>
        <p className="text-gray-600 mb-2 text-2xl">{productDetails.description}</p>
        <span className="block text-sm text-gray-500 mb-4">{productDetails.category?.name}</span>

        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold">{productDetails.price} EGP</span>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="text-lg font-medium">{productDetails.ratingsAverage}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="w-96 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Add to Cart
          </button>
          <button onClick={toggleWishlist}>
            <i className={`fa-heart text-3xl mx-3 ${isInWishlist ? "fa-solid text-red-500" : "fa-regular text-gray-400"}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
