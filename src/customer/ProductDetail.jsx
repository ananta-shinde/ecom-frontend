import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductDetailSlider from "./ProductDetailSlider";

const ProductDetail = () => {

    const [searchParams] = useSearchParams()
    const [product ,setproduct] = useState({})

    useEffect(() => {
        fetch('https://dummyjson.com/products/'+ searchParams.get("productId"))
        .then(res => res.json())
        .then(res => (
            setproduct(res)
        ));
    },[searchParams])

    return ( 
        <div className="container p-3">
            <div className="row">
                <div className="col col-md-5 p-5">
                    
                    <ProductDetailSlider product={product}/>

                    <div className="row">
                        <div className="col">
                            <button className="btn btn-success shadow border w-100">ADD TO BAG</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-dark shadow border w-100">BUY NOW</button>
                        </div>
                    </div>
                </div>
                <div className="col col-md-7 mt-md-5" style={{maxHeight:"75vh" ,overflowY:"auto"}}>
                    <h2>{product.title}</h2>
                    <hr />
                    <p>{product.description}</p>
                    
                    <p>{product.tags?.map((tag) => <span>#{tag} </span>)}</p>

                    <p className="fs-5">
                        <span className="text-muted text-decoration-line-through">₹ {product.price}</span>
                        <span className="ms-4 text-success">{product.discountPercentage}% off</span>
                    </p>
                    <hr />
                    <p className="fs-4 fw-bold">₹ {(product.price - (product.price * product.discountPercentage /100)).toFixed(2)}</p>
                    <hr />
                    <p>
                        <span className="badge bg-success me-3">{product.rating} ★</span>
                        <span className=""><a href="#review" className="text-decoration-none text-dark">{product.reviews?.length} Ratings & Reviews</a></span>
                    </p>
                    <p className="fw-bold">{product.shippingInformation}</p>
                    <hr />
                    <p>It comes with {product.warrantyInformation}</p>
                    <hr />

                    <div className="review">
                        <div className="d-flex align-items-center">
                            <p className="fw-bold fs-4">Ratings & Reviews :</p>
                            <p className="badge bg-success mx-4">{product.rating} ★</p>
                            <p className="">{product.reviews?.length} Ratings & Reviews</p>
                        </div>

                        {product.reviews?.map((review) => (
                            <div className="card p-4">
                                <p>
                                    <span className="me-3">{review.reviewerName}</span>
                                    <span>{review.date}</span>
                                </p>
                                <p>
                                    <span className="me-3 badge bg-success">{review.rating}  ★</span>
                                    <span>{review.comment}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProductDetail;