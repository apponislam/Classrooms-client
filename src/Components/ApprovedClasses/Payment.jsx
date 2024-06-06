import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = await loadStripe(`${import.meta.env.VITE_STRIPE}`);

const Payment = () => {
    const Class = useLoaderData();

    return (
        <div className="container mx-auto">
            <div className="h-screen flex items-center justify-center mx-4 md:mx-0">
                <div className="w-full md:w-1/2 border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <h1 className="text-xl text-center mb-5">Payment: ${Class?.price}</h1>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
