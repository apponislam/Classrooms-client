import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MyEnrollClasses = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            try {
                const response = await axiosPublic.post("/get-payment-info", { sessionId });
                console.log("Payment information:", response.data);
            } catch (error) {
                console.error("Error fetching payment information:", error);
            }
        };

        if (sessionId) {
            fetchPaymentInfo();
        }
    }, [sessionId, axiosPublic]);

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Thank you for your purchase!</p>
        </div>
    );
};

export default MyEnrollClasses;
