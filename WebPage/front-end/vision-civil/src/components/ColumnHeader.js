import "../styles/Users.scss";
import { useState } from "react";
import Axios from "axios";
import CreateFunctionaryModal from "./CreateFunctionaryModal";
import CreateCopModal from "./CreateCopModal";
import ReactTooltip from "react-tooltip";

const ColumnHeader = ({columnText}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let tooltipText = (columnText === "Funcionarios") ? "funcionario" : "policía"; 

    return (
        <div className="users-table-column-header">
            <button data-tip={`Agregar nuevo ${tooltipText}`} onClick={() => setIsModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path 
                    fill="currentColor"
                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                    class="fa-add-users"/>
                </svg>
            </button>
            <h1>{columnText}</h1>
            { (isModalOpen && columnText === "Funcionarios") ? <CreateFunctionaryModal onClose={() => setIsModalOpen(false)} /> : null }
            { (isModalOpen && columnText === "Policías") ? <CreateCopModal onClose={() => setIsModalOpen(false)} /> : null }
            <ReactTooltip effect="solid" />
        </div>
    );
}

export default ColumnHeader