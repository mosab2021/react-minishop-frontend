import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
    const { isLoggedin } = useUser()
    if(!isLoggedin){
        return <Navigate to= '/login'/>
    }
    return children
}