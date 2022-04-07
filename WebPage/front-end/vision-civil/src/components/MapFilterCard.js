import "../styles/Forms.scss";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/MapData";
import { getTodayFormattedDate, generateDaysAgoFormattedDate } from "../util/dateUtil";
import Axios from "axios";

const MapFilterCard = () => {
    const dispatch = useDispatch();

    const [lowerDate, setLowerDate] = useState(generateDaysAgoFormattedDate(60));
    const [upperDate, setUpperDate] = useState(getTodayFormattedDate());
    const [reportType, setReportType] = useState("TODOS");

    const handleSubmit = (e) => {
        e.preventDefault();
        getMapData();
    }

    const getMapData = () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/mapData?lowerDate=${lowerDate}&upperDate=${upperDate}&reportType=${reportType}`).then((response) => {
            dispatch(refreshData(response.data));
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        getMapData();
    }, []);

    return (
            <form className="card-mapfilter-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="lowerDate">Desde</label><br/>
                    <input id="lowerDate" type="date" defaultValue={generateDaysAgoFormattedDate(60)} required onChange={(e) => {setLowerDate(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="upperDate">Hasta</label><br/>
                    <input id="upperDate" type="date" defaultValue={getTodayFormattedDate()} required onChange={(e) => {setUpperDate(e.target.value)}}/>
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
                <button type="submit">Aplicar filtros al mapa</button>
            </form>
    )
}

export default MapFilterCard