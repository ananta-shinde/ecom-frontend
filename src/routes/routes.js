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
import AddBrand from "../admin/components/addBrand";
import AddCategory from "../admin/components/addCategory";
import ViewAllBrands from "../admin/components/ViewAllBrands";
import ViewAllOffers from "../admin/components/ViewAllOffers";
import ViewAllCustomers from "../admin/components/ViewAllCustomers";
import AddProduct from "../admin/components/AddProduct";
import Cart from "../customer/Cart";
import ProductForm from "../admin/components/AddProduct";
import ViewAllSellers from "../admin/components/ViewAllSellers";
import Checkout from "../customer/Checkout";
import AddOffer from "../admin/components/addOffer";
import CategoryNav from "../customer/CategoryNav";
import HeroSection from "../customer/HeroSection";
import FeaturedProducts from "../customer/FeaturedProducts";
import AdminFeaturedProducts from "../admin/components/AdminFeaturedProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseTemplate />,
    children: [
      {
        path: "",
        element: <Home />,

      },
      {
        path: "products",
        element: <ProductListing />
      },
      {
        path: "products/category/:categoryName",
        element: <ProductListing />
      },
      {
        path: "details",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />
      }
    ]
  },

  {
    path: "/admin/dashboard/",
    element: <AdminTemplate />,
    children: [
      {
        path: "addnewproduct",
        element: <AddProduct />
      },

      {
        path: "addnewbrand",
        element: <AddBrand />
      },
      {
        path: "addnewcategory",
        element: <AddCategory />
      },
      {
        path: "/admin/dashboard/addnewoffer",
        element: <AddOffer />
      },
      {
        path: "viewallproducts",
        element: <ViewAllProducts />
      },
      {
        path: "viewallcategories",
        element: <ViewAllCategories />
      },
      {
        path: "brands",
        element: <ViewAllBrands />
      },
      {
        path: "viewalloffers",
        element: <ViewAllOffers />
      },
      {
        path: "customers",
        element: <ViewAllCustomers />
      },
      {
        path: "/admin/dashboard/sellers",
        element: <ViewAllSellers />
      },
      {
        path: "editproduct/:id",
        element: <ProductForm />
      },
      {
        path: "featuredproducts",
        element: <AdminFeaturedProducts />
      },

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