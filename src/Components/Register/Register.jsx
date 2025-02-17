

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  let [msg, setMessage] = useState(null);
  let navigate = useNavigate(); 
let [Loading,setLoading]=useState(false)
  let validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Minimum 3 characters required'),
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    password: yup.string().required('Password is required').matches(/^[a-zA-Z0-9]{6,30}$/, 'Password must be between 6 to 30 characters'),
    rePassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    phone: yup.string()
      .required('Phone number is required')
      .matches(/^01[0-9]{9}$/, "Phone number must be 11 digits and start with '01'"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: async (values) => {

      setLoading(true)
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        console.log(response.data);
        setTimeout(() => {
          navigate('/Login')},1500);
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred. Please try again.');
        }
      }
      finally{
        setLoading(false)
      }
    }
  });

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group"> 
        <label htmlFor="floating_first_name" className="absolute text-sm text-gray-500">Name</label>
          <input
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
            type="text" name="name" id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
            placeholder=" " required
          />
         
          {formik.touched.name && formik.errors.name ? <p className="text-red-500 text-sm">{formik.errors.name}</p> : null}
        </div>
        
        <div className="relative z-0 w-full mb-5 group"> 
        <label htmlFor="floating_email" className="absolute text-sm text-gray-500">Email address</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            type="email" name="email" id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
            placeholder=" " required
          />
         
          {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-sm">{formik.errors.email}</p> : null}
        </div>

        <div className="relative z-0 w-full mb-5 group"> 
        <label htmlFor="floating_password" className="absolute text-sm text-gray-500">Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
            type="password" name="password" id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
            placeholder=" " required
          />
         
          {formik.touched.password && formik.errors.password ? <p className="text-red-500 text-sm">{formik.errors.password}</p> : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
           <label htmlFor="floating_repeat_password" className="absolute text-sm text-gray-500">Confirm password</label>
           <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}
            type="password" name="rePassword" id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
            placeholder=" " required
          />
         
          {formik.touched.rePassword && formik.errors.rePassword ? <p className="text-red-500 text-sm">{formik.errors.rePassword}</p> : null}
        </div>

        <div className="relative z-0 w-full mb-5 group"> 
        <label htmlFor="floating_phone" className="absolute text-sm text-gray-500">Phone number</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
            type="tel" name="phone" id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
            placeholder=" " required
          />
         
          {formik.touched.phone && formik.errors.phone ? <p className="text-red-500 text-sm">{formik.errors.phone}</p> : null}
        </div>
        
        {msg && <p className="text-red-500 text-sm mb-3">{msg}</p>}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{Loading?'Loading ...':'Submit'}</button>
      </form>
    </>
  );
}
