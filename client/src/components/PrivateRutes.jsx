import { useSelector } from "react-redux";
import { auth_state } from "../features/authSlice";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
    const { isAuthenticated } = useSelector(auth_state)

    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />
}