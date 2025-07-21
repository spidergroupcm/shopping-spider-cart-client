import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <Helmet>
        <title>Profile | Shopping Spider</title>
      </Helmet>
      <div className="w-11/12 mx-auto max-w-4xl">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-customPurple">
          {/* Profile Title */}
          <h3 className="text-2xl font-bold text-customPurple mb-6 text-center">
            My Profile
          </h3>

          {/* Profile Card */}
          <div className="flex lg:flex-row flex-col items-center gap-6 border border-customPurple p-6 rounded-xl bg-gradient-to-r from-white via-purple-50 to-white">
            <img
              src={user?.photoURL}
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full border-4 border-customPurple shadow-md"
            />
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold text-customPurple">
                {user?.displayName}
              </h2>
              <p className="text-gray-500 mt-1">Welcome back!</p>
            </div>
            
          </div>

          {/* Personal Info Section */}
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-customPurple border-b pb-2 mb-4">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="p-4 border border-purple-200 rounded-lg bg-white hover:shadow">
                <span className="text-sm text-gray-500">Name</span>
                <h5 className="text-lg font-medium mt-1 text-customPurple">
                  {user?.displayName?.split(" ")[0]}
                </h5>
              </div>
              <div className="p-4 border border-purple-200 rounded-lg bg-white hover:shadow">
                <span className="text-sm text-gray-500">Email</span>
                <h5 className="text-lg font-medium mt-1 text-customPurple">
                  {user?.email}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;