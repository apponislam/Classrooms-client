import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import TeacherClassCard from "./TeacherClassCard";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const TeacherClasses = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const email = user.email;
    const {
        data: teacheClasses = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["teacheClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Classes/email/${email}`);
            return res.data;
        },
    });

    const deleteMyClass = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .delete(`/Classes/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Class has been deleted successfully",
                                icon: "success",
                            });
                            refetch();
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    };

    // console.log(teacheClasses);

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
                <title>Teacher Classes || Dashboard || Appon Classroom</title>
            </Helmet>
            <h1 className="text-center font-bold text-2xl mb-8">Your Created Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
                {teacheClasses.map((Class) => (
                    <TeacherClassCard key={Class._id} Class={Class} deleteMyClass={deleteMyClass}></TeacherClassCard>
                ))}
            </div>
        </div>
    );
};

export default TeacherClasses;
