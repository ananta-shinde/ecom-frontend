import { DeleteIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllProducts = () => {
    const [productlist, setproductlist] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setproductlist(data.products);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">Product List</h3>

            <div className="border rounded shadow-sm p-3 bg-white">

                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted">
                    <div className="col-9">Product Name</div>
                    <div className="col-3 text-end">Actions</div>
                </div>

                {productlist.map(p => (
                    <div className="row border-bottom py-2 align-items-center" key={p.id}>
                        <div className="col-1">
                            <Link to={`/admin/dashboard/editproduct/${p.id}`} className="text-decoration-none text-dark fw-semibold">
                            <img src={p.thumbnail} width={50} alt="" />
                            </Link>
                        </div>
                        <div className="col-8">
                            <Link to={`/admin/dashboard/editproduct/${p.id}`} className="text-decoration-none text-dark fw-semibold">
                                {p.title}
                            </Link>
                        </div>

                        <div className="col-2 d-flex justify-content-end gap-2">
                            <button className="btn btn-sm btn-outline-primary">

                                <Link to={`/admin/dashboard/editproduct/${p.id}`} className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                    Edit
                                <PencilIcon width={20} className="ps-1"/>
                                </Link>
                            </button>
                            <button className="btn btn-sm btn-outline-danger align-items-center">
                                <Link  to={`/admin/dashboard/editproduct/${p.id}`} className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                    Delete
                                <DeleteIcon width={20} className="ps-1"/>
                                </Link>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAllProducts;