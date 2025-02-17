import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function ForgetPassword() {
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
        setMsg("A reset link has been sent to your email. Redirecting...");

        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      } catch (error) {
        setMsg(error.response?.data?.message || "An error occurred!!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container mx-auto w-96 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Forget Password
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {msg && <p className="text-green-500 text-sm mb-3">{msg}</p>}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </div>
  );
}
