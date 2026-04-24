import React, { useEffect, useState } from 'react';
import FeaturedProductCard from './FeaturedProductCard'; 

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/product/featured')
            .then(res => res.json())
            .then(data => {
                const productsArray = Array.isArray(data) ? data : data.products || [];
                setFeaturedProducts(productsArray);
            })
            .catch(err => console.error("Error fetching featured products:", err))
            .finally(() => setIsLoading(false)); 
    }, []);

    return (
        <div className="container mt-5 pt-3">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-dark">Featured Products</h2>
                <div className="mx-auto bg-success" style={{ height: "4px", width: "60px", borderRadius: "2px" }}></div>
            </div>

            {isLoading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {featuredProducts.map((f) => (
                        <FeaturedProductCard key={f.id} product={f} />
                    ))}
                </div>
            )}

            {!isLoading && featuredProducts.length === 0 && (
                <div className="text-center text-muted my-5">
                    <h5>No featured products available at the moment.</h5>
                </div>
            )}
        </div>
    );
};

export default FeaturedProducts;