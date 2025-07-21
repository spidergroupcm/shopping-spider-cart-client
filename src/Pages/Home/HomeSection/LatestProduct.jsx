import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react"; // Lucide icon

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
    <div className="w-full bg-white py-2">
      <div className="w-11/12 mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2">
           
            <h2 className="text-3xl md:text-4xl font-bold text-customPurple">
              Our Latest Arrivals
            </h2>
           
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore the freshest pieces handpicked just for you.
          </p>
        </div>

        {/* Product Grid */}
        {randomFour.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {randomFour.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-xl p-4 border border-purple-100 hover:shadow-xl transition duration-300"
              >
                <img
                  src={product.photo || product.image}
                  alt={product.productName || product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-customPurple">
                  {product.productName || product.name}
                </h3>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 bg-customPurple hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full transition"
                >
                  See More
                </button>
              </div>
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



