import { useAuthState } from "../firebase";
import { Route, Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

const AuthenticatedOutlet = () => {
    const { isAuthenticated } = useAuthState()
    console.log(`AuthenticatedRoute: ${isAuthenticated}`)

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthenticatedOutlet;