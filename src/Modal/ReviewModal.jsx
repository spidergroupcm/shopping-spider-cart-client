import { useState } from 'react';
import { XMarkIcon, StarIcon } from '@heroicons/react/24/outline';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ReviewModal = ({ isOpen, onClose, order }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //console.log("order:", order)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;
        const date = new Date().toLocaleDateString();

        const reviewData = {
            rating,
            review,
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            productIds: order?.productIds,
            date,
            
        }
        //console.log(reviewData)

        //review data save database
        try {
            const res = await axiosSecure.post("/review", reviewData)
            if (res.data.insertedId) {
                toast.success("Review successful", {
                    position: "top-center",
                    autoClose: 3000,
                })
                // onclose(true);
                form.reset();
            }

        } catch (err) {
            console.log(err)
            toast.error(err.message, {
                position: "top-center",
                autoClose: 3000,
            })
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                {/* Background overlay */}
                {/* <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                /> */}

                {/* Modal container */}
                <div className="inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Share Your Experience
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            How would you rate your experience with our product?
                        </p>

                        {/* Star rating */}
                        <div className="mt-3 flex justify-center">
                            {[1, 2, 3, 4, 5].map((star,index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="mx-1 focus:outline-none"
                                >
                                    <StarIcon
                                        className={`h-8 w-8 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Review form */}
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div>
                                <label htmlFor="review" className="block text-sm font-medium text-gray-800">
                                    Your Review
                                </label>
                                <textarea
                                    id="review"
                                    rows={4}
                                    className="p-2 block text-gray-600 w-full rounded-md border border-gray-300  focus:outline-none focus:border-gray-400 sm:text-sm"
                                    placeholder="Share details about your experience..."
                                    name='review'
                                    required
                                />
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 "
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    //disabled={isSubmitting || rating === 0}
                                    className={`inline-flex justify-center rounded-md border-transparent px-4 py-2 text-sm font-medium text-white ${rating === 0 ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                    {'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;