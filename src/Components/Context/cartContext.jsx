import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext =createContext();

export default function CartContextProvider(props){

    let [numOfCartItems ,setNumOfCartItems] =useState();
    let [allCartItems ,setallCartItems] =useState(null);
    let [totalPrice ,setTotalPrice] =useState();
    let [cartId ,setCartId] =useState();
    
    
    let headers = {
        token: localStorage.getItem('token'),
    };


    async function addToCart(productId){
        try{
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers})
            console.log(res)
            if(res?.data?.status == 'success'){
                toast.success(' product added  Successfully')
            }
            setNumOfCartItems(res.data.numOfCartItems);
        }
        catch(error){
            console.log(error,"errorrrr");
            toast.error('Somthing Went Wrong')

        }
        
    }


    async function getCartData(){
        try{
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
            console.log(res);
            if(res.data.status == 'success'){
                setallCartItems(res.data.data.products);
                setNumOfCartItems(res.data.numOfCartItems);
                setTotalPrice(res.data.totalCartPrice);
                setCartId(res.data.cartId);
            }
        }
        catch(error){
            console.log(error);
        }
        
    }

    async function updateProductCart(id, count) {
        try{updateProductCart
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count}, { headers });
            console.log(res);
            if(res.data.status == 'success'){
                setallCartItems(res.data.data.products);
                setTotalPrice(res.data.data.totalCartPrice);
                setNumOfCartItems(res.data.data.numOfCartItems);
            }
        }
        catch(error){
            console.log(error);
            
        }
        
    } 


    async function removeProductCart(id) {
        try{
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers });
            console.log(res);
            if(res.data.status == 'success'){
                setallCartItems(res.data.data.products);
                setTotalPrice(res.data.data.totalCartPrice);
                setNumOfCartItems(res.data.data.numOfCartItems);
            }
        }
        catch(error){
            console.log(error);
            
        }
        
    } 

    return <CartContext.Provider value= {{addToCart , numOfCartItems , getCartData , allCartItems , removeProductCart , totalPrice , updateProductCart , cartId,setNumOfCartItems }}>
        {props.children}
    </CartContext.Provider>
 }