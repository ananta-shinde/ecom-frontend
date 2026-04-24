import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div 
            className="hero-container text-center text-white d-flex align-items-center justify-content-center mt-3"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/banner.jpg')`,
                minHeight: "70vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "15px",
                margin: "0 15px"
            }}
        >
            <div className="container px-4">
                <h1 className="display-3 fw-bold mb-4 shadow-sm">
                    Discover Top Quality Products
                </h1>
                
                <p className="lead mb-5 fs-4">
                    Upgrade your lifestyle with our premium, hand-picked selections.
                </p>
                
                
            </div>
        </div>
    );
};

export default HeroSection;