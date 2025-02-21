import React from "react";
import { GoogleMap, Marker } from "react-google-maps";

export class MaliciousIpsMapPresentation extends React.Component {

    render() {

        const { maliciousIps } = this.props;
        
        return (
            <GoogleMap
                defaultZoom={1}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                {maliciousIps.map(ip => <Marker key={ip.id} position={{ lat: ip.latitude, lng: ip.longitude }} />)}
            </GoogleMap>
        );
    }
}

export default MaliciousIpsMapPresentation;