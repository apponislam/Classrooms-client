import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import { FaUserEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { updateUser, user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const email = user.email;
    // console.log(email);
    const {
        data: mainuser = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["mainuser"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Users/email/${email}`);
            return res.data;
        },
    });

    const [prolieuser] = mainuser;
    console.log(prolieuser._id);

    const [imageUrl, setImageUrl] = useState(prolieuser.imagelink);

    const uploadImage = (file) => {
        const formData = new FormData();
        formData.append("image", file);

        axios
            .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGAPI}`, formData)
            .then((response) => {
                setImageUrl(response.data.data.display_url);
                setValue("image", response.data.data.display_url);
                // console.log(response);
                console.log(response.data.data.display_url);
            })
            .catch((error) => console.error(error));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    // console.log(imageUrl);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm();
    const updateMainUser = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Update",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update",
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(data.name, data.image)
                    .then(() => {
                        console.log("Profile Updated Successfully");
                        axiosPublic.put(`/updateUser/${prolieuser._id}`, data).then((response) => {
                            // console.log(response.data);
                            if (response.data.modifiedCount) {
                                refetch();
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        // An error occurred
                        // ...
                    });
            }
        });
        document.getElementById("my_modal_77").close();
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    // axiosPublic.get(`/Users/email/${email}`).then((res) => console.log(res.data));

    return (
        <div className="flex justify-center items-center h-screen">
            <Helmet>
                <title>My Profile | Dashboard | AP Classroom</title>
            </Helmet>
            <div className="w-full md:w-1/2 border border-[#00203f] p-4 rounded-2xl shadow-2xl" data-aos="zoom-in-down">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 flex flex-col items-center justify-center relative w-full">
                        <img className="rounded-full w-48 h-48 mb-4 object-cover" src={prolieuser.imagelink} />
                        <div className="uppercase font-bold">
                            Role: <span className="text-green-600">{prolieuser.role}</span>
                        </div>
                        <FaUserEdit className="absolute top-0 right-0 text-2xl" onClick={() => document.getElementById("my_modal_77").showModal()} />

                        <dialog id="my_modal_77" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box border-2 border-[#00203f] rounded-2xl shadow-2xl p-3 xl:p-4">
                                <h3 className="font-bold text-2xl text-center my-4">Update Profile</h3>
                                <form method="dialog" className="absolute top-6 right-4">
                                    <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white rounded-full ">
                                        <IoMdClose />
                                    </button>
                                </form>

                                <form method="dialog" onSubmit={handleSubmit(updateMainUser)}>
                                    <div className="flex flex-col items-center justify-center relative w-full">
                                        <img className="rounded-full w-28 h-28 mb-4 object-cover" src={imageUrl} />
                                    </div>

                                    <div className="mb-4">
                                        <input placeholder="Name" defaultValue={prolieuser.name} type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("name", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                                        {errors.name?.type === "required" && (
                                            <p className="text-red-600" role="alert">
                                                Name is required
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <input placeholder="Number" defaultValue={prolieuser.number} type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("number", { required: "Description is required" })} aria-invalid={errors.password ? "true" : "false"} />
                                        {errors.number && (
                                            <p className="text-red-600" role="alert">
                                                {errors.number.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input w-full border-[#00203f] border" />
                                        <input
                                            type="hidden"
                                            {...register("image", { required: true })}
                                            aria-invalid={errors.image ? "true" : "false"}
                                            defaultValue={imageUrl} // Hidden field to store image URL
                                        />
                                        {errors.image && (
                                            <p className="text-red-600" role="alert">
                                                Image is required
                                            </p>
                                        )}
                                    </div>

                                    <button type="submit" className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </div>
                <div>
                    <p>
                        Name: <span className="font-bold">{prolieuser.name}</span>
                    </p>
                    <p>
                        Email: <span className="font-bold">{prolieuser.email}</span>
                    </p>
                    <p>
                        Number: <span className="font-bold">{prolieuser.number}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
