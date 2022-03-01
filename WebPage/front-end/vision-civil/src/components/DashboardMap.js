import "../styles/Dashboard.scss";
import { Map, GoogleApiWrapper, InfoWindow, Marker, Circle } from "google-maps-react"
import mapStyles from "../styles/mapStyles.json";
import { useSelector } from "react-redux";

const DashboardMap = (props) => {
    const mapData = useSelector((state) => state.mapData.value);

    const mapDimensions = {
        width: "62.5vw",
        height: "48vh",
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
            {[...Array(mapData.length)].map((value, i) => {
                let circleColor = "";
                let CircleOpacity = 0.0;

                if(mapData[i].reportType === "HURTO_VIVIENDA") {
                    circleColor = "#00b7ff";
                }
                else if(mapData[i].reportType === "HURTO_PERSONA") {
                    circleColor = "#001aff";
                }
                else if(mapData[i].reportType === "HURTO_VEHICULO") {
                    circleColor = "#008000";
                }
                else if(mapData[i].reportType === "VANDALISMO") {
                    circleColor = "#4d0080";
                }
                else if(mapData[i].reportType === "VIOLACION") {
                    circleColor = "#ff00ff";
                }
                else if(mapData[i].reportType === "HOMICIDIO") {
                    circleColor = "#ff0000";
                }
                else if(mapData[i].reportType === "AGRESION") {
                    circleColor = "#ff8800";
                }

                return <Circle center={{lat:parseFloat(mapData[i].lat), lng:parseFloat(mapData[i].lng)}} radius={15} strokeColor="transparent" strokeOpacity={0} strokeWeight={5} fillColor={circleColor} fillOpacity={0.4} />
            })}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(DashboardMap);