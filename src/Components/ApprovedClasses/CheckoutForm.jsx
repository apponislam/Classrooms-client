import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";

const CheckoutForm = () => {
    const Class = useLoaderData();
    const stripe = useStripe();
    const [errorMessage, setErrorMessage] = useState();
    const [clientSecret, setClientSecret] = useState();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    // console.log(Class);
    // console.log(user);

    useEffect(() => {
        axiosPublic
            .post("/create-payment-intent", {
                price: Class.price,
            })
            .then((res) => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosPublic, Class]);

    const paymentBtn = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            console.error(error);
            setErrorMessage(error?.message);
        }
        if (paymentMethod) {
            console.log(paymentMethod);
            setErrorMessage("");
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },
        });

        if (confirmError) {
            console.log(confirmError);
        } else {
            console.error(paymentIntent);
        }
    };

    return (
        <form onSubmit={paymentBtn}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <p className="text-red-600">{errorMessage}</p>
            <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mt-5" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;
