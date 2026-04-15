import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";
import AddNewProductForm from "../admin/components/AddNewProductForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
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