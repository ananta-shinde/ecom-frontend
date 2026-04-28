import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductDetailSlider from "./ProductDetailSlider";
import { User, User2Icon, UserCircle2Icon } from "lucide-react";

const ProductDetail = () => {

    const [searchParams] = useSearchParams()
    const [product, setproduct] = useState({})
    const [activeTab, setActiveTab] = useState('reviews');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user: { id: 2 },
        rating: 0,
        comment: ""
    })

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/product/' + searchParams.get("productId"))
            .then(res => res.json())
            .then(res => (
                setproduct(res)

            ));
    }, [searchParams])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/v1/product/user/review/new/" + product.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {

                return fetch('http://localhost:8080/api/v1/product/' + product.id)
            })
            .then(res => res.json())
            .then(updatedProduct => {

                setproduct(updatedProduct);

                setFormData({
                    user: { id: 2 },
                    rating: 0,
                    comment: ""
                });

            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, try again")
            })

    }

    const userId = 2;
    const addToCart = () => {
        fetch(`http://localhost:8080/api/v1/user/cart/add?userId=${userId}&productId=${product.id}`, {
            method: "POST"
        })
        .then(() => {
            navigate("/cart"); 
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col col-md-5 p-5 justify-content-center align-content-center">

                    <div className="" >
                        <ProductDetailSlider product={product} />
                    </div>

                    <div className="row">
                        <div className="col">
                            <button className="btn btn-success shadow border w-100" onClick={addToCart}>ADD TO BAG</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-dark shadow border w-100"><Link to={"/checkout"} className="text-decoration-none text-white">BUY NOW</Link></button>
                        </div>
                    </div>
                </div>
                <div className="col col-md-7 mt-md-5" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                    <h2>{product.name}</h2>
                    <hr />
                    <p>{product.description}</p>

                    <p>{product.tags?.map((tag) => <span>#{tag} </span>)}</p>

                    <p className="fs-5">
                        <span className="text-muted text-decoration-line-through">₹ {product.price}</span>
                        <span className="ms-4 text-success">5% off</span>
                    </p>
                    <hr />
                    <p className="fs-4 fw-bold">₹ {(product.price - (product.price * 5 / 100)).toFixed(2)}</p>
                    <hr />
                    <p>
                        <span className="badge bg-success me-3">{product.rating} ★</span>
                        <span className=""><a href="#review" className="text-decoration-none text-dark">{product.reviews?.length} Ratings & Reviews</a></span>
                    </p>
                    {/* <p className="fw-bold">{product.shippingInformation}</p> */}
                    <hr />
                    {/* <p>It comes with {product.warrantyInformation}</p> */}
                    <p>It comes with <span className="fw-bold text-muted">1 Year Warranty</span></p>
                    <hr />

                    <div className="mt-4">
                        <ul className="nav nav-tabs mb-4" style={{ cursor: "pointer" }}>
                            <li className="nav-item">
                                <span
                                    className={`nav-link ${activeTab === 'reviews' ? 'active fw-bold' : 'text-muted'}`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    Ratings & Reviews
                                </span>
                            </li>
                            <li className="nav-item">
                                <span
                                    className={`nav-link ${activeTab === 'specs' ? 'active fw-bold' : 'text-muted'}`}
                                    onClick={() => setActiveTab('specs')}
                                >
                                    Specifications
                                </span>
                            </li>
                        </ul>

                        <div className="tab-content">

                            {activeTab === 'reviews' && (
                                <div className="review-section fade-in">
                                    <div className="d-flex align-items-center mb-3">
                                        <p className="fw-bold fs-4 m-0 text-muted">Ratings & Reviews :</p>
                                        <p className="badge bg-success mx-4 m-0">{product.rating} ★</p>
                                        <p className="m-0 text-muted">{product.reviews?.length} Ratings & Reviews</p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card p-4 mb-3 shadow-sm">
                                            <p className="fw-bold mb-2">
                                                <span className="fs-5" >Give Review : </span>
                                            </p>
                                            <div>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        style={{
                                                            fontSize: "24px",
                                                            cursor: "pointer",
                                                            color: star <= formData.rating ? "green" : "gray",
                                                        }}
                                                        onClick={() => {
                                                            setFormData({ ...formData, rating: star });
                                                        }}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <input type="text" className="form-control my-3" name="comment" placeholder="Enter review" value={formData.comment} onChange={handleChange} />
                                            <button type="submit" className="btn btn-dark w-100">Post</button>
                                        </div>
                                    </form>

                                    {product.reviews?.map((review, index) => (
                                        <div className="card p-4 mb-3 shadow-sm" key={index}>
                                            <p className="fw-bold mb-2">
                                                <span className="me-4 align-items-center"><span className="me-2"><UserCircle2Icon /></span> {review.user.name}</span>
                                                <span className="text-muted fw-normal fs-6">{new Date(review.createdAt).toLocaleDateString()}</span>
                                            </p>
                                            <p className="m-0">
                                                <span className="me-3 badge bg-success">{review.rating} ★</span>
                                                <span>{review.comment}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'specs' && (
                                <div className="">
                                    <h4 className="fw-bold mb-3 text-muted">General Specifications :</h4>
                                    <table className="table table-bordered table-striped">
                                        <tbody>
                                            <tr>
                                                <th className="w-25 text-muted">Brand</th>
                                                <td>Dummy Brand</td>
                                            </tr>
                                            <tr>
                                                <th className="w-25 text-muted">Model Number</th>
                                                <td>XYZ</td>
                                            </tr>
                                            <tr>
                                                <th className="w-25 text-muted">Material</th>
                                                <td>Premium Aluminum / Plastic</td>
                                            </tr>
                                            <tr>
                                                <th className="w-25 text-muted">Dimensions</th>
                                                <td>15 x 8 x 2 inches</td>
                                            </tr>
                                            <tr>
                                                <th className="w-25 text-muted">Weight</th>
                                                <td>450 grams</td>
                                            </tr>
                                            <tr>
                                                <th className="w-25 text-muted">Warranty</th>
                                                <td>1 Year Manufacturer Warranty</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;