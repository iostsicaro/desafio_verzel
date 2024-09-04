import { Outlet, Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { token } = useAuth();

    return token ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute;