import React, {useState, useRef} from 'react';
import ReactMapGL, {ScaleControl } from 'react-map-gl';

export default function UserMap(props) {

    //MAPBOX API
    let MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
    let MAP_STYLE = 'mapbox://styles/karthikrbabu/ckwd7ofwo5hk714mg711qqzij';

    //Defaults => Central Downtown Chicago
    const [viewport, setViewport] = useState({
        latitude: 37.3,
        longitude: -119.4179,
        zoom: 4.75,
        width: '30vw',
        height: '35vw',
        bearing: 0,
        pitch: 0
    });

    const mapRef = useRef(null);

    //Extract Props
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

