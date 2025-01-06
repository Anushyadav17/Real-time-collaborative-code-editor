import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { joinProject } from "../services/operation/projectAPI";

const JoinProject = () => {
  const [formData, setFormData] = useState({
    id: "",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const userId = user._id;
  
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await joinProject(formData.id, userId, token, navigate)();
    } catch(error) {
      //console.log(error);
    }

    setLoading(false);
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
          Join Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-caribbeangreen-200 mb-1"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
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
            {loading ? "Loading..." : "Join Project"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default JoinProject;
