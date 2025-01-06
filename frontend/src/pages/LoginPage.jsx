import React, { useState } from "react";
import { motion } from "framer-motion";
import { login } from "../services/operation/authAPI";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password, navigate)();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-richblack-900 text-richblue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-richblack-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-caribbeangreen-100 mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-caribbeangreen-200 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-caribbeangreen-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white font-semibold rounded transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-caribbeangreen-500 hover:bg-caribbeangreen-400"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
        <p className="text-sm text-center text-richblue-100 mt-4">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-caribbeangreen-300 hover:text-caribbeangreen-200 underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
