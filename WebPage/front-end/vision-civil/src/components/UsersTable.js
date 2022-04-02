import "../styles/Users.scss";
import { useEffect, useState } from "react";
import ColumnHeader from "./ColumnHeader";
import ColumnCell from "./ColumnCell";
import Axios from "axios";

const UsersTable = () => {
    const [functionariesData, setFunctionariesData] = useState([]);
    const [copsData, setCopsData] = useState([]);

    useEffect( async () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/functionaries`).then((response) => {
            setFunctionariesData(response.data);
        });
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/cops`).then((response) => {
            setCopsData(response.data);
        });
    }, []);

    return (
        <>
            <div className="users-table-container">
                <div className="users-table-column">
                    <ColumnHeader columnText="Funcionarios"/>
                    {functionariesData.map((functionary) => {
                        return <ColumnCell functionaryId={functionary["id"]} emailText={functionary["email"]} isMaster={functionary["isMaster"]}/>
                    })}
                </div>
                <div className="users-table-column">
                    <ColumnHeader columnText="Policías"/>
                    {copsData.map((cop) => {
                        return <ColumnCell nameText={cop["name"]} emailText={cop["email"]} idText={cop["id_policia"]}/>
                    })}
                </div>
            </div>
        </>
    );
}

export default UsersTable;