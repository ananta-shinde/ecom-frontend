import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";
import Home from "../customer/Home";
import ProductListing from "../customer/ProductListing";
import BaseTemplate from "../templates/BaseTemplate";
import AddNewProductForm from "../admin/components/AddNewProductForm";
import SignUp from "../customer/SignUp";
import SignIn from "../customer/SignIn";
import ForgotPassword from "../customer/ForgotPassword";
import AdminTemplate from "../templates/AdminTemplate";
import AdminNavbar from "../admin/components/AdminNavbar";
import AdminSideNav from "../admin/components/AdminSideNav";
import ViewAllProducts from "../admin/components/ViewAllProducts";
import ViewAllCategories from "../admin/components/ViewAllCategories";
import EditProductForm from "../admin/components/EditProductForm";
import ProductDetail from "../customer/ProductDetail";
import AddBrand from "../admin/components/AddBrand";
import AddCategory from "../admin/components/AddCategory";
import ViewAllBrands from "../admin/components/ViewAllBrands";
import ViewAllOffers from "../admin/components/ViewAllOffers";
import ViewAllCustomers from "../admin/components/ViewAllCustomers";
import AddProduct from "../admin/components/AddProduct";
import Cart from "../customer/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseTemplate />,
    children: [
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
      },
      {
        path: "cart",
        element: <Cart />
      }
    ]
  },

  {
    path: "/admin/dashboard",
    element: <AdminTemplate />,
    children: [
      {
        path: "/admin/dashboard/addnewproduct",
        element: <AddProduct />
      },

      {
        path: "/admin/dashboard/addnewbrand",
        element: <AddBrand />
      },
      {
        path: "/admin/dashboard/addnewcategory",
        element: <AddCategory />
      },
      {
        path: "/admin/dashboard/viewallproducts",
        element: <ViewAllProducts />
      },
      {
        path: "/admin/dashboard/viewallcategories",
        element: <ViewAllCategories />
      },
      {
        path: "/admin/dashboard/viewallbrands",
        element: <ViewAllBrands />
      },
      {
        path: "/admin/dashboard/viewalloffers",
        element: <ViewAllOffers />
      },
      {
        path: "/admin/dashboard/customers",
        element: <ViewAllCustomers />
      },
      {
        path: "/admin/dashboard/editproduct/:id",
        element: <EditProductForm />
      }
    ]
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