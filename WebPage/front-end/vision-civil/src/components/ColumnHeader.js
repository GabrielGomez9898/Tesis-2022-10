import { useState } from "react";
import Axios from "axios";
import CreateFunctionaryModal from "./CreateFunctionaryModal";
import CreateCopModal from "./CreateCopModal";

const ColumnHeader = ({columnText}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="users-table-column-header">
            <a onClick={() => setIsModalOpen(true)}>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fad"
                    data-icon="user-plus"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="svg-inline--fa fa-user-plus fa-w-20 fa-7x"
                >
                    <g className="fa-group">
                        <path
                            fill="currentColor"
                            d="M640 224v32a16 16 0 0 1-16 16h-64v64a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-64h-64a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h64v-64a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16v64h64a16 16 0 0 1 16 16z"
                            class="fa-secondary-add-users">
                        </path>
                        <path
                            fill="currentColor"
                            d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm89.6 32h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z"
                            class="fa-secondary-add-users">
                        </path>
                    </g>
                </svg>
            </a>
            <h1>{columnText}</h1>
            { (isModalOpen && columnText === "Funcionarios") ? <CreateFunctionaryModal onClose={() => setIsModalOpen(false)} /> : null }
            { (isModalOpen && columnText === "Policías") ? <CreateCopModal onClose={() => setIsModalOpen(false)} /> : null }
        </div>
    );
}

export default ColumnHeader