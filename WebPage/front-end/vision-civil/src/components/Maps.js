import { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import GoogleMaps from 'simple-react-google-maps';
import "../styles/Crime_list.scss";

 const Maps = (props) =>{
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSn06808V8ZOQLN9iIQ1W9ok83cQCjDgg"> </script>
    console.log(props.latitud);
        return(
            <div className="container">
                hola
                <GoogleMaps
                  bootstrapURLKeys={{ key: "AIzaSyDSn06808V8ZOQLN9iIQ1W9ok83cQCjDgg" }}
                style = {{height: "300px" , width : "300px"}}
                apiKey={"AIzaSyDSn06808V8ZOQLN9iIQ1W9ok83cQCjDgg"}
                
                center={{
                    lat : 4.49155, //this.props.latitud,
                    lng : -74.2606//this.props.longitud 
                }}
                />
            </div>
            
        );
        
    };
export default Maps;
