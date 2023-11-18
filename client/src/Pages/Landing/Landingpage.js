import React from "react";
import './Landing.css'
import LandingSlider from './Slider';

const LandCarousel = () => {
    return (
        <div className="flex flex-col justify-center items-center text-pink">
            <LandingSlider />
        </div>
    );
};

export default LandCarousel;

