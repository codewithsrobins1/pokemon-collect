 import React from 'react'
import './Landing.css'
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="landing-container">
            <div className="landing-title">
                <h1>Catch all your favorite pokemon!</h1>
            </div>  
            
            <Link exact to='/collection'>
                <button className="landing-button">
                    Catch Em!
                </button>
            </Link>
        </div>
    )
}

export default Landing;
