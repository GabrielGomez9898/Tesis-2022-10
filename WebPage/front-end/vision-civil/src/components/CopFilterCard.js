import { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/CopFiltersData";
import ReactTooltip from "react-tooltip";

const CopFilterCard = (props) => {
    const dispatch = useDispatch();

    const [genero, setGenero] = useState("TODOS");
    const [disponibilidad, setDisponibilidad] = useState("TODOS");
    const [estado, setEstado] = useState("TODOS");

    const obj = {
        genero: genero,
        disponibilidad: disponibilidad,
        estado: estado
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(refreshData(obj));
    };

    return (
        <form className="filtercard-body-horizontal" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="genero">Género</label><br/>
                <select className="users-filter-input" id="genero" onChange={(e) => setGenero(e.target.value)}>
                    { (props.genero === "TODOS") && <option key="todos" value="TODOS" selected>Todos</option> }
                    { (props.genero !== "TODOS") && <option key="todos" value="TODOS">Todos</option> }
                    { (props.genero === "MASCULINO") && <option key="masculino" value="MASCULINO" selected>Masculino</option> }
                    { (props.genero !== "MASCULINO") && <option key="masculino" value="MASCULINO">Masculino</option> }
                    { (props.genero === "FEMENINO") && <option key="femenino" value="FEMENINO" selected>Femenino</option> }
                    { (props.genero !== "FEMENINO") && <option key="femenino" value="FEMENINO">Femenino</option> }
                    { (props.genero === "OTRO") && <option key="otro" value="OTRO" selected>Otro</option> }
                    { (props.genero !== "OTRO") && <option key="otro" value="OTRO">Otro</option> }
                </select>
            </div>
            <div data-tip="La disponibilidad indica si el policía está ocupado actualmente">
                <label htmlFor="disponibilidad">Disponibilidad</label><br/>
                <select className="users-filter-input" id="disponibilidad" onChange={(e) => setDisponibilidad(e.target.value)}>
                    { (props.disponibilidad === "TODOS") && <option key="todos" value="TODOS" selected>Todas</option> }
                    { (props.disponibilidad !== "TODOS") && <option key="todos" value="TODOS">Todas</option> }
                    { (props.disponibilidad === "DISPONIBLE") && <option key="disponible" value="DISPONIBLE" selected>Disponible</option> }
                    { (props.disponibilidad !== "DISPONIBLE") && <option key="disponible" value="DISPONIBLE">Disponible</option> }
                    { (props.disponibilidad === "NO_DISPONIBLE") && <option key="noDisponible" value="NO_DISPONIBLE" selected>No disponible</option>}
                    { (props.disponibilidad !== "NO_DISPONIBLE") && <option key="noDisponible" value="NO_DISPONIBLE">No disponible</option>}
                </select>
            </div>
            <div data-tip="El estado indica si el policía está trabajando actualmente">
                <label htmlFor="estado">Estado</label><br/>
                <select className="users-filter-input" id="estado" onChange={(e) => setEstado(e.target.value)}>
                    { (props.estado === "TODOS") && <option key="todos" value="TODOS" selected>Todos</option> }
                    { (props.estado !== "TODOS") && <option key="todos" value="TODOS">Todos</option> }
                    { (props.estado === "EN_SERVICIO") && <option key="enServicio" value="EN_SERVICIO" selected>En servicio</option> }
                    { (props.estado !== "EN_SERVICIO") && <option key="enServivio" value="EN_SERVICIO">En servicio</option> }
                    { (props.estado === "NO_EN_SERVICIO") && <option key="noEnServicio" value="NO_EN_SERVICIO" selected>No en servicio</option>}
                    { (props.estado !== "NO_EN_SERVICIO") && <option key="noEnServicio" value="NO_EN_SERVICIO">No en servicio</option>}
                </select>
            </div>
            <button type="submit" className="filtercard-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path 
                        fill="currentColor"
                        d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
                        class="fa-add-users"/>
                </svg>
            </button>
            <ReactTooltip effect="solid" />
        </form>
    );
}

export default CopFilterCard;