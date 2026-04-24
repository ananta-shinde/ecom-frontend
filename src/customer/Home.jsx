import CategoryNav from "./CategoryNav";
import FeaturedProducts from "./FeaturedProducts";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

const Home = () => {
    return ( 
        <div className="mt-3">
            <CategoryNav/>
            <HeroSection/>
            <FeaturedProducts/>
        </div>
     );
}
 
export default Home;