import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import { createFile, deleteFile, getFiles } from "../services/operation/fileAPI";

const EndPoint = "http://localhost:4000";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); 

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  
  const [userlist, setUserlist] = useState([]);
  const socketRef = useRef(null); 

  const codeRef = useRef(null);

  const [fileLoading, setFileLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [value, setValue] = useState("");

  function handleLeave() {
    if (socketRef.current) {
      socketRef.current.disconnect();
      localStorage.removeItem("accessToken");
      navigate("/", { replace: true });
    }
  }  

  const handleCreateFile = async(projectId, fileName) => {
    const content = "";
    const response = await createFile(projectId, fileName, content, token);

    if(response !== null) {
      files.push(response);
      socketRef.current.emit("file swap", { projectId, fileId: currentFile, files });
    }
    return ;
  }

  const handleDeleteFile = async(fileId) => {
    const response = await deleteFile(fileId, token);

    if(response !== null && response?.data?.success !== false) {
      //console.log("inside uppdate")
      const updatedFiles = files.filter(file => file._id !== fileId);
      socketRef.current.emit("file swap", { projectId, fileId: currentFile, files: updatedFiles });
    }
    return ;
  }

  const onChangeFile = (fileId) => {
    const foundFile = files.find(file => file._id === fileId);

    if(currentFile !== null && foundFile) {
      const newValue = foundFile.content;
      setValue(newValue);
      socketRef.current.emit("update code", { projectId, code: newValue });
    }
  };

  function onSwapFileHandle (fileId) {
    onChangeFile(fileId);
    socketRef.current.emit("file swap", { projectId, fileId, files });
  }

  useEffect(() => {
    const fetchFiles = async() => {
      setFileLoading(true);
      try {
        const response = await getFiles(projectId, token);
        setFiles(response);
      } catch (error) {
        handleLeave();
      }
      
      setFileLoading(false);
    }
    fetchFiles();
  }, []);


  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(EndPoint);

    socketRef.current.on("connect_error", (error) => {
      //console.error("Connection error:", error);
      toast.error("Failed to connect to the server. Please try again later.");
      navigate("/", { replace: true });
    });

    socketRef.current.on("updating client list", ({ userslist, currFile }) => {
      //console.log("Received userslist:", userslist);
      //console.log("Received currFile", currFile)
      setCurrentFile(currFile)
      setUserlist(userslist);
    });

    // Notify server when the user joins the room
    socketRef.current.emit("when user join the room", projectId, user);

    socketRef.current.on("on code change", ({ code, currFile }) => {
      //console.log("curr file", currFile);
      if(!currFile) {
        setCurrentFile(files[0]._id)
      }
      else {
        setCurrentFile(currFile);
      }
      codeRef.current = code;
    });

    socketRef.current.on("when user join the room", ({ user: joinedUser }) => {
      if (joinedUser._id !== user._id) { // Prevent notifying about self
        toast.success(`${joinedUser.firstName} joined the room`);
      }
    });

    socketRef.current.on("member left", ({ user }) => {
      toast.success(`${user.firstName} left the room`);
    });

    // Cleanup socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);


  return (
    <div className="text-white flex h-screen">
      {/* sidebar section */}
      <div className="w-[350px]">
        <Sidebar 
          members={userlist} handleLeave={handleLeave} 
          projectId={projectId} files={files} setFiles={setFiles}  
          fileLoading={fileLoading} handleCreateFile={handleCreateFile}
          socketRef={socketRef}  setCurrentFile={setCurrentFile}
          currentFile={currentFile} handleDeleteFile={handleDeleteFile}
          onSwapFileHandle={onSwapFileHandle}
        />
      </div>

      {/* code editor section */}
      <div className="w-[90%]">
       <CodeEditor projectId={projectId} socketRef={socketRef} codeRef={codeRef} value={value} 
        setValue={setValue}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        files={files}
        setFiles={setFiles}
      />
      </div>
    </div>
  );
};

export default ProjectPage;
