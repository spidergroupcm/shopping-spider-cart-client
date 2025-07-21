import React, { useState } from "react";
import {  FaCalendarAlt } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardSpinner from "../../../loadingSpinner/DashboardSpinner";

const RechartsAndCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState('monthly');
  

  const axiosSecure = useAxiosSecure();

  // user growth data
  const { data: userGrowth = [], isLoading} = useQuery({
    queryKey: ['userGrowth'],
    queryFn: async () => {
      const data = await axiosSecure.get(`/user-growth`)
      return data.data;
    }
  })

  // financial growth data
  const { data: financialGrowth = []} = useQuery({
    queryKey: ['financialGrowth'],
    queryFn: async () => {
      const data = await axiosSecure.get(`/financial-growth`)
      return data.data;
    }
  })
  if(isLoading) return <DashboardSpinner/>
  console.log("financial data:", financialGrowth)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Financial Overview</h2>
          <div className="hidden sm:flex space-x-2">
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange('yearly')}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={financialGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Area type="monotone" dataKey="totalSoldProducts" stroke="#4F46E5" fillOpacity={1} fill="url(#colorEarnings)" />
              <Area type="monotone" dataKey="totalRevenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <FaCalendarAlt className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
        </div>
        <Calendar
          onChange={setDate}
          value={date}
          className="w-full border-0"
          tileClassName={({ date, view }) =>
            view === 'month' && date.getDay() === 0 ? 'text-red-500' : null
          }
        />
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-2">Upcoming Events</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Monthly Report Review</p>
                <p className="text-xs text-gray-500">Today, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 p-1 rounded-full mt-1 mr-2">
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Team Meeting</p>
                <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">User Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="customers" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sellers" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RechartsAndCalendar;
