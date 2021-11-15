import React, {useState, useRef} from 'react';
import ReactMapGL, {ScaleControl } from 'react-map-gl';

import { API } from 'aws-amplify'
import regeneratorRuntime from 'regenerator-runtime'

export default function UserMap(props) {

    //MAPBOX API
    let MAPBOX_TOKEN = 'pk.eyJ1Ijoia2FydGhpa3JiYWJ1IiwiYSI6ImNrYjF0cjlybDAzcDMycm12bGRzamxlbjkifQ.BDgWuZKDCREPg3kmUCMnKw';
    let CLIMATE_ZONE_LABELS = 'mapbox://styles/karthikrbabu/ckvukh96l327h15qstkn3ziwy';
    let MAP_STYLE = CLIMATE_ZONE_LABELS; 

    //Defaults => Central Downtown Chicago
    const [viewport, setViewport] = useState({
        latitude: 37.3,
        longitude: -119.4179,
        zoom: 4.5,
        width: '25vw',
        height: '30vw',
        bearing: 0,
        pitch: 0
    });

    const mapRef = useRef(null);

    //Extract Props
    console.log("%c UserMap Props:", "color:blue", props);
    return (
        <div>
            <ReactMapGL {...viewport} 
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle={MAP_STYLE}
                ref={mapRef}
                onViewportChange={(viewport) => {
                    setViewport(viewport)
                }}
            >
                <div style={{ position: "absolute", bottom: 100, left: 100 }}>
                    <ScaleControl maxWidth={100} unit={"imperial"} />
                </div>
            </ReactMapGL>
        </div>
    );
}
