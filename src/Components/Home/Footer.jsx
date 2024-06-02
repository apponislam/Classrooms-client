const Footer = () => {
    return (
        <div className="bg-black">
            <div className="container mx-auto">
                <footer className="grid grid-cols-2 md:grid-cols-4 p-10 gap-4 text-white">
                    <aside>
                        <p className="text-xl">
                            AP Classroom
                            <br />
                            Teaching You Since 2024
                        </p>
                    </aside>
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-white opacity-100">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-white opacity-100">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-white opacity-100">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
