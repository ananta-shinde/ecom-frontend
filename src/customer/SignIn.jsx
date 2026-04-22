import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    var response = undefined;
    try {

      response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.status === 200) {
        setMessage('Login successfully!');
        setIsError(false);

        navigate("/")
      } else {
        // Handle backend errors (e.g., status 500)
        setMessage(data.message || 'Invalid credentials');
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage('Network error');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light" style={{ height: "100vh" }}>
      <div className="row align-items-center justify-content-center h-100">
        <div className="col-6 offset-3 p-3 bg-white shadow mx-auto my-auto" >
          <div className="card-body p-4">
            <h3>Log In</h3>
          {/* Status Message Alert */}
          {message && (
            <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
              {message}
            </div>
          )}

          <form className="" onSubmit={handleSubmit} >
            <input className="form-control my-3" type="email" placeholder="email" name="email" onChange={handleChange} />
            <input className="form-control my-3" type="password" placeholder="password" name="password" onChange={handleChange} />
            <button className='btn btn-dark w-100 my-3'>Log In</button>
            <p className='text-center my-3'>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p className='text-center'><Link to="/forgot-password">Forgot Password?</Link></p>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;