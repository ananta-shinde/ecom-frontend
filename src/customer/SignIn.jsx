import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {

  return (
    <div className="container-fluid bg-light">
      <div className="row ">
        <div className="col-6 offset-3 d-flex " style={{ height: "100vh" }}>

          <form className="d-block p-3 w-50 bg-white shadow mx-auto my-auto h-50" >
            <h3 className="text-muted text-center">Sign In</h3>
            <input className="form-control my-3" type="email" placeholder="email" name="email" />
            <input className="form-control my-3" type="password" placeholder="password" name="password" />
            <input className="btn btn-dark w-100 my-3" type="submit" value="submit" />
            <p className='text-center'>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p className='text-center'><Link to="/forgot-password">Forgot Password?</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

      export default SignIn;