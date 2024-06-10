import { MoonLoader } from "react-spinners";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyEnrollClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const email = user.email;
    const { data: studentClasses = [], isLoading } = useQuery({
        queryKey: ["studentClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/PaymentInfo/email/${email}`);
            return res.data;
        },
    });

    // console.log(studentClasses);

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
                <title>My Classes || Dashboard || Appon Classroom</title>
            </Helmet>
            <h1 className="text-center font-bold text-2xl mb-8">Your Classes</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Teacher Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentClasses.map((Class, index) => (
                            <tr key={Class._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="w-10 h-10 rounded-full">
                                        <img className="rounded-full" src={Class.image} alt="" />
                                    </div>
                                </td>
                                <td>{Class.title}</td>
                                <td>{Class.teacherName}</td>
                                <td>
                                    <Link to={`/dashboard/myenroll-class/${Class.classId}`}>
                                        <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4">Continue</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrollClasses;
