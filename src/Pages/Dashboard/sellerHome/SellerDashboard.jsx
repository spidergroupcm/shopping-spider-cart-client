import { FaBox, FaDollarSign, FaChartLine, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { FiPackage, FiTrendingUp } from 'react-icons/fi';
import { BsGraphUp } from 'react-icons/bs';
import { RiRefund2Line } from 'react-icons/ri';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import DashboardSpinner from '../../../components/loadingSpinner/DashboardSpinner';
import { Helmet } from 'react-helmet-async';


const SellerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // count data
  const { data: sellerCount = [], isLoading } = useQuery({
    queryKey: ['sellerCount', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-activity-count/${user?.email}`);
      return res.data;
    }
  });


 



  // recent order data
  const { data: newOrders = [] } = useQuery({
    queryKey: ['newOrders', user?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/new-orders/${user?.email}`)
      return data.data;
    }
  })

  // chart data
  const { data: sellerChartData = [] } = useQuery({
    queryKey: ['sellerChartData', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-chart-stats/${user?.email}`);
      return res.data;
    }
  });
  

  if (isLoading) return <DashboardSpinner/>;
  //console.log("chart data:", sellerChartData)

  return (
    <div className="w-11/12 mx-auto py-10">
      <Helmet>
                    <title>Dashboard | Shopping Spider</title>
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        
        <div className="bg-white p-6 rounded-md  flex justify-between items-center hover:translate-all hover:shadow-sm">
          <div>
            <p className="text-2xl font-semibold text-blue-600">{sellerCount?.totalProducts || 0 }</p>
            <h2 className="text-gray-600 font-medium mt-1">Total Products</h2>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <FaBox className="text-blue-600 w-6 h-6" />
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-6 rounded-md  flex justify-between items-center transition-all hover:shadow-sm">
          <div>
            <p className="text-2xl font-semibold text-orange-500">{sellerCount?.totalSales || 0}</p>
            <h2 className="text-gray-600 font-medium mt-1">Total Sales</h2>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <FiTrendingUp className="text-orange-500 w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-md  flex justify-between items-center hover:transition-all hover:shadow-sm">
          <div>
            <p className="text-2xl font-semibold text-purple-600">{sellerCount?.totalOrders || 0}</p>
            <h2 className="text-gray-600 font-medium mt-1">Total Orders</h2>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <FiPackage className="text-purple-600 w-6 h-6" />
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-6 rounded-md  flex justify-between items-center hover:transition-all hover:shadow-sm">
          <div>
            <p className="text-2xl font-semibold text-green-500">${sellerCount?.totalProfit || 0}</p>
            <h2 className="text-gray-600 font-medium mt-1">Net Profit</h2>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <FaDollarSign className="text-green-500 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-md ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 py-1 px-3 rounded-lg focus:outline-none focus:border-gray-400">
              <option>Last 7 Days</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sellerChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-md ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Orders Overview</h3>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 py-1 px-3 rounded-lg focus:outline-none focus:border-gray-400">
              <option>Last 7 Days</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sellerChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders and Stats */}
      <div>
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-md  lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button> */}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newOrders?.map((order,index) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order?.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order?.price}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'}`}>
                        {order?.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        </div>
    </div>
  );
};

export default SellerDashboard;


