import React from "react";
import { MdSettings } from 'react-icons/md';
import { FaHome } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import FooterBG from '../../Images/footer_bg.svg'; // Import your image

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full sticky bottom-0 flex justify-center items-end p-4">
      <img className='absolute w-full z-[-1] bottom-0' src={FooterBG} alt="Background" />
      <div className="flex flex-row justify-around items-center text-softPurple w-full max-w-[100%] mb-[4vw]">
        <div>
        <Link to={'./landingPage'}> <FaHome size={'11vw'} className="cursor-pointer text-pink" /> </Link >
        </div>
        <div>
          <FaHome size={'11vw'} className="cursor-pointer text-pink" />
        </div>
      </div>

      <div className="cursor-pointer">
        <Link to={'./qr'}>
          <div className="flex justify-center items-center bg-purple rounded-full p-1 mb-[14vw]">
            <MdOutlineQrCodeScanner size={'17vw'} className="text-purpleBlack p-2"/>
          </div>
        </Link>
      </div>

      <div className="flex flex-row justify-around items-center text-softPurple w-full max-w-[100%] mb-[4vw]">
        <div>
          <SiGoogleanalytics size={'11vw'} className="cursor-pointer text-pink" />
        </div>
        <div>
          <MdSettings size={'11vw'} className="cursor-pointer text-pink" />
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[12vw] z-[-1] bg-purple"></div>
    </div>
  );
};

export default Footer;
