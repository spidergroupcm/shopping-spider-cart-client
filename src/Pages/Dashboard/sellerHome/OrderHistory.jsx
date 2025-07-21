import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DashboardSpinner from "../../../components/loadingSpinner/DashboardSpinner";
import { Helmet } from "react-helmet-async";

const OrderHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // seller products data load
    const { data: orderHistory = [], isLoading, refetch } = useQuery({
        queryKey: ['orderHistory', user?.email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/order-history/${user?.email}`)
            return data.data;
        }
    })
    if (isLoading) return <DashboardSpinner />
    //console.log("order history", orderHistory)

    return (
        <div className="w-11/12 mx-auto py-10">
            <Helmet>
                    <title>Order History | Shopping Spider</title>
            </Helmet>
            <div className="rounded-md bg-white min-h-[calc(100vh-140px)] flex justify-center items-center">
                {
                    orderHistory?.length === 0 ? (
                        <p className="text-gray-500 text-lg font-medium text-center">No orders history found.</p>
                    ) : (
                        <div className="p-3 md:p-4 lg:p-6 w-full">
                            {
                                orderHistory?.map(history => (
                                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 border rounded-md mb-4" key={history?._id}>
                                        {/* Product Icon */}
                                        <div className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-md">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Package" className="w-12" />
                                        </div>

                                        {/* Product Details */}
                                        <div>
                                            {history?.productItems?.map((item, index) => (
                                                <div key={index}>
                                                    <p className="text-xs flex flex-col gap-1">{item?.productName}</p>
                                                </div>
                                            ))}
                                            <p className="text-sm font-medium mt-2">{history?.name}</p>
                                            <div className="mt-2">
                                                <p className="text-sm">{history?.deliveryInfo?.description}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm mb-2">Items: <strong>{history?.productItems?.length}</strong></p>
                                            <p className="text-gray-500 text-sm">Method: <strong>{history?.method}</strong></p>
                                            <p className="text-gray-500 text-sm">Payment: <span className="text-blue-500 font-semibold">{history?.payment}</span></p>
                                            <p className="text-gray-500 text-sm">Date: <strong>{new Date(history?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</strong></p>
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <p className="">$<span className="font-medium">{history?.price}</span></p>
                                        </div>

                                        {/* Status Dropdown */}
                                        <div>
                                            <p className="">$<span className="font-medium">{history?.status}</span></p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default OrderHistory;