import BeTeacher from "./BeTeacher";
import Companies from "./Companies";
import HomeClasses from "./HomeClasses/HomeClasses";
import ReviewSlider from "./ReviewSlider";
import Slider from "./Slider";
import Total from "./Total";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Companies></Companies>
            <HomeClasses></HomeClasses>
            <ReviewSlider></ReviewSlider>
            <BeTeacher></BeTeacher>
            <Total></Total>
        </div>
    );
};

export default Home;
