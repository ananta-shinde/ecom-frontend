import { Toast } from "bootstrap/dist/js/bootstrap.bundle";


const AddNewProductForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <h3 className="text-center mt-3 ">ADD NEW PRODUCT</h3>
            <form className="col-6 offset-3 mt-5 " onSubmit={handleSubmit}>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter Product Name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Enter Product Price</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Enter Product Image Url</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Enter Brand name</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default AddNewProductForm;