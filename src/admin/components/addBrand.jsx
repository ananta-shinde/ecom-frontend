import React, { useState } from 'react';

const AddBrand = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  
  // Optional: Add state for showing success/error messages to the user
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Make the POST request to the Spring Boot backend
      const response = await fetch('http://localhost:8080/api/v1/brand/new', {
        method: 'POST',
        // Note: Do NOT set 'Content-Type' header when sending FormData. 
        // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 201) {
        setMessage('Brand added successfully!');
        setIsError(false);
        
        // Clear the form on success
        setCategoryName('');
        setDescription('');
        setImage(null);
        e.target.reset(); 
      } else {
        // Handle backend errors (e.g., status 500)
        setMessage(data.message || 'Failed to add brand. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error uploading brand:', error);
      setMessage('Network error. Make sure the backend is running.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
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
              
              {/* Status Message Alert */}
              {message && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                  {message}
                </div>
              )}

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
                    placeholder="Describe the brand..."
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
                  <button type="submit" className="btn btn-success btn-lg" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Brand'}
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => {
                    setCategoryName('');
                    setDescription('');
                    setImage(null);
                    setMessage('');
                    document.getElementById('categoryImage').value = ''; // clear file input visually
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

export default AddBrand;   