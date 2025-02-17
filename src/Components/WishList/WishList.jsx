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
            <div className=" mx-auto p-6 bg-gray-50 shadow-md rounded-md">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6"> Wish List</h2>

                {Wishlist.length === 0 ? (
                    <p className="text-gray-500 text-center"> wishlist is empty</p>
                ) : (
                    <ul className="space-y-4">
                        {Wishlist.map((product) => (
                            <li key={product._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex items-center space-x-4">
<img src={product.imageCover} alt="{product.name}" classname="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                    <h1 className="text-4xl font-semibold my-9">{product.title}</h1>
        <p className="text-gray-600 my-9 text-2xl">{product.description}</p>
                                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-green-600 font-medium text-lg"> <span className="text-black font-bold text-xl">Price :</span> {product.price} EGP</p>
                                       
                                    </div>
                                </div> 
                                
                                <button 
                                            className="ms-auto text-2xl  border border-red-500 text-red-500 px-4 py-4 rounded-lg hover:bg-red-500 hover:text-white transitionflex items-center space-x-1  mx-5"
                                            onClick={() => removeWishlist(product._id)}
                                        >
                                            <span> Remove</span>
                                        </button>
                                <button 
                                    onClick={() => addToCart(product._id)} 
                                    className="border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
