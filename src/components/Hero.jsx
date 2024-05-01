import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-200 bg-blend-overlay">
    <div className="hero-content text-center">
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">Discover the Best Clothing Shop of the Year!</h1>
        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
        Embark on a journey of style and comfort. Explore our curated collection and find your perfect fit. Satisfaction guaranteed!
        </p>
        <Link to="/shop" className="btn btn-wide bg-orange-600 hover:bg-orange-500 text-white">Shop Now</Link>
      </div>
    </div>
  </div>
  )
}

export default Hero