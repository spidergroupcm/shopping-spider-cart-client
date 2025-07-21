import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

  const { data: cart = [], isLoading, refetch, error } = useQuery({
    queryKey: ["cart",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart-product/${user?.email}`); 
      return res.data;
    },
  });

  return [cart, isLoading, refetch, error];
};

export default useCart;