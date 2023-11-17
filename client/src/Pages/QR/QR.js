import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import io from "socket.io-client";

const socket = io("http://localhost:4000", { transports: ['websocket'] }); // TODO: Read from .env

// useeffect socket


const QrCodeScanner = () => {
    const [uid, setUid] = useState("");
    const [qrScanned, setQrScanned] = useState(false);

    const sendMessage = (uid, message) => {
        socket.emit("message", { uid, message });
    };

    const handleScan = (scannedUid) => {
        setUid(scannedUid);
        sendMessage(scannedUid, "Hello from Phone A!");

        setQrScanned(true);
    };

    function handleBack(e){
        setUid("");
        setQrScanned(false);
    }
    function handleConfirm(e){
        console.log("Confirmedd");
    }
    const AfterScan = () => {
        return (
            <div className="w-full bg-purple p-4 rounded-xl">
                <ul className="text-purpleBlack">
                    <li className="bg-softPurple rounded-lg p-2 m-2">Text there</li>
                    <li className="bg-softPurple rounded-lg p-2 m-2">Text there</li>
                    <li className="bg-softPurple rounded-lg p-2 m-2">Text there</li>
                    <li className="bg-softPurple rounded-lg p-2 m-2">Text there</li>
                </ul>

                <div className="pt-12 flex justify-center items-center">
                    <button onClick={handleConfirm} className="mx-2 w-[200px] h-[40px] rounded-xl bg-purpleBlack text-softPurple" >
                        Confirm
                    </button>
                    <button onClick={handleBack} className="mx-2 w-[200px] h-[40px] rounded-xl bg-purpleBlack text-softPurple" >
                        Back
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center h-screen p-2">


            {!qrScanned ?
                <div className="w-full bg-purple p-4 rounded-xl">
                    <span className="text-purpleBlack">Scan the QR There</span>
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                handleScan(result?.text);
                            }
                        }}
                    /> </div>
                : <AfterScan />
            }
        </div>
    );
};

export default QrCodeScanner;
