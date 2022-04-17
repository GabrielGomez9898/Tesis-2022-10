import React, { Component, useState, useEffect, useRef } from "react";
import "../styles/Crime_list.scss";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"
import Axios from "axios";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {db, storage} from "../firebase"
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'
import { SyncLoader, ClipLoader } from "react-spinners";



const CrimeList = () => {
  //funcion para sacar los reportes del back
  function getListadoData() {
    Axios.get('https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/reports')
      .then((response) => {
        setListado(response.data)
        console.log(response)
        num.current += 1;
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setListado([]);
    setIsFilterEmpty(false)
    setIsFilterLoading(true);
    setFilterButtonClassName("button-loading");
    getListadoByFilter();
}

const getListadoByFilter = () => {
  setListado([]);
  console.log(listado)
  Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/reportByFilter?lowerDate=${lowerDate}&upperDate=${upperDate}&reportType=${reportType}`).then((response) => {
    if(response.data.length == 0)
    setIsFilterEmpty(true)
    else
    setIsFilterEmpty(false)
      setListado(response.data)
  }).catch((error) => console.log(error));
  setIsFilterLoading(false);
  setFilterButtonClassName("");
}
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [listado, setListado] = useState([]);
  const [lowerDate, setLowerDate] = useState("");
  const [upperDate, setUpperDate] = useState("");
  const [reportType, setReportType] = useState("TODOS");
  const [container, setContainer] = useState("modal-container");
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [filterButtonClassName, setFilterButtonClassName] = useState("");
  const [isFilterEmpty, setIsFilterEmpty] = useState(false);
  const [reportList, setReportList] = useState([]);



  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }
  const mapStyles = {
    width: "43.5%",
    height: "46%"
  }
  async function getFotos(id, imagesids, setListadofotos) {
    let aux = [];

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
  const num = useRef(0);
  const Modal = (props) => {

    const [listadofotos, setListadofotos] = useState([])
    useEffect(() => {
      getFotos(props.object.fotourl, props.object.imagenes, setListadofotos);
    }, [])

  

    return (
      <div id="CrimeListtModal" className="active modal" >
        <div className={props.container} style={{borderColor: props.object.color}}>
          <div className="fotos" >
            {props.object.hasFotos && listadofotos.length == 0 ?  <div style={{marginTop : "75%"}}><SyncLoader sizeUnit={'px'} size={40} color={props.object.color} loading={true} /> </div>: "" }
                
            {listadofotos.length == 1 ?
              <LazyLoadImage src={listadofotos[0]} effect="blur" placeholderSrc="https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image.jpg" className="imgu" style={{ width: 300, height: 300 }}></LazyLoadImage>
             :
             (listadofotos.map((image,i) => (
              <LazyLoadImage src={listadofotos[i]} className="img" effect="blur" placeholderSrc="https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image.jpg" style={{ width: 300, height: 300 }}></LazyLoadImage>
            ) ))  
            }
          </div>
          <div className="report">
            <button className="modalboton" onClick={() => setShowModal(false)}>X</button>
            <h1 className="asunto" style={{color : props.object.color}}>{props.object.asunto.charAt(0).toUpperCase() +props.object.asunto.slice(1)}</h1>
            <span className="TipoAlerta" style={{color : props.object.color}}>{ props.object.tipo_reporte.charAt(0).toUpperCase() + (props.object.tipo_reporte.toLowerCase().replace("_" ," ")).slice(1)}</span>
            <br></br>
            <span className="Descripcion" style={{color : props.object.color}}>{props.object.descripcion.charAt(0).toUpperCase() +props.object.descripcion.slice(1)}</span>
            <br></br>
            <span className="fecha" style={{color : props.object.color}}>{props.object.fecha} {props.object.hora}</span>
            <br></br>
            <span className="horam" style={{color : props.object.color}}>{props.object.user_phone}</span>
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
      <form className="card-mapfilter-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="lowerDate">Desde</label><br/>
                    <input id="lowerDate" type="date" required onChange={(e) => {setLowerDate(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="upperDate">Hasta</label><br/>
                    <input id="upperDate" type="date" required onChange={(e) => {setUpperDate(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="reportType">Tipo de reporte</label><br/>
                    <select id="reportType" required onChange={(e) => {setReportType(e.target.value)}}>
                        <option key="todos" value="TODOS">Todos</option>
                        <option key="hurtoVivienda" value="HURTO_VIVIENDA">Hurto Vivienda</option>
                        <option key="hurtoPersona" value="HURTO_PERSONA">Hurto Persona</option>
                        <option key="hurtoVehiculo" value="HURTO_VEHICULO">Hurto Vehículo</option>
                        <option key="vandalismo" value="VANDALISMO">Vandalismo</option>
                        <option key="violacion" value="VIOLACION">Violación</option>
                        <option key="homicidio" value="HOMICIDIO">Homicidio</option>
                        <option key="agresion" value="AGRESION">Agresión</option>
                        <option key="otro" value="OTRO">Otro</option>
                    </select>
                </div>
                <button className={filterButtonClassName} disabled={isFilterLoading} >
                  {isFilterLoading ? <ClipLoader  color="hsl(207, 100%, 50%)" size={20} loading /> : "Aplicar filtros a la lista"}
                </button>
            </form>
            <br></br>

      {useEffect(() => {
        setTimeout(() => {
          
          const ref = collection(db , "reports");
          onSnapshot(ref , (snapshot) => {
            listado.pop();
            getListadoData();
            setShowLoading(true)
          });
         getListadoData(); 
         if(showLoading)        
         alert("Se realizo un nuevo reporte");     
        }, 2000);
        
      }, [])}
      {isFilterEmpty ? <div className="not-reports"> No hay reportes </div>  :  listado.length == 0 ? <div style={{marginTop : "15%", display: "block" , textAlign: "center"}}> <SyncLoader sizeUnit={'10px'} size={80} color="hsl(207, 100%, 50%)" loading={true} className="carga"/> </div> : ""}
      <ul className="list-menu">
        {listado.map((item) => (
          <div className="Container-crime" style={{borderColor : item.color}}>
            <span className="time">{item.fecha}</span> <span className="hora">{item.hora}</span>
            <h2>{item.asunto.charAt(0).toUpperCase() + item.asunto.slice(1)}</h2>
            <span className="circulo" style={{backgroundColor : item.color}}>ㅤ</span> <span className="description"> { item.tipo_reporte.charAt(0).toUpperCase() +(item.tipo_reporte.toLowerCase().replace("_"," ")).slice(1)}</span>
            <br></br>
            <span className="description">{item.descripcion.charAt(0).toUpperCase() +item.descripcion.slice(1)}</span>
            <br></br>
            <button
              style={{ marginLeft: "70%", width: "150px", color: "white", borderRadius: "43%" }}
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