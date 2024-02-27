import React, { useEffect, useState } from "react";
import redMarker from './../../../assets/markers/marker_red.png';
import addMarker from './../../../assets/markers/marker_added.png';

import "./LittleMap.css";
const REACT_GOOGLE_API_KEY = "AIzaSyAW-dGjfYKIR5DGK93BvBXekHTsGr5197g"

class LittleMap extends React.PureComponent {


    render() {

        const { compose, withProps, lifecycle } = require("recompose");
        const {
            withScriptjs,
            withGoogleMap,
            GoogleMap,
            Marker
        } = require("react-google-maps");
        const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

        const MapComponent = compose(
            withProps({
                googleMapURL:
                    "https://maps.googleapis.com/maps/api/js?key=" + REACT_GOOGLE_API_KEY + "&v=3.exp&libraries=geometry,drawing",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: "50vh" }} />,
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
            let location = [];
            const [shareLocationPoints, setShareLocationPoints] = useState([]);
            const [searchLocation, setSearchLocation] = useState({ "center": null, "adress": "", "placeId": "" });
            const geocoder = new window.google.maps.Geocoder();
            const [center, setCenter] = useState({
                lat: 38.4237,
                lng: 27.1428
            })
            const [address, setAddress] = useState('');
            const [drawingMode, setDrawingMode] = useState(window.google.maps.drawing.OverlayType.MARKER); // Example initial mode

            const handleMarkerOverlayDraw = (marker, markerKey) => {
                console.log(markerKey)

                marker.key = markerKey;
                marker.setDraggable(true);


                marker.addListener('rightclick', () => {
                    setShareLocationPoints(shareLocationPoints =>
                        shareLocationPoints.filter(location => location.key !== marker.key)
                    );
                    
                    location = shareLocationPoints.filter(location => location.key !== marker.key)

                    props.removeLoc(marker.key)
                    marker.setMap(null);

                });

                marker.addListener('click', () => {
                    console.log(location.find(m => m.key === markerKey))
                });

                marker.addListener('dragend', (event) => {
                    console.log({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    });
                });

                stopDrawing();

            }

            const handleOverlayComplete = async (event) => {

                switch (event.type) {
                    case 'marker':

                        const coords = { lat: event.overlay.position.lat(), lng: event.overlay.position.lng() }; // Example coordinates
                        const key = generate8BitUniqueValue(coords.lat + "" + coords.lng);
                        const address = await reverseGeocode(coords);

                        location.push({ key: key, coords: [coords], type: event.type, address: address });

                        setShareLocationPoints([...shareLocationPoints, { key: key, coords: [coords], type: event.type, address: address }])

                        props.setLoc({ key: key, coords: [coords], type: event.type, address: address });


                        return handleMarkerOverlayDraw(event.overlay, key);

                    default:
                }
            };

            const handleSearch = async (evt) => {
                evt.preventDefault();

                if (address != "") {
                    geocoder.geocode({ address: address }, (results, status) => {

                        if (status === 'OK') {

                            setSearchLocation({
                                center: results[0].geometry.location,
                                adress: results[0].formatted_address,
                                placeId: results[0].place_id
                            });

                            moveToLocation(results[0].geometry.location.lat(), results[0].geometry.location.lng())

                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                }

            };

            const clickSearchMarker = (placeId) => {
                console.log(placeId);
                console.log(searchLocation);
            };

            const clearSearchMarker = (placeId) => {
                console.log(placeId);
                console.log(searchLocation);
            };

            const onSearchMarkerDragEnd = (event) => {
                console.log({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                });
            };

            const moveToLocation = (lat, lng) => {
                setCenter({ lat, lng });
            };

            const clearAdresSearch = () => {
                setSearchLocation({ "center": null, "adress": "", "placeId": "" })
                setAddress("")

            }

            const stopDrawing = () => {
                setDrawingMode(null);
            };

            const reverseGeocode = (coords) => {
                return new Promise((resolve, reject) => {
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: coords }, (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                resolve(results[0].formatted_address); // Resolve with the formatted address
                            } else {
                                reject(new Error('No results found'));
                            }
                        } else {
                            reject(new Error('Geocoder failed due to: ' + status));
                        }
                    });
                });
            };

            const generate8BitUniqueValue = (input) => {
                let hash = 0;
                for (let i = 0; i < input.length; i++) {
                    const character = input.charCodeAt(i);
                    hash = ((hash << 5) - hash) + character;
                    hash |= 0;
                }

                const maskedValue = hash & 0xFFFF;
                return maskedValue.toString(16).toUpperCase();
            }

            return (
                <>
                    <div className="locationList">
                        <div className="d-flex">
                            <input className="adressSearchInput" name="address" type="text" placeholder="enter address ..." style={{ width: "75%" }} value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            <button className="adressSearchButton" onClick={handleSearch}>FIND</button>
                            <button className="adressClearButton" onClick={clearAdresSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="13.5" viewBox="0 0 576 512">
                                    <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
                                </svg>
                            </button>
                        </div>
                        <div><h5 style={{ marginTop: "5px", marginLeft: "5px" }}>Location List</h5></div>
                        <div className="locationItems">
                            {shareLocationPoints?.map((location, index) => (
                                <div key={index + 1}>
                                    {index + 1} - {location.address}
                                </div>
                            ))}
                        </div>
                    </div>
                    <GoogleMap
                        defaultZoom={10}
                        center={center}
                        onBoundsChanged={props.onBoundsChanged}
                        componentRestrictions={{ country: "IN" }}
                        defaultOptions={{
                            mapTypeControl: false,
                            scaleControl: true,
                            streetViewControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        <DrawingManager options={{
                            drawingMode,
                            drawingControl: true,
                            drawingControlOptions: {
                                position: window.google.maps.ControlPosition.TOP_LEFT,
                                drawingModes: [window.google.maps.drawing.OverlayType.MARKER],
                            },
                            markerOptions: {
                                icon: addMarker
                            },
                        }} onOverlayComplete={handleOverlayComplete}>

                        </DrawingManager>

                        {searchLocation.center != null &&
                            (<Marker
                                icon={redMarker}
                                key={searchLocation.placeId}
                                position={searchLocation.center}
                                onClick={() => clickSearchMarker(searchLocation.placeId)}
                                onRightClick={() => clearSearchMarker(searchLocation.placeId)}
                                draggable={true}
                                onDragEnd={onSearchMarkerDragEnd}
                            />)
                        }
                    </GoogleMap>
                </>
            )
        }
        );
        return <MapComponent mapCallback={this.props.mapCallback} setLoc={this.props.setLoc} removeLoc={this.props.removeLoc}
        />;
    }
}

export default LittleMap;