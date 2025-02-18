import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';

export default function Cart() {
  const { getCartData, allCartItems, removeProductCart, totalPrice, updateProductCart } = useContext(CartContext);
  
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      {allCartItems?.length === 0 ? (
        <div className='p-6 text-red-600 text-lg text-center'>Cart Is Empty</div>
      ) : (
        <div className='container mx-auto p-5'>
          <div className='flex justify-between mb-5'>
            <div>
              <h2 className='text-4xl font-semibold'>Cart Shop</h2>
              <h2 className='text-xl text-green-600 mt-2'>Total Price: {totalPrice} EGP</h2>
            </div>
            <Link to={'/order'}>
              <button className='text-2xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-3'>
                Check Out
              </button>
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {allCartItems?.map((item) => (
              <div key={item.product.id} className='flex items-center bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:bg-gray-50'>
                <img src={item.product.imageCover} className='h-32 w-32 object-cover rounded-lg' alt='' />
                <div className='flex-col px-4 ms-auto'>
                  <h3 className='text-lg font-semibold text-gray-900'>{item.product.title}</h3>
                  <div className='flex items-center my-2'>
                    <button onClick={() => updateProductCart(item.product.id, item.count - 1)} className='px-2 py-1 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300'>
                      -
                    </button>
                    <span className='mx-4'>{item.count}</span>
                    <button onClick={() => updateProductCart(item.product.id, item.count + 1)} className='px-2 py-1 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300'>
                      +
                    </button>
                  </div>
                  <h3 className='mt-2 font-semibold text-gray-900'>{item.price} EGP</h3>
                  <button onClick={() => removeProductCart(item.product.id)} className='mt-2 text-red-600 hover:underline'>
                    Remove From Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
