import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const MyProductUpdate = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: product = {} } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const data = await axiosSecure.get(`/products/${id}`)
            return data.data;
        }
    })

    const { productName, productCategory, price, _id, manCategory, brandName, quantity, description } = product || {};

    // product update
    const handleUpdateForm = async (e) => {
        e.preventDefault();

        const form = e.target;
        const productName = form.productName.value;
        const manCategory = form.manCategory.value;
        const productCategory = form.productCategory.value;
        const price = parseInt(form.price.value);
        const brandName = form.brandName.value;
        const description = form.description.value;
        const quantity = parseInt(form.quantity.value);

        const UpdateProductData = {
            productName,
            manCategory,
            productCategory,
            description,
            quantity,
            price,
            brandName,
        }

        // data update backend
        try {
            const res = await axiosSecure.patch(`/product-update/${id}`, UpdateProductData)
            if (res.data.modifiedCount) {
                toast.success("Product Update Successfully");
                navigate("/dashboard/myProduct")
            }
        }
        catch (err) {
            // console.log(err)
            toast.error(err.message)
        }
    }


    return (
        <div className=" bg-gray-50 min-h-[calc(100vh-60px)]  flex justify-center items-center">
            <div className="max-w-2xl mx-auto shadow-sm bg-white p-5 rounded-md ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-lg">Update Product</h2>
                <form onSubmit={handleUpdateForm} className="grid grid-cols-1 gap-6 sm:gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:grid-cols-1">
                        {/* Product Name */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" name="productName" defaultValue={productName} placeholder="Enter product name" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2 focus:ring-gray-100" />
                        </div>

                        {/* Main Category */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Main Category</label>
                            <select name="manCategory" defaultValue={manCategory} className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2">
                                <option>Men</option>
                                <option>Women</option>
                                <option>Kids</option>
                            </select>
                        </div>

                        {/* Product Category */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Product Category</label>
                            <input type="text" name="productCategory" defaultValue={productCategory} placeholder="e.g. T-shirt, Jeans" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                        {/* price */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="price" name="price" defaultValue={price} placeholder="Enter price" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                        {/* brand name */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                            <input type="text" name="brandName" defaultValue={brandName} placeholder="Enter brand name" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                        {/* Quantity */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" defaultValue={quantity} placeholder="Enter quantity" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" defaultValue={description} placeholder="Enter product description" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg h-32 sm:p-2 sm:h-24"></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" className="hover:bg-[#23272f] hover:text-white font-medium py-3 px-5 rounded-lg  transition duration-300 border border-gray-300 hover:border-[#23272f]">
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProductUpdate;