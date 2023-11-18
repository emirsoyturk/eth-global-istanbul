import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { useAccount, useDisconnect } from "wagmi";
import Map from "./Map";

const SUBGRAPH_URL =
    process.env.REACT_APP_SUBGRAPH_URL ??
    "https://api.studio.thegraph.com/query/58684/ethglobal-istanbul/version/latest";

const recentLocationsQuery = `
    query GetUserLocations($userId: ID!) {
        user(id: $userId) {
        locationHistory(orderBy: blockTimestamp, orderDirection: desc, first: 10) {
            id
            location_latitudes
            location_longitudes
            location_timestamp
            blockTimestamp
        }
        }
    }`;

const RecentLocations = () => {
    const { address } = useAccount();
    const [recentLocations, setRecentLocations] = useState(null);
    const [centers, setCenters] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => {
        const client = new ApolloClient({
            uri: SUBGRAPH_URL,
            cache: new InMemoryCache(),
        });

        client
            .query({
                query: gql(recentLocationsQuery),
                variables: {
                    userId: address?.toLowerCase() ?? "0x0",
                },
            })
            .then((data) => {
                if (!data.data.user) {
                    setRecentLocations([]);
                    return;
                }
                let coordinates = [];
                for (let i = 0; i < data.data.user.locationHistory.length; i++) {
                    coordinates.push([]);
                    centers.push([0, 0]);
                    for (let j = 0; j < data.data.user.locationHistory[i].location_latitudes.length; j++) {
                        coordinates[i].push([
                            Number(data.data.user.locationHistory[i].location_latitudes[j]),
                            Number(data.data.user.locationHistory[i].location_longitudes[j]),
                        ]);
                        centers[i][0] += coordinates[i][j][0];
                        centers[i][1] += coordinates[i][j][1];
                    }
                    timestamps[i] = data.data.user.locationHistory[i].location_timestamp;
                    centers[i][0] /= data.data.user.locationHistory[i].location_latitudes.length;
                    centers[i][1] /= data.data.user.locationHistory[i].location_longitudes.length;
                    coordinates[i].push(coordinates[i][0]);
                }
                console.log(coordinates)
                setCenters(centers);
                setTimestamps(timestamps);
                setRecentLocations(coordinates);
            })
            .catch((err) => {
                console.log("Error fetching data: ", err);
            });
    }, []);

    return (
        <div className="h-[100vh]">
            {recentLocations && <Map polygons={recentLocations} centers={centers} timestamps={timestamps} />}
        </div>
    );
};

export default RecentLocations;
