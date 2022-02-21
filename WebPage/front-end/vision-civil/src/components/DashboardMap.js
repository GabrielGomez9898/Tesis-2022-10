import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

const DashboardMap = (props) => {
    const reports = [
        {
            lat: "4.485874746123101",
            lng: "-74.25950614771615"
        },
        {
            lat: "4.490720944571992",
            lng: "-74.26168790389913"
        },
        {
            lat: "4.489296343642818",
            lng: "-74.26247895000056"
        },
        {
            lat: "4.488227891120813",
            lng: "-74.26455863571881"
        },
        {
            lat: "4.488151573023685",
            lng: "-74.25616333999723"
        },
        {
            lat: "4.486650648825253",
            lng: "-74.26261929688953"
        },
        {
            lat: "4.485365957009356",
            lng: "-74.26830972532757"
        },
        {
            lat: "4.48551859375208",
            lng: "-74.26904973619392"
        },
        {
            lat: "4.485899457190722",
            lng: "-74.26865083761105"
        },
        {
            lat: "4.485664142281751",
            lng: "-74.26997775366553"
        },
        {
            lat: "4.48903919838134",
            lng: "-74.25710859527027"
        },
        {
            lat: "4.49530349265277",
            lng: "-74.26244843936624"
        }
    ];

    const mapStyles = {
        width: "100%",
        height: "100%"
    }

    const initialCenter = {
        lat: "4.4878791",
        lng: "-74.2591367"
    }

    const markers = [...Array(reports.length)].map((value, i) => {
        <Marker position={reports[i]} />
    })

    return(
        <Map google={props.google} zoom={16} style={mapStyles} initialCenter={initialCenter}>
            {markers}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(DashboardMap);