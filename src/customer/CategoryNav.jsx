import { MotorbikeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const CategoryNav = () => {
    const [categories, setCategories] = useState([]);
    
    

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/category')
            .then(res => res.json())
            .then(res => {
                setCategories(res.categories || []);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    return (
        <div className="container mt-2 mb-3 border-bottom pb-2">
            
            <div className="d-flex justify-content-lg-center align-items-center overflow-auto gap-4 category-scroll-container">
                
                {categories.map((cat) => (
                
                    <Link 
                       to={`/products/category/${cat.name}`}
                        key={cat.id} 
                        className="text-decoration-none text-dark fw-semibold category-item text-nowrap"
                        style={{ fontSize: "15px", cursor: "pointer" }}
                    >


                        {cat.name}
                    </Link>
                ))}
            </div>
            
        </div>
    );
}

export default CategoryNav;