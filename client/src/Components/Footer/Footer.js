import React from "react";
import { MdSettings } from 'react-icons/md';
import { FaHome } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import FooterBG from '../../Images/footer_bg.svg'; // Import your image

const Footer = () => {
  return (
    <div className="relative w-full flex flex-row justify-around items-center text-softPurple sticky bottom-0 p-4">
      <div className="flex-shrink-0 p-1 pt-4">
        <FaHome size={28} className="cursor-pointer" />
      </div>
      <div className="flex-shrink-0 p-2 pr-4 pt-4">
        <FaHome size={28} className="cursor-pointer text-purple" />
      </div>
      <div className="flex-shrink-0 p-2 bg-purple rounded-full p-2 cursor-pointer absolute bottom-12">
        <MdOutlineQrCodeScanner size={48} />
      </div>
      <div className="flex-shrink-0 p-2 pl-4 pt-4">
        <SiGoogleanalytics size={28} className="cursor-pointer text-purple" />
      </div>
      <div className="flex-shrink-0 p-1 pt-4">
        <MdSettings size={28} className="cursor-pointer" />
      </div>
      <div className="absolute inset-0 bg-cover bg-center z-[-1]" style={{ backgroundImage: `url(${FooterBG})`, height: '200px' }} />
    </div>
  );
};

export default Footer;
