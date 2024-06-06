import { useContext, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";

const TeacherClassDetails = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const Class = useLoaderData();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

    const {
        data: assignments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Assignments/ClassId/${Class._id}`);
            return res.data;
        },
    });

    console.log(assignments);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const addAssignment = (data) => {
        console.log(data);
        const date = format(startDate, "yyyy/MM/dd");
        console.log(date);
        // const maindate = dates.split("/");
        // const year = parseInt(maindate[0]);
        // const month = parseInt(maindate[1]);
        // const day = parseInt(maindate[2]);
        // console.log(year, month, day);

        axiosPublic
            .post("/Assignments", {
                classId: Class._id,
                assignmentTitle: data.assignmentTitle,
                description: data.description,
                date: date,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Assignments added successfully");
                    axiosPublic.patch(`/Classes/assignments/${Class._id}`).then((response) => {
                        console.log(response.data);
                        if (response.data.modifiedCount) {
                            console.log("Assignment added");
                            navigate(`/dashboard/my-class/${Class._id}`);
                            refetch();
                        }
                    });
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-4">
                <div className="border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl text-center mb-4 font-bold">Total Enrollment</h1>
                    <p className="text-center text-xl">{Class.enroll}</p>
                </div>
                <div className="border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl text-center mb-4 font-bold">Total Assignments</h1>
                    <p className="text-center text-xl">{Class.assignments}</p>
                </div>
                <div className="border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl text-center mb-4 font-bold">Total Submits</h1>
                    <p className="text-center text-xl">{Class.submitedAssignments}</p>
                </div>
            </div>

            <div>
                <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full" onClick={() => document.getElementById("my_modal_7").showModal()}>
                    <FaPlus /> Create
                </button>
                <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box border-2 border-[#00203f] rounded-2xl shadow-2xl p-3 xl:p-4">
                        <h3 className="font-bold text-2xl text-center my-4">Create Assignment</h3>
                        <form method="dialog" className="absolute top-6 right-4">
                            <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full ">
                                <IoMdClose />
                            </button>
                        </form>

                        <form method="dialog" onSubmit={handleSubmit(addAssignment)}>
                            <div className="mb-4">
                                <input disabled type="text" defaultValue={user.displayName} className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" />
                            </div>

                            <div className="mb-4">
                                <input placeholder="Assignment Title" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("assignmentTitle", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                                {errors.assignmentTitle?.type === "required" && (
                                    <p className="text-red-600" role="alert">
                                        Assignment Title is required
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <input placeholder="Description" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("description", { required: "Description is required" })} aria-invalid={errors.password ? "true" : "false"} />
                                {errors.description && (
                                    <p className="text-red-600" role="alert">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <ReactDatePicker className="input input-bordered mb-4 border-[#00203f] border text-[#00203f] placeholder:text-[#00203f] w-full" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect />
                            </div>

                            {/* <input className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full" type="submit" value="Add assignment" /> */}
                            <button type="submit" className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">
                                Add assignment
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>

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
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={assignment._id}>
                                    <th>{index + 1}</th>
                                    <td>{assignment.assignmentTitle}</td>
                                    <td>{assignment.description}</td>
                                    <td>{assignment.date}</td>
                                    {/* <td>
                                        <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4">Continue</button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherClassDetails;
