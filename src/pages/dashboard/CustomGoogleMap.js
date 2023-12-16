import React, { useState } from "react";

class CustomGoogleMap extends React.PureComponent {

  render() {

    const { compose, withProps, lifecycle } = require("recompose");
    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap
    } = require("react-google-maps");
    const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


    const CustomGoogleMap = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAW-dGjfYKIR5DGK93BvBXekHTsGr5197g&v=3.exp&libraries=geometry,drawing",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: "80vh" }} />,
        mapElement: (
          <div
            style={{
              height: `98%`,
              borderRadius: "10px",
              border: "5px solid #fff",
            }}
          />
        ),
      }),
      lifecycle({
        componentDidMount() {
          this.drawingManagerListener = null;
        },
        componentWillMount() {
          this.setState({
            overlays: {},
            latitude: 0,
            center: {
              lat: 38.4237,
              lng: 27.1428,
            },
          });
        },
        componentWillUnmount() {
          if (this.drawingManagerListener && window.google && window.google.maps && window.google.maps.event) {
            window.google.maps.event.removeListener(this.drawingManagerListener);
          }
        }
      }),
      withScriptjs,
      withGoogleMap
    )((props) => {
      const [markers, setMarkers] = useState([]);

      const handleMarkerOverlayDraw = (marker) => {
        const newMarker = marker;
        const markerKey = Date.now(); // Unique identifier for the marker

        if (newMarker) {
          newMarker.key = markerKey; // Assign the key to the marker

          newMarker.addListener('rightclick', () => {
            newMarker.setMap(null); // Remove the marker from the map
            setMarkers(currentMarkers => currentMarkers.filter(marker => marker.key !== markerKey));
          });

          setMarkers(currentMarkers => [...currentMarkers, newMarker]);
        }
      }

      const handleCircleOverlayDraw = (circle) => {
        console.log(markers);
        markers.forEach(m=>{
          console.log(m.getPosition().lat()+" - "+m.getPosition().lng())
        })
      }

      const handlePolygonOverlayDraw = (circle) => {

      }

      const handleRectangleOverlayDraw = (circle) => {

      }

      const handlePolyLineOverlayDraw = (circle) => {

      }

      const handleOverlayComplete = (event) => {
        console.log(event);
        switch (event.type) {
          case 'marker':
            return handleMarkerOverlayDraw(event.overlay);
          case 'polyline':
            return handlePolyLineOverlayDraw(event.overlay);
          case 'rectangle':
            return handleRectangleOverlayDraw(event.overlay);
          case 'circle':
            return handleCircleOverlayDraw(event.overlay);
          case 'polygon':
            return handlePolygonOverlayDraw(event.overlay);
          default:
        }
      };

      return (
        <GoogleMap
          defaultZoom={10}
          center={props.center}
          onBoundsChanged={props.onBoundsChanged}
          componentRestrictions={{ country: "IN" }}
          defaultOptions={{
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          <DrawingManager onOverlayComplete={handleOverlayComplete}>

          </DrawingManager>
        </GoogleMap>
      )
    }
    );
    return <CustomGoogleMap mapCallback={this.props.mapCallback} />;
  }
}
export default CustomGoogleMap;
