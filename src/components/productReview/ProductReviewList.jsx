import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductReviewCard from "./ProductReviewCard";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";


const ProductReviewList = ({ productId }) => {
    const axiosPublic = useAxiosPublic();
    
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/${productId}`);
            return res.data;
        }
    });
    

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className="mt-10 mb-20">
            <div>
                <h2 className="uppercase text-gray-500 text-sm font-medium border-b-2 bg-[#f2f2f2] px-6 py-3 rounded-sm w-fit">Reviews({reviews?.length || 0})</h2>
                <div className="border-b-[4px] mb-6"></div>
            </div>
            {
                reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map(review => (
                            <ProductReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet for this product.</p>
                )
            }
        </div>
    );
};

export default ProductReviewList;
