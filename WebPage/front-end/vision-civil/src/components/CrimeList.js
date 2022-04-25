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
import { async } from "@firebase/util";



const CrimeList = () => {

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
  const initialRenderDone = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setListado([]);
    setReportList([]);
    getListadoByFilter();
}

  //funcion para sacar los reportes del back
  async function getListadoData() {
     Axios.get('https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/reports')
    .then((response) => {
      setListado(response.data)
      console.log(response)
    })
  }
  //funcion para obtener los siguientes 3 reportes
  function getMoreReports(){
    setIsFilterLoading(true);
    setFilterButtonClassName("button-loading");  
    setTimeout(() => {
      setIsFilterLoading(false)
      setFilterButtonClassName("");  
    }, 1000);  
    getReports();
  }
  //funcion para paginacion de reportes de 3 en 3
  function getReports(){
    let indice = reportList.length;
    let tem = [];
    if(listado.length != 0){
      setReportList([])
      if(reportList.length == 0 || reportList == null || indice == 0){
        if(listado.length >= 3) {

          for (let i = 0; i < 3 ; i++) {
            tem.push(listado[i])
          }
        }else{
          for (let i = 0; i < listado.length ; i++) {
            tem.push(listado[i])
          }
        }
        
        setReportList(tem);
      }
      else{
        let contador = 0;
        for (indice ; indice < listado.length; indice++) {
          if(contador < 3)
            tem.push(listado[indice])
            contador += 1;        
        }
        setReportList([...reportList ,...tem])
      }
    }else{
      setReportList([])
    }
  }
//funcion para obtener los reportes por filtro
const getListadoByFilter = () => {
  setListado([]);
  setReportList([]);
  setIsFilterEmpty(false)
  let tem = []
  let contR = 0
  Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/reportByFilter?lowerDate=${lowerDate}&upperDate=${upperDate}&reportType=${reportType}`).then((response) => {
    if(response.data.length == 0)
    setIsFilterEmpty(true)
    if(contR < 3)
    tem.push(response.data)
    contR += 1
    setListado(response.data)
    if(contR > 2 || reportList.length <= 0)
    setReportList(tem)
  }).catch((error) => console.log(error));
}
  useEffect(() =>  {
   getListadoData();
   
  }, []);
    
  useEffect(() => {
    if(!initialRenderDone.current){
      initialRenderDone.current = true
    }else{
      getReports();
    }
},[listado]);  

  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }
  const mapStyles = {
    width: "43.5%",
    height: "46%"
  }
  //funcion para obtener las fotos desde el storage de firebase
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

  const Modal = (props) => {

    const [listadofotos, setListadofotos] = useState([])
    useEffect(() => {
      getFotos(props.object.fotourl, props.object.imagenes, setListadofotos);
    }, []);

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
            <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span> 
            <br></br>
            <br></br>
            <h1 className="asunto">{ props.object.asunto != " " ? props.object.asunto.charAt(0).toUpperCase() +props.object.asunto.slice(1) : "No hay asunto"}</h1>
            <span>Tipo reporte: </span> <span className="TipoAlerta">{props.object.tipo_reporte.charAt(0).toUpperCase() + (props.object.tipo_reporte.toLowerCase().replace("_" ," ")).slice(1)}</span>
            <br></br>
            <span>{props.object.descripcion != " " ? <span>Descripción : </span> : ""}</span><span className="Descripcion">{props.object.descripcion != " " ? props.object.descripcion.charAt(0).toUpperCase() +props.object.descripcion.slice(1) : "No hay descripción"}</span>
            <br></br>
            <span>Fecha : </span> <span className="fecha">{props.object.fecha}</span> 
            <br></br>
            <span>Hora : </span> <span className="horamodal">{props.object.hora}</span>
            <br></br>
            <span>{props.object.user_phone != 0 ? "Celular del usuario : " : ""}</span> <span className="telefono">{props.object.user_phone != 0 ? props.object.user_phone : "El ciudadano ha decidido reportar sin celular"}</span>
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
      <br></br>
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
                <button >
                   Aplicar filtros a la lista
                </button>
            </form>
            <br></br>
      
      {useEffect(() => {
        setTimeout(() => {  
          const ref = collection(db , "reports");
          onSnapshot(ref , (snapshot) => {
            getListadoData();
            setShowLoading(true);
          });
          if(showLoading){
            alert("Se realizo un nuevo reporte"); 
            setShowLoading(false);
          }
        }, 3000);
        
        
      }, [])}
      
      {isFilterEmpty ? <div className="not-reports"> No hay reportes </div>  :  reportList.length == 0 ? <div style={{marginTop : "15%", display: "block" , textAlign: "center"}}> <SyncLoader sizeUnit={'10px'} size={80} color="hsl(207, 100%, 50%)" loading={true} className="carga"/> </div> : ""}
      <ul className="list-menu">
        {reportList.map((item) => (
          <div className="Container-crime" style={{borderColor : item.color}}>
            <span className="time">{item.fecha}</span> <span className="hora">{item.hora}</span>
            <br></br>
            <br></br>
            <h2 className="asunto">{item.asunto != " " ? item.asunto.charAt(0).toUpperCase() + item.asunto.slice(1) : "No hay asunto"}</h2>
            <br></br>
            <span>{item.descripcion != " " ? <span>Descripción : </span> : ""}</span><span className="description">{item.descripcion != " " ? item.descripcion.charAt(0).toUpperCase() +item.descripcion.slice(1) : "No hay descripción"}</span>
            <br></br>
            <br></br>
            <div className="pill" style={{borderColor : item.color }}><p className="description" style={{color : item.color, fontFamily: "Spline Sans, sans-serif" }}> <i>{ item.tipo_reporte.toUpperCase().replace("_" , " ")}</i></p></div>
            <br></br>
            <button
              style={{ marginLeft: "70%", width: "150px", color: "white", borderRadius: "43%" , marginTop : "-70px"}}
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
      <br></br>
      <button className={filterButtonClassName} onClick={getMoreReports} style={{ marginLeft: "42%"}}>
      {isFilterLoading ? <ClipLoader  color="hsl(207, 100%, 50%)" size={20} loading /> : "Ver más reportes"}
      </button>


    </>

  );
};

export default CrimeList;