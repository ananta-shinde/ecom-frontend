import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const AddBrand = () => {
  const [BrandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  
  // Separate the file object from the URL string to prevent bugs
  const [imageFile, setImageFile] = useState(null); 
  const [existingImageUrl, setExistingImageUrl] = useState(''); 
  
  const [searchparams] = useSearchParams();
  const isEditMode = searchparams.get("cmd") === "update";

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetch('http://localhost:8080/api/v1/brand/' + searchparams.get("id"))
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            setBrandName(res.brand.name || '');
            setDescription(res.brand.description || '');
            
            // Set the URL for previewing, NOT the file object!
            if (res.brand.logoUrl) {
                setExistingImageUrl(res.brand.logoUrl.startsWith('http') ? res.brand.logoUrl : `http://localhost:8080/${res.brand.logoUrl}`);
            }
          }
        })
        .catch(err => console.error("Fetch error:", err));
    }
  }, [isEditMode, searchparams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // MUST use FormData because we are sending a file!
    const formData = new FormData();
    if (isEditMode) {
        formData.append('id', searchparams.get("id"));
    }
    formData.append('name', BrandName);
    formData.append('description', description);
    
    // Only append the image if the user actually uploaded a new one
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
      // Point to the correct URLs based on the mode
      const url = isEditMode 
        ? 'http://localhost:8080/api/v1/brand/update' 
        : 'http://localhost:8080/api/v1/brand/new';

      // Always use POST when uploading files!
      const response = await fetch(url, {
        method: 'POST',
        body: formData, // No JSON.stringify, no Content-Type headers
      });

      const data = await response.json();

      if (response.ok && (data.status === 201 || data.status === 200)) {
        setMessage('Brand saved successfully!');
        setIsError(false);
        
        if (!isEditMode) {
            // Only clear the form if we are creating a new one
            setBrandName('');
            setDescription('');
            setImageFile(null);
            setExistingImageUrl('');
            document.getElementById('categoryImage').value = ''; 
        }
      } else {
        setMessage(data.message || 'Failed to save brand. Please try again.');
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
              <h4 className="mb-0 text-center">{isEditMode ? 'Edit Brand' : 'Add New Brand'}</h4>
            </div>
            <div className="card-body p-4">
              
              {message && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label fw-bold">Brand Name</label>
                  <input type="text" id="categoryName" className="form-control" value={BrandName} onChange={(e) => setBrandName(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold">Description</label>
                  <textarea id="description" className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="categoryImage" className="form-label fw-bold">
                    {isEditMode ? 'Update Brand Logo (Optional)' : 'Brand Logo'}
                  </label>
                  <input type="file" id="categoryImage" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required={!isEditMode} />
                </div>

                {/* Show the existing logo if we are editing and haven't uploaded a new one */}
                {isEditMode && existingImageUrl && !imageFile && (
                    <div className="mb-4">
                      <label className="form-label fw-bold d-block">Current Brand Logo</label>
                      <img src={existingImageUrl} alt="Current Logo" width={100} className="border rounded shadow-sm" />
                    </div>
                )}

                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-success btn-lg" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Brand'}
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