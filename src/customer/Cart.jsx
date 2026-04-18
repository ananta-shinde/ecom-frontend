import { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import { TicketPercent } from "lucide-react";

const Cart = () => {

    const [cart, setcart] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/carts/user/5')
            .then(res => res.json())
            .then(res => (
                setcart(res.carts)
            ));
    }, [])
    return (
        <div className="container">
            <div className="row">
                <h3 className="py-4">Cart :</h3>
                <div className="col col-md-8"  style={{maxHeight : "80vh", overflowY:"auto"}}>
                    {cart[0]?.products?.map((product) => <CartProducts product={product} />)}

                </div>
                <div className="col fs-5 p-4">

                    <div className="d-flex justify-content-between my-3">
                        <span>MRP :</span>
                        <span className="text-muted text-decoration-line-through">
                            ₹ {cart[0]?.total}
                        </span>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                        <span>Discounts :</span>
                        <span className="text-success">
                            - ₹ {((cart[0]?.total) - (cart[0]?.discountedTotal)).toFixed(2)}
                        </span>
                    </div>

                    <div className="d-flex justify-content-between fw-bold my-3">
                        <span>Total Amount :</span>
                        <span>₹ {cart[0]?.discountedTotal}</span>
                    </div>

                    <p className="text-success text-center bg-success-subtle p-2 rounded">{<TicketPercent/>} You'll save ₹ {((cart[0]?.total) - (cart[0]?.discountedTotal)).toFixed(2)} on this order!</p>

                    <div className="d-flex align-items-center bg-light shadow p-3">
                        <p className="w-50 ">₹ {cart[0]?.discountedTotal}</p>
                        <button className="btn btn-warning w-50 p-2">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;