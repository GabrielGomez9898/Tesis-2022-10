import "../styles/Forms.scss";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/TimeChartsData";

const TimeChartsFilterCard = () => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="card-timechartfilter-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="period">Periodo</label><br/>
                <select id="period">
                    <option>Esta semana</option>
                    <option>Este mes</option>
                    <option>Este trimestre</option>
                    <option>Este semestre</option>
                    <option>Este año</option>
                    <option>De por vida</option>
                </select>
            </div>
            <button type="submit">Aplicar filtros a diagramas de periodo</button>
        </form>
    )
}

export default TimeChartsFilterCard