import { useState } from "react"; // 1. Don't forget to import useState!

const ViewAllCustomers = () => {
    // 2. Wrap your array inside useState. 
    // Now 'customers' holds the data, and 'setCustomers' updates it.
    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            totalOrders: 14,
            totalSpent: 1250.50,
            status: "Active",
            joinDate: "2024-03-15"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "+1 (555) 987-6543",
            totalOrders: 3,
            totalSpent: 340.00,
            status: "Active",
            joinDate: "2025-11-02"
        },
        {
            id: 3,
            name: "Robert Johnson",
            email: "robert.j@example.com",
            phone: "+1 (555) 456-7890",
            totalOrders: 0,
            totalSpent: 0.00,
            status: "Inactive",
            joinDate: "2026-01-20"
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "+1 (555) 222-3333",
            totalOrders: 27,
            totalSpent: 4100.75,
            status: "Active",
            joinDate: "2023-08-10"
        },
        {
            id: 5,
            name: "Michael Wilson",
            email: "m.wilson@example.com",
            phone: "+1 (555) 777-8888",
            totalOrders: 1,
            totalSpent: 45.00,
            status: "Banned",
            joinDate: "2025-05-19"
        }
    ]);

    const HandleToggle = (id) => {
        const updatedCustomers = customers.map(customer => {
            if (customer.id === id) {
                if (customer.status === 'Active') {
                    return { ...customer, status: 'Inactive' };
                } else {
                    return { ...customer, status: 'Active' };
                }
            }
            return customer; 
        });

        setCustomers(updatedCustomers);
    };

    return (
        <>
            <div className="container mt-5 ">
                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted align-items-center">
                    <div className="col-3">Customer</div>
                    <div className="col-3">Contact Info</div>
                    <div className="col-2 text-center">Orders / Spent</div>
                    <div className="col-2 text-center">Status</div>
                    <div className="col-2 text-end">Actions</div>
                </div>

                {customers.map(customer => (
                    <div className="row border-bottom py-3 align-items-center" key={customer.id}>

                        <div className="col-3">
                            <div className="fw-bold text-dark">{customer.name}</div>
                            <small className="text-muted">Joined: {customer.joinDate}</small>
                        </div>
                        
                        <div className="col-3">
                            <div>{customer.email}</div>
                            <small className="text-muted">{customer.phone}</small>
                        </div>

                        <div className="col-2 text-center">
                            <div className="fw-semibold">{customer.totalOrders}</div>
                            <small className="text-success">Rs.{customer.totalSpent.toFixed(2)}</small>
                        </div>

                        <div className="col-2 text-center d-flex justify-content-center align-items-center">
                            <span className={`badge ${
                                customer.status === 'Active' ? 'bg-success' :
                                customer.status === 'Inactive' ? 'bg-secondary' : 'bg-danger'
                            }`}>
                                {customer.status}
                            </span>
                            
                            <div className="form-check form-switch ms-2 mb-0">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    role="switch" 
                                    id={`switch-${customer.id}`} 
                                    onChange={() => HandleToggle(customer.id)}
                                    checked={customer.status === 'Active'}
                                    disabled={customer.status === 'Banned'}
                                    style={{ cursor: customer.status === 'Banned' ? 'not-allowed' : 'pointer' }}
                                />
                            </div>
                        </div>

                        <div className="col-2 text-end">
                            <button className="btn btn-sm btn-outline-primary">View</button>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}

export default ViewAllCustomers;