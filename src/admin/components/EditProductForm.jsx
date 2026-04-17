import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const EditProductForm = () => {
    const [file, setFile] = useState(null);
    const { id } = useParams();

    // Instead of one formData object, make a separate state for each piece of data
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setcategory] = useState("");

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title || "");
                setPrice(data.price || "");
                setThumbnail(data.thumbnail || "");
                setBrand(data.brand || "");
                setcategory(data.category || "");
            });
    }, [id]);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const HandleSubmit = (e) => {
        e.preventDefault();

    }

    return (

        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3 ">
                        <form onSubmit={HandleSubmit} className="mt-5 bg-light p-4 rounded-5 text-dark">
                            <h3 className="text-center">Edit the Product</h3>
                            <label htmlFor="" className="mt-3">Enter the Name of the Product</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />


                            <label htmlFor="" className="mt-3">Enter the price of the product</label>
                            <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />

                            <label htmlFor="" className="mt-3">Upload the thumbnail of the product</label>
                            <input type="file" onChange={(e) => setThumbnail(e.target.value)} className="form-control" />
                            {file && <img src={file} alt="Uploaded preview" />}

                            <div className="mb-3">
                                <label htmlFor="productBrand" className="form-label fw-semibold">Select Brand</label>
                                <select id="productBrand"className="form-select"value={brand} onChange={(e) => setBrand(e.target.value)}  required>
                                    <option value="" disabled>-- Choose a Brand --</option>

                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Sony">Sony</option>
                                    <option value="Nike">Nike</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                             <div className="mb-3">
                                <label htmlFor="productBrand" className="form-label fw-semibold">Select category</label>
                                <select id="productBrand"className="form-select"value={category} onChange={(e) => setcategory(e.target.value)}  required>
                                    <option value="" disabled>-- Choose a category --</option>

                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Sony">Sony</option>
                                    <option value="Nike">Nike</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success w-100 my-4">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProductForm;