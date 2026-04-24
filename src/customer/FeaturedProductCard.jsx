import { Link } from "react-router-dom";

const FeaturedProductCard = (props) => {
  
    const imageUrl = props.product.thumbnailImage
        ? (props.product.thumbnailImage.startsWith('http') ? props.product.thumbnailImage : `http://localhost:8080/${props.product.thumbnailImage}`)
        : 'https://via.placeholder.com/150';

    return (
        <div className="col-12 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0 product-card">
                
                <div className="text-center p-3">
                    <img
                        src={imageUrl}
                        alt={props.product.name}
                        className="img-fluid rounded"
                        style={{ height: "180px", objectFit: "contain" }}
                    />
                </div>
                
                <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title text-truncate" title={props.product.name}>
                        {props.product.name}
                    </h5>
                    <p className="card-text fw-bold text-success fs-5">
                        ${props.product.price}
                    </p>

                    <Link to={`http://localhost:3000/details?productId=${props.product.id}`} className="btn btn-outline-dark mt-auto w-100 fw-semibold rounded-pill">
                        View Details
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default FeaturedProductCard;