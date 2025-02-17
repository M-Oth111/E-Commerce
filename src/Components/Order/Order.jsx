import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';

export default function Order() { 
  const { cartId } = useContext(CartContext);
  const [paymentWay, setPaymentWay] = useState(null);
  const navigate = useNavigate();

  async function HandleSubmit(values) {
    if (paymentWay === 'cash') {
      await orderCash(values);
    } else if (paymentWay === 'visa') {
      await orderVisa(values);
    }
    console.log(values);
  }

  async function orderCash(values) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        {
          headers: { token: localStorage.getItem('token') },
        }
        
      );
      setTimeout(() => {
        navigate("/AllOrders");
      }, 2000);
     
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function orderVisa(values) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        values,
        {
          headers: { token: localStorage.getItem('token') },
        }
      ); if (response.data?.session?.url) {
        window.open(response.data.session.url, '_blank'); }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: '',
        phone: '',
        city: '',
      },
    },
    onSubmit: HandleSubmit,
  });

  return (
    <div className="container mx-auto">
      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5 w-full">
          <label htmlFor="det" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Details
          </label>
          <input
            onChange={(e) => formik.setFieldValue('shippingAddress.details', e.target.value)}
            type="text"
            name="details"
            id="det"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="tele" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone
          </label>
          <input
            onChange={(e) => formik.setFieldValue('shippingAddress.phone', e.target.value)}
            type="text"
            name="phone"
            id="tele"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City
          </label>
          <input
            onChange={(e) => formik.setFieldValue('shippingAddress.city', e.target.value)}
            type="text"
            name="city"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

       
        <button
          type="submit"
          onClick={() => setPaymentWay('cash')}
          className="border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition m-4"
        >    Cash Order</button>

        <button
          type="submit"
          onClick={() => setPaymentWay('visa')}
          className="border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition m-4" >   Visa Order
        </button>
      </form>
    </div>
  );
}
