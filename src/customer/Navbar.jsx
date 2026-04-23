import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchCard from "./SearchCard";
import { Gift, HeartIcon, Search, SearchIcon, ShoppingCart, ShoppingCartIcon, User, User2Icon, UserCircle2, X } from "lucide-react";

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

    const handleClear = () => {
        setInputValue("")
        searchContainer.current.className = "d-none"
    }

    return (
        <div className="bg-light navbar navbar-expand-lg p-3 sticky-top">
            <div className="container">
                <h4 className="navbar-brand">ShopKart</h4>

                <div className="position-relative w-50 d-flex border bg-white rounded">
                    <span className="p-2">{<Search />}</span>
                    <input onChange={handleSearch} className="form-control shadow-none border-0" type="text" value={inputValue} placeholder="Search product here" />

                    <div className="d-none" ref={searchContainer} style={{maxHeight:"80vh",overflow:"scroll", overflowX: "hidden", position: "absolute",zIndex:3 , marginTop:"9%", width:"100%"}}>
                        {products && products.length > 0 ? (products?.map((product) => <SearchCard product={product} /> )) : (<div className="card text-center p-5 text-muted bg-light"><h4>No products found</h4></div>)}
                    </div>

                    <span><button onClick={handleClear} className="btn bg-white border-0">{<X color="red"/>}</button></span>
                </div>

                {/* <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link">Shop All</Link></li>
                </ul> */}

                <ul className="navbar-nav align-items-center">
                    <li className="nav-item me-3"><Link to={"/products"} className="nav-link text-black">Shop All</Link></li>
                    <li className="nav-item"><Link className="nav-link">{<HeartIcon />}</Link></li>
                    <li className="nav-item"><Link to={"/cart"} className="nav-link">{<ShoppingCart />}</Link></li>
                    <li className="nav-item"><Link className="nav-link">{<User />}</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;