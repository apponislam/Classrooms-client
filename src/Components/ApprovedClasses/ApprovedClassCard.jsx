import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ApprovedClassCard = ({ Class }) => {
    const { _id, enroll, name, title, description, image, price } = Class;

    return (
        <div className="border border-[#00203f] p-4 rounded-xl flex flex-col">
            <div className="relative">
                <img className="w-full border border-[#00203f] h-80 object-cover rounded-2xl mb-4" src={image} alt="" />
                <p className="bg-[#00203f] text-white absolute top-2 right-2 px-3 py-2 rounded-xl">Enrolled: {enroll}</p>
            </div>

            <div className="flex flex-col gap-2 mb-2">
                <p>
                    Title: <span className="font-bold">{title}</span>
                </p>
                <p>
                    Name: <span className="font-bold">{name}</span>
                </p>
                <p>
                    Price: <span className="font-bold">{price}</span>
                </p>
                <p>
                    Description: <span className="font-bold">{description}</span>
                </p>
            </div>
            <div className="grow flex flex-col justify-end">
                <Link to={`/class/${_id}`}>
                    <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">Enroll</button>
                </Link>
            </div>
        </div>
    );
};

ApprovedClassCard.propTypes = {
    Class: PropTypes.object,
};

export default ApprovedClassCard;
