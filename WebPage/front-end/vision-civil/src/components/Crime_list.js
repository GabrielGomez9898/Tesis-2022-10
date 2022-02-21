import React, { useState } from "react";
import "../styles/Crime_list.scss";
import Maps from "./Maps";

const Crime_info = [
	{
		id: 1,
		Asunto: 'importante',
		TipoAlerta: 'Robo',
		Descripcion: 'descripcion',
		fecha: '24/02/2022',
		hora: 'miHora',
		latitud: 4.49155,
		longitud: -74.2606,
		foto: 'miFoto',
		video: '',
		estado: '',
	},
	{
		id: 2,
		Asunto: 'casi importante',
		TipoAlerta: 'violacion',
		Descripcion: 'descripcion',
		fecha: '14/02/2022',
		hora: 'hora2',
		latitud: 'lat2',
		longitud: 'lon2',
		foto: 'foto2',
		video: '',
		estado: '',
	},
	{
		id: 3,
		Asunto: 'nada importante',
		TipoAlerta: 'Asalto',
		Descripcion: 'descripcion',
		fecha: '04/03/2022',
		hora: 'hora3',
		latitud: 'lat3',
		longitud: 'lon3',
		foto: 'foto3',
		video: '',
		estado: '',
	},
];

const Crime_list = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSn06808V8ZOQLN9iIQ1W9ok83cQCjDgg"> </script>

  // here className can not be "inactive" since Modal always shows activeObject
  const Modal = ({ object: { Asunto, Descripcion , TipoAlerta , fecha , hora , latitud , longitud, foto, video, estado} }) => (
    <div id="CrimeListtModal" className="active modal" >
		<div className="modal-container">
			<span>{Asunto}</span>
			<span className="TipoAlerta">{TipoAlerta}</span>
			<br></br>
			<span className="Descripcion">{Descripcion}</span>
			<br></br>
			<span className="fecha">{fecha}</span>
			<br></br>
			<span className="hora">{hora}</span>
			<br></br>
			<span className="foto">{foto}</span>
			<br></br>
			<span className="video">{video}</span>
			<br></br>
			<span className="estado">{estado}</span>
			<br></br>
			<Maps
			latitud = {latitud}
			longitud = {longitud}
			apiKey={"AIzaSyDSn06808V8ZOQLN9iIQ1W9ok83cQCjDgg"}
			/>
			<button className="modalboton" onClick={() => setShowModal(false)}>Cerrar</button>
		</div>
    </div>
	
  );

  return (
    <>
	<h1 className="title"> Listado de crimenes</h1>
      <ul className="list-menu list">
        {Crime_info.map(({ id, Asunto,Descripcion, TipoAlerta , fecha , hora , latitud , longitud, foto, video, estado}) => (
          <li
            key={id}
            onClick={() => {
              setActiveObject({ id, Descripcion,TipoAlerta , fecha , hora , latitud , longitud, foto, video, estado});
              setShowModal(true);
            }}
            className={getClass(id)}
          >
            <h2>{Asunto}</h2>
          </li>
        ))}
      </ul>
      {showModal ? <Modal object={activeObject} /> : null}
    </>
  );
};

export default Crime_list;