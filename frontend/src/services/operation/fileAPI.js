import { apiConnector } from "../apiConnector";
import { fileEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {CREATE_FILE_API, GET_PROJECT_FILE_API, UPDATE_FILE_API, DELETE_FILE_API} = fileEndpoints;

export const createFile = async(projectId, fileName, content, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            CREATE_FILE_API,
            {projectId, fileName, content},
            {
                Authorisation: `Bearer ${token}`,
            },
        )

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("File created successfully.");
        result = response?.data?.data;
        
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

export const getFiles = async(projectId, token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector(
            "POST",
            GET_PROJECT_FILE_API,
            {projectId},
            {
                Authorisation: `Bearer ${token}`,
            },
        )

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("File Fetch Successfully");
        result = response?.data?.data;
        
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

export const updateFile = async(fileId, content, token) => {
        const toastId = toast.loading("Loading...")
        let result = null;
        try {
            const response = await apiConnector("POST", UPDATE_FILE_API,
                {
                    fileId,
                    content,
                },
                {
                    Authorisation: `Bearer ${token}`,
                },
            )

           // console.log(response);
    
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            result = response?.data?.data;
            toast.success("File updated successfully.")
        } 
        catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
        toast.dismiss(toastId);
        return result;
}

// deleteFile function: Properly handles the async call and returns the response or an error
export async function deleteFile(fileId, token) {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "POST",
            DELETE_FILE_API,
            { fileId },
            {
                Authorization: `Bearer ${token}`, // Fixed the typo to Authorization
            }
        );

        if (!response.data.success) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }

        
        toast.success("File deleted successfully");
        return response;  // Return the response to handle in the calling function

    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred");
        return null;  // Return null to indicate failure
    } finally {
        toast.dismiss(toastId);  // Ensure this is called after the response or error
    }
}


