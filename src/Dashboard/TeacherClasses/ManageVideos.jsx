import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageVideos = () => {
    const { user } = useContext(AuthContext);
    const Class = useLoaderData();
    const axiosPublic = useAxiosPublic();
    // console.log(Class);
    // console.log(user);

    const {
        data: videos = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["classVideo"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Classvideos/ClassId/${Class._id}`);
            return res.data;
        },
    });

    // console.log(videos);

    const [error, setError] = useState();
    const [error2, setError2] = useState();
    const addVideo = (e) => {
        e.preventDefault();
        const videoLink = e.target.video.value;
        const videoTitle = e.target.videoTitle.value;
        // console.log(videoLink);
        if (!videoLink.trim()) {
            setError("Video Link is required");
            return;
        }
        if (!videoTitle.trim()) {
            setError2("Video Title is required");
            return;
        }
        axiosPublic
            .post("/Classvideos", {
                classId: Class._id,
                title: Class.title,
                name: user.displayName,
                email: user.email,
                videoLink: videoLink,
                videoTitle: videoTitle,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Video Added");
                    refetch();
                }
            });
        setError("");
        e.target.reset();
        document.getElementById("my_modal_5").close();
    };

    const updateVideo = (e, video, modalLink) => {
        e.preventDefault();
        const videoLink = e.target.video.value;
        const videoTitle = e.target.videoTitle.value;
        // console.log(videoLink);
        if (!videoLink.trim()) {
            setError("Video Link is required");
            return;
        }

        axiosPublic
            .patch(`/Classvideos/ClassId/Update/${video._id}`, {
                videoLink: videoLink,
                videoTitle: videoTitle,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // Check if an update occurred
                    toast.success("Video Link Updated");
                    refetch();
                } else {
                    toast.error("Update failed. No changes made.");
                }
            })
            .catch((error) => {
                console.error("Error updating video link:", error);
                toast.error("Failed to update video link");
            });

        setError("");
        e.target.reset();

        document.getElementById(modalLink).close();
    };

    const deleteMyVideo = (id) => {
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
                    .delete(`/Classvideos/delete/${id}`)
                    .then((res) => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Good!",
                                text: "Video has been deleted successfully",
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
            <Helmet>
                <title>Manage Video | {Class.title} | Dashboard | AP Classroom</title>
            </Helmet>
            <div>
                <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full" onClick={() => document.getElementById("my_modal_5").showModal()}>
                    <FaPlus /> Add Video
                </button>
                <dialog id={`my_modal_5`} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box border-2 border-[#00203f] rounded-2xl shadow-2xl p-3 xl:p-4">
                        <h3 className="font-bold text-2xl text-center my-4">Submit Link</h3>
                        <form method="dialog" className="absolute top-6 right-4">
                            <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full ">
                                <IoMdClose />
                            </button>
                        </form>

                        <form method="dialog" onSubmit={addVideo}>
                            <div>
                                <p className="text-yellow-600 my-2" role="alert">
                                    Make sure you are pasting valid YouTube Link
                                </p>
                                <input placeholder="Video Title" name="videoTitle" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f] mb-2" />
                                {error2 && (
                                    <p className="text-red-600 my-2" role="alert">
                                        {error2}
                                    </p>
                                )}
                                <textarea name="video" placeholder="Video Link" type="text" className="p-2 h-24 input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" />
                                {error && (
                                    <p className="text-red-600 my-2" role="alert">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button type="submit" className="mt-2 text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">
                                Add Video
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>

            <h1 className="font-bold text-center text-2xl my-5">Videos</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Video Title</th>
                            <th>Video Link</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <tr key={video._id}>
                                <th>{index + 1}</th>
                                <td>{video?.name}</td>
                                <td>{video?.videoTitle}</td>
                                <td>{video?.videoLink}</td>
                                <td>
                                    <button className="btn w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => document.getElementById(`my_modal_${index + 100}`).showModal()}>
                                        Update
                                    </button>
                                    <dialog id={`my_modal_${index + 100}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box border-2 border-[#00203f] rounded-2xl shadow-2xl p-3 xl:p-4">
                                            <h3 className="font-bold text-2xl text-center my-4">Submit Assignment</h3>
                                            <form method="dialog" className="absolute top-6 right-4">
                                                <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full ">
                                                    <IoMdClose />
                                                </button>
                                            </form>

                                            <form method="dialog" onSubmit={(e) => updateVideo(e, video, `my_modal_${index + 100}`)}>
                                                <div>
                                                    <p className="text-yellow-600 my-2" role="alert">
                                                        Make sure you are pasting valid YouTube Link
                                                    </p>
                                                    <input placeholder="Video Title" name="videoTitle" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f] mb-2" />
                                                    {error2 && (
                                                        <p className="text-red-600 my-2" role="alert">
                                                            {error2}
                                                        </p>
                                                    )}
                                                    <textarea name="video" placeholder="Video Link" type="text" className="p-2 h-24 input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" />
                                                    {error && (
                                                        <p className="text-red-600 my-2" role="alert">
                                                            {error}
                                                        </p>
                                                    )}
                                                </div>
                                                <button type="submit" className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mt-2">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    </dialog>
                                </td>
                                <td>
                                    <button onClick={() => deleteMyVideo(video._id)} className="btn w-full bg-red-600 hover:bg-red-700 text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageVideos;
