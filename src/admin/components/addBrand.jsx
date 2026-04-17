import React, { useState } from 'react';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    console.log('Sending data to backend...');
   
    setCategoryName('');
    setDescription('');
    setImage(null);
    e.target.reset(); 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-light text-black p-3">
              <h4 className="mb-0 text-center">Add New Brand</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label fw-bold">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    className="form-control"
                    placeholder="e.g., Men's Fashion"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="4"
                    placeholder="Describe the products in this category..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="categoryImage" className="form-label fw-bold">
                    Brand Logo
                  </label>
                  <input
                    type="file"
                    id="categoryImage"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success btn-lg">
                    Save Brand
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => {
                    setCategoryName('');
                    setDescription('');
                  }}>
                    Clear Form
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
