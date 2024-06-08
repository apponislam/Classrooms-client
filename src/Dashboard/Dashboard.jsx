import { CgProfile } from "react-icons/cg";
import { FaChalkboardTeacher, FaHome, FaUsers } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClass, MdOutlineClass } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const email = user.email;
    // console.log(email);
    const { data: mainuser = [], isLoading } = useQuery({
        queryKey: ["mainuser"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Users/email/${email}`);
            return res.data;
        },
    });

    const [prolieuser] = mainuser;

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    // console.log(prolieuser?.role);

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify-start">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="border w-10 h-10 rounded-xl flex items-center justify-center m-2 border-[#00203f] p-2 drawer-button lg:hidden">
                        <RxHamburgerMenu className="text-xl" />
                    </label>
                    <div className="m-2 md:m-4">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#00203f] text-white text-xl gap-2">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink to="/">
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                        {prolieuser?.role === "admin" && (
                            <li>
                                <NavLink to="/dashboard/requests">
                                    <FaChalkboardTeacher />
                                    Teacher Request
                                </NavLink>
                            </li>
                        )}
                        {prolieuser?.role === "admin" && (
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers />
                                    Users
                                </NavLink>
                            </li>
                        )}
                        {prolieuser?.role === "admin" && (
                            <li>
                                <NavLink to="/dashboard/all-classes">
                                    <SiGoogleclassroom />
                                    All classes
                                </NavLink>
                            </li>
                        )}

                        {prolieuser?.role === "teacher" && (
                            <li>
                                <NavLink to="/dashboard/add-class">
                                    <IoIosAddCircleOutline />
                                    Add Class
                                </NavLink>
                            </li>
                        )}
                        {prolieuser?.role === "teacher" && (
                            <li>
                                <NavLink to="/dashboard/my-class">
                                    <MdClass />
                                    My Class
                                </NavLink>
                            </li>
                        )}
                        {prolieuser?.role === "student" && (
                            <li>
                                <NavLink to="/dashboard/myenroll-class">
                                    <MdOutlineClass />
                                    My enroll class
                                </NavLink>
                            </li>
                        )}

                        <li>
                            <NavLink to="/dashboard/my-profile">
                                <CgProfile />
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
