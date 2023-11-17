import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import io from "socket.io-client";

const socket = io("http://localhost:4000", { transports : ['websocket'] }); // TODO: Read from .env

const QrCodeScanner = () => {
    const [uid, setUid] = useState("");

    const sendMessage = (uid, message) => {
        socket.emit("message", { uid, message });
    };

    const handleScan = (scannedUid) => {
        setUid(scannedUid);
        sendMessage(scannedUid, "Hello from Phone A!");
    };

    return (
        <>
            <p>{uid}</p>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        handleScan(result?.text);
                    }
                }}
                style={{ width: "50%" }}
            />
        </>
    );
};

export default QrCodeScanner;
