const ManageUsersModal = ({ activeModal, setActiveModal, handleUpdateUserRole }) => {
    if (!activeModal) return null;

    const handleRoleChange = (role) => {
        handleUpdateUserRole(activeModal, role);
        setActiveModal(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <h3 className="text-lg font-bold mb-4">Select Role for {activeModal.name}</h3>
                
                <button 
                    className="block w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded mb-2"
                    onClick={() => handleRoleChange("customer")}>
                    Customer
                </button>
                <button 
                    className="block w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded mb-2"
                    onClick={() => handleRoleChange("seller")}>
                    Seller
                </button>
               
                <button 
                    className="block w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded mb-4"
                    onClick={() => handleRoleChange("admin")}>
                    Admin
                </button>

                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => setActiveModal(null)}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ManageUsersModal;

