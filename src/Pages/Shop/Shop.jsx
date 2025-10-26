import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // get category from URL
  const categoryFromUrl = searchParams.get("category") || "All";

  const { data = {}, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const allProducts = data?.products || [];

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState(categoryFromUrl); // set initial category from URL
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  // Filter + Sort
  const filteredProducts = allProducts
    .filter((product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((product) =>
      category === "All" ? true : product.manCategory === category
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="center">
        <div className="mt-20 bg-customPurple p-10 w-80 center rounded-md">
          <p className="text-white">Failed to load products!</p>
        </div>
      </div>
    );

  return (
    <div className="w-full">
      <Helmet>
        <title>Shop | Shopping Spider</title>
        <meta
          name="description"
          content="Browse our full catalog of stylish clothing, accessories, and exclusive deals at Shopping Spider."
        />
      </Helmet>
      <div className="w-11/12 mx-auto pb-20">
        <h2 className="text-3xl font-bold text-center text-customPurple mt-10 mb-6">
          Explore Our Fashion Products
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-customPurple"
          />

          <div className="flex gap-2">
            {["All", "Women", "Men", "Kids"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  navigate(`/shop?category=${cat}`);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  category === cat
                    ? "bg-customPurple text-white"
                    : "bg-gray-100 text-gray-700"
                } hover:bg-customPurple hover:text-white transition`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.photo}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-600 mb-4">৳ {product.price}</p>
                <button
                  onClick={() => handleClick(product._id)}
                  className="bg-customPurple hover:bg-purple-700 text-white py-1 px-3 rounded-md"
                >
                  See Details
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

export default Shop;

