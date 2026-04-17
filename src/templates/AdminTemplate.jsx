import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/components/AdminNavbar";
import AdminSideNav from "../admin/components/AdminSideNav";

const AdminTemplate = () => {
    return ( 
        <>
            <AdminNavbar />
            <div className="row m-0 w-100">
                <div className="col-2 p-0">
                    <AdminSideNav />
                </div>
                <div className="col-10">
                    <Outlet />
                </div>
            </div>
        </> 
    );
}

export default AdminTemplate;