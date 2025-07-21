import React from "react";
import useWishlist from "../../Hooks/useWishlist";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const [wishlist, , refetch] = useWishlist();
    const axiosSecure = useAxiosSecure();

    // product item delete
    const handleWishlistProductDelete = async (id) => {
        const res = await axiosSecure.delete(`/wishlistProduct-delete/${id}`)
        if (res.data.deletedCount) {
            refetch()
        }
    }

    return (
        <div className="w-11/12 mx-auto py-20">
            <h2 className="text-2xl font-medium uppercase relative mb-8">
                <span className="text-gray-500">MY</span> WISHLIST
                <hr className="absolute top-[14px] left-[155px] border-[1px] border-gray-600 w-[50px]" />
            </h2>

            {wishlist?.length > 0 ? (
                <div>
                    {wishlist?.map(list => (
                        <React.Fragment key={list._id}>
                            <div className="flex items-center py-4 border-b border-gray-200">
                                <img src={list.photo} alt={list.productName} className="w-20 h-24 object-cover mr-4" />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{list.productName}</h3>
                                    <p className="text-sm text-gray-600">${list.price}</p>
                                </div>
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => handleWishlistProductDelete(list._id)} 
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 mb-6 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">You haven't added any items to your wishlist yet</p>
                    <Link 
                        to="/shop" 
                        className="inline-block px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;