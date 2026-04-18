import {Trash2Icon } from "lucide-react";

const CartProducts = ({ product }) => {
    return (
        <div className="card">
            <div className="row p-3 align-items-center">
                <div className="col-4">
                    <img className="img-fluid" style={{ height: "150px" }} src={product.thumbnail} alt="product img" />
                </div>
                <div className="col-6">
                    <h5>{product.title}</h5>

                    <p>₹ {product.price}</p>
                    <p>
                        <span className="text-muted">MRP : <span className="text-decoration-line-through">₹ {product.total}</span></span>
                        <span className="ms-3 text-success">{product.discountPercentage}% off</span>
                    </p>
                    <p className="fs-5 ">Total : ₹ {product.discountedTotal}</p>
                </div>
                <div className="col">
                    <div className="border rounded border-dark d-flex align-items-center justify-content-center">
                        <button className="btn border-end rounded-0">-</button>
                        <span className="mx-3">{product.quantity}</span>
                        <button className="btn border-start rounded-0">+</button>
                    </div>
                    <div>
                        <button className="btn btn-light border-dark mt-3 w-100">Remove {<Trash2Icon/>}</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CartProducts;