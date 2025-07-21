import { FaBox, FaUserPlus, FaUsers } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DashboardSpinner from '../../../loadingSpinner/DashboardSpinner';

const UserCount = () => {
  
  const axiosSecure = useAxiosSecure();

  // seller products data load
  const { data: adminStats = [], isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await axiosSecure.get(`admin-stats`)
      return data.data;
    }
  })
  if(isLoading) return <DashboardSpinner/>
  //console.log("admin-stats:", adminStats)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {/* Products Sold */}
      <div className="bg-white p-6 rounded-md transition-all hover:shadow-sm  flex justify-between items-center ">
        <div>
          <p className="text-2xl font-semibold text-blue-600">{adminStats?.totalProducts || 0}</p>
          <h2 className="text-gray-600 font-medium mt-1">Total Products</h2>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl">
          <FaBox className="text-blue-600 w-6 h-6" />
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-white p-6 rounded-md transition-all hover:shadow-sm flex justify-between items-center ">
        <div>
          <p className="text-2xl font-semibold text-green-500">${adminStats?.totalRevenue || 0}</p>
          <h2 className="text-gray-600 font-medium mt-1">Revenue</h2>
        </div>
        <div className="bg-green-50 p-4 rounded-xl">
          <FiTrendingUp className="text-green-500 w-6 h-6" />
        </div>
      </div>

      {/* Total Customer */}
      <div className="bg-white p-6 rounded-md transition-all hover:shadow-sm flex justify-between items-center ">
        <div>
          <p className="text-2xl font-semibold text-purple-600">{adminStats?.totalCustomers || 0}</p>
          <h2 className="text-gray-600 font-medium mt-1">Total Customers</h2>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <FaUserPlus className="text-purple-600 w-6 h-6" />
        </div>
      </div>

      {/* Total Seller */}
      <div className="bg-white p-6 rounded-md transition-all hover:shadow-sm flex justify-between items-center ">
        <div>
          <p className="text-2xl font-semibold text-amber-500">{adminStats?.totalSellers || 0}</p>
          <h2 className="text-gray-600 font-medium mt-1">Total Sellers</h2>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl">
          <FaUsers className="text-amber-500 w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default UserCount;