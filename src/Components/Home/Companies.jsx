const Companies = () => {
    return (
        <div className="container mx-auto" data-aos="fade-up" data-aos-duration="300">
            <div className="my-8 md:my-24">
                <h1 className="text-center font-medium mb-8">Trusted by over 10,000 companies and million of learners around the world</h1>
                <div className="flex items-center flex-wrap gap-4">
                    <img className="w-24 md:w-28 block mx-auto" src="/companies/company1.jpg" />
                    <img className="w-24 md:w-28 block mx-auto" src="/companies/company2.png" />
                    <img className="w-24 md:w-28 block mx-auto" src="/companies/company3.png" />
                    <img className="w-24 md:w-28 block mx-auto" src="/companies/company4.png" />
                    <img className="w-24 md:w-28 block mx-auto" src="/companies/company5.png" />
                    <img className="w-24 md:w-28 block mx-auto" src="/companies/company6.png" />
                </div>
            </div>
        </div>
    );
};

export default Companies;
