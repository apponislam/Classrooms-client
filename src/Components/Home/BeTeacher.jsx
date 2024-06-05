import { Link } from "react-router-dom";

const BeTeacher = () => {
    return (
        <div className="container mx-auto">
            <div className="mb-8 md:mb-24">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-center mx-2 md:mx-4">
                    <div className="flex items-center justify-center">
                        <img className="w-72 xl:w-96 h-72 xl:h-96 rounded-full object-cover" src="teacherpic.jpg" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-5">Become a Teacher</h1>
                        <p className="mb-4">Becoming a teacher means having the opportunity to inspire and shape the minds of the next generation. You&apos;ll have the chance to ignite a passion for learning, encourage critical thinking, and help students discover their potential. It&apos;s a profession that allows you to make a lasting impact on your students&apos; lives and future.</p>
                        <Link to="/technow">
                            <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn ">Become a Teacher</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeTeacher;
