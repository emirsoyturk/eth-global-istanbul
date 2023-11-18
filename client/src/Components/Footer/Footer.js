import React from "react";
import { MdSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiLandscapeFill } from "react-icons/ri"

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full sticky bottom-0 flex justify-center items-end p-4">
      <img
        className="absolute w-full z-[-1] bottom-0"
        src={"/rectangle.svg"}
        alt="Background"
      />
      <div className="flex flex-row justify-around items-center text-softPurple w-full max-w-[100%] mb-[4vw]">
        <div>
          <Link to={"./"}>
            {" "}
            <FaHome size={"40"} className="cursor-pointer text-pink" />{" "}
          </Link>
        </div>
        <div>
        <Link to={"./landingPage"}>
          <RiLandscapeFill size={"40"} className="cursor-pointer text-pink" />
          </Link>
        </div>
      </div>

      <div className="cursor-pointer">
        <Link to={"./qr"}>
          <div className="flex justify-center items-center bg-darkPurple rounded-full p-1 mb-[14vw]">
            <MdOutlineQrCodeScanner
              size={"80"}
              strokeWidth={0.01}
              className="text-white p-3"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-row justify-around items-center text-softPurple w-full max-w-[100%] mb-[4vw]">
        <div>
          <SiGoogleanalytics size={"40"} className="cursor-pointer text-pink" />
        </div>
        <div>
          <MdSettings size={"40"} className="cursor-pointer text-pink" />
        </div>
      </div>
      <div className="absolute -bottom-2 w-full h-[13vw] z-[-1] bg-darkPurple"></div>
    </div>
  );
};

export default Footer;
