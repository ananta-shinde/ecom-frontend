import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: {
            id: 1 // default customer
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleRoleChange = (roleId) => {
        setFormData({ ...formData, role: { id: roleId } })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password != formData.confirmPassword) {
            alert("Password do not match");
            return;
        }

        const { confirmPassword, ...payload } = formData;

        fetch("http://localhost:8080/api/v1/user/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // alert("User Register Successfully");
            setFormData("")
            e.target.reset();
            navigate('/signin');
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, try again")
        })


        
    }


    return (

        <div className="container-fluid bg-light">
            <div className="row ">
                <div className="col-6 offset-3 d-flex " style={{ height: "100vh" }}>
                    <form className="d-block p-3 w-50 bg-white shadow mx-auto my-auto h-60" onSubmit={handleSubmit} >
                        <h3 className="text-muted text-center">Sign Up</h3>

                        <div className="d-flex justify-content-center my-3">

                            <div className="btn-group">
                                <button
                                    type="button"
                                    className={`btn ${formData.role.id === 1 ? "btn-dark" : "btn-outline-dark"
                                        }`}
                                    onClick={() => handleRoleChange(1)}
                                >
                                    Customer
                                </button>

                                <button
                                    type="button"
                                    className={`btn ${formData.role.id === 2 ? "btn-dark" : "btn-outline-dark"
                                        }`}
                                    onClick={() => handleRoleChange(2)}
                                >
                                    Seller
                                </button>
                            </div>

                        </div>
                        <input className="form-control my-3" type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
                        <input className="form-control my-3" type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} />
                        <input className="form-control my-3" type="number" placeholder="contact" name="contact" value={formData.contact} onChange={handleChange} />
                        <input className="form-control my-3" type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} />
                        <input className="form-control my-3" type="password" placeholder="confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        <input className="btn btn-dark w-100 my-3" type="submit" value="Submit" />
                        <p className='text-center'>Already have an account? <Link to="/signin">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SignUp;