import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-3xl md:text-6xl text-center font-bold mb-8"> Welcome To Dashboard</h1>
            <p className="text-center font-medium text-xl md:text-2xl">Hi! {user.displayName}. You can manage your datas from here </p>
        </div>
    );
};

export default DashboardHome;
