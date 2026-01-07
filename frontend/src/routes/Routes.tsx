import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import App from "../App"; // Layout component

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const About = lazy(() => import("../pages/About"));
const Pricing = lazy(() => import("../pages/Pricing"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const DHome = lazy(() => import("../pages/dashboard/DHome"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const CreateURL = lazy(() => import("../pages/dashboard/CreateURL"));
const Analytics = lazy(() => import("../pages/dashboard/Analytics"));


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "about", element: <About /> },
            { path: "pricing", element: <Pricing /> },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    { index: true, element: <DHome /> },
                    { path: "profile", element: <Profile /> },
                    { path: "create", element: <CreateURL /> },
                    { path: "analytics", element: <Analytics /> },
                ],
            },
        ],
    },
]);

export default router;
