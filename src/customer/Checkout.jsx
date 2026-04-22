import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "cod"
    });

    useEffect(() => {
        fetch('https://dummyjson.com/carts/user/5')
            .then(res => res.json())
            .then(res => setCart(res.carts));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleOrder = () => {
        console.log("Order Placed:", {
            user: formData,
            cart: cart[0]
        });

        alert("Order Placed Successfully ✅");

        navigate("/");
    };

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-7">
                    <h4 className="mb-3">Delivery Address</h4>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Mobile Number"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <h5 className="mt-4">Payment Method</h5>

                    <div className="form-check">
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            className="form-check-input"
                            defaultChecked
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Cash on Delivery</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="radio"
                            name="payment"
                            value="online"
                            className="form-check-input"
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Online Payment</label>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card p-4 shadow-sm">
                        <h5 className="mb-3">Order Summary</h5>

                        {cart[0]?.products?.map((item) => (
                            <div className="d-flex justify-content-between mb-2" key={item.id}>
                                <span>{item.title} (x{item.quantity})</span>
                                <span>₹ {item.discountedTotal}</span>
                            </div>
                        ))}

                        <hr />

                        <div className="d-flex justify-content-between">
                            <span>MRP</span>
                            <span className="text-decoration-line-through">
                                ₹ {cart[0]?.total}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between text-success">
                            <span>Discount</span>
                            <span>
                                - ₹ {(cart[0]?.total - cart[0]?.discountedTotal).toFixed(2)}
                            </span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>₹ {cart[0]?.discountedTotal}</span>
                        </div>

                        <button
                            className="btn btn-success w-100 mt-4"
                            onClick={handleOrder}
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;