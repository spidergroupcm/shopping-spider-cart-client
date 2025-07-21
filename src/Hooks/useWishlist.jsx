import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
    
  const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

  const { data: wishlist = [], isLoading, refetch, error } = useQuery({
    queryKey: ["wishlist",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user?.email}`); 
      return res.data;
    },
  });

  return [wishlist, isLoading, refetch, error];
};

export default useWishlist;