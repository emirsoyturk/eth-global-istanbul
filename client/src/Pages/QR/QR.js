import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import io from "socket.io-client";

const socket = io(`${process.env.BACKEND_URL || 'http://localhost:4000'}` , { transports: ['websocket'] });

// useeffect socket

const QrCodeScanner = () => {
    const [qrScanned, setQrScanned] = useState(false);

    const sendMessage = (uid, message) => {
        socket.emit("message", { uid, message });
    };

    const handleScan = (scannedUid) => {
        sendMessage(scannedUid, "Hello from Phone A!");

        setQrScanned(true);
    };

    function handleBack(e){
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
        <div className="flex justify-center items-center h-full p-2">
            {!qrScanned ?
                <div className="w-full bg-purple p-4 rounded-xl">
                    <span className="text-purpleBlack">Scan the QR There</span>
                    <QrReader
                        constraints={{
                            facingMode: 'environment',
                            width: { max: 2000, min: 480 },
                          }}
                        scanDelay={250}
                        onResult={(result, error) => {
                            if (!!result) {
                                handleScan(result?.text);
                            }
                        }}
                        videoContainerStyle={{}}
                        videoStyle={{}}
                    /> </div>
                : <AfterScan />
            }
        </div>
    );
};

export default QrCodeScanner;