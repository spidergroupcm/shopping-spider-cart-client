import { useState } from "react";
import usePrice from "../../../../Hooks/usePrice";
import { useNavigate } from "react-router-dom";
import useCart from "../../../../Hooks/useCart";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Checkout = () => {
  const { user } = useAuth();
  const [total, shippingFee, subTotal] = usePrice();
  const [cart] = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    phone: "",
    country: "",
    city: "",
    state: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isEmptyField = Object.values(deliveryInfo).some(
      (value) => value.trim() === ""
    );

    if (isEmptyField) {
      toast.warn("Please fill in all delivery information fields.", {
        position: "top-center",
        autoClose: 2000
      });
      return;
    }

    if (cart.length === 0) {
      toast.warn("Your cart is empty.");
      return;
    }

    if (paymentMethod === "stripe") {
      localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
      navigate("/dashboard/stripePayment");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Delivery Information Form */}
        <div className="bg-white rounded-md p-3 md:p-6 lg:p-10">
          <h2 className="text-2xl font-medium uppercase relative">
            <span className="text-gray-500">DELIVERY</span> INFORMATION
            <hr className="absolute top-[14px] left-[285px] border-[1px] border-gray-600 w-[50px]" />
          </h2>

          <form className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || ""}
              placeholder="Name"
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              placeholder="Email address"
              className="input-field w-full"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="input-field"
                required
              />
              <input
                type="text"
                name="country"
                value={deliveryInfo.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={deliveryInfo.city}
                onChange={handleInputChange}
                placeholder="City"
                className="input-field"
                required
              />
              <input
                type="text"
                name="state"
                value={deliveryInfo.state}
                onChange={handleInputChange}
                placeholder="State"
                className="input-field"
                required
              />
            </div>
            <textarea
              name="description"
              value={deliveryInfo.description}
              onChange={handleInputChange}
              className="p-2 input-field"
              rows="3"
              placeholder="Enter address..."
              required
            ></textarea>
          </form>
        </div>

        {/* Cart Totals and Payment Method */}
        <div className="bg-white rounded-md p-3 md:p-6 lg:p-10">
          <h2 className="text-2xl font-medium uppercase relative">
            <span className="text-gray-500">CART</span> TOTALS
            <hr className="absolute top-[14px] left-[168px] border-[1px] border-gray-600 w-[50px]" />
          </h2>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-semibold">${subTotal.toFixed(2)}</p>
            </div>
            <hr className="mb-3" />
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p className="font-semibold">${shippingFee.toFixed(2)}</p>
            </div>
            <hr className="mb-3" />
            <div className="flex justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold">${total.toFixed(2)}</p>
            </div>
          </div>

          <h2 className="text-lg mt-14 font-medium uppercase relative">
            <span className="text-gray-500">PAYMENT</span> METHOD
            <hr className="absolute top-[13px] left-[172px] border-[1px] border-gray-600 w-[50px]" />
          </h2>

          <div className="mt-4 flex space-x-4">
            <label className="border px-3 py-2 rounded-md flex justify-center items-center gap-2">
              <input
                onClick={() => setPaymentMethod("stripe")}
                type="radio"
                name="payment"
              />
              <span className="text-purple-600 font-semibold">STRIPE</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handlePlaceOrder}
              className={`mt-8 w-fit text-sm bg-black text-white py-3 px-10 ${
                paymentMethod === "" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={paymentMethod === ""}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


