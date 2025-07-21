import React from "react";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Please Login</h2>
                <p className="text-gray-700 mb-4">You need to log in before adding items to the cart or wishlist.</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black py-2 px-4 rounded-sm"
                    >
                        Close
                    </button>
                    <Link to="/login"><button className="bg-blue-500 text-white py-2 px-4 rounded-sm">
                        Login
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
