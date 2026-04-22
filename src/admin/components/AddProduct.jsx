import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductForm = () => {
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("cmd") === "update";
  const productId = searchParams.get("id");

  // Form State
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    brandId: '',
    categoryId: ''
  });

  // File & Image State
  const [images, setImages] = useState([]); // For NEW multiple images
  const [thumbnail, setThumbnail] = useState(null); // For NEW thumbnail
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState(''); // To show the thumbnail when editing
  const [existingImageUrls, setExistingImageUrls] = useState([]); // To show the multiple images when editing

  // Dropdown Data State
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // 1. Fetch Dropdown Data (Runs in BOTH modes)
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/category')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data.categories) ? data.categories : Array.isArray(data) ? data : []))
      .catch(err => console.error(err));

    fetch('http://localhost:8080/api/v1/brand')
      .then(res => res.json())
      .then(data => setBrands(Array.isArray(data.brands) ? data.brands : Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  // 2. Fetch Product Data for Pre-filling (Edit mode)
  useEffect(() => {
    if (isEditMode && productId) {
      fetch(`http://localhost:8080/api/v1/product/${productId}`)
        .then(res => res.json())
        .then(data => {
          console.log("Fetched product for edit:", data);
          
          setProduct({
            name: data.name || '',
            description: data.description || '',
            price: data.price || '',
            brandId: data.brand ? data.brand.id : '', 
            categoryId: data.category ? data.category.id : ''
          });

          // Show the current thumbnail if it exists
          const thumbUrl = data.thumbnailImage || data.thumbnail;
          if (thumbUrl) {
            setExistingThumbnailUrl(thumbUrl.startsWith('http') ? thumbUrl : `http://localhost:8080/${thumbUrl}`);
          }

          // Show the current multiple images if they exist
          if (data.images && Array.isArray(data.images)) {
             // Map over them to ensure they have the full URL path if needed
             const fullUrls = data.images.map(img => img.startsWith('http') ? img : `http://localhost:8080/${img}`);
             setExistingImageUrls(fullUrls);
          }
        })
        .catch(err => console.error("Failed to fetch product details:", err));
    }
  }, [isEditMode, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleClear = () => {
    setProduct({ name: '', description: '', price: '', brandId: '', categoryId: '' });
    setImages([]);
    setThumbnail(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (isEditMode) formData.append('id', productId); 
    
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('brandId', product.brandId);
    formData.append('categoryId', product.categoryId);

    // Append Thumbnail
    if (thumbnail) formData.append('thumbnailimage', thumbnail);
    
    // Append Multiple Images
    if (images.length > 0) {
      images.forEach((img) => formData.append('images', img));
    }

    try {
      const url = isEditMode 
        ? 'http://localhost:8080/api/v1/product/update' 
        : 'http://localhost:8080/api/v1/product/new';
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        setMessage(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
        if (!isEditMode) handleClear(); 
      } else {
        setMessage('Failed to save product.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Check backend.');
    }
  };

  return (
    <div className="container my-3 px-5">
      <div className="card shadow border-0">
        <div className="card-header bg-light text-black p-3">
          <h4 className="mb-0 text-center">{isEditMode ? 'Edit Product' : 'Add New Product'}</h4>
        </div>
        <div className="card-body p-4">
          
          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit} className="row g-3">
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

            <div className="col-md-4">
              <label className="form-label fw-bold">Category</label>
              <select name="categoryId" className="form-select" value={product.categoryId} onChange={handleChange} required>
                <option value="">Select Category</option>
                {Array.isArray(categories) && categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Brand</label>
              <select name="brandId" className="form-select" value={product.brandId} onChange={handleChange} required>
                <option value="">Select Brand</option>
                {Array.isArray(brands) && brands.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Thumbnail Upload */}
            <div className="col-md-6 mt-4">
              <label className="form-label fw-bold">
                {isEditMode ? 'Update Thumbnail Image (Optional)' : 'Thumbnail Image'}
              </label>
              <input type="file" className="form-control" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required={!isEditMode} />
              
              {isEditMode && existingThumbnailUrl && !thumbnail && (
                 <div className="mt-2">
                   <small className="text-muted d-block">Current Thumbnail:</small>
                   <img src={existingThumbnailUrl} alt="Current Thumbnail" style={{ height: '80px', borderRadius: '5px' }} />
                 </div>
              )}
            </div>

            {/* NEW: Multiple Images Upload */}
            <div className="col-md-6 mt-4">
              <label className="form-label fw-bold">
                {isEditMode ? 'Update Additional Images (Optional)' : 'Additional Images (Multiple)'}
              </label>
              {/* Note the 'multiple' attribute and Array.from below 👇 */}
              <input type="file" className="form-control" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
              
              {/* Preview of existing multiple images */}
              {isEditMode && existingImageUrls.length > 0 && images.length === 0 && (
                 <div className="mt-2">
                   <small className="text-muted d-block">Current Additional Images:</small>
                   <div className="d-flex gap-2 mt-1 flex-wrap">
                     {existingImageUrls.map((url, idx) => (
                       <img key={idx} src={url} alt={`Product view ${idx + 1}`} style={{ height: '60px', borderRadius: '5px' }} />
                     ))}
                   </div>
                 </div>
              )}
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-success btn-lg w-100">
                {isEditMode ? 'Save Changes' : 'Upload Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;