import React, { Component, useState, useEffect } from "react";
import Axios from "axios";
import "../styles/Notification.scss";

const Notification = () => {
  //funcion para enviar notificaciones
  function sendNotification() {
    Axios.post('http://localhost:5001/miproyecto-5cf83/us-central1/app/notification', {
    title : title,
    description : description
  }).then(function(response) {
    console.log(response)
  }).catch(function (error){
    console.log(error)
  })
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNotification();
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
        <input className="title-placeholder" type="text" id="title" name="title" placeholder="Titulo de notificación" required onChange={(e) => {setTitle(e.target.value)}}></input>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <span className="description-title">Escriba el mensaje de la notificación:</span>
        <br></br>
        <br></br>
        <br></br>
        <input className="description-placeholder" type="text" id="description" name="description" placeholder="Ej: Hoy los carros pares tiene pico y placa" required onChange={(e) => {setDescription(e.target.value)}}></input>
        <br></br>
        <br></br>
        <br></br>
        <button className="button-notification" type="submit">Enviar</button>
      </form>
    </>

  );
};



export default Notification;