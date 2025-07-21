import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            if (!user?.email) return null;  
            const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
            return data?.role || null;  
        },
        
    });

    return [role, isLoading];
};

export default useRole;
