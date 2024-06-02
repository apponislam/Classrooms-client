import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { signOut, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    const { createUser, setLoading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
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
                    photoURL: imagelink,
                })
                    .then(() => {
                        toast.success("Registration Successfully");
                        axiosPublic
                            .post("/Users", {
                                name: name,
                                imagelink: imagelink,
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

    return (
        <div className="container mx-auto">
            <div className="h-screen flex items-center justify-center">
                <div className="w-96 border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit(registerBtn)}>
                        <div className="mb-4">
                            <input placeholder="Name" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                            {errors.name?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Name is required
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <input placeholder="Image Link" type="text" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("image", { required: true })} aria-invalid={errors.image ? "true" : "false"} />
                            {errors.image?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Image Link is required
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
