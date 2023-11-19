import React from "react";
import SmallCardItem from "./SmallCardItem";
import FirstCardIcon from "../../Images/SmallCardIcons/first.png";
import SecondCardIcon from "../../Images/SmallCardIcons/second.png";

import "./SmallCards.css";

const SmallCards = () => {
  return (
    <div className="card-container py-[2vw]">
      <div className="inline-block text-[5vw] h-[9vw] rounded-lg p-2 m-2 text-center">
        <h2 className="text-left text-darkPurple">Apps</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 m-1 p-2 pl-[5vw] overflow-x-auto overflow-y-visible">
        <SmallCardItem
          subtitle={"Chat Groups"}
          imageSrc={FirstCardIcon}
          bgColor={"bg-purpleBlack"}
        />
        <SmallCardItem
          subtitle={"Poaps"}
          imageSrc={SecondCardIcon}
          bgColor={"bg-darkPurple"}
        />
        <SmallCardItem
          subtitle={"Emergency"}
          imageSrc={SecondCardIcon}
          bgColor={"bg-darkPurple"}
        />
        <SmallCardItem
          subtitle={"Launchpad"}
          imageSrc={FirstCardIcon}
          bgColor={"bg-purpleBlack"}
        />
      </div>
    </div>
  );
};

export default SmallCards;
