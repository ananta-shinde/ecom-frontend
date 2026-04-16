import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-light navbar navbar-expand-lg p-3">
            <div className="container">
                <h4 className="navbar-brand">ShopKart</h4>

                <div className="w-50">
                    <input className="form-control" type="text" placeholder="Search product here" />
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