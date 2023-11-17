import React from 'react';
import { MdOutlineQrCodeScanner } from "react-icons/md";

const CardItem = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="w-4/5 flex flex-row justify-center items-center p-1 md:flex-row mx-auto overflow-hidden bg-softPurple rounded-lg shadow-xl text-purpleBlack">
      <div className="md:w-5/8">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base">{subtitle}</p>
        </div>
      </div>

      <div className="md:w-3/8 md:h-1/2 bg-purple rounded-lg flex justify-center items-center text-purpleBlack">
        <MdOutlineQrCodeScanner size={48} className="cursor-pointer text-purpleBlack" />
      </div>
    </div>
  );
};

export default CardItem;
