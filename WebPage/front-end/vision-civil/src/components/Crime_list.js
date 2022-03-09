import React, { Component, useState } from "react";
import "../styles/Crime_list.scss";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"
import Axios from "axios";


const Crime_list = () => {
  //funcion para sacar los reportes del back
  function getListadoData() {
    Axios.get('https://us-central1-miproyecto-5cf83.cloudfunctions.net/getAllReports')
    .then( (response) => {
      setListado(response.data)
      console.log(response)
      setFetch(false)
    })
  }

  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [listado , setListado ] = useState([])
  const [isFetch , setFetch] = useState(true)
  const [container, setContainer ] = useState("modal-container")
  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }
  
  const mapStyles = {
    width: "43.5%",
    height: "46%"
}
  const Modal = (props) => (
    <div id="CrimeListtModal" className="active modal" >
		<div className={props.container}>
      <div className="fotos">
        {props.object.fotos.map((imagen,i)=>(
          <img src={props.object.fotos[i]} className="img" style={{width: 300 , height: 300} }></img>
        ))
        }
      </div>  
      <div className="report">
        <button className="modalboton" onClick={() => setShowModal(false)}>X</button>
        <h1>{props.object.asunto}</h1>
        <span className="TipoAlerta">{props.object.tipo_reporte}</span>
        <br></br>
        <span className="Descripcion">{props.object.descripcion}</span>
        <br></br>
        <span className="fecha">{props.object.fecha_hora}</span>
        <br></br>
        <span className="hora">{props.object.user_phone}</span>
        <br></br>
        <Map google={google} zoom={16} style={mapStyles} initialCenter={{lat: parseFloat(props.object.latitude), lng : parseFloat(props.object.longitude)}}>
            <Marker position={{lat: props.object.latitude , lng:props.object.longitude}} />
        	</Map>
      </div>
		</div>
    </div>
	
  );

  return (
    <>
    
	<h1 className="title"> Listado de crimenes</h1>
      {isFetch? <button onClick={getListadoData}>Cargar Reportes</button> :
      <ul className="list-menu list">
      {listado.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            setActiveObject(item);
            setShowModal(true);
            {item.hasFotos ? setContainer("modal-container"): setContainer("modal-container-withoutphotos")}
          }}
          className={getClass(item)}
          
        >
          <h2>{item.asunto}</h2>
        </li>
      ))}
      {showModal ? <Modal object={activeObject} container={container} /> : null}
    </ul>
      }
      
    </>
    
  );
};

export default Crime_list;