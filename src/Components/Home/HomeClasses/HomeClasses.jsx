import { MoonLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import ApprovedClassCard from "../../ApprovedClasses/ApprovedClassCard";

const HomeClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: homeClasses = [], isLoading } = useQuery({
        queryKey: ["homeClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/Classes/Approved/Home");
            return res.data;
        },
    });
    // console.log(homeClasses);

    const homeClassesShort = homeClasses.slice(0, 6);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="mx-3 xl:mx-0 my-10 xl:my-20">
                <h1 className="text-center font-bold text-2xl mb-8">Top Enrolled</h1>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    style={{ height: "100%" }}
                    modules={[Pagination]}
                >
                    {homeClassesShort.map((Class) => (
                        <SwiperSlide key={Class._id}>
                            <div className="pb-10">
                                <ApprovedClassCard Class={Class}></ApprovedClassCard>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeClasses;
