import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Registration/Login.jsx";
import Register from "./Components/Registration/Register.jsx";
import AfterSignIn from "./Protected/AfterSignIn.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import MyProfile from "./Dashboard/MyProfile/MyProfile.jsx";
import BeforeSignIn from "./Protected/BeforeSignIn.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/signin",
                element: (
                    <AfterSignIn>
                        <Login></Login>
                    </AfterSignIn>
                ),
            },
            {
                path: "/registration",
                element: (
                    <AfterSignIn>
                        <Register></Register>
                    </AfterSignIn>
                ),
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <BeforeSignIn>
                <Dashboard></Dashboard>
            </BeforeSignIn>
        ),
        children: [
            {
                path: "/dashboard/my-profile",
                element: <MyProfile></MyProfile>,
            },
        ],
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <>
                        <RouterProvider router={router} />
                        <ToastContainer />
                    </>
                </HelmetProvider>
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
);
