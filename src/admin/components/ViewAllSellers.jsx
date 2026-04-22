import { useEffect, useState } from "react"; // 1. Don't forget to import useState!

const ViewAllSellers = () => {
    // 2. Wrap your array inside useState. 
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/user/sellers")
            .then(res => res.json())
            .then(res => {
                setSellers(res.sellers);
            })
    }, []);

    const HandleToggle = async (seller) => {
        const response = await fetch('http://localhost:8080/api/v1/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...seller, deleted: !seller.deleted }),
        });

        setSellers(prev => prev.map(s => s.id === seller.id ? {...s , deleted: !s.deleted}:s))
        if (response.ok) {
            alert("Activation Status Changes Successfully");
        } else {
            alert("Something went wrong!")
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-GB");
    };

    return (
        <>
            <div className="container mt-5 ">
                <h3 className="my-4 text-muted">Sellers : </h3>
                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted align-items-center">
                    <div className="col-4">Sellers</div>
                    <div className="col-4">Contact Info</div>
                    {/* <div className="col-2 text-center">Orders / Spent</div> */}
                    <div className="col-4 text-center">Status</div>
                </div>

                {sellers?.map(seller => (
                    <div className="row border-bottom py-3 align-items-center" key={seller.id}>

                        <div className="col-4">
                            <div className="fw-bold text-dark">{seller.name}</div>
                            <small className="text-muted">Joined: {formatDate(seller.createdAt)}</small>
                        </div>

                        <div className="col-4">
                            <div>{seller.email}</div>
                            <small className="text-muted">{seller.contact}</small>
                        </div>
{/* 
                        <div className="col-2 text-center">
                            <div className="fw-semibold">{seller.totalOrders}</div>
                            <small className="text-success">Rs.{(seller.totalSpent || 0).toFixed(2)}</small>
                        </div> */}

                        <div className="col-4 text-center d-flex justify-content-center align-items-center">

                            <span className={`badge ${seller.deleted ? 'bg-secondary' : 'bg-success'}`}>
                                {seller.deleted ? 'Inactive' : 'Active'}
                            </span>

                            <div className="form-check form-switch ms-2 mb-0">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`switch-${seller.id}`}
                                    onChange={() => HandleToggle(seller)}
                                    checked={seller.deleted}
                                />
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}

export default ViewAllSellers;