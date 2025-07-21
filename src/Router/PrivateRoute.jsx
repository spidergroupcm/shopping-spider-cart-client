import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";


const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <LoadingSpinner/>
    }

    if(user && user?.email){
        return children;
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>
};

export default PrivateRoute;