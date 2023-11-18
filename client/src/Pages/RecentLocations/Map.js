import React, { useEffect, useState } from "react";

import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl, RotationControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ polygons, centers, timestamps }) => {
    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAP_APIKEY,
    });

    const multiPolygonPaint = {
        "fill-color": "#3bb2d0",
        "fill-opacity": 0.5,
    };

    const polygonPaint = {
        "fill-color": "#6F788A",
        "fill-opacity": 0.7,
    };

    const AllShapesPolygonCoords = [
        [
            [32.34375, 40.3130432],
            [28.2019043, 39.0533181],
            [32.4865723, 38.1172717],
            [34.5410156, 39.935013],
            [32.34375, 40.3130432],
        ],
    ];

    return (
        <div className="h-[50vh]">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <ZoomControl />
                <RotationControl style={{ top: 80 }} />
                {polygons.map((polygon, i) => (
                    <div key={i+ 1}>
                        <Layer type="fill" paint={multiPolygonPaint}>
                            <Feature coordinates={[polygon]} />
                        </Layer>
                        <Popup
                            coordinates={centers[i]}
                            // offset={{
                            //     "bottom-left": [12, -38],
                            //     bottom: [0, -38],
                            //     "bottom-right": [-12, -38],
                            // }}
                        >
                            <h1>You were here at {new Date(timestamps[i] * 1000).toLocaleDateString()}</h1>
                        </Popup>
                    </div>
                ))}
            </Map>
            ;
        </div>
    );
};

export default Map;
