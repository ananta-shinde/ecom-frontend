import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams } from 'react-router-dom';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();

     useEffect(() => {
    fetch(`http://localhost:8080/api/v2/product/${categoryName}`)
        .then(res => res.json())
        .then(res => setProducts(res.products));
}, [categoryName]);
    return (
        <div className="container">
            <div className="row">
                {products.length === 0 ? (
                    <div>No product found for the category</div>
                ) : (
                    products.map((p) => <ProductCard key={p.id} product={p} />)
                )}
            </div>
        </div>
    );
}

export default ProductListing;