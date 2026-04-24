import { DeleteIcon, PencilIcon } from "lucide-react"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllCategories = () => {
    const [categorylist, setcategorylist] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/category')
            .then(res => res.json())
            .then(res => {
                setcategorylist(res.categories || []);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleDelete = async (category) => {
        if (!window.confirm(`Are you sure you want to delete "${category.name}"?`)) return;

        try {
            const response = await fetch('http://localhost:8080/api/v1/category/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...category, deleted: true }),
            });

            if (response.ok) {
                alert("Category deleted successfully!");
                
                setcategorylist(prevList => prevList.filter(c => c.id !== category.id));
            } else {
                alert("Failed to delete category.");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Network error. Check backend.");
        }
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">Category List</h3>

            <div className="border rounded shadow-sm p-3 bg-white overflow-auto" style={{ maxHeight: "75vh" }}>

                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted">
                    <div className="col-9">Category Name</div>
                    <div className="col-3 text-end">Actions</div>
                </div>

                {categorylist.map(c => (
                    <div className="row border-bottom py-2 align-items-center " key={c.id}>

                        <div className="col-9">
                            <span className="text-dark fw-semibold">
                                {c.name}
                            </span>
                        </div>

                        <div className="col-3 d-flex justify-content-end gap-2">
                            <Link 
                                to={"/admin/dashboard/addnewcategory?cmd=update&id=" + c.id}  
                                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center text-decoration-none fw-semibold"
                            >
                                Edit
                                <PencilIcon width={20} className="ps-1" />
                            </Link>
                            
                            <button className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center fw-semibold" onClick={() => { handleDelete(c) }}>
                                Delete
                                <DeleteIcon width={20} className="ps-1" />
                            </button>
                        </div>

                    </div>
                ))}

                {categorylist.length === 0 && (
                    <div className="text-center text-muted mt-4">
                        No categories found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewAllCategories;