import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";

const Total = () => {
    const axiosPublic = useAxiosPublic();

    const { data: approvedClasses = [], isLoading } = useQuery({
        queryKey: ["approvedClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/Classes/Approved");
            return res.data;
        },
    });

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/Users");
            return res.data;
        },
    });

    const totalEnroll = approvedClasses.reduce((accumulator, currentValue) => accumulator + currentValue.enroll, 0);
    // console.log(totalEnroll);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="mb-8 md:mb-24">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-center mx-2 md:mx-4">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b border-[#00203f] pb-5 mb-4">
                            <h1 className="text-3xl font-bold mb-4 text-center">Total User</h1>
                            <p className="text-xl text-center">{users.length}</p>
                        </div>
                        <div className="border-b border-[#00203f] pb-5 mb-4">
                            <h1 className="text-3xl font-bold mb-4 text-center">Total Classes</h1>
                            <p className="text-xl text-center">{approvedClasses.length}</p>
                        </div>
                        <div className="border-b border-[#00203f] pb-5 mb-4">
                            <h1 className="text-3xl font-bold mb-4 text-center">Total Enrollment</h1>
                            <p className="text-xl text-center">{totalEnroll}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img className="w-full rounded-full object-cover" src="total.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Total;
