import { DeleteIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllCategories = () => {
    const [categorylist, setcategorylist] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/category')
            .then(res => res.json())
            .then(res => {
                setcategorylist(res.categories);
            });
    }, []);

    const handleDelete = async(category)=>{
       console.log(category)
       const response = await fetch('http://localhost:8080/api/v1/category/update', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            // Note: Do NOT set 'Content-Type' header when sending FormData. 
            // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
            body: JSON.stringify({...category,deleted:true}),
          });
    }

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
                                {c.name}
                            </Link>
                        </div>

                        <div className="col-3 d-flex justify-content-end gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                                <Link to={"/admin/dashboard/addnewcategory?cmd=update&id="+c.id}  className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                    Edit
                                    <PencilIcon width={20} className="ps-1" />
                                </Link>
                            </button>
                            <button className="btn btn-sm btn-outline-danger"   onClick={()=>{handleDelete(c)}}>
                               
                                Delete
                                    <DeleteIcon width={20} className="ps-1" />
                               
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAllCategories;