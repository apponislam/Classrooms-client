import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import ClassItemA from "./ClassItemA";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const itemperPage = 9;
    const numberOfPages = Math.ceil(count / itemperPage);
    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);

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

    const {
        data: allClasses = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["allClasses", currentPage, itemperPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Classes?page=${currentPage}&size=${itemperPage}`);
            return res.data;
        },
    });
    // console.log(allClasses);

    const approveBtn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approve",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .patch(`/Classes/${id}`, {
                        status: "approved",
                    })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Class has been approved",
                                icon: "success",
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    const rejectedBtn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .patch(`/Classes/${id}`, {
                        status: "rejected",
                    })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Class has been rejected",
                                icon: "success",
                            });
                            refetch();
                        }
                    });
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
                <title>All Classes || Dashboard || Appon Classroom</title>
            </Helmet>
            <h1 className="text-center text-2xl font-bold mb-8">Classes For Review: {count}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                {allClasses.map((Class) => (
                    <ClassItemA key={Class._id} Class={Class} approveBtn={approveBtn} rejectedBtn={rejectedBtn}></ClassItemA>
                ))}
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
    );
};

export default AllClasses;
