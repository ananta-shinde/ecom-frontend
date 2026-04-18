const ProductDetailSlider = ({ product }) => {

    var carouselItem = []
    var carouselIndicators = []

    if (product.images?.length != 0) {

        for (let i = 0; i < product.images?.length; i++) {
            var classList = "carousel-item"
            var indicatorsClassList = "bg-dark"

            if (i == 0) {
                classList = "carousel-item active"
                indicatorsClassList = "bg-dark active"
            }

            carouselItem.push(
                <div className={classList}>
                    <img className="img-fluid" src={product.images?.[i]} alt="" />
                </div>
            )

            carouselIndicators.push(
                <button className={indicatorsClassList} data-bs-target="#product-detail-slider" data-bs-slide-to={i} ></button>
            )

        }
    }else{
        carouselItem.push(
                <div className={classList}>
                    <img className="img-fluid" src="https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0=" alt="" />
                </div>
            )
    }

    return (
        <div className="carousel slide" id="product-detail-slider" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {carouselIndicators.map((item) => item)}
            </div>


            <div className="carousel-inner">

                {carouselItem.map((item) => item)}
            </div>
        </div>
    );
}

export default ProductDetailSlider;