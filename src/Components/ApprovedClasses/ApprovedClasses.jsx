import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import ApprovedClassCard from "./ApprovedClassCard";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const ApprovedClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const itemperPage = 10;
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

    const { data: approvedClasses = [], isLoading } = useQuery({
        queryKey: ["approvedClasses", currentPage, itemperPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Classes/Approved?page=${currentPage}&size=${itemperPage}`);
            return res.data;
        },
    });

    // console.log(approvedClasses);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="mx-4 xl:mx-0 my-10 md:my-20">
                <h1 className="text-center text-2xl font-bold mb-8">Classes - {count}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                    {approvedClasses.map((Class) => (
                        <ApprovedClassCard key={Class._id} Class={Class}></ApprovedClassCard>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-1 pagination mt-4">
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

export default ApprovedClasses;
