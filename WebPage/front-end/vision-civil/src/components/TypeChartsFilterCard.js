import "../styles/Forms.scss";
import { useState } from "react";
import { useDispatch } from "react-redux"; //Hook para modificar valores sobre estados
import { refreshData } from "../features/TypeChartsData";
import Axios from "axios";

const TypeChartsFilterCard = () => {
    const dispatch = useDispatch(); //Se indica cual es la accion que se quiere ejecutar del redux store para modificar el valor de alguna variable 

    const [lowerDate, setLowerDate] = useState();
    const [upperDate, setUpperDate] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        getTypeChartsData();
    }

    const getTypeChartsData = () => {
        Axios.get(`http://localhost:5001/miproyecto-5cf83/us-central1/app/typeChartsData?lowerDate=${lowerDate}&upperDate=${upperDate}`).then((response) => {
            dispatch(refreshData(response.data));
            console.log(response.data);
        });
    }

    return (
        <form className="card-typechartfilter-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lowerDate">Desde</label><br/>
                <input id="lowerDate" type="date" required onChange={(e) => {setLowerDate(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="upperDate">Hasta</label><br/>
                <input id="upperDate" type="date" required onChange={(e) => {setUpperDate(e.target.value)}}/>
            </div>
            <button type="submit">Aplicar filtros a diagramas de tipo</button>
        </form>
    )
}

export default TypeChartsFilterCard