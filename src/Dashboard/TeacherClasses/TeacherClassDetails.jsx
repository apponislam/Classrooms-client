import { useContext, useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

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
        queryKey: ["userdatas"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Assignments/ClassId/${Class._id}`);
            return res.data;
        },
    });

    // console.log(assignments);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const addAssignment = (data) => {
        const date = format(startDate, "yyyy/MM/dd");
        axiosPublic
            .post("/Assignments", {
                classId: Class._id,
                assignmentTitle: data.assignmentTitle,
                description: data.description,
                marks: data.marks,
                date: date,
            })
            .then((res) => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Assignments added successfully");
                    axiosPublic.patch(`/Classes/assignments/${Class._id}`).then((response) => {
                        // console.log(response.data);
                        if (response.data.modifiedCount) {
                            // console.log("Assignment added");
                            navigate(`/dashboard/my-class/${Class._id}`);
                            refetch();
                        }
                    });
                }
            });
        document.getElementById("my_modal_7").close();
    };

    const [todayAssignments, setTodayAssignments] = useState([]);

    useEffect(() => {
        const today = new Date();
        const maindate = format(today, "yyyy/MM/dd");
        // console.log(maindate);
        const filteredAssignments = assignments.filter((assignment) => assignment.date === maindate);
        const otherAssignments = assignments.filter((assignment) => assignment.date !== maindate);
        // console.log(filteredAssignments);
        // console.log(otherAssignments);

        setTodayAssignments([...filteredAssignments, ...otherAssignments]);
    }, [assignments]);

    // console.log(todayAssignments);

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
                <title>{Class.title} | Dashboard | AP Classroom</title>
            </Helmet>
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
                <div className="flex items-center justify-between">
                    <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full" onClick={() => document.getElementById("my_modal_7").showModal()}>
                        <FaPlus /> Create Assignment
                    </button>
                    <Link to={`/dashboard/my-class/${Class._id}/videos`}>
                        <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full">
                            <FaPlus /> Manage Video
                        </button>
                    </Link>
                </div>

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

                            <div className="mb-4">
                                <input placeholder="Marks" type="number" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("marks", { required: "Marks is required" })} aria-invalid={errors.marks ? "true" : "false"} />
                                {errors.marks && (
                                    <p className="text-red-600" role="alert">
                                        {errors.marks.message}
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
                                <th>Marks</th>
                                <th>Submits</th>
                                <th>Last Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAssignments.map((assignment, index) => (
                                <tr key={assignment._id}>
                                    <th>{index + 1}</th>
                                    <td>{assignment.assignmentTitle}</td>
                                    <td>{assignment.description}</td>
                                    <td>{assignment.marks}</td>
                                    <td>{assignment?.submitedAssignments || 0}</td>
                                    <td>{assignment.date}</td>
                                    <td>
                                        <Link to={`/dashboard/my-class/assignment/${assignment._id}`}>
                                            <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4">Check</button>
                                        </Link>
                                    </td>
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
