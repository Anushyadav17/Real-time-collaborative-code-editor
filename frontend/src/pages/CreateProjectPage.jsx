import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/operation/projectAPI";

const CreateProjectPage = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user._id;

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
      await createProject(userId, formData.projectName, formData.description, formData.createdAt, token, navigate)();
    } catch (error) {
      console.error("Project creation failed:", error);
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
          Create New Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-caribbeangreen-200 mb-1"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-caribbeangreen-200 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="createdAt"
              className="block text-sm font-medium text-caribbeangreen-200 mb-1"
            >
              Creation Date
            </label>
            <input
              type="date"
              id="createdAt"
              name="createdAt"
              value={formData.createdAt}
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
            {loading ? "Loading..." : "Create Project"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProjectPage;
