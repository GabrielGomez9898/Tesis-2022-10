import { useAuthState } from "../firebase";
import { Route, Navigate } from "react-router-dom";

const UnauthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState()
    console.log(`UnauthenticatedRoute: ${isAuthenticated}`)

    return (
        <Route {...props} render={ (routeProps) => !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/" /> } />
    )
}

export default UnauthenticatedRoute;