import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "https://classroom-server-mocha.vercel.app",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
