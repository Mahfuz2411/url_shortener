import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ErrorRoute from "./ErrorRoute";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const VerifyEmail = lazy(() => import("../auth/VerifyEmail"));
const About = lazy(() => import("../pages/About"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Redirect = lazy(() => import("../pages/Redirect"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const PaymentFail = lazy(() => import("../pages/PaymentFail"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const DHome = lazy(() => import("../pages/dashboard/DHome"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const CreateURL = lazy(() => import("../pages/dashboard/CreateURL"));
const Analytics = lazy(() => import("../pages/dashboard/Analytics"));
const List = lazy(() => import("../pages/dashboard/List"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },

      {
        path: "verify-email",
        element: <VerifyEmail />,
      },

      { path: "about", element: <About /> },
      { path: "pricing", element: <Pricing /> },
      { path: "r/:shortCode", element: <Redirect /> },
      { path: "payment/success", element: <PaymentSuccess /> },
      { path: "payment/fail", element: <PaymentFail /> },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DHome /> },
          { path: "profile", element: <Profile /> },
          { path: "create", element: <CreateURL /> },
          { path: "analytics", element: <Analytics /> },
          { path: "list", element: <List /> },
        ],
      },
    ],
  },
]);

export default router;
