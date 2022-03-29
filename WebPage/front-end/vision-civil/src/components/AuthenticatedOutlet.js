import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedOutlet = () => {
    const { isLoading, isAuthenticated } = useAuth();

    if(isLoading) return <></>;

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthenticatedOutlet;