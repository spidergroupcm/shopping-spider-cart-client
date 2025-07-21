import React from 'react';
import DashboardSpinner from '../../../components/loadingSpinner/DashboardSpinner';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const MyOrderHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: customerOrderHistory = [], isLoading } = useQuery({
        queryKey: ["customerOrderHistory", user?.email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/customer-order-history/${user?.email}`);
            return data.data;
        },
    });

    if (isLoading) return <DashboardSpinner />;
    //console.log("customer history:", customerOrderHistory)
    return (
        <div className="w-11/12 mx-auto py-10">
            <Helmet>
                    <title>Order History | Shopping Spider</title>
            </Helmet>
            <div className="bg-white min-h-[calc(100vh-140px)] rounded-md py-10 px-2 lg:p-10">
                <h2 className="text-2xl font-medium uppercase relative mb-8">
                    <span className="text-gray-500">ORDER</span> HISTORY
                    <hr className="absolute top-[14px] left-[190px] border-[1px] border-gray-600 w-[50px]" />
                </h2>

                {customerOrderHistory?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500 text-lg">You have no orders history yet.</p>
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
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {customerOrderHistory?.map((order, index) => (
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
                                                className="px-3 py-1 text-sm rounded-full">
                                                {order?.status}
                                            </span>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrderHistory;