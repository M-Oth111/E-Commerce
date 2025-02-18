import axios from "axios";
import { useState, useEffect, createContext } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const [Wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getWishlist() {
        setLoading(true);
        try {
            const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("token") },
            });
            setWishlist(res.data.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to fetch wishlist!");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getWishlist();
    }, []);

    async function addWishlist(productId) {
        try {
            await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", 
                { productId }, 
                { headers: { token: localStorage.getItem("token") } }
            );
            toast.success("Product added to Wishlist!");

            setWishlist((prevWishlist) => [...prevWishlist, { _id: productId }]);

        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add product!");
        }
    }

    async function removeWishlist(productId) {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem("token") },
            });
            toast.success("Product removed from Wishlist!");

            setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== productId));

        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove product!");
        }
    }

    const isInWishlist = (productId) => Wishlist.some(item => item._id === productId);

    return (
        <WishlistContext.Provider value={{ Wishlist, getWishlist, addWishlist, removeWishlist, isInWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    );
}
