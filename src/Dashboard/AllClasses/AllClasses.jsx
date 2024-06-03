import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import ClassItemA from "./ClassItemA";
import Swal from "sweetalert2";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: allClasses = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["allClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/Classes");
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
            <h1 className="text-center text-2xl font-bold mb-8">All Class For Review</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                {allClasses.map((Class) => (
                    <ClassItemA key={Class._id} Class={Class} approveBtn={approveBtn} rejectedBtn={rejectedBtn}></ClassItemA>
                ))}
            </div>
        </div>
    );
};

export default AllClasses;
