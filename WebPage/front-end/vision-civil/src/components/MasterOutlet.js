import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const MasterOutlet = () => {
    const { isLoading, isMaster } = useAuth();

    if(isLoading) return <></>;

    return (
        isMaster ? <Outlet/> : <Navigate to="/"/>
    )
}

export default MasterOutlet