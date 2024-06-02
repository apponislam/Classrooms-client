import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="container mx-auto">
                <div className="flex justify-between items-center p-2">
                    <div className="skeleton h-12 w-28"></div>
                    <div className="items-center gap-2 hidden lg:flex">
                        <div className="skeleton h-9 w-14"></div>
                        <div className="skeleton h-9 w-20"></div>
                        <div className="skeleton h-9 w-36"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="skeleton h-12 w-20"></div>
                    </div>
                </div>
            </div>
        );
    }

    const navlinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/AllClass">All Classes</NavLink>
            </li>
            <li>
                <NavLink to="/technow">Tech on AP Classroom</NavLink>
            </li>
        </>
    );

    const logOutButton = () => {
        logOut()
            .then(() => {
                console.log("Successfully logged out");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                            {navlinks}
                        </ul>
                    </div>
                    <Link to="/" className="text-xl w-28">
                        <img src="/logo1.png" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">{navlinks}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <a tabIndex={0} role="button" id="clickable">
                                    <div className="w-12 h-12 rounded-full border border-blue-600">
                                        <img className="rounded-full p-1" src={user?.photoURL} alt="" />
                                    </div>
                                </a>
                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52 border border-[#00203f]">
                                    <p className="text-center mb-2 text-[#00203f]">Name: {user.displayName}</p>
                                    <Link to="/dashboard">
                                        <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white w-full border-0 rounded-2xl mb-2">Dashboard</button>
                                    </Link>
                                    <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white w-full border-0 rounded-2xl" onClick={logOutButton}>
                                        LogOut
                                    </button>
                                </ul>
                            </div>
                            {/* <Tooltip className="z-50 rounded-2xl bg-[#addfe1]" anchorSelect="#clickable" clickable>
                                <p className="text-center mb-2 text-white">{user.displayName}</p>
                                <Link to="/dashboard">
                                    <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white w-full border-0 rounded-2xl mb-4">Dashboard</button>
                                </Link>
                                <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white w-full border-0 rounded-2xl" onClick={logOutButton}>
                                    LogOut
                                </button>
                            </Tooltip> */}
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
