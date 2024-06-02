import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import ClassItemA from "./ClassItemA";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allClasses = [], isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get("/Classes");
            return res.data;
        },
    });
    // console.log(allClasses);

    const approveBtn = (id) => {
        console.log(id);
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
            <h1 className="text-center text-2xl font-bold mb-8">All Class For Review</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                {allClasses.map((Class) => (
                    <ClassItemA key={Class._id} Class={Class} approveBtn={approveBtn}></ClassItemA>
                ))}
            </div>
        </div>
    );
};

export default AllClasses;
