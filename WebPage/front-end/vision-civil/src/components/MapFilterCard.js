import "../styles/Forms.scss";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/MapData";
import Axios from "axios";

const MapFilterCard = () => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const getMapData = () => {
        Axios.get("http://127.0.0.1:8000/controlPanel/filteredReports?period=LAST_DAY&reportType=VIOLACION").then((response) => {
            console.log(response);
        });
    }

    return (
            <form className="card-mapfilter-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="lowerDate">Desde</label><br/>
                    <input id="lowerDate" type="date" required />
                </div>
                <div>
                    <label htmlFor="lowerDate">Hasta</label><br/>
                    <input id="lowerDate" type="date" required />
                </div>
                <div>
                    <label htmlFor="lowerDate">Tipo de reporte</label><br/>
                    <select>
                        <option>Todos</option>
                        <option>Hurto Vivienda</option>
                        <option>Hurto Persona</option>
                        <option>Hurto Vehículo</option>
                        <option>Vandalismo</option>
                        <option>Violación</option>
                        <option>Homicidio</option>
                        <option>Agresión</option>
                        <option>Otro</option>
                    </select>
                </div>
                <button type="submit">Aplicar filtros al mapa</button>
            </form>
    )
}

export default MapFilterCard