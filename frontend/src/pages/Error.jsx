import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-richblue-900 text-center px-6">
      <h1 className="text-8xl font-bold text-richblue-200">404</h1>
      <p className="mt-4 text-3xl font-mono text-caribbeangreen-200">
        Page Not Found
      </p>
      <p className="mt-2 text-lg text-richblue-300">
        The page you are looking for might have been moved, deleted, or doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-8 py-3 text-lg bg-richblue-400 hover:bg-richblue-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-110"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error;
