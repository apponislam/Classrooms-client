import PropTypes from "prop-types";

const TeacherCard = ({ teacher, approveBtn, rejectedBtn }) => {
    console.log(teacher);
    const { _id, name, status, imagelink, experience, title, category } = teacher;

    return (
        <div className="border border-[#00203f] p-4 rounded-xl flex flex-col">
            <div className="relative flex items-center justify-center">
                <img className="w-40 h-40 border border-[#00203f] object-cover rounded-full mb-4" src={imagelink} alt="" />
                <p className="bg-[#00203f] text-white absolute top-2 right-2 px-3 py-2 rounded-xl">{status}</p>
            </div>

            <div className="flex flex-col gap-2 mb-2">
                <p>
                    Name: <span className="font-bold">{name}</span>
                </p>
                <p>
                    Title: <span className="font-bold">{title}</span>
                </p>
                <p>
                    Experience: <span className="font-bold">{experience}</span>
                </p>
                <p>
                    Category: <span className="font-bold">{category}</span>
                </p>
                <p>{/* Email: <span className="font-bold">{email}</span> */}</p>
                <p>{/* Description: <span className="font-bold">{description}</span> */}</p>
            </div>
            <div className="grow flex flex-col justify-end">
                <div className="grid items-center grid-cols-2 gap-4 mb-4">
                    <button disabled={status === "accepted" || status === "rejected"} onClick={() => approveBtn(_id)} className="btn bg-green-600 hover:bg-green-700 text-white">
                        Approve
                    </button>
                    <button disabled={status === "accepted" || status === "rejected"} onClick={() => rejectedBtn(_id)} className="btn bg-red-600 hover:bg-red-700 text-white">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

TeacherCard.propTypes = {
    teacher: PropTypes.object,
    approveBtn: PropTypes.func,
    rejectedBtn: PropTypes.func,
};

export default TeacherCard;
