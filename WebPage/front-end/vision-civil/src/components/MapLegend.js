import "../styles/Dashboard.scss";

const MapLegend = () => {
    return (
        <div className="card-maplegend-container">
            <h1 id="legend-title-text">Leyenda del mapa</h1>
            <div className="yellow-circle"/><p>Hurto de viviendas</p><br/>
            <div className="blue-circle"/><p>Hurto a personas</p><br/>
            <div className="green-circle"/><p>Hurto de vehículos</p><br/>
            <div className="purple-circle"/><p>Vandalismo</p><br/>
            <div className="pink-circle"/><p>Violación</p><br/>
            <div className="red-circle"/><p>Homicidio</p><br/>
            <div className="orange-circle"/><p>Agresión</p><br/>
        </div>
    );
}

export default MapLegend;