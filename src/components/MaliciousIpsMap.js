import React from "react";
import MaliciousIpsMapPresentation from "./MaliciousIpsMapPresentation";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import { connect } from "react-redux";
import { compose, withProps } from "recompose"

const mapStateToProps = (state) => (
    {
        maliciousIps: state.maliciousIps
    }
);

const MaliciousIpsMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBM2LGjd3sB4hKaqLc8yVdyudzHsC1aZk8",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    connect(mapStateToProps, null)
)(MaliciousIpsMapPresentation);

export default MaliciousIpsMap;