import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useAccount } from "wagmi";
import Map2 from "./Map";

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

const RecentBorders = () => {
    const { address } = useAccount();
    const [recentBorders, setRecentBorders] = useState(null);
    const [centers, setCenters] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

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
                console.log(coordinates);
                setCenters(centers);
                setTimestamps(timestamps);
                setRecentBorders(coordinates);
            })
            .catch((err) => {
                console.log("Error fetching data: ", err);
            });
    }, []);

    return (
        <div className="h-[100vh]">
            {recentBorders && <Map2 polygons={recentBorders} centers={centers} timestamps={timestamps} />}
        </div>
    );
};

export default RecentBorders;
