import React from "react";

const LandItem = ({ title, description, image }) => {
  return (
    <div className="flex flex-col rounded-lg justify-center items-center w-[75vw] h-[75vw]">
      <div className="w-[75vw] h-[50vw] bg-purple flex justify-center items-center rounded-xl">
          <img className="w-full h-full p-8" src={image} alt="Card" />
      </div>

      <div className="flex flex-row">
        <div className="px-6 py-4 text-center font-bold">
          <p className="text-pink text-xl">{title}</p>
          <p className="text-purpleBlack text-lg overflow-hidden">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LandItem;

