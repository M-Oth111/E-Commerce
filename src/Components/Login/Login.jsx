import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { aouthContext } from "../Context/AouthContext";

export default function Login() {
  const [msg, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(aouthContext);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),});

  const formik = useFormik({
    initialValues: { email: "",password: "",},
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        setMessage("Login successful!");

        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="container mx-auto" onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <label htmlFor="email"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your email </label><input
          type="email"
          id="email"
          name="email"
          className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div className="mb-5">
        <label htmlFor="password"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (<p className="text-red-500 text-sm">{formik.errors.password}</p> )}
      </div>

      {msg && <p className="text-green-500 text-sm mb-3">{msg}</p>}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Submit"}
      </button>

      <div className=" my-9">
        <Link to="/forget-password" className="text-red-600 hover:underline my-20"> Forgot Your Password?</Link>
      </div>
    </form>
  );
}
