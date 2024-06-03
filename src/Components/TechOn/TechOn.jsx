import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

const TechOn = () => {
    const { user } = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const beATeacher = (data) => {
        console.log(data);
        // const { title, description, image, price } = data;
        // axiosPublic
        //     .put("/Classes", {
        //         name: user?.displayName,
        //         email: user?.email,
        //         title: title,
        //         description: description,
        //         image: image,
        //         price: price,
        //         status: "pending",
        //         enroll: 0,
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         if (res.data.insertedId) {
        //             toast.success("Class Added Successfully");
        //         }
        //     });
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen mx-3 xl:mx-0">
                <div className="w-full md:w-1/2 border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <div className="flex justify-center items-center mb-4">
                        <img className="w-24 h-24 rounded-full" src={user?.photoURL} />
                    </div>
                    <form onSubmit={handleSubmit(beATeacher)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <input defaultValue={user.displayName} type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                                {errors.name?.type === "required" && (
                                    <p className="text-red-600" role="alert">
                                        Name is required
                                    </p>
                                )}
                            </div>

                            <div>
                                <input type="email" defaultValue={user?.email} className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" disabled />
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
                                <input defaultValue={user.photoURL} placeholder="Image" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("image", { required: "image is required" })} aria-invalid={errors.image ? "true" : "false"} />
                                {errors.image && (
                                    <p className="text-red-600" role="alert">
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                {/* <input placeholder="Description" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("description", { required: "Description is required" })} aria-invalid={errors.description ? "true" : "false"} />
                                {errors.description && (
                                    <p className="text-red-600" role="alert">
                                        {errors.description.message}
                                    </p>
                                )} */}

                                <select className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("experience", { required: true })}>
                                    <option value="">Experience</option>
                                    <option value="beginner">beginner</option>
                                    <option value="mid-level">mid-level</option>
                                    <option value="experienced">experienced</option>
                                </select>
                                {errors.experience && (
                                    <p className="text-red-600" role="alert">
                                        Experience is required
                                    </p>
                                )}
                            </div>

                            <div>
                                <select className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("category", { required: true })}>
                                    <option value="">Category</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Graphics Design">Graphics Design</option>
                                    <option value="Apps Development">Apps Development</option>
                                    <option value="Game Development">Game Development</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                </select>
                                {errors.category && (
                                    <p className="text-red-600" role="alert">
                                        Category is required
                                    </p>
                                )}
                            </div>
                        </div>

                        <input className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4" type="submit" value="Request for Teacher" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TechOn;
