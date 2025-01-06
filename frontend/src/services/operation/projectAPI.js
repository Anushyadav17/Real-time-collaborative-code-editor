import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { projectEndpoints } from "../apis"; 

const { CREATE_PROJECT_API, PROJECT_DETAILS, FIND_PROJECT } = projectEndpoints;

export function createProject(userId, projectName, description, createdAt, token, navigate) {
    return async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "POST",
                CREATE_PROJECT_API,
                { userId, projectName, description, createdAt },
                {
                    Authorisation: `Bearer ${token}`,
                },
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            localStorage.setItem("accessToken", JSON.stringify(response?.data?.accessToken));

            toast.success("Project Created Successfully");
            navigate(`/project/${response.data.data._id}`);
        } 
        catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } 
        finally {
            toast.dismiss(toastId);
        }
    };
}

export const joinProject = async(projectId, userId, token, navigate) => {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", FIND_PROJECT, 
        {projectId, userId}, 
        {
            Authorisation: `Bearer ${token}`,
        });

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        //setting member array into localstoarge
        localStorage.setItem("accessToken", JSON.stringify(response?.data?.accessToken));

        toast.success("Project Joined...");
        navigate(`/project/${projectId}`)
    } catch(error) {
        console.log(error);
        toast.error(error.response.data.message || "An error occurred")
    }
    toast.dismiss(toastId);
}

export const getProjectDetails = async(projectId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            PROJECT_DETAILS,
            {projectId},
            {
                Authorisation: `Bearer ${token}`,
            },
        )

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Project Fetch Successfully");
        result = response?.data?.data;
        
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

