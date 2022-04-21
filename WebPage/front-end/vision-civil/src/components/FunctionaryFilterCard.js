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
                Aplicar filtros
            </button>
            <ReactTooltip effect="solid" />
        </form>
    );
}

export default FunctionaryFilterCard