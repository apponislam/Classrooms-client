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
import Users from "./Dashboard/Users/Users.jsx";
import AddClass from "./Dashboard/AddClass/AddClass.jsx";
import AllClasses from "./Dashboard/AllClasses/AllClasses.jsx";
import TechOn from "./Components/TechOn/TechOn.jsx";
import TeacherRequest from "./Dashboard/TeacherRequest/TeacherRequest.jsx";
import TeacherClasses from "./Dashboard/TeacherClasses/TeacherClasses.jsx";
import TeacherClassUpdate from "./Dashboard/TeacherClasses/TeacherClassUpdate.jsx";
import ApprovedClasses from "./Components/ApprovedClasses/ApprovedClasses.jsx";
import TeacherClassDetails from "./Dashboard/TeacherClasses/TeacherClassDetails.jsx";
import SeeProgress from "./Dashboard/AllClasses/SeeProgress.jsx";
import ApprovedClassDetails from "./Components/ApprovedClasses/ApprovedClassDetails.jsx";
import MyEnrollClasses from "./Dashboard/MyEnrollClasses/MyEnrollClasses.jsx";
import Payment from "./Components/ApprovedClasses/Payment.jsx";
import MyEnrollClassDetails from "./Dashboard/MyEnrollClasses/MyEnrollClassDetails.jsx";

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
            {
                path: "/technow",
                element: (
                    <BeforeSignIn>
                        <TechOn></TechOn>
                    </BeforeSignIn>
                ),
            },
            {
                path: "/AllClass",
                element: <ApprovedClasses></ApprovedClasses>,
            },
            {
                path: "/class/:id",
                element: (
                    <BeforeSignIn>
                        <ApprovedClassDetails></ApprovedClassDetails>
                    </BeforeSignIn>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/payment/:id",
                element: (
                    <BeforeSignIn>
                        <Payment></Payment>
                    </BeforeSignIn>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
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
            {
                path: "/dashboard/users",
                element: <Users></Users>,
            },
            {
                path: "/dashboard/add-class",
                element: <AddClass></AddClass>,
            },
            {
                path: "/dashboard/all-classes",
                element: <AllClasses></AllClasses>,
            },
            {
                path: "/dashboard/class/:id",
                element: <SeeProgress></SeeProgress>,
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/dashboard/requests",
                element: <TeacherRequest></TeacherRequest>,
            },
            {
                path: "/dashboard/my-class",
                element: <TeacherClasses></TeacherClasses>,
            },
            {
                path: "/dashboard/my-class/update/:id",
                element: <TeacherClassUpdate></TeacherClassUpdate>,
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/dashboard/my-class/:id",
                element: <TeacherClassDetails></TeacherClassDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/dashboard/myenroll-class",
                element: <MyEnrollClasses></MyEnrollClasses>,
            },
            {
                path: "/dashboard/myenroll-class/:id",
                element: <MyEnrollClassDetails></MyEnrollClassDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
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
