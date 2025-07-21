import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
})

const useAxiosSecure = () => {
    const {signOutUser} = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(function (config){
        // request interceptor
        const token = localStorage.getItem("access-token")
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

    //   response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
      },async function(error) {
        const status = error.response.status;
        if(status === 401 || status === 403){
           await signOutUser()
            navigate("/login")
        }
        
        return Promise.reject(error);
      });


    return axiosSecure;
};

export default useAxiosSecure;