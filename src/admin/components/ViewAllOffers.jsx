import { PencilIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllOffers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/offer")
            .then(res => res.json())
            .then(res => {
                setOffers(res.offers)
            })
    }, []);

    const handleDelete = async(offer)=>{
       console.log(offer)
       const response = await fetch('http://localhost:8080/api/v1/offer/update', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            // Note: Do NOT set 'Content-Type' header when sending FormData. 
            // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
            body: JSON.stringify({...offer,deleted:!offer.deleted }),
          });
        
          setOffers(prev => prev.map(o => o.id === offer.id ? {...o , deleted: !o.deleted}:o))
          if(response.ok){
            alert("Activation Changes Successfully");
          } else{
            alert("Something went wrong!")
          }

        
    }

    return (
        <div className="container mt-4 mb-5">
            <h3 className="mb-4 text-secondary">Manage Offers</h3>

            <div className="border rounded shadow-sm bg-white p-3">

                <div className="row border-bottom pb-2 px-4 mb-2 fw-bold text-muted align-items-center">
                    <div className="col-3">Offer Title</div>
                    <div className="col-2 text-center">Description</div>
                    <div className="col-2 text-center">Discount</div>
                    <div className="col-2 text-center">Status</div>
                    <div className="col-3 text-center">Actions</div>
                </div>

                {offers?.map(offer => (
                    <div className="row border-bottom py-3  align-items-center" key={offer.id}>

                        <div className="col-3">
                            <div className="fw-bold">{offer.title}</div>
                        </div>

                        <div className="col-2 text-center text-success fw-semibold">
                            {offer.description}
                        </div>

                        <div className="col-2 text-center text-success fw-semibold">
                            {offer.discount}% OFF
                        </div>

                        <div className="col-2 text-center">
                            {offer.deleted ? (
                                <span className="badge bg-secondary">InActive</span>
                            ) : (
                                <span className="badge bg-success">Active</span>
                            )}
                        </div>

                        <div className="col-3 text-start">
                            <button className="btn btn-outline-dark bg-light w-20"><Link to={"/admin/dashboard/addnewoffer?cmd=update&id=" + offer.id} className="text-decoration-none text-dark fw-semibold d-flex align-items-center justify-content-center">
                                Edit
                                <PencilIcon width={20} className="ps-1" />
                            </Link></button>
                            <button className="ms-2 btn btn-outline-danger bg-danger-subtle w-50" onClick={()=>{handleDelete(offer)}}>
                                {offer.deleted ? 'Activate' : 'Deactivate'}
                                <Trash2Icon width={20} className="ps-1" />
                            </button>
                            
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAllOffers;