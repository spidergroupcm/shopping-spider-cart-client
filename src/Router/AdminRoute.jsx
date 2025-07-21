import { Navigate} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth(); 
    const [role,isLoading] = useRole();

    if(loading || isLoading){
        return <LoadingSpinner/>
    }

    if(user && role === 'admin'){
        return children;
    }

    return <Navigate to="/dashboard"></Navigate>
};

export default AdminRoute;