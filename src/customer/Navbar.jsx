import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchCard from "./SearchCard";

const Navbar = () => {

    const searchContainer = useRef(null)
    const [products , setproducts] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        fetch('https://dummyjson.com/products/search?q='+ inputValue)
        .then(res => res.json())
        .then(res => (
            setproducts(res.products)
        ));
    },[inputValue])

    const handleSearch = (event) => {
        setInputValue(event.target.value);

        if(event.target.value.length > 0) {
            searchContainer.current.className = "d-block"
        } 
        else {
            searchContainer.current.className = "d-none"
        }
    }

    return (
        <div className="bg-light navbar navbar-expand-lg p-3">
            <div className="container">
                <h4 className="navbar-brand">ShopKart</h4>

                <div className="position-relative w-50">
                    <input onChange={handleSearch} className="form-control border" type="text" value={inputValue} placeholder="Search product here" />
                    <div className="d-none" ref={searchContainer} style={{maxHeight:"80vh",overflow:"scroll", overflowX: "hidden", position: "absolute",zIndex:3 , width:"100%"}}>
                        {products?.map((product) => <SearchCard product={product} />)}
                    </div>
                </div>

                {/* <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link">Shop All</Link></li>
                </ul> */}

                <ul className="navbar-nav">
                    <li className="nav-item"><Link to={"/products"} className="nav-link text-black">Shop All</Link></li>
                    <li className="nav-item"><Link className="nav-link">Wishlist</Link></li>
                    <li className="nav-item"><Link className="nav-link">Cart</Link></li>
                    <li className="nav-item"><Link className="nav-link">Account</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;