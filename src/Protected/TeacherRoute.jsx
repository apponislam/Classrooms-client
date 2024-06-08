import PropTypes from "prop-types";
import { useContext } from "react";
import { MoonLoader } from "react-spinners";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TeacherRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const email = user?.email;
    const { data: mainuser = [], isLoading } = useQuery({
        queryKey: ["mainuser"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Users/email/${email}`);
            return res.data;
        },
    });

    if (isLoading || loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    const [prolieuser] = mainuser;

    if (prolieuser?.role === "teacher" || prolieuser?.role === "admin") {
        return children;
    }

    return (
        <div>
            <Navigate to={location?.state ? location.state : "/"}></Navigate>
        </div>
    );
};

TeacherRoute.propTypes = {
    children: PropTypes.node,
};

export default TeacherRoute;
