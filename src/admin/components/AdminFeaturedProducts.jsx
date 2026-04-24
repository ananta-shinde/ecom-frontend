import React, { useEffect, useState } from 'react';

const AdminFeaturedProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/product')
            .then(res => res.json())
            .then(data => {
                const productsArray = Array.isArray(data) ? data : data.products || data.content || [];
                setAllProducts(productsArray);

                const alreadyFeatured = productsArray
                    .filter(p => p.featured === true || p.isFeatured === true)
                    .map(p => p.id);
                
                setSelectedIds(alreadyFeatured);
            })
            .catch(err => console.error("Error fetching products:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleCheckboxChange = (productId) => {
        if (selectedIds.includes(productId)) {
            setSelectedIds(selectedIds.filter(id => id !== productId));
        } else {
            setSelectedIds([...selectedIds, productId]);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/product/featured/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedIds), 
            });

            if (response.ok) {
                setMessage('Featured products updated successfully!');
            } else {
                setMessage('Failed to update featured products.');
            }
        } catch (error) {
            console.error('Error saving featured products:', error);
            setMessage('Network error occurred.');
        } finally {
            setIsLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-secondary">Manage Featured Products</h3>

            <div className="card shadow-sm border-0">
                <div className="card-header bg-light p-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Select Products for Homepage</h5>
                    <button 
                        className="btn btn-success fw-bold px-4" 
                        onClick={handleSave} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                
                <div className="card-body overflow-auto" style={{ maxHeight: "65vh" }}>
                    {message && <div className="alert alert-success">{message}</div>}

                    {allProducts.length === 0 && !isLoading ? (
                        <div className="text-center text-muted my-4">No products found in the database.</div>
                    ) : (
                        <div className="list-group">
                            {allProducts.map(product => (
                                <label key={product.id} className="list-group-item d-flex align-items-center gap-3 py-3" style={{ cursor: "pointer" }}>
                                    <input 
                                        className="form-check-input flex-shrink-0" 
                                        type="checkbox" 
                                        style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
                                        checked={selectedIds.includes(product.id)}
                                        onChange={() => handleCheckboxChange(product.id)}
                                    />
                                    <img 
                                        src={product.thumbnailImage ? (product.thumbnailImage.startsWith('http') ? product.thumbnailImage : `http://localhost:8080/${product.thumbnailImage}`) : 'https://via.placeholder.com/50'} 
                                        alt={product.name} 
                                        width="50" 
                                        className="rounded"
                                    />
                                    <div className="fw-semibold fs-5">
                                        {product.name}
                                    </div>
                                    <div className="ms-auto text-success fw-bold">
                                        ${product.price}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminFeaturedProducts;