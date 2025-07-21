import { useState, useRef, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { Search } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const DashboardNav = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white h-[60px] shadow-sm">
      <div className="w-11/12 mx-auto h-full flex items-center justify-between">
        {/* Left Side (optional: logo or title) */}
        <h2 className="text-lg font-semibold text-customPurple hidden sm:block">
          Dashboard
        </h2>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-auto">
         
          {/* Profile */}
          <div className="flex items-center gap-2 relative" ref={profileRef}>
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-customPurple transition-all duration-200"
              referrerPolicy="no-referrer"
              onClick={() => setShowProfilePopup(!showProfilePopup)}
            />

            {/* Name & Role (Desktop) */}
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold text-gray-700">
                {user?.displayName}
              </p>
              <p className="text-xs text-customPurple capitalize">{role}</p>
            </div>

            {/* Mobile Popup */}
            {showProfilePopup && (
              <div className="md:hidden absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 min-w-[180px] border border-gray-100 animate-fadeIn">
                <div className="flex flex-col items-center">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-12 h-12 rounded-full mb-2"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-semibold text-gray-800">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-customPurple capitalize mb-1">
                    {role}
                  </p>
                  <hr className="w-full my-2 border-gray-200" />
                  <p className="text-sm text-gray-600 text-center">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;


