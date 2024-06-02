import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MoonLoader } from "react-spinners";

const AfterSignIn = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    if (!user) {
        return children;
    }

    // if (successLogin) {
    //     toast.success("Login successfully");
    //     console.log("Successfully logged");
    // }

    return (
        <div>
            <Navigate to={location?.state ? location.state : "/"}></Navigate>
        </div>
    );
};

AfterSignIn.propTypes = {
    children: PropTypes.node,
};

export default AfterSignIn;
