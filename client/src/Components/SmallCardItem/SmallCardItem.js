import React from 'react';
import CardItemBG from '../../Images/card_bg.svg'; // Import your image
import { FaArrowRight } from 'react-icons/fa';

const SmallCardItem = ({ subtitle, imageSrc, bgColor }) => {
    console.log(bgColor)
  return (
    <div className="relative">
      {/* <img src={CardItemBG} className={`w-[90%] h-auto fill-blue-500`} alt="Background" style={{ fill: 'green' }}/> */}
      <div className={`w-[32vw] h-[32vw] m-[1vw] ${bgColor} rounded-[30px]`} ></div>
      <div className="absolute inset-0 flex justify-around items-center flex-row">
        <div className="absolute mt-[19vw] w-[75%] h-[4vw] text-[3.5vw] text-white flex justify-between">
          <p>{(subtitle || 'Placeholder Subtitle')}</p>
          <p> &#62;</p>
        </div>
        <img className='w-[22vw] -mr-[12vw] -mt-[18vw]' src={imageSrc} alt="Background"/>
      </div>
    </div>
    // <div className={`flex flex-col mx-1 ${bgColor} rounded-lg shadow-xl justify-center items-center`}>
    //   <div className="m-4">
    //     <img className="w-full h-auto object-cover" src={imageSrc} alt="Card" />
    //   </div>

    //   <div className="flex flex-row">
    //     <div className="px-6 py-4">
    //       <p className="text-base font-bold">{subtitle}</p>
    //     </div>
    //     <div className="self-end my-4">
    //       <FaArrowRight />
    //     </div>
    //   </div>
    // </div>
  );
};

export default SmallCardItem;
