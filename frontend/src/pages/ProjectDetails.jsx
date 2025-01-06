import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Example project data (Replace with API call)
  const projectData = {
    id: projectId,
    name: "Sample Project",
    owner: "John Doe",
    description: "This is a sample project showcasing dynamic routing and file handling.",
    files: [
      { id: "file1", name: "index.js", content: "console.log('Hello World');" },
      { id: "file2", name: "style.css", content: "body { background-color: #f0f0f0; }" },
      { id: "file3", name: "README.md", content: "# Sample Project\nThis is the README for the sample project." },
    ],
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleDeleteProject = () => {
    // Add API call to delete project
    alert("Project deleted successfully.");
    navigate("/rooms");
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="bg-richblack-900 text-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Project Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-caribbeangreen-100">{projectData.name}</h1>
          <p className="text-sm text-richblue-100">Owner: {projectData.owner}</p>
          <p className="mt-4 text-richblue-100">{projectData.description}</p>
        </div>

        {/* Files Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-caribbeangreen-200">Files</h2>
          <ul className="mt-4 space-y-2">
            {projectData.files.map((file) => (
              <li
                key={file.id}
                onClick={() => handleFileClick(file)}
                className="cursor-pointer bg-richblack-800 p-4 rounded hover:bg-richblack-700"
              >
                {file.name}
              </li>
            ))}
          </ul>
        </div>

        {/* File Content Viewer */}
        {selectedFile && (
          <div className="mb-6 bg-richblack-800 p-4 rounded">
            <h3 className="text-xl font-bold text-caribbeangreen-100">{selectedFile.name}</h3>
            <pre className="mt-4 bg-richblack-700 p-4 rounded overflow-auto">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        )}

        {/* Delete Project Button */}
        <button
          onClick={handleDeleteProject}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;