import React from "react";
import { motion } from "framer-motion"; 
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  const navigate = useNavigate();
  

  function onClickCreate() {
    if(token === null) {
      navigate("/login");
    }
    else {
      navigate("/create-project");
    }
  }

  function onCLickJoin() {
    if(token === null) {
      navigate("/login");
    }
    else {
      navigate("/join-project");
    }
  }
  
  return (
    <div className="md:m-0 md:p-0 relative text-center font-inter bg-richblack-900 text-white w-[100%]">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-richblue-900 to-richblue-700 text-center py-20">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4 text-caribbeangreen-100"
        >
          Code Smarter, Learn Faster
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-8 text-richblue-100"
        >
          Experience the future of coding with live collaboration and real-time feedback.
        </motion.p>
        {/* Add the Create Room and Join Room buttons */}
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 bg-caribbeangreen-500 hover:bg-caribbeangreen-400 rounded mr-4"
            onClick={onClickCreate}
          >
            Create Room
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 bg-caribbeangreen-500 hover:bg-caribbeangreen-400 rounded"
            onClick={onCLickJoin}
          >
            Join Room
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-richblack-800">
        <motion.div
          className="max-w-maxContent mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-caribbeangreen-200">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { 
                title: "Syntax Highlighting", 
                desc: "CodeEditor uses advanced algorithms to highlight syntax in real time, helping you spot errors quickly. It supports multiple languages including JavaScript, Python, and C++."
              },
              { 
                title: "Real-time Collaboration", 
                desc: "Work with other developers in real-time. See changes made by your teammates instantly, making collaboration seamless for remote teams."
              },
              { 
                title: "Built-in Debugging", 
                desc: "Find and fix bugs directly within the editor. Integrated debugging tools help you isolate issues in your code, improving your workflow."
              },
              { 
                title: "Code Formatting", 
                desc: "Automatically format your code according to industry-standard practices. No more worrying about indentation, spacing, or style inconsistencies."
              },
              { 
                title: "Version Control Integration", 
                desc: "Integrates with Git and other version control systems, allowing you to push, pull, and manage repositories directly from the editor."
              },
              { 
                title: "Customizable Themes", 
                desc: "Choose from a variety of themes or create your own. With CodeEditor, you can personalize the look and feel of your editor to match your style."
              }
            ].map((feature, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-richblack-700 rounded shadow hover:shadow-lg"
                key={index}
              >
                <h3 className="text-xl font-bold text-caribbeangreen-100">{feature.title}</h3>
                <p className="text-richblue-100">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 bg-richblue-900 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-caribbeangreen-200"
        >
          Live Demo
        </motion.h2>
        <p className="text-richblue-100 mb-6">Try the interactive code editor right here!</p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-richblack-700 mx-auto max-w-4xl rounded p-4"
        >
          <code className="block text-left text-richblue-100">
            {`function greet() {\n  console.log("Hello, World!");\n}`}
          </code>
        </motion.div>
        <p className="text-richblue-100 mt-4">Click the button below to see the code in action:</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-4 px-6 py-3 bg-caribbeangreen-500 hover:bg-caribbeangreen-400 rounded"
        >
          Run Code
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="bg-richblack-800 py-6">
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
                className="cursor-pointer hover:text-caribbeangreen-100"
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

export default Home;
