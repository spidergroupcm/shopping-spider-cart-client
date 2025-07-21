import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import ManageUsersModal from "../../../Modal/ManageUsersModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [activeModal, setActiveModal] = useState(null);
    
    // get all users data
    const { data: allUser = [], refetch, isLoading, error } = useQuery({
        queryKey: ['allUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users/${user?.email}`)
            return res.data;
        }
    });

    // update user role
    const handleUpdateUserRole = async(selectedUser,newRole) =>{
        try {
            await axiosSecure.patch(`/user-role/${selectedUser?.email}`, { role: newRole });
            toast.success("Role Successfully Update");
            refetch();
        } catch (err) {
            toast.error(error.message);
        }
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-11/12 mx-auto py-10 min-h-screen flex flex-col items-center">
            <Helmet>
                    <title>Manage User | Shopping Spider</title>
            </Helmet>
            <div className="overflow-x-auto bg-white rounded-lg p-4 w-full">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b text-gray-700">
                            <th className="p-3 text-center">ID</th>
                            <th className="p-3 text-center">User</th>
                            <th className="p-3 text-center">Email</th>
                            <th className="p-3 text-center">Role</th>
                            <th className="p-3 text-center">Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 text-center">{user?.name}</td>
                                <td className="p-3 text-center">{user?.email}</td>
                                <td className="p-3 text-center">
                                    {user?.role === "customer" && <p className={user?.role === "customer" ? "bg-green-400 w-fit mx-auto  px-6 py-1 rounded-full text-white" : ""}>{user?.role}</p>}

                                    {user?.role === "seller" && <p className={user?.role === "seller" ? "bg-blue-400 w-fit mx-auto  px-6 py-1 rounded-full text-white" : ""}>{user?.role}</p>}

                                   

                                    {user?.role === "admin" && <p className={user?.role === "admin" ? "bg-red-400 w-fit mx-auto  px-6 py-1 rounded-full text-white" : ""}>{user?.role}</p>}

                                    
                                </td>
                                <td className="p-3 text-center">
                                    <button 
                                        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                                        onClick={() => setActiveModal(user)}>
                                        Change Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Component */}
            {activeModal && (
                <ManageUsersModal 
                    activeModal={activeModal} 
                    setActiveModal={setActiveModal} 
                    handleUpdateUserRole={handleUpdateUserRole}
                />
            )}
        </div>
    );
};

export default ManageUsers;


