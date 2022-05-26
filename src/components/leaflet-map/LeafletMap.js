
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw';

const LayerType = {
    RECTANGLE: 'rectangle',
    MARKER: 'marker',
    POLYGON: 'polygon'
}

export class LeafletMap extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            long: 0,
            markerPoints: [],
            customMarkers: []
        };
    }

    onCreated = e => {
        console.log(e);
        if (e.layerType === LayerType.MARKER) {
            let newMarkers = [...this.state.markerPoints, { lat: e.layer._latlng.lat, long: e.layer._latlng.lng }];
            this.setState({ ...this.state, markerPoints: newMarkers });
        }

        if (e.layerType === LayerType.POLYGON) {
            console.log(e.layer._latlngs);
        }
    };

    onChangeLat = e => {
        this.setState({ lat: e.target.value });
    }

    onChangeLong = e => {
        this.setState({ long: e.target.value });
    }

    onClick = e => {
        this.setState({ customMarkers: [...this.state.customMarkers, { lat:this.state.lat, long:this.state.long }] });
    }

    render() {

        return (
            <div>
                <div>
                   
                        <input placeholder="lattitude" type="number" onChange={this.onChangeLat} />
                    
                   
                        <input placeholder="longitude" type="number" onChange={this.onChangeLong} />
                   
                    <button color="primary" onClick={this.onClick}>Add Marker</button>{' '}
                </div>
                <MapContainer
                    center={[37.8189, -122.4786]}
                    zoom={13}
                    style={{ height: '100vh' }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup>
                        <EditControl position="topright" onCreated={this.onCreated} />
                    </FeatureGroup>
                    {this.state.customMarkers.map(ele => {
                        return <Marker position={[ele.lat, ele.long]} draggable={true} animate={true}>
                            <Popup> Test Popup </Popup>
                        </Marker>
                    })}
                </MapContainer>
                <div>
                    <h3>Added Markers</h3>
                    <ul>
                        {this.state.markerPoints.map(ele => {
                            return <li>{'lat :' + ele.lat.toString() + '         long :' + ele.long.toString()}</li>
                    })}
                    </ul>
                </div>                
            </div>
        )
    }
};
