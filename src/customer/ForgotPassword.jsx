import { Link } from "react-router-dom";

const ForgotPassword = () => {

    const handleform = (e) => {
        e.preventDefault(); 
        
        var emailSection = document.getElementById("email-section");
        var ResetSection = document.getElementById("Reset-section");

        emailSection.classList.add("d-none");
        emailSection.classList.remove("d-block");

        ResetSection.classList.remove("d-none");
        ResetSection.classList.add("d-block");
    }

    return ( 
        <div className="container-fluid bg-light">
            <div className="row ">
                <div className="col-6 offset-3 d-flex vh-100" >
                    <form className="d-block p-3 w-50 bg-white shadow mx-auto my-auto">

                        <div className="form-group d-block" id="email-section">
                            <h3 className="text-muted text-center">Forgot Password</h3>
                            <input className="form-control my-3" type="email" placeholder="email" name="email" required/>                          
                            <input className="btn btn-dark w-100 my-3" type="submit" onClick={handleform} value="verify"/>
                        </div  >

                        <div className="form-group d-none" id="Reset-section">
                            <h3 className="text-muted text-center">Reset Password</h3>
                            <input className="form-control my-3" type="password" placeholder="password" name="password" />
                            <input className="form-control my-3" type="password" placeholder="confirm password" name="confirmPassword" />
                            <button className="btn btn-dark w-100 my-3 " type="submit"><Link to="/signin" className="text-decoration-none text-white">Reset Password</Link></button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default ForgotPassword;