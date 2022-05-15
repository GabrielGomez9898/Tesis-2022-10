import "../styles/Dashboard.scss";

const MapLegend = () => {
    return (
        <div className="card-maplegend-container">
            <h2 id="legend-title-text">Leyenda del mapa</h2>
            <div className="legend-item-container">
                <div className="cyan-circle" />
                <p>Hurto de viviendas</p>
            </div>
            <div className="legend-item-container">
                <div className="blue-circle" />
                <p>Hurto a personas</p>
            </div>
            <div className="legend-item-container">
                <div className="green-circle" />
                <p>Hurto de vehículos</p>
            </div>
            <div className="legend-item-container">
                <div className="mint-circle" />
                <p>Vandalismo</p>
            </div>
            <div className="legend-item-container">
                <div className="pink-circle" />
                <p>Violación</p>
            </div>
            <div className="legend-item-container">
                <div className="red-circle" />
                <p>Homicidio</p>
            </div>
            <div className="legend-item-container">
                <div className="orange-circle" />
                <p>Agresión</p>
            </div>
            <div className="legend-item-container">
                <div className="other-circle" />
                <p>Otro</p>
            </div>
        </div>
    );
}

export default MapLegend;