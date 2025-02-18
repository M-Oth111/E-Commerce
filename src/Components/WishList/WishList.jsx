import { useContext, useEffect } from "react";
import { WishlistContext } from "../Context/WishListContext";
import { CartContext } from "../Context/cartContext";

export default function Wishlist() {
  const { Wishlist, getWishlist, removeWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getWishlist(); 
  }, []); 

  return (
    <div className="container p-8 mx-auto w-full">
      <div className="mx-auto p-6 bg-gray-50 shadow-md rounded-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Wish List</h2>

        {Wishlist.length === 0 ? (
          <p className="text-gray-500 text-center">Wishlist is empty</p>
        ) : (
          <ul className="space-y-4">
            {Wishlist.map((product) => (
              <li key={product._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-3 rounded-lg shadow-sm h-auto md:h-32">
                <div className="flex items-center space-x-4 w-full">
                  <img src={product.imageCover} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex flex-col ml-4 w-full">
                    <h1 className="text-lg font-semibold my-2">{product.title}</h1>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-green-600 font-medium text-md">
                      <span className="text-black font-bold text-lg">Price: </span>{product.price} EGP
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    className="text-xl border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                    onClick={() => removeWishlist(product._id)}  >  Remove </button>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="text-xl border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition"  >  Add to Cart</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
