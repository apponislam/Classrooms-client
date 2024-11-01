const Faqs = () => {
    return (
        <div className="container mx-auto my-10 md:my-20">
            <h1 className="text-center text-xl md:text-2xl font-bold mb-5">Frequently Asked Questions - Faqs</h1>
            <div className="mx-3 xl:mx-0 flex flex-col items-center gap-4">
                <div tabIndex={0} className="collapse md:w-3/4 collapse-arrow border rounded-none border-[#00203f] bg-transparent" data-aos="fade-left" data-aos-easing="ease" data-aos-delay="100">
                    <div className="collapse-title text-xl font-medium">What is an online course classroom?</div>
                    <div className="collapse-content">
                        <p>An online course classroom is a virtual environment where students can access course materials, interact with instructors, participate in discussions, and complete assignments remotely.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse md:w-3/4 collapse-arrow border rounded-none border-[#00203f] bg-transparent" data-aos="fade-right" data-aos-easing="ease" data-aos-delay="200">
                    <div className="collapse-title text-xl font-medium">How do I enroll in a course?</div>
                    <div className="collapse-content">
                        <p>You can enroll in a course by visiting our Courses section, selecting the desired course, and following the enrollment instructions. Payment options are available at checkout.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse md:w-3/4 collapse-arrow border rounded-none border-[#00203f] bg-transparent" data-aos="fade-left" data-aos-easing="ease" data-aos-delay="300">
                    <div className="collapse-title text-xl font-medium">What are the technical requirements for participating in online courses?</div>
                    <div className="collapse-content">
                        <p>You will need a computer or mobile device with internet access, a web browser, and software to view PDF files and video content. Some courses may require additional software, which will be listed in the course description.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse md:w-3/4 collapse-arrow border rounded-none border-[#00203f] bg-transparent" data-aos="fade-right" data-aos-easing="ease" data-aos-delay="400">
                    <div className="collapse-title text-xl font-medium">What materials are provided in the course?</div>
                    <div className="collapse-content">
                        <p>Course materials typically include video lectures, reading materials, assignments, quizzes, and projects. Some courses may also offer live sessions and interactive content.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse md:w-3/4 collapse-arrow border rounded-none border-[#00203f] bg-transparent" data-aos="fade-left" data-aos-easing="ease" data-aos-delay="500">
                    <div className="collapse-title text-xl font-medium">Is there a refund policy?</div>
                    <div className="collapse-content">
                        <p>Yes, we offer a refund policy if you are not satisfied with the course. Please review our refund policy page for details and eligibility.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse md:w-3/4 collapse-arrow border rounded-none border-[#00203f] bg-transparent" data-aos="fade-right" data-aos-easing="ease" data-aos-delay="600">
                    <div className="collapse-title text-xl font-medium">Are there any prerequisites for enrolling in a course?</div>
                    <div className="collapse-content">
                        <p>Prerequisites vary by course. Basic computer skills are generally required, and specific courses may have additional prerequisites listed in the course description.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faqs;
