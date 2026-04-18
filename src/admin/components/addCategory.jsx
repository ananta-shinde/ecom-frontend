import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchparams] = useSearchParams();

  useEffect(()=>{
      if(searchparams.get("cmd") == "update"){
        fetch('http://localhost:8080/api/v1/category/'+searchparams.get("id"))
        .then(res=>res.json())
        .then(res=>{
              if(res.status == 200){
                setCategoryName(res.category.name)
                setDescription(res.category.description)
              }
        })
        
       
      }

  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const formData = {}
    // formData.append('name', categoryName);
    // formData.append('description', description);
   
    var response = undefined
    try {
      // Make the POST request to the Spring Boot backend
      if(!searchparams.get("cmd") == "update"){
      response = await fetch('http://localhost:8080/api/v1/category/new', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        // Note: Do NOT set 'Content-Type' header when sending FormData. 
        // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
        body: JSON.stringify({name:categoryName,description}),
      });
    }else{
      response = await fetch('http://localhost:8080/api/v1/category/update', {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        // Note: Do NOT set 'Content-Type' header when sending FormData. 
        // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
        body: JSON.stringify({id:searchparams.get("id"),name:categoryName,description}),
      });
    }

      const data = await response.json();

      if (response.ok && data.status === 201 && data.status === 200) {
        setMessage('Category saved successfully!');
        setIsError(false);
        
        // Clear the form on success
        setCategoryName('');
        setDescription('');
       
        e.target.reset(); 
      } else {
        // Handle backend errors (e.g., status 500)
        setMessage(data.message || 'Failed to save category. Please try again.');
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
    <div className="container-fluid mt-5 "style={{minHeight:"100vh"}}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow border-0 py-5 px-3" >
            <div className="card-header bg-light text-dark p-3" >
              <h4 className="mb-0 text-center">Add New Category</h4>
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
                    Category Name
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

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success btn-lg">
                    Save Category
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
