import { useLoaderData } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ReactStars from "react-rating-stars-component";

const SeeProgress = () => {
    const Class = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { name, email, title, description, image, status, price, enroll, assignments } = Class;

    const { data: feedbacks = [], isLoading } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedback/ClassId/${Class._id}`);
            return res.data;
        },
    });
    console.log(feedbacks);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl mb-6 font-bold text-center">Class Full Details</h1>
            <div className="border border-[#00203f] p-4 rounded-xl grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <img className="w-full border border-[#00203f] h-80 object-cover rounded-2xl mb-4 xl:mb-0" src={image} alt="" />
                </div>

                <div className="flex flex-col gap-2 mb-2">
                    <p>
                        Title: <span className="font-bold">{title}</span>
                    </p>
                    <p>
                        Name: <span className="font-bold">{name}</span>
                    </p>
                    <p>
                        Email: <span className="font-bold">{email}</span>
                    </p>
                    <p>
                        Status: <span className="font-bold">{status}</span>
                    </p>
                    <p>
                        Price: <span className="font-bold">{price}</span>
                    </p>
                    <p>
                        Enrolled: <span className="font-bold">{enroll}</span>
                    </p>
                    <p>
                        Assignments: <span className="font-bold">{assignments}</span>
                    </p>
                    <p>
                        Description: <span className="font-bold">{description}</span>
                    </p>
                </div>
            </div>

            <div>
                <h1 className="text-2xl my-6 font-bold text-center">Reviews</h1>

                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {feedbacks.map((feedback) => (
                        <SwiperSlide key={feedback._id}>
                            <div className="flex items-center justify-center flex-col">
                                <p className="mb-2 text-xl text-center">Class Title: {feedback.title}</p>
                                <img className="w-24 h-24 rounded-full mb-2" src={feedback.photo} alt="" />
                                <p className="text-center">{feedback.name}</p>
                                <p className="text-center">Feedback: {feedback.description}</p>
                                <ReactStars count={5} value={feedback.rating} edit={false} size={24} activeColor="#ffd700" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SeeProgress;
