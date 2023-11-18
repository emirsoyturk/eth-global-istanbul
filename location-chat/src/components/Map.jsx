import * as React from "react";
import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Map from "react-map-gl";
import "../index.css";

import DrawControl from "./draw-control";
import {DrawCheck} from "./draw-control";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = import.meta.env.VITE_MAP_APIKEY; // Set your mapbox token here

const CustomMap = ({ setPolygonCoordinates }) => {
    const [features, setFeatures] = useState({});

    const onUpdate = useCallback((e) => {
        setFeatures((currFeatures) => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback((e) => {
        setFeatures((currFeatures) => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    return (
        <div style={{ height: "60%", width: "100%" }}>
            <Map
                initialViewState={{
                    longitude: -91.874,
                    latitude: 42.76,
                    zoom: 12,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v9" // "mapbox://styles/mapbox/satellite-v9"
                mapboxAccessToken={TOKEN}
            >
                <DrawControl
                    position="top-left"
                    displayControlsDefault={false}
                    controls={{
                        polygon: false,
                        trash: false,
                    }}
                    defaultMode="draw_polygon"
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </Map>
            <DrawCheck style={{ height: '0px' }} setPolygonCoordinates={setPolygonCoordinates} />
        </div>
    );
};

// export function renderToDom(container) {
//   createRoot(container).render(<App />);
// }

export default CustomMap;
