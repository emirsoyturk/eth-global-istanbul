import React from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import HeaderBG from "../../Images/header_bg.svg";
import HeaderCoin from "../../Images/header_coin.png";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useAccount } from "wagmi";

import { Link } from "react-router-dom";

const SUBGRAPH_URL =
    process.env.REACT_APP_SUBGRAPH_URL ??
    "https://api.studio.thegraph.com/query/58684/zkmap-scroll-recap-demo/v0.1/";

const totalDistanceQuery = `
  query GetUserTotalDistance($userId: ID!) {
    user(id: $userId) {
      totalDistance
    }
  }`;

const CardItem = ({ title, subtitle }) => {
    const { address, isConnected } = useAccount();
    const [totalDistance, setTotalDistance] = React.useState("-");

    React.useEffect(() => {
        const client = new ApolloClient({
            uri: SUBGRAPH_URL,
            cache: new InMemoryCache(),
        });
        client
            .query({
                query: gql(totalDistanceQuery),
                variables: {
                    userId: address?.toLowerCase() ?? "0x0",
                },
            })
            .then((data) => {
                setTotalDistance(data.data.user?.totalDistance ?? "-");
            });
    }, [address]);

    return (
        <div className="flex justify-center items-center relative">
            <img className="w-[90%] ml-3 h-auto" src={HeaderBG} alt="Backghttps://account.mapbox.comround" />
            <div className="absolute inset-0 flex justify-around items-center flex-row">
                <div className="relative ml-[15vw]">
                    <p className="absolute text-[3.6vw] -top-[8vw] w-[40vw] text-pink">
                        {title || "Placeholder Title"}
                    </p>
                    <p className="text-[6vw] font-bold w-[40vw] text-white">{isConnected
                            ? totalDistance !== '-' ? `${(totalDistance / 100000).toFixed(2)} km` : '-'
                            : (subtitle || '-')}</p>
                    <div className="cursor-pointer absolute -bottom-[16vw] left-0 ml-[6vw] mt-[5vw]">
                        <div className="flex justify-center items-center bg-yellow-500 rounded-full w-fit">
                            <MdOutlineQrCodeScanner size={"12vw"} className="text-purpleBlack p-2" />
                        </div>
                    </div>
                </div>
                <img className="w-[30vw] mr-[15vw] -ml-[1vw]" src={HeaderCoin} alt="Background" />
            </div>
        </div>
    );
};

export default CardItem;
