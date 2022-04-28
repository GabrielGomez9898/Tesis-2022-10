import { useState } from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { editItem } from "../features/CopList";
import Axios from "axios";


const EditCopModal = (props) => {
    const dispatch = useDispatch();

    const [birthDate, setBirthDate] = useState(props["birthDateText"]);
    const [gender, setGender] = useState(props["genderText"]);
    const [policeId, setPoliceId] = useState(props["badgeNumberText"]);
    const [name, setName] = useState(props["nameText"]);
    const [phone, setPhone] = useState(props["phoneText"]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClassName, setButtonClassName] = useState("");

    const cop = {
        birth_date: birthDate,
        gender: gender,
        id_policia: policeId,
        name: name,
        phone: phone
    }

    const updateCop = () => {
        return Axios.patch(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/cops/${props.copIdText}`, cop);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setButtonClassName("button-loading");
        await updateCop();
        props.onClose();
        setIsLoading(false);
        setButtonClassName("");
        console.log({id: props.copIdText, ...cop});
        dispatch(editItem({id: props.copIdText, ...cop}));
    }

    const style = css`
        z-index: 1000;
    `;

    return createPortal(
        <div className="modal-background">
            <form className="modal-content" onSubmit={handleSubmit}>
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h2>Editar policía</h2>
                <p className="modal-description">Los cambios efectuados al policía se reflejarán inmediatamente en la base de datos</p>
                <div className="modal-body-horizontal">
                    <div>
                        <label htmlFor="nameInput">Nombre completo</label><br/>
                        <input type="text" id="nameInput" placeholder="Ingrese el nombre" defaultValue={props["nameText"]} required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="birthDateInput">Fecha de nacimiento</label><br/>
                        <input type="date" id="birthDateInput" placeholder="Ingrese la fecha de nacimiento" defaultValue={props["birthDateText"]} required onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                </div>
                <div className="modal-body-horizontal">
                    <div>
                        <label htmlFor="phoneInput">Teléfono</label><br/>
                        <input type="tel" id="phoneInput" placeholder="Ingrese el teléfono" defaultValue={props["phoneText"]} required onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="policeIdInput">Número de placa</label><br/>
                        <input type="text" id="policeIdInput" placeholder="Ingrese el numero" defaultValue={props["badgeNumberText"]} required onChange={(e) => setPoliceId(e.target.value)} />
                    </div>
                </div>
                <label htmlFor="genderRadio">Género</label>
                <div className="modal-body-horizontal radio-group">
                    {
                        (props["genderText"] === "Masculino") ? 
                        <label>
                            <input type="radio" name="genderRadio" value="Masculino" required defaultChecked onChange={(e) => setGender(e.target.value)} />
                            Masculino
                        </label> :
                        <label>
                            <input type="radio" name="genderRadio" value="Masculino" required onChange={(e) => setGender(e.target.value)} />
                            Masculino
                        </label>
                    }
                    {
                        (props["genderText"] === "Femenino") ?
                        <label>
                            <input type="radio" name="genderRadio" value="Femenino" required defaultChecked onChange={(e) => setGender(e.target.value)} />
                            Femenino
                        </label> :
                        <label>
                            <input type="radio" name="genderRadio" value="Femenino" required onChange={(e) => setGender(e.target.value)} />
                            Femenino
                        </label>
                    }
                    {
                        (props["genderText"] === "Otro") ?
                        <label>
                            <input type="radio" name="genderRadio" value="Otro" required defaultChecked onChange={(e) => setGender(e.target.value)} />
                            Otro
                        </label> :
                        <label>
                            <input type="radio" name="genderRadio" value="Otro" required onChange={(e) => setGender(e.target.value)} />
                            Otro
                        </label>
                    }
                </div>
                <button type="submit" className={buttonClassName} disabled={isLoading}>
                    {isLoading ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Actualizar policía"}
                </button>
            </form>
        </div>,
        document.getElementById("portal")
    );
}

export default EditCopModal