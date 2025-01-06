import { motion } from "framer-motion";
import Navbar from "../components/Navbar";


// Profile page component
const Profile = () => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  if (!user) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="font-inter bg-richblack-900 text-white w-full min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <section className="py-16 bg-richblack-800">
        <div className="max-w-4xl mx-auto bg-richblack-700 p-8 rounded-lg shadow-lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            {/* User Profile Image */}
            <img
              src={user.image || "https://via.placeholder.com/150"} // Default to placeholder if no image
              alt="User Profile"
              className="w-32 h-32 rounded-full border-4 border-caribbeangreen-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-caribbeangreen-200 mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-lg text-richblue-200 mb-4">{user.email}</p>

            <div className="border-t border-richblue-400 pt-4">
              <h3 className="text-xl font-medium text-caribbeangreen-300">Profile Details</h3>
              <div className="mt-4 space-y-3">
                <p className="text-richblue-200">
                  <strong>First Name:</strong> {user.firstName}
                </p>
                <p className="text-richblue-200">
                  <strong>Last Name:</strong> {user.lastName}
                </p>
                <p className="text-richblue-200">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-richblack-700 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-maxContent mx-auto flex flex-col sm:flex-row justify-between text-richblue-100"
        >
          <p>&copy; 2024 CodeEditor. All rights reserved.</p>
          <ul className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <motion.li
                whileHover={{ color: "#5EEAD4" }}
                key={item}
                className="cursor-pointer hover:text-caribbeangreen-300"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </footer>
    </div>
  );
};

export default Profile;