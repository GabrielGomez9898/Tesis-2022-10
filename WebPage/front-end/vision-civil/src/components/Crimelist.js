import React from "react";
import Crime_list from "./Crime_list";

class Crimelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      listacrimen: [],
      isFetch : true,
    };

    
    const mapStyles = {
      width: "43.5%",
      height: "46%"
  }

  const Crime_list = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeObject, setActiveObject] = useState(null);
  }
  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  };
    
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
  }

  
  componentDidMount() {
    fetch("http://127.0.0.1:8001/controlPanel/reports/")
      .then(response => response.json())
      .then(listado => this.setState({listacrimen : listado , isFetch : false}))

  }

  render() {
   if(this.state.isFetch == true){
     return 'Cargando ...'
   }
   return(
     <div>
     <h1>Listado de crimenes</h1>
     <ul className="list-menu list">
     {this.state.listacrimen.map((lista) => 
       <li 
       key={lista.id}
       onClick={() => {
        setActiveObject({ lista});
        setShowModal(true);    
      }} 
      //className={this.getClass(lista.id)}
       >
         <h2>{lista.asunto}</h2>
       </li> 
       )} 
       </ul>
       

       </div>
   )
   }
}

export default Crimelist;