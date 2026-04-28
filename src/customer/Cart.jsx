import { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import { TicketPercent } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {

    const [cart, setcart] = useState(null);

    const fetchCart = () => {
        fetch('http://localhost:8080/api/v1/user/2')
            .then(res => res.json())
            .then(res => {
                setcart(res.user.cart);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const products = cart?.products || [];
    const total = cart?.total || 0;

    const groupedProducts = Object.values(
        products.reduce((acc, product) => {
            if (!acc[product.id]) {
                acc[product.id] = { ...product, quantity: 1 };
            } else {
                acc[product.id].quantity += 1;
            }
            return acc;
        }, {})
    );

    return (
        <div className="container">
            <div className="row">
                <h3 className="py-4">Cart :</h3>

                <div className="col col-md-8" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    {groupedProducts.length > 0 ? (
                        groupedProducts.map((product) => (
                            <CartProducts 
                                key={product.id} 
                                product={product} 
                                refreshCart={fetchCart}
                            />
                        ))
                    ) : (
                        <p className="text-muted">Your cart is empty</p>
                    )}
                </div>

                <div className="col fs-5 p-4">

                    <div className="d-flex justify-content-between my-3">
                        <span>MRP :</span>
                        <span className="text-muted text-decoration-line-through">
                            ₹ {total}
                        </span>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                        <span>Discounts :</span>
                        <span className="text-success">5 %</span>
                    </div>

                    <div className="d-flex justify-content-between fw-bold my-3">
                        <span>Total Amount :</span>
                        <span>₹ {(total - (total * 5 / 100)).toFixed(2)}</span>
                    </div>

                    <p className="text-success text-center bg-success-subtle p-2 rounded">
                        <TicketPercent /> No discount applied
                    </p>

                    <div className="d-flex align-items-center bg-light shadow p-3">
                        <p className="w-50 m-0">₹ {(total - (total * 5 / 100)).toFixed(2)}</p>
                        <button className="btn btn-warning w-50 p-2">
                            <Link to={"/checkout"} className="text-decoration-none text-dark">
                                Place Order
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;