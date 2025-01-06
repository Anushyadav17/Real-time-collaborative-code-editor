import { motion } from "framer-motion";
import { useState } from "react";
import { signUp } from "../services/operation/authAPI";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleInputChange(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("All Fields are Required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        await signUp(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.confirmPassword,
          navigate
        )();

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
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-5">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-caribbeangreen-200 mb-1"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-caribbeangreen-200 mb-1"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
                            />
                        </div>
                    </div>
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
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-caribbeangreen-200 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-richblack-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-caribbeangreen-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading} // Disable the button when loading
                        className="w-full px-4 py-2 bg-caribbeangreen-500 hover:bg-caribbeangreen-400 text-white font-semibold rounded transition-all"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-sm text-center text-richblue-100 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-caribbeangreen-300 hover:text-caribbeangreen-200 underline"
                    >
                        Log In
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export { SignupPage };
