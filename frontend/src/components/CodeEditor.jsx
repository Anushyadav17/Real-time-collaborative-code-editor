import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
// import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { updateFile } from "../services/operation/fileAPI";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CodeEditor = ({ projectId, socketRef, codeRef, value, setValue, currentFile, setCurrentFile, files }) => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("java");

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  const [loading, setLoading] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    //setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  const onChange = (newValue) => {
    setValue(newValue);
    socketRef.current.emit("update code", { projectId, code: newValue });
  };

  const handleOnSave = async() => {
    setLoading(true);
    if(!currentFile) {
      toast.error("Please select the file first.");
    }
    else if(!value) {
      toast.error("Empty value cannot save.")
    }
    else {
      try {
        const response = await updateFile(currentFile, value, token);

        if(response !== null) {
          const updatedFiles = [
            ...files.filter(file => file._id !== currentFile),
            response
          ];

          const newFileId = response._id;
          
          socketRef.current.emit("file swap", { projectId, fileId: newFileId, files: updatedFiles });
          setCurrentFile(newFileId);
          setValue(value);
        }
      } catch (error) {
        toast.error("Error occurs in saving the file!")
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    setValue(codeRef.current);
    if (socketRef.current) {
      socketRef.current.on("syncing the code",( { code })  => {
        setValue(code);
      });

      socketRef.current.on("on code change", ({ code }) => {
        setValue(code);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("on code change");
      }
    };
}, [socketRef.current, codeRef.current]); // Empty dependency array to run only on mount and unmount

  
  return (
    <div className="w-[100%] h-[100%] flex text-white">
      {/* Code Editor Section */}
      <div className="flex flex-col w-[75%] h-full relative">
        {/* Language Selector */}
        <div className="p-1 flex justify-between">
          <LanguageSelector language={language} onSelect={onSelect} />

          <button
            className="px-4 py-1 text-m font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out text-white bg-richblack-700 hover:bg-richblack-500"
             onClick={handleOnSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Code"}
          </button>
        </div>

        {/* Code Editor */}
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="calc(100% - 42px)" // Adjust height to account for Language Selector
          theme="vs-dark"
          language={language}
          onMount={onMount}
          value={value}
          onChange={onChange}
        />
      </div>

      {/* Output Section */}
      <div className="w-[25%] h-[100%]">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;