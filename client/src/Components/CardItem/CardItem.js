import React from 'react';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import HeaderBG from '../../Images/header_bg.svg'; // Import your image
import HeaderCoin from '../../Images/header_coin.png'; // Import your image

import { Link } from "react-router-dom";



const CardItem = ({ title, subtitle }) => {
  return (
    <div className="flex justify-center items-center relative">
      <img className='w-[90%] ml-3 h-auto' src={HeaderBG} alt="Backghttps://account.mapbox.comround"/>
      <div className="absolute inset-0 flex justify-around items-center flex-row">
        <div className='relative ml-[15vw]'>
          <p className="absolute text-[3.6vw] -top-[8vw] w-[50vw] text-pink">{title || 'Placeholder Subtitle'}</p>
          <p className="text-[6vw] font-bold w-[50vw] text-white">{subtitle || 'Placeholder Title'}</p>
          <div className="cursor-pointer absolute -bottom-[19vw] left-0 ml-[10vw] mt-[5vw]">
              <div className="flex justify-center items-center bg-yellow-500 rounded-full w-fit">
                <MdOutlineQrCodeScanner size={'12vw'} className="text-purpleBlack p-2"/>
              </div>
          </div>
        </div>
        <img className='w-[30vw] mr-[15vw] -ml-[1vw]' src={HeaderCoin} alt="Background"/>
      </div>
    </div>
  );
};

export default CardItem;


