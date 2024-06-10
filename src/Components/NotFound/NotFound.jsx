import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl mb-10 font-bold">Opps Sorry</h1>
            <p className="text-center text-2xl"> 404 - Not Found</p>
            <Link to="/">
                <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn mt-4">Go Home</button>
            </Link>
        </div>
    );
};

export default NotFound;
