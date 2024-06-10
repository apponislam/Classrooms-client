import BeTeacher from "./BeTeacher";
import CategoryItems from "./CategoryItems";
import Companies from "./Companies";
import Faqs from "./Faqs";
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
            <Faqs></Faqs>
            <CategoryItems></CategoryItems>
        </div>
    );
};

export default Home;
