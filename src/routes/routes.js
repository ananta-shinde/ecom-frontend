import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path:"/admin/dashboard",
    element:<AdminDashboard/>
  }
]);

export default router;