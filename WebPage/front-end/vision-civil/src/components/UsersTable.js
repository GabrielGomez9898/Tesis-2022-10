import "../styles/Users.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshData as refreshFuncData } from "../features/FunctionaryList";
import { refreshData as refreshCopData } from "../features/CopList";
import { db } from "../firebase";
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import ColumnHeader from "./ColumnHeader";
import ColumnCell from "./ColumnCell";
import { SyncLoader, ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const UsersTable = () => {
    const dispatch = useDispatch();
    // Functionary state related variables
    const functionaryList = useSelector((state) => state.functionaryList.value);
    const [isLoadingFuncs, setIsLoadingFuncs] = useState(false);
    const [funcsButtonClassName, setFuncsButtonClassName] = useState("");
    const [notMoreFuncsToBring, setNotMoreFuncsToBring] = useState(false);
    const [lastFunctionaryDoc, setLastFunctionaryDoc] = useState();
    // Cop state related variables
    const copList = useSelector((state) => state.copList.value);
    const [isLoadingCops, setIsLoadingCops] = useState(false);
    const [copsButtonClassName, setCopsButtonClassName] = useState("");
    const [notMoreCopsToBring, setNotMoreCopsToBring] = useState(false);
    const [lastCopDoc, setLastCopDoc] = useState();
    
    useEffect(() => {
        console.log("1ER useEffect en ejecución")
        dispatch(refreshFuncData([]));
        getFuncsDataBatch(true);
    }, []);

    useEffect(() => {
        console.log("2DO useEffect en ejecución")
        dispatch(refreshCopData([]));
        getCopsDataBatch(true);
    }, []);

    const handleMoreFuncsClick = () => {
        setIsLoadingFuncs(true);
        setFuncsButtonClassName("button-loading");
        getFuncsDataBatch();
    }

    const handleMoreCopsClick = () => {
        setIsLoadingCops(true);
        setCopsButtonClassName("button-loading");
        getCopsDataBatch();
    };
    
    const getFuncsDataBatch = async (isFirstFetch = false, fetchLimit = 3) => {
        // Reference to the functionaries collection
        const functionariesRef = collection(db, "functionaries");
        // Create the query with for the first / next batch
        let q;
        if(isFirstFetch) {
            q = query(functionariesRef, orderBy("email", "asc"), limit(fetchLimit));
        } 
        else {
            q = query(functionariesRef, orderBy("email", "asc"), startAfter(lastFunctionaryDoc), limit(fetchLimit));
        }
        // Execute the query
        const querySnapshot = await getDocs(q)
        // Check if the query result is empty
        if(!querySnapshot.empty) {
            // Get the queried data
            const functionaries = querySnapshot.docs.map((doc) => {
                let completeFunctionary = doc.data();
                completeFunctionary.id = doc.id;
                return completeFunctionary;
            });
            // Get the last doc of this data batch
            setLastFunctionaryDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            // Update the functionaryList
            if(isFirstFetch) {
                dispatch(refreshFuncData(functionaries));
            }
            else {
                dispatch(refreshFuncData([...functionaryList, ...functionaries]));
            }
        }
        if(querySnapshot.size < 3) {
            setNotMoreFuncsToBring(true);
        }

        setIsLoadingFuncs(false);
        setFuncsButtonClassName("");
    };

    const getCopsDataBatch = async (isFirstFetch = false, fetchLimit = 3) => {
        const usersRef = collection(db, "users");

        let q;
        if(isFirstFetch) {
            q = query(usersRef, where("role", "==", "POLICIA"), orderBy("name", "asc"), limit(fetchLimit));
        } 
        else {
            q = query(usersRef, where("role", "==", "POLICIA"), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
        }

        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty) {
            const cops = querySnapshot.docs.map((doc) => {
                let completeCop = doc.data();
                completeCop.id = doc.id;
                return completeCop;
            });

            setLastCopDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

            if(isFirstFetch) {
                dispatch(refreshCopData(cops));
            }
            else {
                dispatch(refreshCopData([...copList, ...cops]));
            }
        }
        if(querySnapshot.size < 3) {
            setNotMoreCopsToBring(true);
        }

        setIsLoadingCops(false);
        setCopsButtonClassName("");
    };

    const style = css`
        z-index: 1000;
    `;

    return (
        <>
            <div className="users-table-container">
                <div className="users-table-column">
                    <ColumnHeader columnText="Funcionarios"/>
                    {
                        (functionaryList.length === 0) 
                        ?
                        <SyncLoader color="hsl(207, 100%, 50%)" loading /> 
                        :
                        functionaryList.map((functionary) => {
                            return <ColumnCell functionaryId={functionary["id"]} emailText={functionary["email"]} isMaster={functionary["isMaster"]}/>
                        })
                    }
                    {
                        notMoreFuncsToBring ? 
                        <h1>No hay más funcionarios</h1> :
                        <button className={funcsButtonClassName} disabled={isLoadingFuncs} onClick={handleMoreFuncsClick}>
                            {isLoadingFuncs ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Ver más funcionarios"}
                        </button>
                    }
                </div>
                <div className="users-table-column">
                    <ColumnHeader columnText="Policías"/>
                    {
                        (copList.length === 0)
                        ?
                        <SyncLoader color="hsl(207, 100%, 50%)" loading />
                        :
                        copList.map((cop) => {
                            return <ColumnCell 
                                        copIdText={cop["id"]} 
                                        birthDateText={cop["birth_date"]} 
                                        emailText={cop["email"]}
                                        genderText={cop["gender"]} 
                                        badgeNumberText={cop["id_policia"]}  
                                        nameText={cop["name"]} 
                                        phoneText={cop["phone"]} />
                        })
                    }
                    {
                        notMoreCopsToBring ? 
                        <h1>No hay más policías</h1> :
                        <button className={copsButtonClassName} disabled={isLoadingCops} onClick={handleMoreCopsClick}>
                            {isLoadingCops ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Ver más policías"}
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default UsersTable;