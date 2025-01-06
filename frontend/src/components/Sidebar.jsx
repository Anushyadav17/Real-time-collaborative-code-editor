import React, { useEffect, useState } from "react";
import { LuFiles } from "react-icons/lu";
import { IoPeople } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5"; // Leave Icon
import { FaCopy, FaPlusCircle } from "react-icons/fa"; // Copy Icon
import {MdDelete} from "react-icons/md"
import {toast} from "react-hot-toast"

const Sidebar = ({ 
  members, 
  handleLeave, 
  projectId, 
  files,
  setFiles, 
  fileLoading, 
  handleCreateFile, 
  socketRef, 
  setCurrentFile, 
  currentFile,
  handleDeleteFile, 
  onSwapFileHandle
  }) => {
  const [section, setSection] = useState(false);

  const onFileClick = () => setSection(true);
  const onMemberClick = () => setSection(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(projectId);
    toast.success("Project Id copied to clipboard!");
  };

  const [formData, setFormData] = useState({
    Name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateFile(projectId, formData.Name);

    setFormData({Name: ""});
  };

  const onDeleteHandle = async(fileId) => {
    await handleDeleteFile(fileId);
  }

  useEffect(() => {
    if(socketRef.current) {
      socketRef.current.on("file swap", ({fileId, files}) => {
       // console.log("fileSwap to ", fileId)
        if(!fileId) {
          setCurrentFile(files[0]._id)
        }
        else {
          setCurrentFile(fileId);
        }
        setFiles(files);
      })
    }
  }, [files]);
  //files, socketRef, setCurrentFile

  return (
    <div className="flex w-[100%] h-[100vh] text-white border border-richblack-800 bg-richblack-900">
      {/* Vertical Icon Section */}
      <div className="flex flex-col items-center w-[60px] py-4 border-r border-richblack-700 bg-richblack-800 relative">
        <div
          className={`text-3xl cursor-pointer mb-6 transition duration-300 ${
            section ? "text-white" : "text-richblack-500"
          }`}
          onClick={onFileClick}
        >
          <LuFiles />
        </div>
        <div
          className={`text-3xl cursor-pointer mb-6 transition duration-300 ${
            !section ? "text-white" : "text-richblack-500"
          }`}
          onClick={onMemberClick}
        >
          <IoPeople />
        </div>
        <div className="relative group mt-auto mb-4">
          <button
            onClick={handleLeave}
            className="flex items-center justify-center w-10 h-10 bg-errorRed-500 text-white rounded-full hover:bg-errorRed-400 transition duration-200"
            //title="Leave"
          >
            <IoExitOutline className="text-base" />
          </button>
          <span className="absolute left-[110%] top-1/2 -translate-y-1/2 bg-richblack-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Leave
          </span>
        </div>
        <div className="relative group">
          <button
            onClick={copyRoomId}
            className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition duration-200"
            //title="Copy ID"
          >
            <FaCopy className="text-base" />
          </button>
          <span className="absolute left-[110%] top-1/2 -translate-y-1/2 bg-richblack-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Copy ID
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-4 overflow-hidden w-[100%]">
        {/* Files Section */}
        <div
          className={`px-2 flex-1 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-richblack-600 scrollbar-track-transparent ${
            section ? "" : "hidden"
          }`}
        >
          <form  onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 pb-4 border-b border-richblack-700 mb-4">
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Enter file name..."
              value={formData.Name}
              onChange={handleInputChange}
              required
              className="w-full sm:flex-1 px-3 py-2 border border-richblack-500 rounded-lg bg-richblack-900 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-green-600 text-white font-medium rounded-lg hover:bg-Green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 text-base"
            >
              <FaPlusCircle className="text-lg" />
              Create
            </button>
          </form>
          {/* list of files */}
          {
            fileLoading ? (
              <div>
                Loading...
              </div>
            ) : (
              files.map((file) => (
                <div key={file._id} className="w-[100%] flex group">
                  {/* file names */}
                  <button 
                    className={`flex w-[90%] text-[16px] text-richblack-50 ${currentFile === file._id ? "bg-richblack-800 text-richblack-50" : ""}`}
                    onClick={() => onSwapFileHandle(file._id)}
                    id={file._id}
                  >
                    <div className={`h-[22px] w-[0.15rem] bg-richblack-50 ${currentFile === file._id ? "opacity-100" : "opacity-0" }`} />
                    {file.fileName}
                  </button>
              
                  {/* delete button (visible only on hover of parent div) */}
                  <button 
                    className="w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => onDeleteHandle(file._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))
              
            )
          }
        </div>

        {/* Members List */}
        <div
          className={`px-4 flex-1 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-richblack-600 scrollbar-track-transparent ${
            section ? "hidden" : ""
          }`}
        >
          <h4 className="text-xl text-gray-400 mb-4 font-bold">Connected Members</h4>
          <ul>
            {members.map((member) => (
              <li
                key={member.firstName + member.lastName}
                className="flex items-center justify-between gap-4 py-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://api.dicebear.com/5.x/initials/svg?seed=${member.firstName} ${member.lastName}`}
                    alt={member.firstName}
                    className="h-10 w-10 rounded-full"
                  />
                  <span>{member.firstName} {member.lastName}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
