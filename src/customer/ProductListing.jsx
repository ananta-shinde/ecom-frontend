import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductListing = () => {

    const [products , setproducts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(res => (
            setproducts(res.products)
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