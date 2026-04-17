import { Link } from "react-router-dom";

const AdminSideNav = () => {
    return (
        <>

            <div class="accordion border-end" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Products
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <Link to="/admin/dashboard/addnewproduct" className="accordion-body w-100 border-0 my-1 d-block text-decoration-none text-dark">
                            <strong>Add New Product</strong>
                        </Link>
                       <Link to="/admin/dashboard/viewallproducts" className="accordion-body w-100 border-0 my-1 d-block text-decoration-none text-dark">
                            <strong>View All Products</strong>
                        </Link>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Categories
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                       <Link to="/admin/dashboard/addnewcategory" className="accordion-body w-100 border-0 my-1 d-block text-decoration-none text-dark">
                            <strong>Add New Categorie</strong>
                        </Link>
                        <Link to="/admin/dashboard/viewallcategories" className="accordion-body w-100 border-0 my-1 d-block text-decoration-none text-dark">
                            <strong>View All Categories</strong>
                        </Link>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Brands
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <Link to="/admin/dashboard/addnewbrand" className="accordion-body w-100 border-0 my-1 d-block text-decoration-none text-dark">
                            <strong>Add New Product</strong>
                        </Link>
                        <Link to="/admin/dashboard/viewallbrands" className="accordion-body w-100 border-0 my-1 d-block text-decoration-none text-dark">
                            <strong>View All Brands</strong>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AdminSideNav;