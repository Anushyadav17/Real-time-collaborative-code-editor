import { authEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const { SIGNUP_API, LOGIN_API} = authEndpoints;

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    navigate,
) {
    return async () => {
        const toastId = toast.loading("Loading...")
       
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });

           // console.log(response);

            if (!response.data.success) {
                console.log(response.data.message); // Changed this line
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful")

            //localStorage.setItem("user", JSON.stringify(response.data.user));
            
            // const user = JSON.parse(localStorage.getItem('user'));

            navigate("/login");

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    };
}

export function login(email, password, navigate) {
    return async () => {
        const toastId = toast.loading("Loading...")

        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            const response = await apiConnector("POST", LOGIN_API, {
                email, password,
            })

            //console.log("logn response..", response);

            if (!response.data.success) {
                //toast.error("Login Failed")
                throw new Error(response.data.message)
            }

            toast.success("Login Successfully")
            
            
            // const userImage = response.data?.user?.image
            // ? response.data.user.image
            // : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/")


        } catch(error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      //setUser(null);
      navigate("/")
      toast.success("Logged Out")
    }
  }