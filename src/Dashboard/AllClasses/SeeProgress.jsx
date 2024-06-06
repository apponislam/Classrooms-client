import { useLoaderData } from "react-router-dom";

const SeeProgress = () => {
    const Class = useLoaderData();
    const { name, email, title, description, image, status, price, enroll } = Class;

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
                        Description: <span className="font-bold">{description}</span>
                    </p>
                </div>
            </div>

            <h1 className="text-2xl my-6 font-bold text-center">Reviews Coming Soon....</h1>
        </div>
    );
};

export default SeeProgress;
