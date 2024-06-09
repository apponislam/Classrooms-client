import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: "https://classroom-server-mocha.vercel.app",
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut, setLoading } = useContext(AuthContext);

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("token");
            config.headers.authorization = token;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (error) => {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                await logOut();
                setLoading(false);
                navigate("/signin");
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
