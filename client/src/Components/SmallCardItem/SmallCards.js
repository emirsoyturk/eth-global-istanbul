import React from "react";
import SmallCardItem from "./SmallCardItem";
import DefaultImage from '../../Images/img1.png'
/* import './SmallCards.css'; */

const SmallCards = () => {
    return (
        <div className="card-container py-16">

            <div className="inline-block text-2xl h-[40px] rounded-lg p-2 m-2 bg-softPurple text-center shadow-xl">
                <h2 className="text-left">SmallCards Title</h2>
            </div>
            <div className="flex flex-row m-2 overflow-scroll">
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={DefaultImage} />
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={DefaultImage} />
{/*                 <SmallCardItem subtitle={"Subtitle There"} imageSrc={DefaultImage} />
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={DefaultImage} />
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={DefaultImage} />
                <SmallCardItem subtitle={"Subtitle There"} imageSrc={DefaultImage} /> */}
            </div>

        </div>
    )
}

export default SmallCards;