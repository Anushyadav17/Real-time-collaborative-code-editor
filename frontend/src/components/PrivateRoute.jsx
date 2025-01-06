import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

    // Check if the token exists
    if (!token) {
        toast.error("Access denied");
        return <Navigate to="/" replace />; // Redirect to the form or home page
    }

    return children; // Allow access to the protected page
};

export default PrivateRoute;
