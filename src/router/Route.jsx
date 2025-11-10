import { createBrowserRouter } from "react-router";
import Home from "../page/Home";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../page/LogIn";
import Register from "../page/Register";
import ForgetPassword from "../page/ForgetPassword";
import AddTransaction from "../page/AddTransaction";
import MyTransactions from "../page/MyTransactions";
import Reports from "../page/Reports";
import PrivateRoute from "./PrivaterRoute";
import UpdateTransaction from "../components/UpdateTransaction";
import TransactionDetails from "../page/TransactionDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/AddTransaction",
    element: <PrivateRoute><AddTransaction></AddTransaction></PrivateRoute>,
  },
  {
    path: "/MyTransactions",
    element: <PrivateRoute><MyTransactions></MyTransactions></PrivateRoute>,
  },
  // {
  //   path: "/MyTransactions/:id",
  //   element: <PrivateRoute><UpdateTransaction></UpdateTransaction></PrivateRoute>,
  // },
  {
    path: "/transactions/:id",
    element: <PrivateRoute><TransactionDetails></TransactionDetails></PrivateRoute>,
  },

  {
    path: "/Reports",
    element: <PrivateRoute><Reports></Reports></PrivateRoute>,
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth",
        element: <LogIn></LogIn>
      }
      ,
      {
        path: "/auth/register",
        element: <Register></Register>
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword></ForgetPassword>
      }
    ]
  }
]);

export default Router;