import { Outlet } from "react-router-dom";
import Navbar from "../customer/Navbar";

const BaseTemplate = () => {
    return ( 
        <div>
            <Navbar />

            <Outlet />
        </div>
     );
}
 
export default BaseTemplate;