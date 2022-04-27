import React, { useState } from "react";
import Axios from "axios";
import "../styles/Notification.scss";
import { ClipLoader } from "react-spinners";
import Alert from "./Alert";
import NotificationLegend from "./NotificationLegend";



const Notification = () => {  
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setIsSendLoading(true);
  setButtonSend("button-loading");  
  await sendNotification();
  setIsSendLoading(false)
  setButtonSend("");
  setMessage("Se ha enviado el mensaje con exito")
}

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [buttonSend, setButtonSend] = useState("");
  const [message, setMessage] = useState("");

  //funcion para enviar notificaciones
  const sendNotification= () => {
    return Axios.post(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/notification?title=${title}&description=${description}`);
}

  return (
    <>
      <h1 className="title"> Enviar notificación</h1>
      {message && <div className="notification"><Alert text={message} alertType="success" isDeletable ={false}></Alert></div>} 
      <div className="notification-container">
        <div style={{backgroundColor: "white" , borderRadius: "15px" , marginRight: "25px" , paddingBottom: "20px" , boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
          <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
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
            <button className="button-notification" type="submit" className={buttonSend} >
              {isSendLoading ? <ClipLoader  color="hsl(207, 100%, 50%)" size={20} loading /> : "Enviar"}
            </button>    
          </form>
        </div>
        <div style={{zIndex: "999px"}}> <NotificationLegend></NotificationLegend> </div>
      </div>
    </>

  );
};



export default Notification;