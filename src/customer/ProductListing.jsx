import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductListing = () => {

    const [products , setproducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/product')
        .then(res => res.json())
        .then(res => (
            setproducts(res)
        ));
    },[]);

    return ( 
        <div className="container">
            <div className="row">
                
                {products.map((p) => <ProductCard product={p} />)}
            </div>
        </div>
     );
}
 
export default ProductListing;