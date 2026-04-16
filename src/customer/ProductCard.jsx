import { Link } from "react-router-dom";

const ProductCard = (props) => {

    const { thumbnail, title , discountPercentage , price, rating ,id} = props.product

    return ( 
        <div className="col col-md-6 col-lg-3 p-3">
            
            <Link to={"/details?productId="+id} className="text-decoration-none text-dark">
            <div className="card h-100 border-0 ">
                <img className="card-img bg-light" src={thumbnail} />

                <div className="card-body">
                    <p className="card-title fw-bold">{title}</p>
                    <p className="badge bg-success me-3">{rating} ★</p>
                    <p className="fs-5 fw-bold">₹ {(price - (price * discountPercentage / 100)).toFixed(2)}</p>
                    <p className="card-subtitle">
                        <span className="text-muted text-decoration-line-through me-2">₹ {price}</span>
                        <span className="text-success ms-2">{discountPercentage}% off</span>
                    </p>
                    
                </div>
            </div>
            </Link>
            
        </div>
     );
}
 
export default ProductCard;