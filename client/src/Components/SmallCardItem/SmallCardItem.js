import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const SmallCardItem = ({ subtitle, imageSrc, bgColor }) => {
    console.log(bgColor)
  return (
    <div className={`flex flex-col mx-1 ${bgColor} rounded-lg shadow-xl justify-center items-center`}>
      <div className="m-4">
        <img className="w-full h-auto object-cover" src={imageSrc} alt="Card" />
      </div>

      <div className="flex flex-row">
        <div className="px-6 py-4">
          <p className="text-base font-bold">{subtitle}</p>
        </div>
        <div className="self-end my-4">
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default SmallCardItem;
