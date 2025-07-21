import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBox, FaChartPie, FaComments, FaHistory, FaPlus, FaTicketAlt, FaUsers } from "react-icons/fa";
import { IoIosArrowForward, IoIosLogOut, IoMdHome } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import { Clock, CheckCircle, XCircle, ClipboardList, CreditCard, Package, PenLine } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
const Sidebar = () => {
    const [isActive, setActive] = useState(false);
    const [role, isLoading] = useRole();
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    const handleUserLogOut = () => {
        signOutUser()
        navigate("/login")
    }
    const handleToggle = () => setActive(!isActive);

    return (
        <div className="">

            <div
                className={`z-50 fixed flex flex-col justify-between overflow-x-hidden bg-white w-64 border-r  space-y-6 px-2 py-4 inset-y-0 left-0 transform ${isActive && "-translate-x-full"
                    } md:translate-x-0 transition duration-200 ease-in-out`} >
                <div>
                    <div className="px-4 flex items-center gap-1">
                       
                      <Link to="/" className="flex items-center gap-2">
                        <p className="text-[20px] font-semibold uppercase">
                            Shopping<span className="text-secondary"> Spider</span>
                        </p>
                        </Link>

                    </div>

                    <hr className="mt-[13px] w-full" />

                    {/* Nav Items */}
                    <div>
                        <nav className="mt-[39px] space-y-4 text-[16px] font-medium flex flex-col">


                            {/* customer */}
                            {
                                role === "customer" && <>
                                    <NavLink to="/dashboard/cart" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive ? "bg-gray-100" : "hover:bg-gray-100"
                                        }`
                                    }>
                                        <div className="flex items-center gap-2">
                                            <IoCartOutline className="w-[18px] h-[18px]" />
                                            My Cart
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" />
                                    </NavLink>

                                    <NavLink to="/dashboard/myOrder" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <ClipboardList className="w-[18px] h-[18px]" />
                                            My Order
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                    <NavLink to="/dashboard/paymentHistory" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <CreditCard className="w-[18px] h-[18px]" />
                                            Payment History
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                   

                                    <NavLink to="/dashboard/myOrderHistory" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <FaHistory className="w-[18px] h-[18px]" />
                                            Order History                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                </>
                            }

                            {/* seller */}
                            {
                                role === "seller" && <>
                                    <NavLink to="/dashboard/sellerDashboard" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <BiSolidDashboard className="w-[18px] h-[18px]" />
                                            Dashboard
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                    <NavLink to="/dashboard/addProduct" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <FaPlus className="w-[18px] h-[18px]" />
                                            Add Product
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                    <NavLink to="/dashboard/myProduct" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <FaBox className="w-[18px] h-[18px]" />
                                            My Product
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                    <NavLink to="/dashboard/newOrders" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <Package className="w-[18px] h-[18px]" />
                                            New Orders
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                    <NavLink to="/dashboard/orderHistory" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <FaHistory className="w-[18px] h-[18px]" />
                                            Order History
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                  

                                </>
                            }


                            {/* admin */}
                            {
                                role === "admin" && <>
                                    <NavLink to="/dashboard/adminDashboard" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <BiSolidDashboard className="w-[18px] h-[18px]" />
                                            Dashboard
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                    <NavLink to="/dashboard/manageUsers" className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-100"
                                        }`
                                    }><div className="flex items-center gap-2">
                                            <FaUsers className="w-[18px] h-[18px]" />
                                            Manage Users
                                        </div>
                                        <IoIosArrowForward className="text-gray-400" /></NavLink>

                                </>
                            }


                            <div className="space-y-4">
                                <NavLink to="/dashboard/profile" className={({ isActive }) =>
                                    `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                        ? "bg-gray-100"
                                        : "hover:bg-gray-100"
                                    }`
                                }><div className="flex items-center gap-2">
                                        <CgProfile className="w-[18px] h-[18px]" />
                                        Profile
                                    </div>
                                    <IoIosArrowForward className="text-gray-400" /></NavLink>

                                <NavLink to="/" className={({ isActive }) =>
                                    `flex items-center justify-between gap-2 px-4 py-2 rounded-lg ${isActive
                                        ? "bg-gray-100"
                                        : "hover:bg-gray-100"
                                    }`
                                }><div className="flex items-center gap-2">
                                        <IoMdHome className="w-[18px] h-[18px]" />
                                        Home
                                    </div>
                                    <IoIosArrowForward className="text-gray-400" /></NavLink>

                                <button onClick={handleUserLogOut} className="
                                    flex items-center justify-between gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 w-full"><div className="flex items-center gap-2">
                                        <IoIosLogOut className="w-[18px] h-[18px]" />
                                        LogOut
                                    </div>
                                    <IoIosArrowForward className="text-gray-400" /></button>

                            </div>
                        </nav>
                    </div>
                </div>
               
            </div>
            {/* Mobile Toggle Button - Bottom Right */}
            <button
                onClick={handleToggle}
                className="md:hidden fixed bottom-6 right-6 z-50 bg-[#6D4FC2] text-white p-[10px] rounded-full"
            >
                {isActive ? (
                    <AiOutlineBars className="h-5 w-5" />
                ) : (
                    <AiOutlineClose className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default Sidebar;