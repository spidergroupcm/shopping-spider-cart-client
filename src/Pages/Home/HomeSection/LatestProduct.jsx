import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Sparkles, ShoppingBag } from "lucide-react"; // Lucide icons
import { motion } from "framer-motion";

const LatestProduct = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data = {}, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const allProducts = data?.products || [];

  const randomFour = allProducts
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Failed to load products!</p>;

  return (
    <div className="w-full  py-5">
      <div className="w-11/12 mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-7 h-7 text-customPurple animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-customPurple drop-shadow-sm">
              Our Latest Arrivals
            </h2>
            <Sparkles className="w-7 h-7 text-customPurple animate-pulse" />
          </div>
          <p className="max-w-xl mx-auto text-xl">
            Discover newest handpicked pieces for elegant style
          </p>
        </div>

        {/* Product Grid */}
        {randomFour.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {randomFour.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md rounded-2xl p-4 border border-purple-100 hover:shadow-2xl transition duration-300 relative group"
              >
                <img
                  src={product.photo || product.image}
                  alt={product.productName || product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition duration-500"
                />
                <h3 className="text-lg font-semibold text-customPurple truncate">
                  {product.productName || product.name}
                </h3>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 flex items-center justify-center gap-2 bg-customPurple hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition"
                >
                  <ShoppingBag className="w-5 h-5" />
                  See More
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProduct;
