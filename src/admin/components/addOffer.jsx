import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AddOffer = () => {

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchparams] = useSearchParams();

    const [formData, setFormData] = useState({
        id: null,
        title: "",
        description: "",
        discount: ""
    })

    useEffect(() => {
        if (searchparams.get("cmd") == "update") {
            fetch("http://localhost:8080/api/v1/offer/" + searchparams.get("id"))
                .then(res => res.json())
                .then(res => {
                    if (res.status == 200) {
                        setFormData({
                            id: res.offer.id,
                            title: res.offer.title || "",
                            description: res.offer.description || "",
                            discount: res.offer.discount || ""
                        })
                    }
                })
        }
    }, [searchparams]);

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
            // Make the POST request to the Spring Boot backend
            if (searchparams.get("cmd") != "update") {
                response = await fetch('http://localhost:8080/api/v1/offer/new', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            }
            else {
                response = await fetch('http://localhost:8080/api/v1/offer/update', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            }
            const data = await response.json();

            if (response.ok && data.status === 200 || data.status === 201) {
                setMessage('Offer saved successfully!');
                setIsError(false);

                e.target.reset();
            } else {
                // Handle backend errors (e.g., status 500)
                setMessage(data.message || 'Failed to add Offer. Please try again.');
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
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
                            <h4 className="mb-0 text-center">Add New Offers</h4>
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
                                    <label htmlFor="offerName" className="form-label fw-bold">
                                        Offer Name
                                    </label>
                                    <input
                                        type="text"
                                        id="offerName"
                                        name="title"
                                        className="form-control"
                                        placeholder="e.g., Summer offers"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">
                                        Description
                                    </label>
                                    <input
                                        id="description"
                                        className="form-control"
                                        name="description"
                                        rows="4"
                                        placeholder="Describe the offer..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="discount" className="form-label fw-bold">
                                        Discount Percentage
                                    </label>
                                    <input
                                        id="discount"
                                        className="form-control"
                                        type="number"
                                        name="discount"
                                        rows="4"
                                        placeholder="Discount Percentage"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success btn-lg" disabled={isLoading}>
                                        {isLoading ? 'Saving...' : 'Save Offer'}
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => {
                                        {
                                            setFormData({
                                                title: "",
                                                description: "",
                                                discount: ""
                                            })
                                        }
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
}

export default AddOffer;