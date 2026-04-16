import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return ( 
        <div className="container-fluid bg-light">
            <div className="row ">
                <div className="col-6 offset-3 d-flex  vh-100" >
                    <form className="d-block p-3 w-50 bg-white shadow mx-auto my-auto h-50" >
                        <h3 className="text-muted text-center">Forgot Password</h3>
                        <input className="form-control my-3" type="email" placeholder="email" name="email" />
                        <input className="btn btn-dark w-100 my-3" type="submit" value="submit"/>
                        <p className='text-center'>We will send you a link to reset your password.</p>
                        <p className='text-center'><Link to="/signin">Back to Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default ForgotPassword;