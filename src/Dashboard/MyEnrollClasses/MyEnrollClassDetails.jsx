import { FaPlay, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
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

    const {
        data: assignments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["usersclass"],
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
                }
            });
        document.getElementById("my_modal_7").close();
    };

    // const {
    //     register: submitAssignment,
    //     formState: { errors: error },
    //     reset,
    //     handleSubmit: handleSubmit2,
    // } = useForm();
    const [error, setError] = useState("");
    const submitAssignmentbtn = (e, assignment, modalID) => {
        e.preventDefault();
        console.log(assignment);
        console.log(modalID);
        const assignmentLink = e.target.assignment.value;
        // console.log(assignmentLink);
        if (!assignmentLink.trim()) {
            // Set error message if assignment link is empty
            setError("Assignment Link is required");
            console.log(error);
            return;
        }

        axiosPublic
            .post("/AssignmentsSubmit", {
                name: user.displayName,
                email: user.email,
                assignmentId: assignment._id,
                classId: assignment.classId,
                assignmentLink: assignmentLink,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    // console.log(res.data.insertedId);
                    // const newAssignment = res.data.insertedId;
                    // console.log(newAssignment);
                    axiosPublic.patch(`/Classes/assignmentsubmits/${Class._id}`).then((response) => {
                        // console.log(response.data);
                        // console.log(assignment);
                        if (response.data.modifiedCount) {
                            toast.success(`${assignment.assignmentTitle} Assignment Submitted`);
                            axiosPublic.put(`/Assignments/Submits/${assignment.classId}`, { email: user.email, assignmentTitle: assignment.assignmentTitle }).then((response) => {
                                console.log(response.data);
                                if (response.data.modifiedCount) {
                                    refetch();
                                }
                            });
                        }
                    });
                }
            });

        setError("");
        e.target.reset();

        document.getElementById(modalID).close();
    };

    // console.log(user);

    // const submitAssignmentBtn = (e) => {
    //     // console.log(e);
    //     axiosPublic.patch(`/Classes/assignmentsubmits/${Class._id}`).then((response) => {
    //         // console.log(response.data);
    //         if (response.data.modifiedCount) {
    //             toast.success(`${e.assignmentTitle} Assignment Submitted`);
    //             axiosPublic.put(`/Assignments/Submits/${e.classId}`, { email: user.email }).then((response) => {
    //                 // console.log(response.data);
    //                 if (response.data.modifiedCount) {
    //                     refetch();
    //                 }
    //             });
    //         }
    //     });
    // };

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
                <div className="flex items-center justify-between">
                    <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full" onClick={() => document.getElementById("my_modal_7").showModal()}>
                        <FaPlus /> FeedBack Us
                    </button>
                    {/* /dashboard/myenroll-class/:id/Videos */}
                    <Link to={`/dashboard/myenroll-class/${Class._id}/Videos`}>
                        <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full">
                            Continue watching <FaPlay />
                        </button>
                    </Link>
                </div>

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
                                <textarea placeholder="Description" type="text" className="p-3 h-32 input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("description", { required: "Description is required" })} aria-invalid={errors.password ? "true" : "false"} />
                                {errors.description && (
                                    <p className="text-red-600 my-2" role="alert">
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
                                    <th>Total Marks</th>
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
                                        <td>{assignment.marks}</td>
                                        <td>{assignment.date}</td>
                                        <td>
                                            {assignment?.submittedEmails?.includes(user.email) ? (
                                                <button className="text-gray-500 bg-gray-300 btn w-full" disabled>
                                                    Submitted
                                                </button>
                                            ) : (
                                                <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full" onClick={() => document.getElementById(`my_modal_${index + 9}`).showModal()}>
                                                    Submit
                                                </button>
                                            )}
                                            <dialog id={`my_modal_${index + 9}`} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box border-2 border-[#00203f] rounded-2xl shadow-2xl p-3 xl:p-4">
                                                    <h3 className="font-bold text-2xl text-center my-4">Submit Assignment</h3>
                                                    <form method="dialog" className="absolute top-6 right-4">
                                                        <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full ">
                                                            <IoMdClose />
                                                        </button>
                                                    </form>

                                                    <form method="dialog" onSubmit={(e) => submitAssignmentbtn(e, assignment, `my_modal_${index + 9}`)}>
                                                        <div>
                                                            <textarea name="assignment" placeholder="Assignment Link" type="text" className="p-2 h-24 input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" />
                                                            {error && (
                                                                <p className="text-red-600 my-2" role="alert">
                                                                    {error}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <button type="submit" className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">
                                                            Submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </dialog>
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
