import { useState } from "react";
import { executeCode } from "./api";
import {apiConnector} from "../services/apiConnector"
import {toast} from "react-hot-toast"

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("output");
  const [aiResponse, setAiResponse] = useState(null);
  const [prompt, setPrompt] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setErrorMessage(result.stderr || "");
    } catch (error) {
      //console.log(error);
      setIsError(true);
      setErrorMessage(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  const genrateAiResponse = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }
    setIsLoading(true);
    try {
      const res = await apiConnector("POST", "/api/v1/ai/ai-chat", { prompt });
      //console.log(res);
      if (res?.data?.response) {
        setAiResponse(res.data.response);
      } else {
        setAiResponse("No valid response from the AI.");
      }
    } catch (error) {
      //console.error("Error:", error);
      setAiResponse("Error generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[100%] h-full max-w-full bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center p-6 py-3 justify-start space-x-10 mb-4 border-b border-gray-700 pb-3">
        <div
          className={`cursor-pointer pb-3 ${activeTab === "output" ? "border-b-4 border-green-500" : ""}`}
          onClick={() => setActiveTab("output")}
        >
          <p className={`text-xl ${activeTab === "output" ? "text-green-400" : "text-gray-400"}`}>Output</p>
        </div>
        <div
          className={`cursor-pointer pb-3 ${activeTab === "ai" ? "border-b-4 border-green-500" : ""}`}
          onClick={() => setActiveTab("ai")}
        >
          <p className={`text-xl ${activeTab === "ai" ? "text-green-400" : "text-gray-400"}`}>AI Assistant</p>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "output" && (
        <div className="px-1 h-[calc(100vh-100px)]">
          <div className="w-[100%] flex justify-center mb-4">
            <button
              className="px-4 py-2 text-m font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out text-white bg-richblack-700 hover:bg-richblack-500"
              onClick={runCode}
              disabled={isLoading}
            >
              {isLoading ? "Running..." : "Run Code"}
            </button>
          </div>
          <div
            className={`h-[100%] w-[280px] overflow-y-auto rounded-lg transition-all duration-300 text-[14px] 
              ${isError ? "text-red-600" : "bg-gray-800 text-white"}`}
          >
            {output
              ? output.map((line, i) => <p key={i}>{line}</p>)
              : 'Click "Run Code" to see the output here'}
            {isError && errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="h-[calc(100vh-100px)] overflow-y-auto p-2 bg-gray-800 text-white rounded-lg">
          <textarea
            className="w-full mb-4 p-2 bg-gray-900 text-white rounded-md bg-richblack-700"
            rows="3"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="px-4 py-2 text-m font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out text-white bg-richblack-700 hover:bg-richblack-500"
            onClick={genrateAiResponse}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
          {aiResponse && (
            <div className="mt-4  bg-gray-900 rounded-md">
              <p className="text-green-400 font-bold">AI Response:</p>
              <p className="text-[14px]">{aiResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Output;
