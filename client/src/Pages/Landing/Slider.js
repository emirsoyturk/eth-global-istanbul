import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import range from 'lodash/range';
import './Landing.css';
import LandItem from './LandItem';
import App1 from '../../Images/AppIcons/app_1.svg';
import App2 from '../../Images/AppIcons/app_2.svg';

const Dots = ({ count, active }) => (
  <div className="dot-container">
    {range(count).map((i) => (
      <motion.div
        className="dot"
        key={i}
        initial={false}
        animate={{
          scale: active === i ? 1.5 : 1,
          opacity: active === i ? 1 : 0.5,
        }}
      />
    ))}
  </div>
);

const Slide = ({ landItem }) => (
  <div className="slide flex justify-center items-center">
    <>
    <LandItem title={landItem.title} description={landItem.description} image={landItem.image} bgColor={landItem.backGround} />
    </>
  </div>
);

const LandingSlider = () => {
  const constraintsRef = useRef(null);
  const [active, setActive] = useState(0);

  const landItems = [
    {
      title: "Title 1Title 1Title 1Title ",
      description: "Description Text ThereDescription Text",
      image: App1,
      backGround: 'bg-pink',
    },
    {
      title: "Title 2Title 1Title 1Title ",
      description: "Description Text ThereDescription Text",
      image: App2,
      backGround: 'bg-purple',
    },
    {
      title: "Title 1Title 1Title 1Title",
      description: "Description Text ThereDescription Text",
      image: App1,
      backGround: 'bg-purpleBlack',
    },
    {
      title: "Title 2",
      description: "Description Text ThereDescription Text",
      image: App2,
      backGround: 'bg-pink',
    },
  ];

  const width = (constraintsRef.current && constraintsRef.current.offsetWidth) || 350;

  const dragEndHandler = (event, info) => {
    const offset = info.offset.x;
    if (Math.abs(offset) > 20) {
      const direction = offset < 0 ? 1 : -1;
      setActive((prevActive) => {
        let newActive = (prevActive + direction) % landItems.length;

        if (newActive < 0) {
          newActive += landItems.length;
        }
  
        return newActive;
      });
    }
  };

  return (
    <>
      <div className="container" ref={constraintsRef}>
        <motion.div
          onDragEnd={dragEndHandler}
          drag="x"
          className="slider"
          animate={{
            x: -1 * active * width,
          }}
        >
          {landItems.map((item, index) => (
            <Slide key={index} landItem={item}  />
          ))}
        </motion.div>
        <Dots count={landItems.length} active={active} />
      </div>
    </>
  );
};

export default LandingSlider;
