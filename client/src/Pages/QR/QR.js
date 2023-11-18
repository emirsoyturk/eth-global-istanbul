import React, { useState, useRef, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { QrReader } from "react-qr-reader";
import io from "socket.io-client";
import Map2 from "../RecentBorders/Map";

const socket = io(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'}`, { transports: ['websocket'] });

const SUBGRAPH_URL =
    process.env.REACT_APP_SUBGRAPH_URL ??
    "https://api.studio.thegraph.com/query/58684/ethglobal-istanbul/version/latest";

const recentBordersQuery = `
    query GetUserBorders($userId: ID!) {
        user(id: $userId) {
        borderHistory(orderBy: blockTimestamp, orderDirection: desc, first: 10) {
            id
            border_latitudes
            border_longitudes
            border_timestamp
            blockTimestamp
        }
        }
    }`;

const QrCodeScanner = () => {
    const [qrScanned, setQrScanned] = useState(false);

    const [proveButtonContent, setProveButtonContent] = useState("Prove that you are in the area");
    const qrReaderRef = useRef(null);

    const sendMessage = (uid, message) => {
        socket.emit("message", { uid, message });
    };

    const randomJsonData = () => {
        return {
            uid: Math.random().toString(36).substring(7),
            latitude: Math.floor(Math.random() * 90),
            longitude: Math.floor(Math.random() * 180),
        };
    }
    const { address } = useAccount();
    const [recentBorders, setRecentBorders] = useState(null);
    const [centers, setCenters] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    const [map2_polygons, setMap2_polygons] = useState([])
    const [map2_centers, setMap2_centers] = useState([])
    useEffect(() => {
        const client = new ApolloClient({
            uri: SUBGRAPH_URL,
            cache: new InMemoryCache(),
        });

        client
            .query({
                query: gql(recentBordersQuery),
                variables: {
                    userId: address?.toLowerCase() ?? "0x0",
                },
            })
            .then((data) => {
                if (!data.data.user) {
                    setRecentBorders([]);
                    return;
                }
                let coordinates = [];
                for (let i = 0; i < data.data.user.borderHistory.length; i++) {
                    coordinates.push([]);
                    centers.push([0, 0]);
                    for (let j = 0; j < data.data.user.borderHistory[i].border_latitudes.length; j++) {
                        coordinates[i].push([
                            Number(data.data.user.borderHistory[i].border_latitudes[j]),
                            Number(data.data.user.borderHistory[i].border_longitudes[j]),
                        ]);
                        centers[i][0] += coordinates[i][j][0];
                        centers[i][1] += coordinates[i][j][1];
                    }
                    timestamps[i] = data.data.user.borderHistory[i].border_timestamp;
                    centers[i][0] /= data.data.user.borderHistory[i].border_latitudes.length;
                    centers[i][1] /= data.data.user.borderHistory[i].border_longitudes.length;
                    coordinates[i].push(coordinates[i][0]);
                }
                setCenters(centers);
                setTimestamps(timestamps);
                setRecentBorders(coordinates);
            })
            .catch((err) => {
                console.log("Error fetching data: ", err);
            });
    }, []);
    const calculateCenters = (polygons) => {
        const centers = [];

        polygons.forEach(polygon => {
            let centerX = 0;
            let centerY = 0;

            polygon.forEach(point => {
                centerX += point[0];
                centerY += point[1];
            });

            centerX /= polygon.length;
            centerY /= polygon.length;

            centers.push([centerX, centerY]);
        });

        return centers;
    };

    const polygons_1 = [[[0, 0], [5, 10], [10, 0]], [[10, 10], [15, 20], [20, 10]]]
    const centers_1 = calculateCenters(polygons_1)

    const handleScan = async (scannedText) => {
        setQrScanned(true);

        try {
            const pairs = scannedText.split(' ');

            const polygons_scanned = [];
            for (let i = 0; i < pairs.length; i += 2) {
                polygons_scanned.push([parseFloat(pairs[i] / 100000), parseFloat(pairs[i + 1] / 100000)]);
            }
            const centers_scanned = calculateCenters([polygons_scanned]);

            setMap2_polygons([polygons_scanned]);
            setMap2_centers(centers_scanned);
        } catch { console.error('Error during polygon parse.'); }

        console.log("gps read: ")

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const gpsData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                if (qrReaderRef.current) {
                    qrReaderRef.current.stop();
                }
            });
        } else {
            console.error('Tarayici konum servisini desteklemiyor.');
        }
    }

    function handleBack(e) {
        setQrScanned(false);
        setProveButtonContent("Prove that you are in the area")
    }
    const handleProveClick = () => {
        setTimeout(() => {
            setProveButtonContent("Proved");
        }, 4000);
    };

    const AfterScan = () => {
        return (
            <div className="w-full h-full rounded-xl flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center absolute z-10 top-[5vh]">
                    <button onClick={handleBack} className="w-[80vw] h-[6vh] rounded-xl bg-purpleBlack text-softPurple mb-4" >
                        <span>Scan Again</span>
                    </button>
                    <button onClick={handleProveClick} className="w-[80vw] h-[6vh] rounded-xl bg-purpleBlack text-softPurple my-4" >
                        <span>{proveButtonContent}</span>
                    </button>
                </div>
                <div className="h-[100vh] w-[100vw]">
                    {recentBorders && <Map2 polygons={map2_polygons} centers={map2_centers} timestamps={[]} />}
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center h-full w-full">
            {!qrScanned ?
                <div className="w-full p-4 rounded-xl">
                    <span className="text-purpleBlack ">Scan the QR There</span>
                    <QrReader
                        constraints={{
                            facingMode: 'environment',
                            width: { max: 2000, min: 480 },
                        }}
                        scanDelay={50}
                        ref={qrReaderRef}
                        onResult={(result, error) => {
                            if (!!result) {
                                handleScan(result?.text);
                            }
                        }}
                        videoContainerStyle={{}}
                        videoStyle={{
                            width: '120%', height: '100%', padding: '10px',
                            border: 'solid', borderStyle: 'dashed', borderWidth: '4px', borderColor: '#261863'
                        }}
                    /> </div>
                : <AfterScan />
            }
        </div>
    );
};

export default QrCodeScanner;
