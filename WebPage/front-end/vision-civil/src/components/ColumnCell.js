import { useState } from "react";
import DeleteFunctionaryModal from "./DeleteFunctionaryModal";
import EditFunctionaryModal from "./EditFunctionaryModal";
import DeleteCopModal from "./DeleteCopModal";
import EditCopModal from "./EditCopModal";
import ReactTooltip from "react-tooltip";

const ColumnCell = (props) => {
    const [isEditFunctionaryModalOpen, setIsEditFunctionaryModalOpen] = useState(false);
    const [isDeleteFunctionaryModalOpen, setIsDeleteFunctionaryModalOpen] = useState(false);
    const [isEditCopModalOpen, setIsEditCopModalOpen] = useState(false);
    const [isDeleteCopModalOpen, setIsDeleteCopModalOpen] = useState(false);

    const isFunctionary = props.hasOwnProperty("isMaster");

    return (
        (isFunctionary) ? (
            <div className="users-table-column-cell">
                <div className="users-table-column-cell-data">
                    <h2>{props["emailText"]}</h2>
                    {
                        props.isMaster ?
                            <div className="functionary-master-pill">
                                <p><i>MASTER</i></p>
                            </div> :
                            <div className="functionary-normal-pill">
                                <p><i>NORMAL</i></p>
                            </div>
                    }
                </div>
                <div className="users-table-column-cell-actions">
                    <a data-tip={`Cambiar los privilegios del funcionario`} onClick={() => setIsEditFunctionaryModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path
                                fill="currentColor"
                                d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z"
                                class="fa-edit-users" />
                        </svg>
                    </a>
                    <a data-tip={`Borrar al funcionario`} onClick={() => setIsDeleteFunctionaryModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                fill="currentColor"
                                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                                class="fa-delete-users" />
                        </svg>
                    </a>
                </div>
                {isEditFunctionaryModalOpen ? <EditFunctionaryModal functionaryId={props.functionaryId} isMaster={props.isMaster} onClose={() => setIsEditFunctionaryModalOpen(false)} /> : null}
                {isDeleteFunctionaryModalOpen ? <DeleteFunctionaryModal functionaryId={props.functionaryId} emailText={props.emailText} onClose={() => setIsDeleteFunctionaryModalOpen(false)} /> : null}
                <ReactTooltip effect="solid" />
            </div>
        ) : (
            <div className="users-table-column-cell">
                <div className="users-table-column-cell-data">
                    <h2>{props["nameText"]}</h2>
                    <div>
                        <span>Email: </span>
                        <span className="cop-data-item-detail">{props["emailText"]}</span>
                    </div>
                    <div>
                        <span>Número de placa: </span>
                        <span className="cop-data-item-detail">{props["badgeNumberText"]}</span>
                    </div>
                    <div>
                        <span>Número de teléfono: </span>
                        <span className="cop-data-item-detail">{props["phoneText"]}</span>
                    </div>
                    <div>
                        <span>Fecha de nacimiento: </span>
                        <span className="cop-data-item-detail">{props["birthDateText"]}</span>
                    </div>
                    <div>
                        <span>Género: </span>
                        <span className="cop-data-item-detail">{props["genderText"]}</span>
                    </div>
                    <div className="pill-container-horizontal">
                        {
                            props.disponible ?
                            <div className="cop-true-pill">
                                <p><i>DISPONIBLE</i></p>
                            </div> : 
                            <div className="cop-false-pill">
                                <p><i>NO DISPONIBLE</i></p>
                            </div>
                        }
                        {
                            props.enServicio ?
                            <div className="cop-true-pill">
                                <p><i>EN SERVICIO</i></p>
                            </div> : 
                            <div className="cop-false-pill">
                                <p><i>NO EN SERVICIO</i></p>
                            </div>
                        }
                    </div>
                </div>
                <div className="users-table-column-cell-actions">
                    <a data-tip={`Editar los datos de ${props.nameText}`} onClick={() => setIsEditCopModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path
                                fill="currentColor"
                                d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z"
                                class="fa-edit-users" />
                        </svg>
                    </a>
                    <a data-tip={`Borrar a ${props.nameText}`} onClick={() => setIsDeleteCopModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                fill="currentColor"
                                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                                class="fa-delete-users" />
                        </svg>
                    </a>
                </div>
                {isEditCopModalOpen ? <EditCopModal copIdText={props.copIdText}
                    birthDateText={props.birthDateText}
                    genderText={props.genderText}
                    badgeNumberText={props.badgeNumberText}
                    nameText={props.nameText}
                    phoneText={props.phoneText}
                    onClose={() => setIsEditCopModalOpen(false)} /> : null}
                {isDeleteCopModalOpen ? <DeleteCopModal copIdText={props.copIdText} nameText={props.nameText} onClose={() => setIsDeleteCopModalOpen(false)} /> : null}
                <ReactTooltip effect="solid" />
            </div>
        )
    );
}

export default ColumnCell