import { useState } from "react";
import AddNewProductForm from "./components/AddNewProductForm";

const AdminDashboard = () => {
    const [activeView, setActiveView] = useState("home");
    return (
        <>
            <header className="text-center fs-2 border-bottom border-black">
                Welcome to admin Dashboard
            </header>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-2 border-end border-dark bg-light" style={{ height: "100vh" }}>
                        <div className="dropdown mt-2 p-2 ">
                            <button className="btn btn-dark dropdown-toggle w-100 " type="button" data-bs-toggle="dropdown" aria-expanded="flase">
                            Products
                            </button>
                            <ul class="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => setActiveView("addProduct")}>Add new Products</button></li>
                                <li><button className="dropdown-item" onClick={() => setActiveView("viewProducts")}>View all products</button></li>
                            </ul>
                        </div>
                        <div class="dropdown mt-2 p-2">
                            <button className="btn btn-dark dropdown-toggle w-100 " type="button" data-bs-toggle="dropdown" aria-expanded="flase">
                                Categories
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="AddNewCategories">Add new Categories</a></li>
                                <li><a className="dropdown-item" href="ViewCategories">View All Categories</a></li>
                            </ul>
                        </div>
                        <div className="dropdown mt-2 p-2 ">
                            <button className="btn btn-dark dropdown-toggle w-100 " type="button" data-bs-toggle="dropdown" aria-expanded="flase">
                                Brands
                            </button>
                            <ul class="dropdown-menu">
                                <li><a className="dropdown-item" href="AddNewBrands">Add new Brand</a></li>
                                <li><a className="dropdown-item" href="ViewAllBrands">View all Brands</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-10"style={{height:"100vh"}}>
                       {activeView === "home" && (
                            <h2 className="mt-4 text-center text-muted">Select an option from the menu</h2>
                        )}
                        
                        {activeView === "addProduct" && (
                            <AddNewProductForm />
                        )}

                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;