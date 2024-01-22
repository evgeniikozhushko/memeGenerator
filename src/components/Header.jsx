import React from "react";
import logo from "../assets/EK_Logo_White.png";

export default function Header() {
    return (
        <header className="header">
            <h2 className="header--title">Meme Generator</h2>
            <a href="https://evgenii.ca/" target="_blank" rel="noreferrer"  className="header--image-link">
                <img 
                    src={logo}
                    className="header--image"
                    alt="Logo"
                />
            </a>
        </header>
    );
}


{/* <h4 className="header--project">Meme Generator</h4> */}