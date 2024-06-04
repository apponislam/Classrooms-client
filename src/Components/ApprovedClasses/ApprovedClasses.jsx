import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import ApprovedClassCard from "./ApprovedClassCard";

const ApprovedClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: approvedClasses = [], isLoading } = useQuery({
        queryKey: ["approvedClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/Classes/Approved");
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
                <h1 className="text-center text-2xl font-bold mb-8">All Classes</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                    {approvedClasses.map((Class) => (
                        <ApprovedClassCard key={Class._id} Class={Class}></ApprovedClassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApprovedClasses;
