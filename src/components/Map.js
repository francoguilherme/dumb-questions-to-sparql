import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapComponent extends React.Component {
    render () {
        return (
            <Map
                style={{height: '20rem', width: '17.5rem'}}
                id="map"
                google={this.props.google}
                zoom={15}
                initialCenter={{
                    lng: this.props.lng,
                    lat: this.props.lat
                }}
                center={{
                    lng: this.props.lng,
                    lat: this.props.lat
                }}>

                <Marker key='marker' name={this.props.name} position={{ lat: this.props.lat, lng: this.props.lng }}/>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAdzNNwZWM-PMNzPMuIIiuOl9e5BjvXIxo'
})(MapComponent);