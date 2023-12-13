import React from 'react'

class CustomGoogleMap extends React.PureComponent {
    render() {
        const { compose, withProps, lifecycle } = require("recompose");
        const {
            withScriptjs,
            withGoogleMap,
            GoogleMap,
        } = require("react-google-maps");


        const CustomGoogleMap = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAW-dGjfYKIR5DGK93BvBXekHTsGr5197g",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: '90vh'}} />,
                mapElement: <div style={{ height: `98%` }} />,
            }),
            lifecycle({
                componentWillMount() {
                    this.setState({
                        latitude: 0,
                        center: {
                            lat:38.4237, lng:27.1428
                        },
                    })
                },
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                defaultZoom={10}
                center={props.center}
                onBoundsChanged={props.onBoundsChanged}
                componentRestrictions={{country: 'IN'}}
                defaultOptions={{mapTypeControl: false, scaleControl: true, streetViewControl: false,  fullscreenControl: false}}
            >
               
            </GoogleMap>
        );
        return(
            <CustomGoogleMap mapCallback={this.props.mapCallback}/>
        )
    }
}
export default CustomGoogleMap