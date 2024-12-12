import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="relative text-white bg-[#40826d] pt-20"
        >
            {/* Decorative SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="relative block"
                        style={{ fill: '#E7F5FC' }} 
                    ></path>
                </svg>
            </div>

            {/* Footer Content */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 p-10">
                {/* About Us Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">About Us</h2>
                    <p className="text-sm">
                        We are committed to providing exceptional services and building a strong community.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        {/* <li>
                            <a href="/" className="hover:underline">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Contact Us
                            </a>
                        </li> */}
                    </ul>
                </div>

                {/* Contact Information Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Contact Information</h2>
                    <p className="text-sm">123 Main Street, Your City, Your Country</p>
                    {/* <p className="text-sm">Phone: +1 (234) 567-890</p>
                    <p className="text-sm">Email: support@example.com</p> */}
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col gap-4 mt-10">
                    <h2 className="text-xl font-bold">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="hover:text-gray-300">
                            <FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook
                        </a>
                        <a href="https://twitter.com" className="hover:text-gray-300">
                            <FontAwesomeIcon icon={faTwitter} size="lg" /> Twitter
                        </a>
                        <a href="https://instagram.com" className="hover:text-gray-300">
                            <FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-[#366a56] text-center py-4">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
