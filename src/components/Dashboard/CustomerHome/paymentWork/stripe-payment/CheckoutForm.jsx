import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import usePrice from "../../../../../Hooks/usePrice";
import useAuth from "../../../../../Hooks/useAuth";
import useCart from "../../../../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [cart] = useCart();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [total] = usePrice();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post("/payment-intent", { price: total })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const storedDeliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));

        if (!storedDeliveryInfo) {
            Swal.fire("Error", "Please fill in the delivery information!", "error");
            return;
        }

        // if stripe or elements no access then return 
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
             console.log("payment error", error)
            setError(error.message)
        } else {
            // console.log("payment method", paymentMethod)
            setError("")
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous',
                }
            }
        })
        if (confirmError) {
            // console.log("confirm error", confirmError)
        } else {
            // console.log("payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {

                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    price: total,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    productIds: cart.map(item => item.productId),
                    status: 'Pending',
                    deliveryInfo: storedDeliveryInfo,
                    method: "stripe",
                    payment: "success"
                }

                const res = await axiosSecure.post("/payments", payment);
                if (res.data.paymentResult.insertedId) {
                    Swal.fire({
                        title: "Order Successfully Done",
                        icon: "success",
                        draggable: true
                    });
                    navigate("/dashboard/myOrder")
                    localStorage.removeItem("deliveryInfo");
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret} className="bg-purple-700 rounded-md px-2 py-1 mt-4 text-white">
                Pay
            </button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

export default CheckoutForm;