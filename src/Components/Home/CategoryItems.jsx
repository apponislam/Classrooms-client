import { BsGraphUpArrow } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { GiArtificialIntelligence } from "react-icons/gi";
import { GoBrowser } from "react-icons/go";
import { IoMdAppstore } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { PiGraphicsCard } from "react-icons/pi";
import { SiCyberdefenders } from "react-icons/si";

const CategoryItems = () => {
    return (
        <div className="container mx-auto my-10 md:my-20">
            <h1 className="text-center text-xl md:text-2xl font-bold mb-5">Categories</h1>
            <div className="mx-3 xl:mx-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <GoBrowser />
                    </div>
                    <p>Web Development</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <PiGraphicsCard />
                    </div>
                    <p>Graphics Design</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <IoMdAppstore />
                    </div>
                    <p>Apps Development</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <IoGameController />
                    </div>
                    <p>Game Development</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <SiCyberdefenders />
                    </div>
                    <p>Cyber Security</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <GiArtificialIntelligence />
                    </div>
                    <p>Artificial Intelligence</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <BsGraphUpArrow />
                    </div>
                    <p>Digital Marketing</p>
                </div>
                <div className="border border-[#00203f] text-4xl rounded-2xl p-4 flex items-center justify-center flex-col">
                    <div className="text-5xl mb-5">
                        <CiCircleMore />
                    </div>
                    <p>Coming Soon</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryItems;
