import React from "react";

import ReactMapboxGl, {
  Layer,
  Feature,
  ZoomControl,
  RotationControl,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map2 = ({ polygons, centers, realLocation }) => {
    console.log(realLocation)
    console.log(centers[0])
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_APIKEY,
  });

  const multiPolygonPaint = {
    "fill-color": "#3bb2d0",
    "fill-opacity": 0.7,
  };

  const polygonPaint = {
    "fill-color": "#6F788A",
    "fill-opacity": 0.7,
  };

  const circlePaint = {
    "circle-radius": 6,
    "circle-color": "#223b53",
    // 'circle-stroke-color': 'white',
    // 'circle-stroke-width': 1,
    "circle-opacity": 0.7,
  };

  const realLocPaint = {
    "circle-radius": 6,
    "circle-color": "#7056B2",
    // 'circle-stroke-color': 'white',
    // 'circle-stroke-width': 1,
    "circle-opacity": 0.7,
  };


  const ExamplePolygonCoordinates = [
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
        center={centers[0]}
        zoom={[6]}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <ZoomControl/>
        <RotationControl style={{ top: 80 }} />
        {polygons.map((polygon, i) => (
          <div key={i + 1}>
            <Layer type="fill" paint={multiPolygonPaint}>
              <Feature coordinates={[polygon]} />
            </Layer>
            <Layer type="dot" paint={circlePaint}>
              <Feature
                coordinates={centers[i]}
                onClick={(x) => {
                  x.map.flyTo({
                    center: centers[i],
                    zoom: 6,
                    speed: 5,
                    curve: 1,
                    easing(t) {
                      return t;
                    },
                  });
                }}
              />
            </Layer>
            <Layer type="circle" paint={realLocPaint}>
              <Feature
                coordinates={realLocation}
                onClick={(x) => {
                  x.map.flyTo({
                    center: centers[i],
                    zoom: 6,
                    speed: 5,
                    curve: 1,
                    easing(t) {
                      return t;
                    },
                  });
                }}
              />
            </Layer>
          </div>
        ))}
      </Map>
      ;
    </div>
  );
};

export default Map2;
