import { MoonLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Users = () => {
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const itemperPage = 10;
    const numberOfPages = Math.ceil(count / itemperPage);
    const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // console.log(currentPage, itemperPage);

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users", currentPage, itemperPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/Users?page=${currentPage}&size=${itemperPage}`);
            return res.data;
        },
    });

    const [showIndexes, setShowIndexes] = useState([]);

    useEffect(() => {
        users.forEach((_, index) => {
            setTimeout(() => {
                setShowIndexes((prevIndexes) => [...prevIndexes, index]);
            }, index * 200);
        });
    }, [users]);

    const makeAdmin = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make him the admin",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/Users/${id}`, {
                        role: "admin",
                    })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Admin has been created.",
                                icon: "success",
                            });
                            refetch();
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Users | Dashboard | AP Classroom</title>
            </Helmet>
            <h1 className="text-center text-3xl font-bold">Total Users: {count}</h1>
            <div>
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className={`slideup ${showIndexes.includes(index) ? "show" : ""}`} style={{ animationDelay: `${index * 0.2}s` }}>
                                    <th>{currentPage * itemperPage + index + 1}</th>
                                    <td>
                                        <div className="w-10 h-10 rounded-full">
                                            <img className="object-cover w-10 h-10 rounded-full" src={user.imagelink} alt="" />
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => makeAdmin(user._id)} disabled={user.role === "admin"} className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4">
                                            Make Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center gap-1 pagination my-4">
                    {/* <p>Cuttent Page {currentPage}</p> */}
                    <button onClick={prevPage} className="btn text-[#00203f] bg-[#adefd1] h-auto hover:bg-[#adefd1] hover:text-[#00203f]">
                        Prev
                    </button>
                    {pages.map((page, index) => (
                        <button onClick={() => setCurrentPage(page)} key={index} className={`w-10 h-10 text-[#00203f] bg-[#adefd1] ${currentPage === page && "selected"} hover:bg-[#00203f] hover:text-white btn`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={nextPage} className="btn text-[#00203f] bg-[#adefd1] h-auto hover:bg-[#adefd1] hover:text-[#00203f]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;
