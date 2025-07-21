import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import useCount from "../Hooks/useCount";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import LoginModal from "../Modal/LoginModal";
import ProductReviewList from "../components/productReview/ProductReviewList";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role] = useRole();
  const [, , refetch] = useCount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !product?._id) return <p className="text-center text-red-500">Product not found!</p>;

  const handleAddProduct = async () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    const productItem = {
      productId: product._id,
      productName: product.productName,
      price: parseInt(product.price),
      manCategory: product.manCategory,
      photo: product.photo,
      orderQuantity: 1,
      email: user.email,
    };

    const res = await axiosSecure.post("/cartItem", productItem);
    if (res.data.insertedId) {
      toast.success(`${product.productName} Successfully Added`);
      refetch();
    }
  };

  const handleWishlistProduct = async () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    const wishlistItem = {
      productId: product._id,
      productName: product.productName,
      price: parseInt(product.price),
      manCategory: product.manCategory,
      photo: product.photo,
      email: user.email,
    };

    const res = await axiosSecure.post("/wishlistItem", wishlistItem);
    if (res.data.insertedId) {
      toast.success(`${product.productName} added to Wishlist`);
      refetch();
    }
  };

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto">
      <div className="md:flex gap-5 space-y-5 md:space-y-0">
        <div className="flex-1 w-full ">
          <img
            src={product.photo}
            alt={product.productName}
            className="w-full h-[550px] object-contain rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mt-5">{product.productName}</h1>

          <div className="flex items-center mt-5 space-x-2 ">
            {product.ratingCount > 0 ? (
              <>
                <span className="text-yellow-400 text-lg">
                  {"★".repeat(Math.floor(product.averageRating))}
                  {"☆".repeat(5 - Math.floor(product.averageRating))}
                </span>
                <span className="text-gray-500 text-sm">
                  ({product.ratingCount})
                </span>
              </>
            ) : (
              <>
                <span className="text-yellow-400 text-lg">{"☆".repeat(5)}</span>
                <span className="text-gray-500 text-sm">(0)</span>
              </>
            )}
          </div>

          <div className="text-2xl font-semibold mt-5">${product.price}</div>
          <p className="text-gray-600 text-sm mt-5">{product.description}</p>

         

          <div className="flex gap-3">
            <button
              disabled={["seller", "moderator", "admin"].includes(role)}
              onClick={handleAddProduct}
              className="mt-8 w-fit bg-black text-white py-3 px-6 text-sm rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              ADD TO CART
            </button>

            <button
              disabled={["seller", "moderator", "admin"].includes(role)}
              onClick={handleWishlistProduct}
              className="relative mt-8 w-fit border border-black py-3 px-6 text-sm rounded-sm disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden font-medium text-black bg-white uppercase transition-all duration-500 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-black before:transition-all before:duration-1000 hover:before:left-0 hover:text-white"
            >
              <span className="relative z-10">Add Wishlist</span>
            </button>
          </div>

        
        </div>
      </div>

      {/* Product Reviews */}
      <ProductReviewList productId={product._id} />

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProductDetails;



