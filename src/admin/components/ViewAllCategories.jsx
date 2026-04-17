import { DeleteIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllCategories = () => {
    const [categorylist, setcategorylist] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(res => {
                setcategorylist(res);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">category List</h3>

            <div className="border rounded shadow-sm p-3 bg-white overflow-auto" style={{ maxHeight: "75vh" }}>

                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted">
                    <div className="col-9">category Name</div>
                    <div className="col-3 text-end">Actions</div>
                </div>

                {categorylist.map(c => (
                    <div className="row border-bottom py-2 align-items-center " key={c.id}>

                        <div className="col-9">
                            <Link className="text-decoration-none text-dark fw-semibold">
                                {c}
                            </Link>
                        </div>

                        <div className="col-3 d-flex justify-content-end gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                                <Link  className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                    Edit
                                    <PencilIcon width={20} className="ps-1" />
                                </Link>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                                <Link className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                Delete
                                    <DeleteIcon width={20} className="ps-1" />
                                </Link>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAllCategories;