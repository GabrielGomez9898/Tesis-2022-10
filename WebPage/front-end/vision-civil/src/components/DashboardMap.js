import "../styles/Dashboard.scss";
import { Map, GoogleApiWrapper, InfoWindow, Marker, Circle } from "google-maps-react"
import mapStyles from "../styles/mapStyles.json";

const DashboardMap = (props) => {
    const reports = [
        {
            lat: 4.485874746123101,
            lng: -74.25950614771615
        },
        {
            lat: 4.490720944571992,
            lng: -74.26168790389913
        },
        {
            lat: 4.489296343642818,
            lng: -74.26247895000056
        },
        {
            lat: 4.488227891120813,
            lng: -74.26455863571881
        },
        {
            lat: 4.488151573023685,
            lng: -74.25616333999723
        },
        {
            lat: 4.486650648825253,
            lng: -74.26261929688953
        },
        {
            lat: 4.485365957009356,
            lng: -74.26830972532757
        },
        {
            lat: 4.48551859375208,
            lng: -74.26904973619392
        },
        {
            lat: 4.485899457190722,
            lng: -74.26865083761105
        },
        {
            lat: 4.485664142281751,
            lng: -74.26997775366553
        },
        {
            lat: 4.48903919838134,
            lng: -74.25710859527027
        },
        {
            lat: 4.49530349265277,
            lng: -74.26244843936624
        }
    ];

    const mapDimensions = {
        width: "46.5vw",
        height: "40vh",
        borderRadius: "15px"
    }

    const initialCenter = {
        lat: "4.4878791",
        lng: "-74.2591367"
    }

    const defaultMapOptions = {
        styles: mapStyles
    }

    const mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapStyles
        });
    }

    return(
        <Map google={props.google} style={mapDimensions} zoom={16} initialCenter={initialCenter} mapTypeControl={false} zoomControl={false} onReady={(mapProps, map) => mapLoaded(mapProps, map)}>
            {[...Array(reports.length)].map((value, i) => {
                return (
                    props.hasCircleMarkers ? 
                    <Circle center={reports[i]} radius={15} strokeColor="transparent" strokeOpacity={0} strokeWeight={5} fillColor="#FF0000" fillOpacity={0.35} /> : 
                    <Marker position={reports[i]}/>);
            })}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(DashboardMap);