import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";
import Home from "../customer/Home";
import ProductListing from "../customer/ProductListing";
import BaseTemplate from "../templates/BaseTemplate";
import AddNewProductForm from "../admin/components/AddNewProductForm";

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
    
  }
]);

export default router;