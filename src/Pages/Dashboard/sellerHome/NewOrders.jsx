import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import DashboardSpinner from "../../../components/loadingSpinner/DashboardSpinner";
import { Helmet } from "react-helmet-async";


const NewOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // seller products data load
    const { data: newOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['newOrders', user?.email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/new-orders/${user?.email}`)
            return data.data;
        }
    })

    // order placed update
    const handleStatusChange = async (newOrderPlaced, id) => {
        const res = await axiosSecure.patch(`/order-placed-update/${id}`, { newOrderPlaced })
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            refetch();
        }
    };

    if (isLoading) return <DashboardSpinner />

    return (
        <div className="w-11/12 mx-auto py-10">
            <Helmet>
                    <title>New Orders | Shopping Spider</title>
            </Helmet>
            <div className="rounded-md bg-white min-h-[calc(100vh-140px)] ">
                {
                    newOrders?.length === 0 ? (
                        <p className="text-gray-500 text-lg font-medium flex justify-center items-center">No new orders found.</p>
                    ) : (
                        <div className="p-3 md:p-4 lg:p-6 w-full">
                            {
                                newOrders?.map(newOrder => (
                                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 border rounded-md mb-4" key={newOrder._id}>
                                        {/* Product Icon */}
                                        <div className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-md">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Package" className="w-12" />
                                        </div>

                                        {/* Product Details */}
                                        <div>
                                            {newOrder?.productItems?.map((item, index) => (
                                                <div key={index}>
                                                    <p className="text-xs flex flex-col gap-1">{item?.productName}</p>
                                                </div>
                                            ))}
                                            <p className="text-sm font-medium mt-2">{newOrder?.name}</p>
                                            <div className="mt-2">
                                                <p className="text-sm">{newOrder?.deliveryInfo?.description}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm mb-2">Items: <strong>{newOrder?.productItems?.length}</strong></p>
                                            <p className="text-gray-500 text-sm">Method: <strong>{newOrder?.method}</strong></p>
                                            <p className="text-gray-500 text-sm">Payment: <span className="text-blue-500 font-semibold">{newOrder?.payment}</span></p>
                                            <p className="text-gray-500 text-sm">Date: <strong>{new Date(newOrder?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</strong></p>
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <p className="">$<span className="font-medium">{newOrder?.price}</span></p>
                                        </div>

                                        {/* Status Dropdown */}
                                        <div>
                                            <select
                                                defaultValue={newOrder?.status}
                                                disabled={newOrder?.status === "Delivered"}
                                                onChange={(e) => handleStatusChange(e.target.value, newOrder?._id)}
                                                className={`border px-3 py-2 rounded-md bg-white shadow-sm cursor-pointer focus:outline-none disabled:cursor-not-allowed`}>
                                                <option>Order Placed</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Packing">Packing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for delivery">Out for delivery</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
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

export default NewOrders;
