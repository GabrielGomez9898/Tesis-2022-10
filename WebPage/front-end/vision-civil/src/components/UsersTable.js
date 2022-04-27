import "../styles/Users.scss";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshData as refreshFuncData } from "../features/FunctionaryList";
import { refreshData as refreshCopData } from "../features/CopList";
import { refreshData as refreshFuncFiltersData } from "../features/FunctionaryFiltersData";
import { refreshData as refreshCopFiltersData } from "../features/CopFiltersData";
import { db } from "../firebase";
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import ColumnHeader from "./ColumnHeader";
import FunctionaryFilterCard from "./FunctionaryFilterCard";
import ColumnCell from "./ColumnCell";
import { SyncLoader, ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import CopFilterCard from "./CopFilterCard";

const UsersTable = () => {
    const dispatch = useDispatch();
    // Functionary state related variables
    const functionaryList = useSelector((state) => state.functionaryList.value);
    const functionaryFiltersData = useSelector((state) => state.functionaryFiltersData.value);
    const [isLoadingFuncs, setIsLoadingFuncs] = useState(false);
    const [funcsButtonClassName, setFuncsButtonClassName] = useState("");
    const [notMoreFuncsToBring, setNotMoreFuncsToBring] = useState(false);
    const [lastFunctionaryDoc, setLastFunctionaryDoc] = useState();
    // Cop state related variables
    const copList = useSelector((state) => state.copList.value);
    const copFiltersData = useSelector((state) => state.copFiltersData.value);
    const [isLoadingCops, setIsLoadingCops] = useState(false);
    const [copsButtonClassName, setCopsButtonClassName] = useState("");
    const [notMoreCopsToBring, setNotMoreCopsToBring] = useState(false);
    const [lastCopDoc, setLastCopDoc] = useState();

    useEffect(() => {
        setNotMoreFuncsToBring(false);
        dispatch(refreshFuncData([]));
        getFuncsDataBatch(true);
    }, [functionaryFiltersData.functionaryType]);

    useEffect(() => {
        setNotMoreCopsToBring(false);
        dispatch(refreshCopData([]));
        getCopsDataBatch(true);
    }, [copFiltersData.genero, copFiltersData.disponibilidad, copFiltersData.estado]);

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
            switch(functionaryFiltersData.functionaryType) {
                case "TODOS":
                    q = query(functionariesRef, orderBy("email", "asc"), limit(fetchLimit));
                    break;
                case "SOLO_MASTER":
                    q = query(functionariesRef, where("isMaster", "==", true), orderBy("email", "asc"), limit(fetchLimit));
                    break;
                case "SOLO_NORMALES":
                    q = query(functionariesRef, where("isMaster", "==", false), orderBy("email", "asc"), limit(fetchLimit));
                    break;
            }
        } 
        else {
            switch(functionaryFiltersData.functionaryType) {
                case "TODOS":
                    q = query(functionariesRef, orderBy("email", "asc"), startAfter(lastFunctionaryDoc), limit(fetchLimit));
                    break;
                case "SOLO_MASTER": 
                    q = query(functionariesRef, where("isMaster", "==", true), orderBy("email", "asc"), startAfter(lastFunctionaryDoc), limit(fetchLimit));
                    break;
                case "SOLO_NORMALES":
                    q = query(functionariesRef, where("isMaster", "==", false), orderBy("email", "asc"), startAfter(lastFunctionaryDoc), limit(fetchLimit));
                    break;
            }
        }
        // Execute the query
        const querySnapshot = await getDocs(q);
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
        else {
            setNotMoreFuncsToBring(true);
        }

        setIsLoadingFuncs(false);
        setFuncsButtonClassName("");
    };

    const getCopsDataBatch = async (isFirstFetch = false, fetchLimit = 3) => {
        const usersRef = collection(db, "users");

        let q;
        if(isFirstFetch) {
            if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {//Pendiente
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//No hay resultados
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//No hay resultados
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {//No hay resultados
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {//No hay resultados
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {//No hay resultados
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), limit(fetchLimit));
            }

            // q = query(usersRef, where("role", "==", "POLICIA"), orderBy("name", "asc"), limit(fetchLimit));
        } 
        else {
            if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "TODOS" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "MASCULINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Masculino"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "FEMENINO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Femenino"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "TODOS" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", true), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", true), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "TODOS") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", false), where("enServicio", "==", true), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }
            else if (copFiltersData.genero === "OTRO" && copFiltersData.disponibilidad === "NO_DISPONIBLE" && copFiltersData.estado === "NO_EN_SERVICIO") {
                q = query(usersRef, where("role", "==", "POLICIA"), where("gender", "==", "Otro"), where("disponible", "==", false), where("enServicio", "==", false), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
            }

            // q = query(usersRef, where("role", "==", "POLICIA"), orderBy("name", "asc"), startAfter(lastCopDoc), limit(fetchLimit));
        }

        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty) {
            const cops = querySnapshot.docs.map((doc) => {
                let completeCop = doc.data();
                completeCop.id = doc.id;
                return completeCop;
            });

            console.log(cops);

            setLastCopDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

            if(isFirstFetch) {
                dispatch(refreshCopData(cops));
            }
            else {
                dispatch(refreshCopData([...copList, ...cops]));
            }
        }
        else {
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
                        null
                        :
                        <FunctionaryFilterCard functionaryType={functionaryFiltersData.functionaryType} />
                        
                    }
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
                        
                        (functionaryList.length === 0)
                        ?
                        null 
                        :
                        (notMoreFuncsToBring ? 
                        <span className="not-more-docs-text">No hay más funcionarios</span> :
                        <button className={funcsButtonClassName} disabled={isLoadingFuncs} onClick={handleMoreFuncsClick}>
                            {isLoadingFuncs ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Ver más funcionarios"}
                        </button>)
                        
                    }
                </div>
                <div className="users-table-column">
                    <ColumnHeader columnText="Policías"/>
                    {
                        (copList.length === 0)
                        ?
                        null
                        :
                        <CopFilterCard genero={copFiltersData.genero} disponibilidad={copFiltersData.disponibilidad} estado={copFiltersData.estado}/>
                    }
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
                                        phoneText={cop["phone"]} 
                                        disponible={cop["disponible"]}
                                        enServicio={cop["enServicio"]}/>
                        })
                    }
                    {
                        (copList.length === 0)
                        ?
                        null
                        :
                        (notMoreCopsToBring ? 
                        <span className="not-more-docs-text">No hay más policías</span> :
                        <button className={copsButtonClassName} disabled={isLoadingCops} onClick={handleMoreCopsClick}>
                            {isLoadingCops ? <ClipLoader css={style} color="hsl(207, 100%, 50%)" size={20} loading /> : "Ver más policías"}
                        </button>)
                    }
                </div>
            </div>
        </>
    );
}

export default UsersTable;