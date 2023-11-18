import React from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import {
    useAccount,
    useDisconnect,
} from 'wagmi'

const Header = () => {
    const { address, isConnected, } = useAccount();

    const { disconnect } = useDisconnect()

    const HandleDisconnect = () => {
        disconnect();
    }

    return (
        <div className='w-full flex flex-row justify-between items-center py-8'>
            <div className="flex flex-col items-left">
                <div className="inline-block text-2xl h-[8vw] rounded-lg px-2 mx-4 w-fit">
                    <h1 className="text-[4vw] text-pink font-bold rounded-xl">{isConnected ? `${address.substring(0, 7) + "..." + address.substring(address.length - 6, address.length - 1)}` : ''}</h1>
                </div>
                <div className="inline-block text-2xl h-[8vw] rounded-lg px-2 mx-4 -mt-[1vw] pt-[2vw]">
                    <p className="text-[7vw] text-darkPurple">{isConnected ? `Welcome Back` : 'Connect a Wallet!'}</p>
                </div>
            </div>

            <div className='w-[12vw] h-[12vw] bg-softPurple rounded-lg flex justify-center items-center mr-7 text-darkPurple'>
                {isConnected ? <button onClick={HandleDisconnect}><IoLogOutOutline size={32} /></button> : <w3m-button label='Connect'/>}
            </div>

        </div>
    );
};

export default Header;
