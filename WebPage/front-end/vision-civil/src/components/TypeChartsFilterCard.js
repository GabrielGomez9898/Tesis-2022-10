import "../styles/Forms.scss";
import { useDispatch } from "react-redux"; //Hook para modificar valores sobre estados
import { refreshData } from "../features/TypeChartsData";

const TypeChartsFilterCard = () => {
    const dispatch = useDispatch(); //Se indica cual es la accion que se quiere ejecutar del redux store para modificar el valor de alguna variable 

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="card-typechartfilter-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lowerDate">Desde</label><br/>
                <input id="lowerDate" type="date" required />
            </div>
            <div>
                <label htmlFor="lowerDate">Hasta</label><br/>
                <input id="lowerDate" type="date" required />
            </div>
            <button type="submit">Aplicar filtros a diagramas de tipo</button>
        </form>
    )
}

export default TypeChartsFilterCard