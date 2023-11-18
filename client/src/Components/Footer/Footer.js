import React from "react";
import { MdSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiLandscapeFill } from "react-icons/ri"

import { Link, useLocation } from "react-router-dom";

import { useAccount } from "wagmi";

const Footer = () => {
    const location = useLocation();
    const { isConnected } = useAccount()

    return (
        <div className="w-full sticky bottom-0 flex justify-center items-end p-4 z-10">
            <img
                className="absolute w-full z-[-1] bottom-0"
                src={"/rectangle.svg"}
                alt="Background"
            />
            <div className="flex flex-row justify-around items-center text-softPurple w-full max-w-[100%] mb-[4vw]">
                <div>
                    <Link to={"./homepage"}>
                        {" "}
                        <FaHome size={"32"} className={`cursor-pointer ${location.pathname.toLowerCase().includes('homepage') ? 'text-pink' : 'text-white'}`} />{" "}
                    </Link>
                </div>
                <div>
                    <Link to={"./landingPage"}>
                        <RiLandscapeFill size={"32"} className={`cursor-pointer ${location.pathname.toLowerCase().includes('landing') ? 'text-pink' : 'text-white'}`} />
                    </Link>
                </div>
            </div>

            <div className="cursor-pointer">
                {isConnected ? <Link to={"./qr"}>
                    <div className="flex justify-center items-center bg-darkPurple rounded-full p-1 mb-[14vw]">
                        <MdOutlineQrCodeScanner
                            size={"80"}
                            strokeWidth={0.01}
                            className={`p-3 ${location.pathname.toLowerCase().includes('qr') ? 'text-pink' : 'text-white'}`}
                        />
                    </div>
                </Link> : <div className="flex justify-center items-center bg-darkPurple rounded-full p-1 mb-[14vw]">
                    <MdOutlineQrCodeScanner
                        size={"80"}
                        strokeWidth={0.01}
                        className={`p-3 ${location.pathname.toLowerCase().includes('qr') ? 'text-pink' : 'text-white'}`}
                    />
                </div>}
            </div>

            <div className="flex flex-row justify-around items-center text-softPurple w-full max-w-[100%] mb-[4vw]">
                <Link to={"./recentborders"}>
                    <div>
                        <SiGoogleanalytics size={"32"} className={`cursor-pointer ${location.pathname.toLowerCase().includes('recentborders') ? 'text-pink' : 'text-white'}`} />
                    </div>
                </Link>
                <div>
                    <MdSettings size={"32"} className="cursor-pointer text-white" />
                </div>
            </div>
            <div className="absolute -bottom-2 w-full h-[13vw] z-[-1] bg-darkPurple"></div>
        </div>
    );
};

export default Footer;
