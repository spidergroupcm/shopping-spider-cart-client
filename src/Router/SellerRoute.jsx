import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const SellerRoute = ({children}) => {
    const {user,loading} = useAuth(); 
    const [role,isLoading] = useRole();
    

    if(loading || isLoading){
        return <LoadingSpinner/>
    }

    if(user && role === 'seller'){
        return children;
    }

    return <Navigate to="/dashboard"></Navigate>
};

export default SellerRoute;