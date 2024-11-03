import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import { useEffect, useState } from "react";

// const stripePromise = await loadStripe(`${import.meta.env.VITE_STRIPE}`);

const Payment = () => {
    const Class = useLoaderData();
    // const [stripePromise, setStripePromise] = useState();

    // useEffect(() => {
    //     const initializeStripe = async () => {
    //         const stripe = await loadStripe("pk_test_51POH2H003ufns5WKunaCxB3JkPvMj3RX1zCpx65S4ffl2kB8SfagTjfv0DeQZSOrp0KMTP2412EYr9yWURpBAkUs008hCWpJqm");
    //         setStripePromise(stripe);
    //     };

    //     initializeStripe();
    // }, []);

    async function loadStripeWithAwait() {
        return await loadStripe(`${import.meta.env.VITE_STRIPE}`);
    }

    const stripePromise = loadStripeWithAwait();

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Payment | AP Classroom</title>
            </Helmet>
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
