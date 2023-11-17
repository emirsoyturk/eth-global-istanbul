import React from 'react';
import { MdNotifications } from 'react-icons/md';

const Header = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center py-8'>
            <div className="flex flex-col items-center">
                <div className="inline-block text-2xl h-[40px] rounded-lg p-2 m-2 bg-softPurple text-left shadow-xl">
                    <h1 className="text-3xl font-bold">Title Üst Üst</h1>
                </div>
                <div className="inline-block text-2xl h-[40px] rounded-lg p-2 m-2 bg-softPurple text-left shadow-xl">
                    <p className="text-lg">Subtitle sub sub</p>
                </div>
            </div>
            <div className='w-[40px] h-[40px] bg-softPurple rounded-lg flex justify-center items-center shadow-xl mr-4'>
                <MdNotifications size={24} className="cursor-pointer" />
            </div>
        </div>
    );
};

export default Header;
