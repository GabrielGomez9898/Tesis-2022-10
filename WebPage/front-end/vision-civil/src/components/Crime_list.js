import React, { useState } from "react";
import "../styles/Crime_list.scss";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { renderMatches } from "react-router-dom";

const lista = [];
const requestURL = 'http://127.0.0.1:8001/controlPanel/reports/';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();	

  const Crime_list = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }
  const mapStyles = {
    width: "43.5%",
    height: "46%"
}
  const Modal = ({ object: { item} }) => (
    <div id="CrimeListtModal" className="active modal" >
		<div className="modal-container">
			<button className="modalboton" onClick={() => setShowModal(false)}>X</button>
			<br></br>
			<span>{item.asunto}</span>
			<br></br>
			<span className="TipoAlerta">{item.tipo_reporte}</span>
			<br></br>
			<span className="Descripcion">{item.descripcion}</span>
			<br></br>
			<span className="fecha">{item.fecha_hora}</span>
			<br></br>
			<span className="foto">{item.user_phone}</span>
			<br></br>
			<span className="video">{video}</span>
			<br></br>
			<span className="estado">{item.estado}</span>
			<br></br>
			<Map google={google} zoom={16} style={mapStyles} initialCenter={{lat:item.latitude, lng : item.longitude}}>
            <Marker position={{lat: latitud , lng:longitud}} />
        	</Map>
		</div>
    </div>
	
  );
  
  return (
    <>
	<h1 className="title"> Listado de crimenes</h1>
      <ul className="list-menu list">
        {this.lista.map(({ item}) => (
          <li
            key={item.id}
            onClick={() => {
              setActiveObject({ item});
              setShowModal(true);
            }}
            className={getClass(item)}
          >
            <h2>{item.asunto}</h2>
          </li>
        ))}
      </ul>
      {showModal ? <Modal object={activeObject} /> : null}
    </>
  );
};

export default Crime_list;