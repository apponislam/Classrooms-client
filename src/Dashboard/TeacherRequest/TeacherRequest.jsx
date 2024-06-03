import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MoonLoader } from "react-spinners";
import TeacherCard from "./TeacherCard";

const TeacherRequest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: teacherPending = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/PendingUsers");
            return res.data;
        },
    });

    const approveBtn = (id) => {
        console.log(id);
    };

    const rejectedBtn = (id) => {
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
