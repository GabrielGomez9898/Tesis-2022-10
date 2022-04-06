import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedOutlet = () => {
    const { isLoading, isAuthenticated, user } = useAuth();

    console.log(`El usuario está autenticado? -> ${isAuthenticated}`);
    console.log(`El usuario actual es:`);
    console.log(user);

    if(isLoading) return <></>;

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthenticatedOutlet;