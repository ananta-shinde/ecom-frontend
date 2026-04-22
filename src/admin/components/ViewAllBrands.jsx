import { Trash2, PencilIcon } from "lucide-react"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllBrands = () => {
    const [brandlist, setbrandlist] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/brand')
            .then(res => res.json())
            .then(res => {
                // Grabbing the 'brands' array from your AppResponse
                setbrandlist(res.brands || []); 
            })
            .catch(err => console.error("Error fetching brands:", err));
    }, []);

    const handleDelete = async (brand) => {
        if (!window.confirm(`Are you sure you want to delete the brand "${brand.name}"?`)) return;

        try {
            // Using the dedicated DELETE endpoint we created earlier
            const response = await fetch(`http://localhost:8080/api/v1/brand/${brand.id}`, {
                method: 'DELETE', 
            });

            const data = await response.json();

            if (response.ok && data.status === 200) {
                // Instantly remove it from the React state so it vanishes from the screen
                setbrandlist(prevList => prevList.filter(b => b.id !== brand.id));
                alert("Brand deleted successfully!");
            } else {
                alert(data.message || "Failed to delete brand.");
            }
        } catch (error) {
            console.error("Error deleting brand:", error);
            alert("Network error. Check backend.");
        }
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">Brand List</h3>

            <div className="border rounded shadow-sm p-3 bg-white overflow-auto" style={{ maxHeight: "75vh" }}>

                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted">
                    <div className="col-2">Logo</div>
                    <div className="col-7">Brand Name</div>
                    <div className="col-3 text-end">Actions</div>
                </div>

                {brandlist.map(b => (
                    <div className="row border-bottom py-2 align-items-center" key={b.id}>

                        {/* Display the Brand Logo */}
                        <div className="col-2">
                            {b.logoUrl && (
                                <img 
                                    src={b.logoUrl.startsWith('http') ? b.logoUrl : `http://localhost:8080/${b.logoUrl}`} 
                                    alt={b.name} 
                                    style={{ height: '40px', width: 'auto', borderRadius: '4px' }} 
                                />
                            )}
                        </div>

                        <div className="col-7">
                            <span className="text-dark fw-semibold">
                                {b.name}
                            </span>
                        </div>

                        <div className="col-3 d-flex justify-content-end gap-2">
                            <Link 
                                to={`/admin/dashboard/addnewbrand?cmd=update&id=${b.id}`}  
                                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center fw-semibold text-decoration-none"
                            >
                                Edit
                                <PencilIcon width={16} className="ps-1" />
                            </Link>

                            <button 
                                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center fw-semibold"   
                                onClick={() => handleDelete(b)}
                            >
                                Delete
                                <Trash2 width={16} className="ps-1" />
                            </button>
                        </div>

                    </div>
                ))}

                {brandlist.length === 0 && (
                    <div className="text-center text-muted mt-4">
                        No brands found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewAllBrands;