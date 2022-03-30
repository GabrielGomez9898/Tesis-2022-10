import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedOutlet = () => {
    const { isLoading, isAuthenticated } = useAuth();

    console.log(`El usuario está autenticado? -> ${isAuthenticated}`);

    if(isLoading) return <></>;

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthenticatedOutlet;