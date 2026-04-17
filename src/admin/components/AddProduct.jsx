import React, { useState, useEffect,handleClear } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '', // For the OneToOne Stock entity
    brandId: '',       // For the ManyToOne Brand relationship
    categoryId: ''     // For the ManyToOne Category relationship
  });

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Note: In a real app, you'd fetch these from your API on mount
  const [brands, setBrands] = useState([]); 
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stockQuantity', product.stockQuantity);
    formData.append('brandId', product.brandId);
    formData.append('categoryId', product.categoryId);
    
    // Append files
    if (thumbnail) formData.append('thumbnailImage', thumbnail);
    images.forEach((img) => formData.append('images', img));

    console.log('Product Data Ready for Spring Boot:', Object.fromEntries(formData));
    // Add your axios.post('/api/products', formData) here
  };

  return (
    <div className="container my-3 px-5 ">
      <div className="card shadow border-0">
        <div className="card-header bg-light text-black p-3">
          <h4 className="mb-0 text-center">Add New Product</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="row g-3">
            
            {/* Basic Info */}
            <div className="col-md-8">
              <label className="form-label fw-bold">Product Name</label>
              <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Price</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input type="number" name="price" step="0.01" className="form-control" value={product.price} onChange={handleChange} required />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Description</label>
              <textarea name="description" className="form-control" rows="3" value={product.description} onChange={handleChange} required></textarea>
            </div>

            {/* Relationships & Stock */}
            <div className="col-md-4">
              <label className="form-label fw-bold">Category</label>
              <select name="categoryId" className="form-select" value={product.categoryId} onChange={handleChange} required>
                <option value="">Select Category</option>
                {/* Map your categories here */}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Brand</label>
              <select name="brandId" className="form-select" value={product.brandId} onChange={handleChange} required>
                <option value="">Select Brand</option>
                {/* Map your brands here */}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Initial Stock</label>
              <input type="number" name="stockQuantity" className="form-control" placeholder="Quantity" value={product.stockQuantity} onChange={handleChange} required />
            </div>

            {/* Images */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Thumbnail Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Product Image (Multiple)</label>
              <input type="file" className="form-control" Array accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-success btn-lg w-100">Upload Product</button>
              <button type="button" className="btn btn-outline-secondary w-100 my-2" onClick={handleClear}>
                      Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
