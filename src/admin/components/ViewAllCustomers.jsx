import { useEffect, useState } from "react"; // 1. Don't forget to import useState!

const ViewAllCustomers = () => {
    // 2. Wrap your array inside useState. 
    // Now 'customers' holds the data, and 'setCustomers' updates it.
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/user/customers")
            .then(res => res.json())
            .then(res => {
                setCustomers(res.customers);
            })
    }, []);

    const HandleToggle = async(customer) => {

        const response = await fetch('http://localhost:8080/api/v1/user/update', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            // Note: Do NOT set 'Content-Type' header when sending FormData. 
            // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
            body: JSON.stringify({...customer,deleted:!customer.deleted }),
          });

        //   setOffers(prev => prev.map(o => o.id === offer.id ? {...o , deleted: !o.deleted}:o))
          setCustomers(prev => prev.map(c => c.id === customer.id ? {...c, deleted: !c.deleted}:c))
          if(response.ok){
            alert("Activation Status Changes Successfully");
          } else{
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
                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted align-items-center">
                    <div className="col-4">Customer</div>
                    <div className="col-4">Contact Info</div>
                    <div className="col-2 text-center">Orders / Spent</div>
                    <div className="col-2 text-center">Status</div>
                </div>

                {customers?.map(customer => (
                    <div className="row border-bottom py-3 align-items-center" key={customer.id}>

                        <div className="col-4">
                            <div className="fw-bold text-dark">{customer.name}</div>
                            <small className="text-muted">Joined: {formatDate(customer.createdAt)}</small>
                        </div>

                        <div className="col-4">
                            <div>{customer.email}</div>
                            <small className="text-muted">{customer.contact}</small>
                        </div>

                        <div className="col-2 text-center">
                            <div className="fw-semibold">{customer.totalOrders}</div>
                            <small className="text-success">Rs.{(customer.totalSpent || 0).toFixed(2)}</small>
                        </div>

                        <div className="col-2 text-center d-flex justify-content-center align-items-center">

                            <span className={`badge ${customer.deleted ? 'bg-secondary' : 'bg-success'}`}>
                                {customer.deleted ? 'Inactive' : 'Active'}
                            </span>

                            <div className="form-check form-switch ms-2 mb-0">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`switch-${customer.id}`}
                                    onChange={() => HandleToggle(customer)}
                                    checked={customer.deleted} 
                                />
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}

export default ViewAllCustomers;