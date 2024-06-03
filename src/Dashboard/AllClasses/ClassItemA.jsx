import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ClassItemA = ({ Class, approveBtn, rejectedBtn }) => {
    const { _id, email, title, description, image, status } = Class;

    return (
        <div className="border border-[#00203f] p-4 rounded-xl flex flex-col">
            <div className="relative">
                <img className="w-full border border-[#00203f] h-80 object-cover rounded-2xl mb-4" src={image} alt="" />
                <p className="bg-[#00203f] text-white absolute top-2 right-2 px-3 py-2 rounded-xl">{status}</p>
            </div>

            <div className="flex flex-col gap-2 mb-2">
                <p>
                    Title: <span className="font-bold">{title}</span>
                </p>
                <p>
                    Email: <span className="font-bold">{email}</span>
                </p>
                <p>
                    Description: <span className="font-bold">{description}</span>
                </p>
            </div>
            <div className="grow flex flex-col justify-end">
                <div className="grid items-center grid-cols-2 gap-4 mb-4">
                    <button onClick={() => approveBtn(_id)} className="btn bg-green-600 hover:bg-green-700 text-white">
                        Approve
                    </button>
                    <button onClick={() => rejectedBtn(_id)} className="btn bg-red-600 hover:bg-red-700 text-white">
                        Reject
                    </button>
                </div>
                {status === "pending" || status === "rejected" ? (
                    <button disabled className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">
                        See Progress
                    </button>
                ) : (
                    <Link to={`/dashboard/class/${_id}`}>
                        <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full">See Progress</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

ClassItemA.propTypes = {
    Class: PropTypes.object,
    approveBtn: PropTypes.func,
    rejectedBtn: PropTypes.func,
};

export default ClassItemA;
