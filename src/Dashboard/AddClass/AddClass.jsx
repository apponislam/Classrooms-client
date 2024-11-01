import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const addClass = (data) => {
        console.log(data);
        const { title, description, image, price } = data;
        axiosPublic
            .post("/Classes", {
                name: user?.displayName,
                email: user?.email,
                title: title,
                description: description,
                image: image,
                price: price,
                status: "pending",
                enroll: 0,
                assignments: 0,
                submitedAssignments: 0,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Class Added Successfully");
                    navigate("/dashboard/my-class");
                }
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Helmet>
                <title>Add Your Class || Dashboard || Appon Classroom</title>
            </Helmet>
            <div className="w-full md:w-1/2 border border-[#00203f] p-4 rounded-2xl shadow-2xl" data-aos="fade-up" data-aos-easing="ease" data-aos-delay="300">
                <form onSubmit={handleSubmit(addClass)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <input placeholder="Name" type="text" defaultValue={user?.displayName} className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" disabled />
                        </div>

                        <div>
                            <input placeholder="Email" type="email" defaultValue={user?.email} className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" disabled />
                        </div>

                        <div>
                            <input placeholder="Title" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("title", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                            {errors.title?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Title is required
                                </p>
                            )}
                        </div>

                        <div>
                            <input placeholder="Price" type="number" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("price", { required: "price is required" })} aria-invalid={errors.price ? "true" : "false"} />
                            {errors.price && (
                                <p className="text-red-600" role="alert">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input placeholder="Description" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("description", { required: "Description is required" })} aria-invalid={errors.description ? "true" : "false"} />
                            {errors.description && (
                                <p className="text-red-600" role="alert">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input placeholder="Image" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("image", { required: "image is required" })} aria-invalid={errors.image ? "true" : "false"} />
                            {errors.image && (
                                <p className="text-red-600" role="alert">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <input className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full" type="submit" value="Add Class" />
                </form>
            </div>
        </div>
    );
};

export default AddClass;
