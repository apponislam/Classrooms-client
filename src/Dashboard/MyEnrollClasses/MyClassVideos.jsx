import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";

const MyClassVideos = () => {
    const Class = useLoaderData();
    // const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    console.log(Class);

    const {
        data: videos = [],
        isLoading,
        // refetch,
    } = useQuery({
        queryKey: ["classVideo"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Classvideos/ClassId/${Class._id}`);
            return res.data;
        },
    });

    const [playing, setPlayying] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const playVideo = (video, index) => {
        console.log(video);
        console.log(index);

        function getYouTubeVideoID(url) {
            const urlObj = new URL(url);
            if (urlObj.hostname === "youtu.be") {
                return urlObj.pathname.slice(1);
            }
            return urlObj.searchParams.get("v");
        }
        const newLink = getYouTubeVideoID(video.videoLink);
        setCurrentIndex(index);
        setPlayying(newLink);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % videos.length;
        playVideo(videos[nextIndex], nextIndex);
    };

    const handlePrevious = () => {
        const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
        playVideo(videos[prevIndex], prevIndex);
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#adefd1" size={40} />
            </div>
        );
    }

    if (videos.length == 0) {
        return (
            <div className="h-screen flex items-center justify-center flex-col text-center">
                <h1 className="text-3xl">No Video</h1>
                <h2>Coming Soon....</h2>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 h-auto items-start">
                <div className="w-full md:w-3/5">
                    <iframe className="sm:h-[50vh] w-full h-60" src={`https://www.youtube.com/embed/${playing}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className="flex justify-between mt-4">
                        <button onClick={handlePrevious} className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn ">
                            Previous
                        </button>

                        <button onClick={handleNext} className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn">
                            Next
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full border border-[#00203f] rounded-2xl">
                    {videos.map((video, index) => (
                        <div className="flex items-center p-3 gap-3 text-[#00203f]" onClick={() => playVideo(video, index)} key={video._id}>
                            <FaPlay />
                            <p className="font-bold">{video.videoTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyClassVideos;
