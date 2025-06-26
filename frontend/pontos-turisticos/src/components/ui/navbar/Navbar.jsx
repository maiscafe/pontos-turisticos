import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef();
    const [activeNav, setActiveNav] = useState("");
    const location = useLocation();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive-nav");
    };

    const handleNavClick = (path) => {
        setActiveNav(path);
    };

    return (
        <header className="header">


            <nav className='navBar' ref={navRef}>
                <Link
                    to="/"
                    className={activeNav === "/" || location.pathname === "/" ? "active" : ""}
                    onClick={() => handleNavClick("/")}>Pontos Turísticos</Link>
                <Link
                    to="/cadastrar"
                    className={activeNav === "/cadastrar" || location.pathname === "/cadastrar" ? "active" : ""}
                    onClick={() => handleNavClick("/cadastrar")}>Cadastrar Ponto Turístico</Link>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn nav-open-btn" onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
};

export default Navbar;
