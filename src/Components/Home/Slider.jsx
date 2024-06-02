import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slider = () => {
    return (
        <div>
            <Swiper className="mySwiper">
                <SwiperSlide>
                    <div className="w-full h-screen relative">
                        <img className="w-full object-cover h-screen" src="/public/sliderpicture3.webp" />
                        <div className="absolute top-1/2 md:left-96 left-5 md:-translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-2xl w-80 md:w-96">
                            <h1 className="text-2xl mb-2 font-bold">AP Classroom</h1>
                            <p>Welcome to the online classroom! Were excited to have you here. Lets embark on this learning journey together.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-screen relative">
                        <img className="w-full object-cover h-screen" src="/public/sliderpicture1.jpg" />
                        <div className="absolute top-1/2 md:left-96 left-5 md:-translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-2xl w-80 md:w-96">
                            <h1 className="text-2xl mb-2 font-bold">Feedback</h1>
                            <p>Your feedback is important to us. Please share your thoughts and suggestions to help us improve.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-screen relative">
                        <img className="w-full object-cover h-screen" src="/public/sliderpicture2.jpg" />
                        <div className="absolute top-1/2 md:left-96 left-5 md:-translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-2xl w-80 md:w-96">
                            <h1 className="text-2xl mb-2 font-bold">Extra Credit</h1>
                            <p>Participate in the discussion forums and complete optional projects to earn extra credit.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-screen relative">
                        <img className="w-full object-cover h-screen" src="/public/sliderpicture4.jpg" />
                        <div className="absolute top-1/2 md:left-96 left-5 md:-translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-2xl w-80 md:w-96">
                            <h1 className="text-2xl mb-2 font-bold">Upcoming Quiz</h1>
                            <p>We have a quiz scheduled for next Friday. Make sure to review the material covered so far.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
