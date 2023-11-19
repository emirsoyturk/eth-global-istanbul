import React from 'react';

const SmallCardItem = ({ subtitle, imageSrc, bgColor }) => {
  return (
    <div className="relative">
      <div className={`w-[32vw] h-[32vw] m-[1vw] ${bgColor} rounded-[30px] shadow-md shadow-darkPurple rounded-xl`} ></div>
      <div className="absolute inset-0 flex justify-around items-center flex-row">
        <div className="absolute mt-[19vw] w-[75%] h-[4vw] text-[3.5vw] text-white flex justify-between">
          <p>{(subtitle || 'Placeholder Subtitle')}</p>
          {/* <p> &#62;</p> */}
        </div>
        <img className='w-[22vw] -mr-[12vw] -mt-[18vw]' src={imageSrc} alt="Background"/>
      </div>
    </div>
  );
};

export default SmallCardItem;
