import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
    const { projectId } = useParams();
    const token = localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null;


    if (!token) {
        toast.error("You need to log in to access this page.");
        return <Navigate to="/" replace />;
    }

    let decodedToken;
    try {
        decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    } catch (error) {
        console.error("Invalid token:", error);

        toast.error("Invalid or expired token.");
        return <Navigate to="/" replace />;
    }

    const { projectId: tokenProjectId } = decodedToken;

    if (tokenProjectId !== projectId) {
        toast.error("Access denied to this room");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;


