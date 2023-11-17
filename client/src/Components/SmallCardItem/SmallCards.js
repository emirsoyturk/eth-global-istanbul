import React from "react";
import SmallCardItem from "./SmallCardItem";
import DefaultImage from '../../Images/img1.png'
import AppSvg1 from '../../Images/AppIcons/app_1.svg'
import AppSvg2 from '../../Images/AppIcons/app_2.svg'
import './SmallCards.css';

const SmallCards = () => {
    return (
        <div className="card-container py-16">

            <div className="inline-block text-2xl h-[40px] rounded-lg p-2 m-2 bg-softPurple text-center shadow-xl">
                <h2 className="text-left text-pink">SmallCards Title</h2>
            </div>
            <div className="flex flex-row m-2 p-2 overflow-x-auto">
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={AppSvg1} bgColor={'bg-pink'}/>
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={AppSvg2} bgColor={'bg-darkPurple'}/>
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={AppSvg1} bgColor={'bg-purpleBlack'}/>
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={AppSvg2} bgColor={'bg-pink'}/>
            </div>

        </div>
    )
}

export default SmallCards;