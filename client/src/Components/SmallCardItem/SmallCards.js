import React from "react";
import SmallCardItem from "./SmallCardItem";
import FirstCardIcon from '../../Images/SmallCardIcons/first.png'; // Import your image
import SecondCardIcon from '../../Images/SmallCardIcons/second.png'; // Import your image
import './SmallCards.css';

const SmallCards = () => {
    return (
        <div className="card-container py-[2vw]">
            <div className="inline-block text-[5vw] h-[9vw] rounded-lg p-2 m-2 text-center">
                <h2 className="text-left text-darkPurple">Actions</h2>
            </div>
            <div className="flex flex-row m-1 p-2 overflow-x-auto overflow-y-visible">
                <SmallCardItem subtitle={"Receive"} imageSrc={FirstCardIcon} bgColor={'bg-pink'}/>
                <SmallCardItem subtitle={"Send"} imageSrc={SecondCardIcon} bgColor={'bg-darkPurple'}/>
                <SmallCardItem subtitle={"Swap"} imageSrc={FirstCardIcon} bgColor={'bg-purpleBlack'}/>
                <SmallCardItem subtitle={"NeBilim"} imageSrc={SecondCardIcon} bgColor={'bg-pink'}/>
            </div>

        </div>
    )
}

export default SmallCards;