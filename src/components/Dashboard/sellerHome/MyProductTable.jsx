import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const MyProductTable = ({ product, index,handleProductDelete }) => {
    const { photo, productName, productCategory, status, price, _id } = product || {};

    
    return (
        <tr className="bg-white border-b text-gray-600">
            <td className="px-6 py-3">{index}</td>
            <td className="px-6 py-3 flex justify-center items-center"> <img src={photo} alt="" className="w-[50px] h-[50px] rounded-md " /> </td>
            <td className="px-6 py-3">{productName}</td>
            <td className="px-6 py-3">{productCategory}</td>
            <td className="px-6 py-3 ">${price}</td>
          
            <td className="px-2 md:px-3 lg:px-6 py-3">
                <Link to={`/dashboard/myProductUpdate/${_id}`}>
                    <button
                        onClick={()=>handleUpdateProduct(_id)}
                        className="bg-blue-500 text-white px-2 py-2 rounded-md mr-2 hover:bg-blue-600">
                        <FaRegEdit />
                    </button>
                </Link>

                <button
                    onClick={() => handleProductDelete(_id)}
                    className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600">
                    <MdDelete />
                </button>
            </td>
        </tr>
    );
};

export default MyProductTable;