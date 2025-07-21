import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useCount = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const { data: count = [], isLoading, refetch, error } = useQuery({
        queryKey: ["count",user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
          const res = await axiosPublic.get(`/count/${user?.email}`); 
          return res.data;
        },
        
      });

      return [count,isLoading,refetch,error]
    
};

export default useCount;