import "../styles/NotificationLegend.scss";
import video from "../notification.gif";

const NotificationLegend = () => {
    return (
        <div className="card-maplegend-container-notification" style={{textAlign: "center"}}>
            <h2 id="legend-title-text">Leyenda de notificaciones</h2>
            <div className="legend-item-container">
                <p>En esta pantalla podras enviar notificaciones a todos los usuarios que tengan descargada la aplicacion movil de visión civil</p>
            </div>
            <div className="legend-item-container">
                <p>Con esto puedes alertar a los usuarios de temas importantes como eventos, decretos, alertas de robos, etc... </p>
            </div>
            <div className="legend-item-container">
                <p>Nota : El titulo debera ser algo breve para que su visualización sea optima</p>
            </div>
            <div className="gif" style={{margin: "0px auto"}}>
                <img src={video} style={{width:"300px" , height: "380px"}}></img> 
            </div>
        </div>
    );
}

export default NotificationLegend;