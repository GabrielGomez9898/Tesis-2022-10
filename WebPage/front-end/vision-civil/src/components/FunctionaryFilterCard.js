import { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshData } from "../features/FunctionaryFiltersData";
import ReactTooltip from "react-tooltip";

const FunctionaryFilterCard = (props) => {
    const dispatch = useDispatch();

    const [functionaryType, setFunctionaryType] = useState("TODOS");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(refreshData({functionaryType: functionaryType}));
    };

    return (
        <form className="filtercard-body-horizontal" onSubmit={handleSubmit}>
            <div data-tip="El tipo indica si el funcionario tiene privilegios para acceder a la sección de Usuarios">
                <label htmlFor="functionaryType">Tipo</label><br/>
                <select className="users-filter-input" id="functionaryType" onChange={(e) => setFunctionaryType(e.target.value)}>
                    { (props.functionaryType === "TODOS") && <option key="todos" value="TODOS" selected>Todos</option> }
                    { (props.functionaryType !== "TODOS") && <option key="todos" value="TODOS">Todos</option> }
                    { (props.functionaryType === "SOLO_MASTER") && <option key="master" value="SOLO_MASTER" selected>Solo master</option> }
                    { (props.functionaryType !== "SOLO_MASTER") && <option key="master" value="SOLO_MASTER">Solo master</option> }
                    { (props.functionaryType === "SOLO_NORMALES") && <option key="normales" value="SOLO_NORMALES" selected>Solo normales</option>}
                    { (props.functionaryType !== "SOLO_NORMALES") && <option key="normales" value="SOLO_NORMALES">Solo normales</option>}
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

export default FunctionaryFilterCard