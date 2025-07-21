import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import DashboardSpinner from "../../../components/loadingSpinner/DashboardSpinner";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // customer payments data load
    const { data: PaymentHistory = [], isLoading } = useQuery({
        queryKey: ["PaymentHistory", user?.email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/order-list/${user?.email}`);
            return data.data;
        },
    });

    if (isLoading) return <DashboardSpinner/>;


    return (
        <div className="w-11/12 mx-auto py-10">
            <Helmet>
                    <title>Payment History | Shopping Spider</title>
            </Helmet>
            <div className=" bg-white min-h-[calc(100vh-140px)] rounded-md py-10 px-2 lg:p-10">
                <h2 className="text-2xl font-medium uppercase relative mb-8">
                    <span className="text-gray-500">PAYMENT</span> HISTORY
                    <hr className="absolute top-[15px] left-[227px] border-[1px] border-gray-600 w-[50px] " />
                </h2>
                {PaymentHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500 text-lg">You have no payment yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr className="text-sm">
                                    <th className="p-3">No.</th>
                                    <th className="p-3 ">Payment Price</th>
                                    <th className="p-3">Payment Date</th>
                                    <th className="p-3">Payment Method</th>
                                    <th className="p-3">Transaction</th>
                                    <th className="p-3">Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PaymentHistory.map((payment, index) => (
                                    <tr key={payment._id} className="border-t border-gray-300 text-center" >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">${payment?.price.toFixed(2)}</td>
                                        <td className="p-3">{new Date(payment?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</td>
                                        <td className="p-3">{payment?.method}</td>
                                        <td className="p-3 text-sm">{payment?.transactionId}</td>
                                        <td className="p-3">{payment?.payment}</td>
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

export default PaymentHistory;
