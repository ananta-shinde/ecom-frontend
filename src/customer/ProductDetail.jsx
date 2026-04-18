import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductDetailSlider from "./ProductDetailSlider";

const ProductDetail = () => {

    const [searchParams] = useSearchParams()
    const [product, setproduct] = useState({})
    const [activeTab, setActiveTab] = useState('reviews');

    useEffect(() => {
        fetch('https://dummyjson.com/products/' + searchParams.get("productId"))
            .then(res => res.json())
            .then(res => (
                setproduct(res)
            ));
    }, [searchParams])

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col col-md-5 p-5">

                    <ProductDetailSlider product={product} />

                    <div className="row">
                        <div className="col">
                            <button className="btn btn-success shadow border w-100"><Link to={"/cart"} className="text-decoration-none text-white">ADD TO BAG</Link></button>
                        </div>
                        <div className="col">
                            <button className="btn btn-dark shadow border w-100">BUY NOW</button>
                        </div>
                    </div>
                </div>
                <div className="col col-md-7 mt-md-5" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                    <h2>{product.title}</h2>
                    <hr />
                    <p>{product.description}</p>

                    <p>{product.tags?.map((tag) => <span>#{tag} </span>)}</p>

                    <p className="fs-5">
                        <span className="text-muted text-decoration-line-through">₹ {product.price}</span>
                        <span className="ms-4 text-success">{product.discountPercentage}% off</span>
                    </p>
                    <hr />
                    <p className="fs-4 fw-bold">₹ {(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</p>
                    <hr />
                    <p>
                        <span className="badge bg-success me-3">{product.rating} ★</span>
                        <span className=""><a href="#review" className="text-decoration-none text-dark">{product.reviews?.length} Ratings & Reviews</a></span>
                    </p>
                    <p className="fw-bold">{product.shippingInformation}</p>
                    <hr />
                    <p>It comes with {product.warrantyInformation}</p>
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
                                        <p className="fw-bold fs-4 m-0">Ratings & Reviews :</p>
                                        <p className="badge bg-success mx-4 m-0">{product.rating} ★</p>
                                        <p className="m-0 text-muted">{product.reviews?.length} Ratings & Reviews</p>
                                    </div>

                                    {product.reviews?.map((review, index) => (
                                        <div className="card p-4 mb-3 shadow-sm" key={index}>
                                            <p className="fw-bold mb-2">
                                                <span className="me-3">{review.reviewerName}</span>
                                                <span className="text-muted fw-normal fs-6">{new Date(review.date).toLocaleDateString()}</span>
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
                                    <h4 className="fw-bold mb-3">General Specifications</h4>
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