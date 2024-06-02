import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const email = user.email;
    console.log(email);
    const { data: mainuser = [], isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Users/email/${email}`);
            return res.data;
        },
    });
    const [prolieuser] = mainuser;

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
            <div className="w-full md:w-1/2 border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 flex flex-col items-center justify-center">
                        <img className="rounded-full mb-4" src={prolieuser.imagelink} />
                        <div className="uppercase font-bold">
                            Role: <span className="text-green-600">{prolieuser.role}</span>
                        </div>
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
