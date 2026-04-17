import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";
import Home from "../customer/Home";
import ProductListing from "../customer/ProductListing";
import BaseTemplate from "../templates/BaseTemplate";
import AddNewProductForm from "../admin/components/AddNewProductForm";
import SignUp from "../customer/SignUp";
import SignIn from "../customer/SignIn";
import ForgotPassword from "../customer/ForgotPassword";
import ProductDetail from "../customer/ProductDetail";

const router = createBrowserRouter([
  {
    path:"/",
    element:<BaseTemplate />,
    children:[
      {
        path: "",
        element: <Home />
      },
      {
        path: "products",
        element: <ProductListing />
      },
      {
        path: "details",
        element: <ProductDetail />
      }
    ]
  },

  {
    path:"/admin/dashboard",
    element:<AdminDashboard/>

  },
   {
    path:"/admin/AddNewProducts",
    element:<AddNewProductForm/>

   },
   
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  }
]);

export default router;