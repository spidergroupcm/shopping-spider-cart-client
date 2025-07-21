import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import DashboardNav from "../Pages/Shared/DashboardNav";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen bg-white md:flex">
            {/* Sidebar - Hidden on mobile */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <DashboardNav />
                <div className="bg-gray-100 min-h-[calc(100vh-60px)]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;