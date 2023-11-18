import React from 'react';
import { MdNotifications } from 'react-icons/md';

const Header = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center py-8'>
            <div className="flex flex-col items-left">
                <div className="inline-block text-2xl h-[8vw] rounded-lg px-2 mx-4 w-fit">
                    <h1 className="text-[5vw] text-pink font-bold">Hello Ana</h1>
                </div>
                <div className="inline-block text-2xl h-[8vw] rounded-lg px-2 mx-4 -mt-[1vw] pt-[2vw]">
                    <p className="text-[7vw] text-darkPurple">Welcome Back</p>
                </div>
            </div>
            <div className='w-[12vw] h-[12vw] bg-softPurple rounded-lg flex justify-center items-center mr-7 text-darkPurple'>
                <MdNotifications size={'8vw'} className="cursor-pointer" />
            </div>
        </div>
    );
};

export default Header;
