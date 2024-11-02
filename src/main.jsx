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
import DashboardHome from "./Dashboard/DashboardHome.jsx";
import AdminRoute from "./Protected/AdminRoute.jsx";
import TeacherRoute from "./Protected/TeacherRoute.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import "animate.css";
import TeacherAssignmentDetails from "./Dashboard/TeacherClasses/TeacherAssignmentDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <NotFound></NotFound>,
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
                loader: () => fetch("http://localhost:5000/ApprovedClassCount"),
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
                path: "/dashboard",
                element: <DashboardHome></DashboardHome>,
            },
            {
                path: "/dashboard/my-profile",
                element: <MyProfile></MyProfile>,
            },
            {
                path: "/dashboard/users",
                element: (
                    <AdminRoute>
                        <Users></Users>
                    </AdminRoute>
                ),
                loader: () => fetch("http://localhost:5000/UsersCount"),
            },
            {
                path: "/dashboard/add-class",
                element: (
                    <TeacherRoute>
                        <AddClass></AddClass>
                    </TeacherRoute>
                ),
            },
            {
                path: "/dashboard/all-classes",
                element: (
                    <AdminRoute>
                        <AllClasses></AllClasses>
                    </AdminRoute>
                ),
                loader: () => fetch("http://localhost:5000/ClassesCount"),
            },
            {
                path: "/dashboard/class/:id",
                element: (
                    <AdminRoute>
                        <SeeProgress></SeeProgress>
                    </AdminRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/dashboard/requests",
                element: (
                    <AdminRoute>
                        <TeacherRequest></TeacherRequest>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/my-class",
                element: <TeacherClasses></TeacherClasses>,
            },
            {
                path: "/dashboard/my-class/update/:id",
                element: (
                    <TeacherRoute>
                        <TeacherClassUpdate></TeacherClassUpdate>
                    </TeacherRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/dashboard/my-class/:id",
                element: (
                    <TeacherRoute>
                        <TeacherClassDetails></TeacherClassDetails>
                    </TeacherRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/Classes/${params.id}`),
            },
            {
                path: "/dashboard/my-class/assignment/:id",
                element: (
                    <TeacherRoute>
                        <TeacherAssignmentDetails></TeacherAssignmentDetails>
                    </TeacherRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:5000/AssignmentsSubmit/AssgnmentId/${params.id}`),
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
