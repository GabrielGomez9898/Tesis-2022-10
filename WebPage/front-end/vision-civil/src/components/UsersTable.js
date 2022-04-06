import "../styles/Users.scss";
import { cloneElement, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ColumnHeader from "./ColumnHeader";
import ColumnCell from "./ColumnCell";
import Axios from "axios";

const UsersTable = () => {
    const [functionariesData, setFunctionariesData] = useState([]);
    const [copsData, setCopsData] = useState([]);

    const getFunctionariesData = () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/functionaries`).then((response) => {
            setFunctionariesData(response.data);
        });
    }

    const getCopsData = () => {
        Axios.get(`https://us-central1-miproyecto-5cf83.cloudfunctions.net/app/cops`).then((response) => {
            setCopsData(response.data);
        });
    }

    return (
        <>
            {
                useEffect( async () => {
                    getFunctionariesData();
                    getCopsData();
            
                    const functionariesRef = collection(db, "functionaries");
                    onSnapshot(functionariesRef, (snapshot) => {
                        console.log(snapshot);
                        getFunctionariesData();
                    });

                    const usersRef = collection(db, "users");
                    onSnapshot(usersRef, (snapshot) => {
                        console.log(snapshot);
                        getCopsData();
                    });
                }, [])
            }
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
                        return <ColumnCell 
                                    copIdText={cop["id"]} 
                                    birthDateText={cop["birth_date"]} 
                                    emailText={cop["email"]}
                                    genderText={cop["gender"]} 
                                    badgeNumberText={cop["id_policia"]}  
                                    nameText={cop["name"]} 
                                    phoneText={cop["phone"]} />
                    })}
                </div>
            </div>
        </>
    );
}

export default UsersTable;