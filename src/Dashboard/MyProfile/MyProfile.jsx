import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    const email = user.email;
    console.log(email);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-4/5 md:w-1/2 border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                <h1>this is</h1>
            </div>
        </div>
    );
};

export default MyProfile;
