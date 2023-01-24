import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
    const authed = localStorage.getItem('userName');
    return authed === "Admin" ? children : <Navigate to="/login" replace />;
}

export default AuthGuard;