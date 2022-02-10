import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick (!click);
    const closeMobileMenu = () => setClick (false);
    
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        console.log("HZZZZ");
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    
    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to='/' className='navbar-logo'>
                    Paul
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <a className={(click ? 'fas fa-times' : 'fas fa-bars') + ' hex3-color'}></a>
                </div>
                <ul className={(click ? 'nav-menu active' : 'nav-menu')}>
                    <li className="nav-item">
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                            Projects
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            Contact {button}
                        </Link> 
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
