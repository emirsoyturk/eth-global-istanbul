import React, { useState, useRef, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { QrReader } from "react-qr-reader";
import io from "socket.io-client";
import Map2 from "../RecentBorders/Map";
import { getInfos } from "../../api";
import { ethers } from "ethers";

const backend_url = `${
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
}`;

const socket = io(backend_url, { transports: ["websocket"] });

const SUBGRAPH_URL =
  process.env.REACT_APP_SUBGRAPH_URL ??
  "https://api.studio.thegraph.com/query/58684/zkmap-scroll-recap-demo/v0.1/";

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

  const [proveButtonContent, setProveButtonContent] = useState("Proving...");
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
  };
  const { address } = useAccount();
  const [recentBorders, setRecentBorders] = useState(null);
  const [centers, setCenters] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [lastProof, setLastProof] = useState(null);
  const [lastPublicInputs, setLastPublicInputs] = useState(null);

  const [map2_polygons, setMap2_polygons] = useState([]);
  const [map2_centers, setMap2_centers] = useState([]);
  const [gps, setGps] = useState([[]]);
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
          for (
            let j = 0;
            j < data.data.user.borderHistory[i].border_latitudes.length;
            j++
          ) {
            coordinates[i].push([
              Number(data.data.user.borderHistory[i].border_latitudes[j]),
              Number(data.data.user.borderHistory[i].border_longitudes[j]),
            ]);
            centers[i][0] += coordinates[i][j][0];
            centers[i][1] += coordinates[i][j][1];
          }
          timestamps[i] = data.data.user.borderHistory[i].border_timestamp;
          centers[i][0] /=
            data.data.user.borderHistory[i].border_latitudes.length;
          centers[i][1] /=
            data.data.user.borderHistory[i].border_longitudes.length;
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

    polygons.forEach((polygon) => {
      let centerX = 0;
      let centerY = 0;

      polygon.forEach((point) => {
        centerX += point[0];
        centerY += point[1];
      });

      centerX /= polygon.length;
      centerY /= polygon.length;

      centers.push([centerX, centerY]);
    });

    return centers;
  };

  const polygons_1 = [
    [
      [0, 0],
      [5, 10],
      [10, 0],
    ],
    [
      [10, 10],
      [15, 20],
      [20, 10],
    ],
  ];
  const centers_1 = calculateCenters(polygons_1);

  const handleScan = async (scannedText) => {
    setQrScanned(true);

    try {
      const pairs = scannedText.split(" ");

      const polygons_scanned = [];
      for (let i = 0; i < pairs.length; i += 2) {
        polygons_scanned.push([
          parseFloat(pairs[i] / 100000),
          parseFloat(pairs[i + 1] / 100000),
        ]);
      }
      const centers_scanned = calculateCenters([polygons_scanned]);

      setMap2_polygons([polygons_scanned]);
      setMap2_centers(centers_scanned);
    } catch {
      console.error("Error during polygon parse.");
    }

    if (qrReaderRef.current) {
      qrReaderRef.current.stop();
    }
    /* 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        let gpsData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setGps([gpsData.longitude, gpsData.latitude]);

      });
    } else {
      console.error("Tarayici konum servisini desteklemiyor.");
    } */

    const pairs = scannedText.split(" ");

    handleLocation(28.9784323232, 41.1202242353, pairs);
  };

  function handleBack(e) {
    setQrScanned(false);
    setProveButtonContent("Proving the borders...");
  }

  function handleTx() {
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x1E9060C89c4c461dD59167cf654a73da76378d32",
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "_verifier",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              components: [
                {
                  internalType: "uint256[]",
                  name: "latitudes",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "longitudes",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              indexed: false,
              internalType: "struct Map.Location",
              name: "location",
              type: "tuple",
            },
          ],
          name: "LocationAdded",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_proof",
              type: "bytes",
            },
            {
              internalType: "bytes32[]",
              name: "_publicInputs",
              type: "bytes32[]",
            },
          ],
          name: "addLocation",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "addressLocation",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256[]",
                  name: "latitudes",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "longitudes",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct Map.Location",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "addressLocationCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      signer
    );

    contract.connect(signer);
    contract.addLocation("0x00", [
      ...lastPublicInputs.map((x) =>
        ethers.utils.hexZeroPad(ethers.utils.hexlify(x), 32)
      ),
    ]);
  }

  const handleProveClick = () => {
    handleTx();
  };

  const handleLocation = async (latitude, longitude, borders) => {
    let timestamp = new Date().getTime();
    let url = `${backend_url}/noir/prove/location`;
    const infos = await getInfos(latitude, longitude, timestamp);
    const response = await (
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: infos.signature,
          lat: parseInt(latitude * 100000),
          long: parseInt(longitude * 100000),
          timestamp: timestamp,
        }),
      })
    ).json();

    url = `${backend_url}/noir/prove/inside`;
    console.log(borders.length);

    const response2 = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proof: response.proof,
        publicInputs: response.publicInputs,
        location: {
          latitude: parseInt(latitude * 100000),
          longitude: parseInt(longitude * 100000),
        },
        borders: [
          {
            latitude: borders[0],
            longitude: borders[1],
          },
          {
            latitude: borders[2],
            longitude: borders[3],
          },
          {
            latitude: borders[4],
            longitude: borders[5],
          },
          {
            latitude: borders[6],
            longitude: borders[7],
          },
        ],
      }),
    });

    const json2 = await response2.json();

    setLastPublicInputs(json2.publicInputs);
    setLastProof(json2.proof);
    console.log(json2);

    setProveButtonContent("Send your proof to chain");

    return json2;
  };

  const AfterScan = () => {
    return (
      <div className="w-full h-full rounded-xl flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center absolute z-10 top-[5vh]">
          <button
            onClick={handleBack}
            className="w-[80vw] h-[6vh] rounded-xl bg-purpleBlack text-softPurple mb-4"
          >
            <span>Scan Again</span>
          </button>
          <button
            onClick={handleProveClick}
            className="w-[80vw] h-[6vh] rounded-xl bg-purpleBlack text-softPurple my-4"
          >
            <span>{proveButtonContent}</span>
          </button>
        </div>
        <div className="h-[100vh] w-[100vw]">
          {recentBorders && (
            <Map2 polygons={map2_polygons} centers={map2_centers} />
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      {!qrScanned ? (
        <div className="w-full p-4 rounded-xl">
          <span className="text-purpleBlack ">Scan the QR There</span>
          <QrReader
            constraints={{
              facingMode: "environment",
              width: { max: 2000, min: 480 },
            }}
            scanDelay={50}
            ref={qrReaderRef}
            onResult={async (result, error) => {
              if (!!result) {
                await handleScan(result?.text);
              }
            }}
            videoContainerStyle={{}}
            videoStyle={{
              width: "120%",
              height: "100%",
              padding: "10px",
              border: "solid",
              borderStyle: "dashed",
              borderWidth: "4px",
              borderColor: "#261863",
            }}
          />{" "}
        </div>
      ) : (
        <AfterScan />
      )}
    </div>
  );
};

export default QrCodeScanner;
