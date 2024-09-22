import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><Home /></PrivateRoute>,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <div>404: Page Not Found</div>,
    }
]);

export default router;