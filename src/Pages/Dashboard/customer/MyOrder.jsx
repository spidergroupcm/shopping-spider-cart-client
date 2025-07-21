import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import DashboardSpinner from "../../../components/loadingSpinner/DashboardSpinner";
import ReviewModal from "../../../Modal/ReviewModal";
import { Helmet } from "react-helmet-async";

const MyOrder = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); 

    // customer payments data load
    const { data: orderList = [], isLoading } = useQuery({
        queryKey: ["orderList", user?.email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/order-list/${user?.email}`);
            return data.data;
        },
    });

    if (isLoading) return <DashboardSpinner />;

    return (
        <div className="w-11/12 mx-auto py-10">
            <Helmet>
                    <title>My Order | Shopping Spider</title>
            </Helmet>
            <div className="bg-white min-h-[calc(100vh-140px)] rounded-md py-10 px-2 lg:p-10">
                <h2 className="text-2xl font-medium uppercase relative mb-8">
                    <span className="text-gray-500">MY</span> ORDER
                    <hr className="absolute top-[14px] left-[130px] border-[1px] border-gray-600 w-[50px]" />
                </h2>

                {orderList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500 text-lg">You have no orders yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr className="text-sm">
                                    <th className="p-3">No.</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Items</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Transaction</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((order, index) => (
                                    <tr key={order?._id} className="border-t border-gray-300 text-center">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">${order?.price.toFixed(2)}</td>
                                        <td className="p-3">{order?.cartIds?.length}</td>
                                        <td className="p-3">
                                            {new Date(order?.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="p-3 text-sm">{order?.transactionId}</td>
                                        <td className="p-3">
                                            <span
                                                className="px-3 py-1 text-sm text-white rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        order?.status === "Pending"
                                                            ? "black"
                                                            : order?.status === "Packing"
                                                            ? "orange"
                                                            : order?.status === "Shipped"
                                                            ? "blue"
                                                            : order?.status === "Out for delivery"
                                                            ? "purple"
                                                            : order?.status === "Delivered"
                                                            ? "green"
                                                            : order?.status === "Order Placed"
                                                            ? "teal"
                                                            : "",
                                                }}
                                            >
                                                {order?.status}
                                            </span>
                                        </td>
                                        <td
                                            onClick={() => {
                                                if (order?.status === "Delivered") {
                                                    setSelectedOrder(order);
                                                    setIsModalOpen(true);
                                                }
                                            }}
                                            className="p-3"
                                        >
                                            <span
                                                className={`bg-gray-800 text-white px-3 py-1 rounded-md text-sm ${
                                                    order?.status === "Delivered"
                                                        ? "cursor-pointer"
                                                        : "cursor-not-allowed opacity-50"
                                                }`}
                                            >
                                                Review
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {isModalOpen && selectedOrder && (
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                />
            )}
        </div>
    );
};

export default MyOrder;

