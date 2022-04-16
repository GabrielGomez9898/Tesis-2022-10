import "../styles/Forms.scss";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/MapData";
import { getTodayFormattedDate, generateDaysAgoFormattedDate } from "../util/dateUtil";
import { BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SyncLoader } from "react-spinners"
import { css } from "@emotion/react";
import Axios from "axios";

const MapFilterCard = () => {
    const dispatch = useDispatch();

    const [lowerDate, setLowerDate] = useState(generateDaysAgoFormattedDate(60));
    const [upperDate, setUpperDate] = useState(getTodayFormattedDate());
    const [reportType, setReportType] = useState("TODOS");
    const [isLoading, setIsLoading] =  useState(false);
    const [buttonClassName, setButtonClassName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        setButtonClassName("button-loading");
        getMapData();
    }

    const getMapData = () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/mapData?lowerDate=${lowerDate}&upperDate=${upperDate}&reportType=${reportType}`).then((response) => {
            dispatch(refreshData(response.data));
            setIsLoading(false);
            setButtonClassName("");
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        getMapData();
    }, []);

    const style = css`
        z-index: 1000;
    `;

    return (
            <form className="card-mapfilter-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="lowerDate">Desde</label><br/>
                    <input type="date" className="filter-card-input" id="lowerDate" defaultValue={generateDaysAgoFormattedDate(60)} required onChange={(e) => {setLowerDate(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="upperDate">Hasta</label><br/>
                    <input type="date" className="filter-card-input" id="upperDate" defaultValue={getTodayFormattedDate()} required onChange={(e) => {setUpperDate(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="reportType">Tipo de reporte</label><br/>
                    <select className="filter-card-input" id="reportType" required onChange={(e) => {setReportType(e.target.value)}}>
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
                <button type="submit" className={buttonClassName} disabled={isLoading}>
                    {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Aplicar filtros al mapa"}
                </button>
            </form>
    )
}

export default MapFilterCard