import React, { Component, useState, useEffect } from "react";
import "../styles/Crime_list.scss";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"
import Axios from "axios";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const CrimeList = () => {
  //funcion para sacar los reportes del back
  function getListadoData() {
    Axios.get('https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/reports')
      .then((response) => {
        setListado(response.data)
        console.log(response)
        setFetch(false)
      })
  }
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [listado, setListado] = useState([])
  const [isFetch, setFetch] = useState(true)
  const [container, setContainer] = useState("modal-container")
  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }
  const mapStyles = {
    width: "43.5%",
    height: "46%"
  }
  async function getFotos(id, imagesids, setListadofotos, listadofotos) {
    let aux = [];
    const storage = getStorage();

    for (const imag of imagesids) {
      const URL = await getDownloadURL(ref(storage, "reports/" + id + "/media/images/" + imag));
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', URL);
      xhr.send();
      aux.push(URL);
    }

    setListadofotos(aux);

  }

  const Modal = (props) => {

    const [listadofotos, setListadofotos] = useState([])
    useEffect(() => {
      getFotos(props.object.fotourl, props.object.imagenes, setListadofotos, listadofotos);
    }, [])
    return (
      <div id="CrimeListtModal" className="active modal" >
        <div className={props.container}>
          <div className="fotos">
            {listadofotos.map((imagen, i) => (
              <img src={listadofotos[i]} className="img" style={{ width: 300, height: 300 }}></img>
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
            <span className="fecha">{props.object.fecha} {props.object.hora}</span>
            <br></br>
            <span className="hora">{props.object.user_phone}</span>
            <br></br>
            <Map google={google} zoom={16} style={mapStyles} initialCenter={{ lat: parseFloat(props.object.latitude), lng: parseFloat(props.object.longitude) }}>
              <Marker position={{ lat: props.object.latitude, lng: props.object.longitude }} />
            </Map>
          </div>
        </div>
      </div>

    );
  }

  return (
    <>

      <h1 className="title"> Listado de crimenes</h1>
      {useEffect(() => {
        getListadoData();
      }, [])}
      <ul className="list-menu">
        {listado.map((item) => (
          <div className="Container-crime">
            <span className="time">{item.fecha}</span> <span className="hora">{item.hora}</span>
            <h2>{item.asunto}</h2>
            <span className="description">{item.descripcion}</span>
            <br></br>
            <button
              style={{ marginLeft: "70%", width: "150px", backgroundColor: "white", color: "black", borderRadius: "43%" }}
              className="crime-button"
              key={item.id}
              onClick={() => {
                setActiveObject(item);
                setShowModal(true);
                { item.hasFotos ? setContainer("modal-container") : setContainer("modal-container-withoutphotos") }

              }}
              className={getClass(item)}>ver más</button>
          </div>
        ))}
        {showModal ? <Modal object={activeObject} container={container} /> : null}
      </ul>


    </>

  );
};



export default CrimeList;