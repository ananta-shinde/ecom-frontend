import { Form, Link } from "react-router-dom"

const SignUp = () => {

    


    return (

        <div className="container-fluid bg-light">
            <div className="row ">
                <div className="col-6 offset-3 d-flex " style={{height:"100vh"}}>
                    <form className="d-block p-3 w-50 bg-white shadow mx-auto my-auto h-60" >
                       <h3 className="text-muted text-center">Sign Up</h3>
                       <input className="form-control my-3" type="text" placeholder="Enter your name" name="name" />
                       <input className="form-control my-3" type="email" placeholder="email" name="email" />
                       <input className="form-control my-3" type="password" placeholder="password" name="password" />
                       <input className="form-control my-3" type="password" placeholder="confirm password" name="confirmPassword" />
                       <input className="btn btn-dark w-100 my-3" type="submit" value="submit"/>
                       <p className='text-center'>Already have an account? <Link to="/signin">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default SignUp;