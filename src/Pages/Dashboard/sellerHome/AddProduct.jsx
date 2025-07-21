import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { photoUpload } from "../../../utilities/utils";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

export default function AddProduct() {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleAddProduct = async(e) =>{
        e.preventDefault();

        const form = e.target;
        const productName = form.productName.value;
        const manCategory = form.manCategory.value;
        const productCategory = form.productCategory.value;
        const price = parseInt(form.price.value);
        const brandName = form.brandName.value;
        const description = form.description.value;
        const quantity = parseInt(form.quantity.value);
        const image = form.image.files[0];
        const photo = await photoUpload(image);
        const date = new Date();
        const ownerInfo = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL
        }

        const addProductData = {
            productName,
            manCategory,
            productCategory,
            description,
            quantity,
            photo,
            date,
            ownerInfo,
            price,
            brandName,
            status:"Pending"
        }

        // product data save database
        try {
            const res = await axiosSecure.post("/product", addProductData)
            if (res.data.insertedId) {
                toast.success("Product successfully added",{
                    position: "top-center",
                    autoClose: 3000,
                })
                form.reset();
            }

        } catch (err) {
            toast.error(err.message,{
                position: "top-center",
                autoClose: 3000,
            })
        }

    }
    return (
        <div className=" bg-gray-50 min-h-[calc(100vh-60px)]  flex justify-center items-center">
            <Helmet>
                    <title>Add Product | Shopping Spider</title>
            </Helmet>
            <div className="max-w-2xl mx-auto shadow-sm bg-white p-5 rounded-md ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-lg">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 gap-6 sm:gap-4">
                    {/* Image Upload */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input type="file" name="image" accept='image/*' className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:grid-cols-1">
                        {/* Product Name */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" name="productName" placeholder="Enter product name" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2 focus:ring-gray-100" />
                        </div>

                        {/* Main Category */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Main Category</label>
                            <select name="manCategory" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2">
                                <option>Men</option>
                                <option>Women</option>
                                <option>Kids</option>
                            </select>
                        </div>

                        {/* Product Category */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Product Category</label>
                            <input type="text" name="productCategory" placeholder="e.g. T-shirt, Jeans" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                        {/* price */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="price" name="price" placeholder="Enter price" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                         {/* brand name */}
                         <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                            <input type="text" name="brandName" placeholder="Enter brand name" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>

                        {/* Quantity */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" placeholder="Enter quantity" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg sm:p-2" />
                        </div>
                       
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" placeholder="Enter product description" className="mt-2 w-full p-3 border border-gray-300 focus:outline-gray-300 rounded-lg h-32 sm:p-2 sm:h-24"></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" className="hover:bg-[#23272f] hover:text-white font-medium py-3 px-5 rounded-lg  transition duration-300 border border-gray-300 hover:border-[#23272f]">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


