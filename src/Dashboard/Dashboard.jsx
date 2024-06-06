import { CgProfile } from "react-icons/cg";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClass, MdOutlineClass } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
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
                            <NavLink to="/dashboard/requests">
                                <FaChalkboardTeacher />
                                Teacher Request
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/users">
                                <FaUsers />
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/all-classes">
                                <SiGoogleclassroom />
                                All classes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-class">
                                <IoIosAddCircleOutline />
                                Add Class
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-class">
                                <MdClass />
                                My Class
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/myenroll-class">
                                <MdOutlineClass />
                                My enroll class
                            </NavLink>
                        </li>
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
