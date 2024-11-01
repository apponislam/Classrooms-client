import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { MoonLoader } from "react-spinners";

const ReviewSlider = () => {
    const axiosPublic = useAxiosPublic();

    const { data: feedbacks = [], isLoading } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/feedback");
            return res.data;
        },
    });
    // console.log(feedbacks);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    return (
        <div className="container mx-auto" data-aos="fade-up">
            <div className="mx-3 xl:mx-0 my-10 md:my-20">
                <h1 className="text-2xl my-6 font-bold text-center">Reviews</h1>

                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {feedbacks.map((feedback) => (
                        <SwiperSlide key={feedback._id}>
                            <div className="flex items-center justify-center flex-col">
                                <p className="mb-4 font-semibold text-xl text-center">Class Title: {feedback.title}</p>
                                <img className="w-24 h-24 rounded-full mb-2 object-cover" src={feedback.photo} alt="" />
                                <p className="text-center font-bold text-xl mb-2">{feedback.name}</p>
                                <p className="text-center w-3/4">Feedback: {feedback.description}</p>
                                <ReactStars count={5} value={feedback.rating} edit={false} size={24} activeColor="#ffd700" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewSlider;
