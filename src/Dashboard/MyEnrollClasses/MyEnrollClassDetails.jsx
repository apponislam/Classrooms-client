import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const MyEnrollClassDetails = () => {
    const { user } = useContext(AuthContext);
    const Class = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    // console.log(Class);

    const { data: assignments = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Assignments/ClassId/${Class._id}`);
            return res.data;
        },
    });

    // console.log(assignments);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const addFeedback = (data) => {
        console.log(data, rating);
        // const maindate = dates.split("/");
        // const year = parseInt(maindate[0]);
        // const month = parseInt(maindate[1]);
        // const day = parseInt(maindate[2]);
        // console.log(year, month, day);
        axiosPublic
            .post("/feedback", {
                classId: Class._id,
                title: Class.title,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                description: data.description,
                rating: rating,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Feedback Given");
                    navigate("/dashboard/myenroll-class/");
                    // axiosPublic.patch(`/Classes/assignmentsubmits/${Class._id}`).then((response) => {
                    //     console.log(response.data);
                    //     if (response.data.modifiedCount) {
                    //         console.log("Assignment added");
                    //     }
                    // });
                }
            });
        document.getElementById("my_modal_7").close();
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
            <div>
                <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full" onClick={() => document.getElementById("my_modal_7").showModal()}>
                    <FaPlus /> Create
                </button>
                <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box border-2 border-[#00203f] rounded-2xl shadow-2xl p-3 xl:p-4">
                        <h3 className="font-bold text-2xl text-center my-4">Feedback Us</h3>
                        <form method="dialog" className="absolute top-6 right-4">
                            <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full ">
                                <IoMdClose />
                            </button>
                        </form>

                        <form method="dialog" onSubmit={handleSubmit(addFeedback)}>
                            <div className="">
                                <textarea placeholder="Description" type="text" className="h-32 input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("description", { required: "Description is required" })} aria-invalid={errors.password ? "true" : "false"} />
                                {errors.description && (
                                    <p className="text-red-600" role="alert">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <ReactStars count={5} value={rating} onChange={handleRatingChange} size={24} activeColor="#ffd700" />
                                <p>Your rating: {rating}</p>
                            </div>
                            {/* <input className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full" type="submit" value="Add assignment" /> */}
                            <button type="submit" className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">
                                Review
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>

            <div>
                <div>
                    <h1 className="font-bold text-center text-2xl my-5">Assignments</h1>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Assignment Title</th>
                                    <th>Description</th>
                                    <th>Last Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, index) => (
                                    <tr key={assignment._id}>
                                        <th>{index + 1}</th>
                                        <td>{assignment.assignmentTitle}</td>
                                        <td>{assignment.description}</td>
                                        <td>{assignment.date}</td>
                                        <td>
                                            <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4">Submit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEnrollClassDetails;
