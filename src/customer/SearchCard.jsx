import { Link } from "react-router-dom";

const SearchCard = ({product}) => {
    return ( 
        <div className="card p-2">
            <Link className="text-decoration-none text-dark" to={"/details?productId="+ product.id}>
            <div className="row align-items-center text-center">
            <div className="col-3">
                <img className="img-fluid" style={{height:"50px"}} src={product.thumbnail} alt="Product thumbnail" />
            </div>
            <div className="col">
                <p>{product.title}</p>
            </div>
            </div>
            </Link>
        </div>
     );
}
 
export default SearchCard;