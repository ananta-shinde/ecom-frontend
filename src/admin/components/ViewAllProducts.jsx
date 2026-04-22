import { Trash2, PencilIcon } from "lucide-react"; // Note: lucide-react usually uses 'Trash2' or 'Trash' instead of DeleteIcon
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllProducts = () => {
    const [productlist, setproductlist] = useState([]);

    // 1. Fetch from your Spring Boot Database
    const fetchProducts = () => {
        fetch('http://localhost:8080/api/v1/product')
            .then(res => res.json())
            .then(data => {
                // Handle different possible response structures from Spring Boot safely
                const productsArray = Array.isArray(data) ? data : data.content || data.products || [];
                setproductlist(productsArray);
            })
            .catch(err => console.error("Error fetching products:", err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 2. Add an actual Delete Function
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            // Adjust this URL to match your Spring Boot delete mapping (e.g., @DeleteMapping("/api/v1/product/{id}"))
            const response = await fetch(`http://localhost:8080/api/v1/product/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Product deleted successfully!");
                // Refresh the list so the deleted item disappears
                fetchProducts(); 
            } else {
                alert("Failed to delete the product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Network error occurred.");
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">Product List</h3>

            <div className="border rounded shadow-sm p-3 bg-white overflow-auto" style={{ maxHeight: "75vh" }}>

                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted">
                    <div className="col-9">Product Name</div>
                    <div className="col-3 text-end">Actions</div>
                </div>

                {productlist.map(p => (
                    <div className="row border-bottom py-2 align-items-center" key={p.id}>
                        <div className="col-1">
                            {/* 3. Pass query parameters to your unified form route */}
                            <Link to={`/admin/dashboard/addnewproduct?cmd=update&id=${p.id}`} className="text-decoration-none text-dark fw-semibold">
                                {/* Use thumbnailImage from your Spring backend */}
                                <img src={p.thumbnailImage || p.thumbnail} width={50} alt="Product Thumbnail" />
                            </Link>
                        </div>
                        <div className="col-8">
                            <Link to={`/admin/dashboard/addnewproduct?cmd=update&id=${p.id}`} className="text-decoration-none text-dark fw-semibold">
                                {/* Use name instead of title */}
                                {p.name} 
                            </Link>
                        </div>

                        <div className="col-3 d-flex justify-content-end gap-2">
                            <Link to={`/admin/dashboard/addnewproduct?cmd=update&id=${p.id}`} className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center text-decoration-none">
                                Edit
                                <PencilIcon width={16} className="ps-1" />
                            </Link>

                            {/* 4. Changed from a Link to a proper button with an onClick handler */}
                            <button 
                                onClick={() => handleDelete(p.id)} 
                                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                            >
                                Delete
                                <Trash2 width={16} className="ps-1" />
                            </button>
                        </div>
                    </div>
                ))}
                
                {productlist.length === 0 && (
                    <div className="text-center text-muted mt-4">
                        No products found in the database.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewAllProducts;