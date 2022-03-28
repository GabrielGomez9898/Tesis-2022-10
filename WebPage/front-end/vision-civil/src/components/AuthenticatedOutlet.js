import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedOutlet = () => {
    const { isAuthenticated } = useAuth();
    console.log(`AuthenticatedRoute: ${isAuthenticated}`);

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthenticatedOutlet;