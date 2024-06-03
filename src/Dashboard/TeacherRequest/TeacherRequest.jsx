import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import TeacherCard from "./TeacherCard";
import Swal from "sweetalert2";

const TeacherRequest = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: teacherPending = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/PendingUsers");
            return res.data;
        },
    });

    const approveBtn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to accept",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .patch(`/PendingUsers/${id}`, {
                        role: "teacher",
                        status: "accepted",
                    })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Teacher has been accepted",
                                icon: "success",
                            });
                            refetch();
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    };

    const rejectedBtn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject the request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .patch(`/PendingUsers/${id}`, {
                        role: "student",
                        status: "rejected",
                    })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Teacher has been rejected",
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
            <h1 className="text-center font-bold text-2xl">Review Teacher Request</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                {teacherPending.map((teacher) => (
                    <TeacherCard key={teacher._id} teacher={teacher} approveBtn={approveBtn} rejectedBtn={rejectedBtn}></TeacherCard>
                ))}
            </div>
        </div>
    );
};

export default TeacherRequest;
