import "../styles/Forms.scss";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/TimeChartsData";
import { useEffect, useState } from "react";
import Axios from "axios";

const TimeChartsFilterCard = () => {
    const dispatch = useDispatch();

    const [period, setPeriod] = useState("ESTE_TRIMESTRE");

    const handleSubmit = (e) => {
        e.preventDefault();
        getTimeChartsData();
    }

    const getTimeChartsData = () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/timeChartsData?period=${period}`).then((response) => {
            dispatch(refreshData(response.data));
        })
    }

    useEffect(() => {
        getTimeChartsData();
    }, []);

    return (
        <form className="card-timechartfilter-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="period">Periodo</label><br/>
                <select id="period" required onChange={(e) => {setPeriod(e.target.value)}}>
                    <option key="ultimos7dias" value="ESTA_SEMANA">Últimos 7 días</option>
                    <option key="ultimos30dias" value="ESTE_MES">Últimos 30 días</option>
                    <option key="esteTrimestre" value="ESTE_TRIMESTRE" selected>Este trimestre</option>
                    <option key="esteSemestre" value="ESTE_SEMESTRE">Este semestre</option>
                    <option key="esteAnio" value="ESTE_AÑO">Este año</option>
                    <option key="dePorVida" value="DE_POR_VIDA">De por vida</option>
                </select>
            </div>
            <button type="submit">Aplicar filtros a diagramas de periodo</button>
        </form>
    )
}

export default TimeChartsFilterCard