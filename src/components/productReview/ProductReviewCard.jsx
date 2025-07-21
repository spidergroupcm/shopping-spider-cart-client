const ProductReviewCard = ({ review }) => {
    const { name, rating, review: comment, image, date } = review;

    return (
        <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
                {/* User Avatar */}
                
                    {/* Optional image display */}
                    {image && (
                        <div className="">
                            <img
                                src={image}
                                alt="Review attachment"
                                className="h-14 w-14 object-cover rounded-full"
                            />
                        </div>
                    )}
               

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{name}</h4>
                        <div className="flex items-center">
                            <span className="text-yellow-400 text-lg">
                                {'★'.repeat(Math.floor(rating))}
                                {'☆'.repeat(5 - Math.floor(rating))}
                            </span>
                            <span className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</span>
                        </div>
                    </div>

                    {date && (
                        <p className="text-xs text-gray-400 mb-2">
                            Reviewed on {new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    )}

                    <p className="text-gray-600 mt-2 leading-relaxed">
                        "{comment}"
                    </p>


                </div>
            </div>
        </div>
    );
};

export default ProductReviewCard;
