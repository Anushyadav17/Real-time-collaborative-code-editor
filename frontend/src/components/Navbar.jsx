import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/operation/authAPI";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-richblack-800 z-50 shadow-md">
      <nav className="max-w-maxContent mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-caribbeangreen-200"
        >
          CodeEditor
        </motion.div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-richblue-100">
          {["Home", "Features", "Testimonials", "Get Started"].map((item) => (
            <motion.li
              whileHover={{ scale: 1.1, color: "#5EEAD4" }}
              className="cursor-pointer"
              key={item}
            >
              <button
                className="hover:text-caribbeangreen-100"
                onClick={() => (window.location.href = `/`)}
              >
                {item}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* User Section */}
        {user ? (
          <div className="relative flex items-center gap-x-1">
            {/* Dropdown Icon */}
            <AiOutlineCaretDown
            className="text-sm text-richblack-100 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
            />
            {/* Profile Image */}
            <img
              src={user?.image || "/default-profile.png"} // Fallback image
              alt={`profile-${user?.firstName || "user"}`}
              className="aspect-square w-[30px] rounded-full object-cover"
              onClick={() => setOpen((prev) => !prev)}
            />

            {/* Dropdown Menu */}
            {open && (
              <div
                ref={ref}
                className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
              >
                {/* Dashboard Link */}
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-x-1 py-[10px] px-[10px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                    <VscDashboard className="text-lg" />
                    Profile
                  </div>
                </Link>

                {/* Logout Button */}
                <div
                  onClick={() => {
                    // Handle logout logic here
                    setOpen(false);
                    logout(navigate)();
                  }}
                  className="flex items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 cursor-pointer"
                >
                  <VscSignOut className="text-lg" />
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          // Login Button
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-caribbeangreen-500 hover:bg-caribbeangreen-400 rounded"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </motion.button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
