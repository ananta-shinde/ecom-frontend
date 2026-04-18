import { DeleteIcon, PencilIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ViewAllProducts = () => {
    const brandList = [
    {
        id: 1,
        name: "Apple",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
    },
    {
        id: 2,
        name: "Samsung",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
    },
    {
        id: 3,
        name: "Sony",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
    },
    {
        id: 4,
        name: "Asus",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg"
    },
    {
        id: 5,
        name: "Nike",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
    },
    {
        id: 6,
        name: "Adidas",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
    },
    {
        id: 7,
        name: "HP",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg"
    },
    {
        id: 8,
        name: "Dell",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg"
    },
    {
        id: 9,
        name: "L'Oreal",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/L%27Or%C3%A9al_logo.svg"
    },
    {
        id: 10,
        name: "Rolex",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Rolex_logo.svg"
    }
];
    return ( 
        <>
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">Brand List</h3>

            <div className="border rounded shadow-sm p-3 bg-white overflow-auto" style={{ maxHeight: "75vh" }}>

                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted">
                    <div className="col-9">Brand Name</div>
                    <div className="col-3 text-end">Actions</div>
                </div>

                    {brandList.map(b=>(
                    <div className="row border-bottom py-2 align-items-center" >
                        <div className="col-1 d-flex justify-content-center ">
                            <Link className="text-decoration-none fs-4 text-dark fw-semibold">
                               {b.id+"."}
                            </Link>
                        </div>
                        <div className="col-1">
                            <Link  className="text-decoration-none text-dark fw-semibold">
                            <img src={b.logoUrl} width={40} height={40} alt="" />
                            </Link>
                        </div>
                        <div className="col-7 d-flex justify-content-center ">
                            <Link className="text-decoration-none fs-4 text-dark fw-semibold">
                               {b.name}
                            </Link>
                        </div>

                        <div className="col-3  d-flex justify-content-end gap-2">
                            <button className="btn btn-sm btn-outline-primary">

                                <Link  className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center text-end">
                                    Edit
                                <PencilIcon width={20} className="ps-1"/>
                                </Link>
                            </button>
                            <button className="btn btn-sm btn-outline-danger align-items-center">
                                <Link   className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                    Delete
                                <DeleteIcon width={20} className="ps-1"/>
                                </Link>
                            </button>
                        </div>

                    </div>
              ))}
            </div>
        </div>
        </>
     );
}
 
export default ViewAllProducts;