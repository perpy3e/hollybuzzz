import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import footerBg from '../assets/footerbg.png';


const Footer = () => {
    return (
        <footer
            className="absolute left-0 right-0 bottom-0 text-white z-0 h-[500px] overflow-hidden"
            style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                top: 'auto',
                bottom: '-950px',
            }}
        >
            {/* Footer Bottom */}
            <div className="absolute bottom-0 left-0 right-0 text-[#366a56] text-center py-4">
                <p className="text-sm">© 2024 HOLLYBUZZZ Inc. All rights reserved.</p>
            </div>
        </footer>


    );
};

export default Footer;
