import React, { useState } from "react";
import Axios from "axios";
import "../styles/Notification.scss";
import { ClipLoader } from "react-spinners";


const Notification = () => {
  //funcion para enviar notificaciones
  
  
const handleSubmit = (e) => {
  e.preventDefault();
  setIsSendLoading(true);
  setButtonSend("button-loading");  
  setTimeout(() => {
    setIsSendLoading(false)
    setButtonSend("");
  }, 1500); 
  sendNotification();
}

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [buttonSend, setButtonSend] = useState("");


  const sendNotification= () => {
    Axios.post(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/notification?title=${title}&description=${description}`).then((response) =>{
      
    console.log(response)
  }).catch((error) => console.log(error));
 
}

 

  return (
    <>
      <h1 className="title"> Enviar notificación</h1>
      <form onSubmit={handleSubmit}>
        <br></br>
        <br></br>
         <br></br>
        <span className="title-description"> Escriba el titulo de la notificación:</span>
        <br></br>
        <br></br>
        <br></br>
        <input className="title-placeholder" htmlFor="title" type="text" id="title"  placeholder="Titulo de notificación" required onChange={(e) => {setTitle(e.target.value)}}></input>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <span className="description-title">Escriba el mensaje de la notificación:</span>
        <br></br>
        <br></br>
        <br></br>
        <input className="description-placeholder" htmlFor="description" type="text" id="description"  placeholder="Ej: Hoy los carros pares tiene pico y placa" required onChange={(e) => {setDescription(e.target.value)}}></input>
        <br></br>
        <br></br>
        <br></br>
        <button className="button-notification" type="submit" className={buttonSend} onClick={sendNotification} style={{marginLeft: "68%"}}>
          {isSendLoading ? <ClipLoader  color="hsl(207, 100%, 50%)" size={20} loading /> : "Enviar"}
        </button>     
      </form>
    </>

  );
};



export default Notification;