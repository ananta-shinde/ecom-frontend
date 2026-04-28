import { Trash2Icon } from "lucide-react";

const CartProducts = ({ product, refreshCart }) => {

    const userId = 2;

    const increaseQty = () => {
        // fetch(`http://localhost:8080/api/v1/user/cart/add?userId=${userId}&productId=${product.id}`, {
        //     method: "POST"
        // })
        // .then(() => refreshCart());
    };

    const decreaseQty = () => {
        // fetch(`http://localhost:8080/api/v1/cart/remove?userId=${userId}&productId=${product.id}`, {
        //     method: "DELETE"
        // })
        // .then(() => refreshCart());
    };

    const removeAll = () => {
        fetch(`http://localhost:8080/api/v1/user/cart/remove?userId=${userId}&productId=${product.id}`, {
            method: "DELETE"
        })
            .then(() => refreshCart());
    };

    return (
        <div className="card mb-3">
            <div className="row p-3 align-items-center">

                <div className="col-4">
                    <img
                        className="img-fluid p-3"
                        style={{ height: "150px" }}
                        src={product.thumbnailImage}
                        alt="product"
                    />
                </div>

                <div className="col-6">
                    <h5>{product.name}</h5>

                    <p>
                        <span className="text-muted">
                            MRP : <span className="text-decoration-line-through">₹ {product.price}</span>
                        </span>
                        <span className="ms-3 text-success">5% off</span>
                    </p>

                    <p className="fs-5">
                        Total : ₹ {(product.price * product.quantity * 0.95).toFixed(2)}
                    </p>
                </div>

                <div className="col">
                    <div className="border rounded d-flex align-items-center justify-content-center">
                        <button onClick={decreaseQty} className="btn border-end">-</button>
                        <span className="mx-3">{product.quantity}</span>
                        <button onClick={increaseQty} className="btn border-start">+</button>
                    </div>

                    <button onClick={removeAll} className="btn btn-light border-dark mt-3 w-100">
                        Remove <Trash2Icon />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CartProducts;