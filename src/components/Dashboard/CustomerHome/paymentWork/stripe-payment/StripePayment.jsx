import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_KEY)
const StripePayment = () => {
    return (
        <div className="w-11/12 md:9/12 lg:w-8/12 mx-auto py-10">
            <div className="bg-white py-10 px-2 md:p-6 lg:p-10 rounded-md">
                <h2 className="text-2xl font-medium uppercase relative mb-8">
                    <span className="text-gray-500">STRIPE</span> PAYMENT
                    <hr className="absolute top-[15px] left-[205px] border-[1px] border-gray-600 w-[50px] " />
                </h2>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default StripePayment;