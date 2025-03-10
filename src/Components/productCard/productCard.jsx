import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/cartContext";
import { WishlistContext } from "../Context/WishListContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { Wishlist, addWishlist, removeWishlist } = useContext(WishlistContext);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const existsInWishlist = Wishlist.some((item) => item._id === product._id);
    setIsInWishlist(existsInWishlist);
  }, [Wishlist, product._id]); 

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeWishlist(product._id);
    } else {
      addWishlist(product._id);
    }
    setIsInWishlist(!isInWishlist);
  };

  let stars = Math.floor(product.ratingsAverage);

  return (
    <div className="productCard bg-white border border-gray-200 rounded-lg shadow-sm ">
      <img
        className="p-8 rounded-t-lg w-full h-56 object-contain"
        src={product.imageCover}
        alt={product.name}
      />

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
          {product.name}
        </h5>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: stars }).map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>

          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ">
            {product.ratingsAverage}
          </span>

          <div className="ms-auto">
           
            <button onClick={toggleWishlist}>
              <i className={`fa-heart text-3xl mx-3 ${isInWishlist ? "fa-solid text-red-500" : "fa-regular "}`}></i>
            </button>

            <button>
              <Link to={`/ProductDetailes/${product._id}`}>
                <i className="fa-solid fa-circle-info text-3xl"></i>
              </Link>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product._id)}
            className="btn text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
