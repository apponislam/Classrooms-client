import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { signOut, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Register = () => {
    const { createUser, setLoading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("");

    const uploadImage = (file) => {
        const formData = new FormData();
        formData.append("image", file);

        axios
            .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGAPI}`, formData)
            .then((response) => {
                setImageUrl(response.data.data.display_url);
                console.log(response);
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

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const registerBtn = (data) => {
        console.log(data);
        const { name, image: imagelink, number, email, password } = data;
        console.log(name, imagelink, number, email, password);

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            toast.error("Password must contain at least one uppercase and one lowercase letter");
            return;
        }

        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: imageUrl,
                })
                    .then(() => {
                        toast.success("Registration Successfully");
                        axiosPublic
                            .post("/Users", {
                                name: name,
                                imagelink: imageUrl,
                                number: number,
                                email: email,
                                role: "student",
                            })
                            .then((res) => console.log(res.data));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                signOut(auth)
                    .then(() => {
                        navigate("/signin");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error.message);
                toast.error("Registration failed");
                setLoading(false);
            });
    };

    // const handleSubmit2 = (e) => {
    //     e.preventDefault();
    //     console.log(e);
    //     const file = e.target.image.files[0];
    //     if (file) {
    //         uploadImage(file);
    //     }
    // };

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Register | AP Classroom</title>
            </Helmet>
            <div className="h-screen flex items-center justify-center">
                <div className="w-96 border border-[#00203f] p-4 rounded-2xl shadow-2xl" data-aos="fade-up" data-aos-easing="ease" data-aos-delay="400">
                    <form onSubmit={handleSubmit(registerBtn)}>
                        <div className="mb-4">
                            <input placeholder="Name" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                            {errors.name?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Name is required
                                </p>
                            )}
                        </div>

                        {/* <div className="mb-4">
                            <input placeholder="Image Link" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("image", { required: true })} aria-invalid={errors.image ? "true" : "false"} />
                            {errors.image?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Image Link is required
                                </p>
                            )}
                        </div> */}

                        <div className="mb-4">
                            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input w-full border-[#00203f] border" />
                            {/* {imageUrl && <img src={imageUrl} alt="Uploaded preview" style={{ width: "100px" }} />} */}
                            <input
                                type="hidden"
                                {...register("number", { required: true })}
                                aria-invalid={errors.hidden ? "true" : "false"}
                                defaultValue={imageUrl} // Hidden field to store image URL
                            />
                            {errors.hidden?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Image is required
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <input placeholder="Number" type="number" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("number", { required: true })} aria-invalid={errors.number ? "true" : "false"} />
                            {errors.number?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Number Link is required
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <input placeholder="Email" type="email" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                            {errors.email?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Email is required
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <input placeholder="Password" type="password" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("password", { required: "Password is required" })} aria-invalid={errors.password ? "true" : "false"} />
                            {errors.password && (
                                <p className="text-red-600" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <input className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4" type="submit" value="Register" />
                    </form>

                    {/* <form onSubmit={handleSubmit2}>
                        {imageUrl && (
                            <div>
                                <p>Image uploaded successfully:</p>
                                <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />
                            </div>
                        )}

                        <input type="file" className="file-input w-full border-[#00203f] border" name="image" accept="image/*" />
                        <button className="btn w-full" type="submit">
                            Upload
                        </button>
                    </form> */}

                    <div>
                        <p>
                            Already have an Account ??{" "}
                            <Link className="text-blue-600 underline" to="/signin">
                                Please Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
