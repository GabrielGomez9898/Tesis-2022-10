
import { useState } from "react";
import { createPortal } from "react-dom";
import Axios from "axios";


const EditCopModal = (props) => {
    const [birthDate, setBirthDate] = useState(props["birthDateText"]);
    const [gender, setGender] = useState(props["genderText"]);
    const [policeId, setPoliceId] = useState(props["badgeNumberText"]);
    const [name, setName] = useState(props["nameText"]);
    const [phone, setPhone] = useState(props["phoneText"]);
    const [isLoading, setIsLoading] = useState(false);

    const cop = {
        birth_date: birthDate,
        gender: gender,
        id_policia: policeId,
        name: name,
        phone: phone
    }

    const updateCop = () => {
        return Axios.patch(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/cops/${props.copIdText}`, cop);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        await updateCop();
        props.onClose();
        setIsLoading(false);
    }

    return createPortal(
        <>
            <div className="modal-background"/>
            <div className="modal-content">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <h1>Editar policía</h1>
                <form className="modal-body-vertical" onSubmit={handleSubmit}>
                    <label htmlFor="phoneInput">Numero telefónico del policía</label>
                    <input type="tel" id="phoneInput" placeholder="Ingrese el teléfono" defaultValue={props["phoneText"]} required onChange={(e) => setPhone(e.target.value)} />
                    <label htmlFor="nameInput">Nombre completo del policía</label>
                    <input type="text" id="nameInput" placeholder="Ingrese el nombre" defaultValue={props["nameText"]} required onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="birthDateInput">Fecha de nacimiento del policía</label>
                    <input type="date" id="birthDateInput" placeholder="Ingrese la fecha de nacimiento" defaultValue={props["birthDateText"]} required onChange={(e) => setBirthDate(e.target.value)} />
                    <label htmlFor="genderRadio">Genero del policía</label>
                    {
                        (props["genderText"] === "Masculino") ? 
                        <>
                            <input type="radio" name="genderRadio" value="Masculino" required defaultChecked onChange={(e) => setGender(e.target.value)} />
                            <>Masculino</>
                        </> :
                        <>
                            <input type="radio" name="genderRadio" value="Masculino" required onChange={(e) => setGender(e.target.value)} />
                            <>Masculino</>
                        </>
                    }
                    {
                        (props["genderText"] === "Femenino") ?
                        <>
                            <input type="radio" name="genderRadio" value="Femenino" required defaultChecked onChange={(e) => setGender(e.target.value)} />
                            <>Femenino</>
                        </> :
                        <>
                            <input type="radio" name="genderRadio" value="Femenino" required onChange={(e) => setGender(e.target.value)} />
                            <>Femenino</>
                        </>
                    }
                    {
                        (props["genderText"] === "Otro") ?
                        <>
                            <input type="radio" name="genderRadio" value="Otro" required defaultChecked onChange={(e) => setGender(e.target.value)} />
                            <>Otro</>
                        </> :
                        <>
                            <input type="radio" name="genderRadio" value="Otro" required onChange={(e) => setGender(e.target.value)} />
                            <>Otro</>
                        </>
                    }
                    <label htmlFor="policeIdInput">Numero de placa policial</label>
                    <input type="text" id="policeIdInput" placeholder="Ingrese el numero" defaultValue={props["badgeNumberText"]} required onChange={(e) => setPoliceId(e.target.value)} />
                    <button type="submit" disabled={isLoading}>Actualizar policía</button>
                </form>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default EditCopModal