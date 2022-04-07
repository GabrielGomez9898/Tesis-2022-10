import "../styles/Forms.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; //Hook para modificar valores sobre estados
import { refreshData } from "../features/TypeChartsData";
import { getTodayFormattedDate, generateDaysAgoFormattedDate } from "../util/dateUtil";
import Axios from "axios";

const TypeChartsFilterCard = () => {
    const dispatch = useDispatch(); //Se indica cual es la accion que se quiere ejecutar del redux store para modificar el valor de alguna variable 

    const [lowerDate, setLowerDate] = useState(generateDaysAgoFormattedDate(60));
    const [upperDate, setUpperDate] = useState(getTodayFormattedDate());

    const handleSubmit = (e) => {
        e.preventDefault();
        getTypeChartsData();
    }

    const getTypeChartsData = () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/typeChartsData?lowerDate=${lowerDate}&upperDate=${upperDate}`).then((response) => {
            dispatch(refreshData(response.data));
        });
    }

    useEffect(() => {
        getTypeChartsData();
    }, [])

    return (
        <form className="card-typechartfilter-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lowerDate">Desde</label><br/>
                <input id="lowerDate" type="date" defaultValue={generateDaysAgoFormattedDate(60)} required onChange={(e) => {setLowerDate(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="upperDate">Hasta</label><br/>
                <input id="upperDate" type="date" defaultValue={getTodayFormattedDate()} required onChange={(e) => {setUpperDate(e.target.value)}}/>
            </div>
            <button type="submit">Aplicar filtros a diagramas de tipo</button>
        </form>
    )
}

export default TypeChartsFilterCard